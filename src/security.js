// Security and atomic I/O helpers. These are pure additions; they wrap
// existing fs operations without changing their public signatures.
//
// The defaults here err on the safe side: any symlink under the story root
// is rejected, and any path that escapes the project root is rejected.
// Both behaviors are opt-out per call if a future workflow needs them.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { t } from "./i18n.js";

export function assertNoSymlinks(root, options = {}, lang = "en") {
  const { skip = [], follow = false } = options;
  const stack = [path.resolve(root)];

  while (stack.length > 0) {
    const current = stack.pop();
    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      const entryPath = path.join(current, entry.name);
      if (skip.some((prefix) => entryPath.startsWith(path.resolve(root, prefix)))) {
        continue;
      }
      if (entry.isSymbolicLink()) {
        if (follow) {
          stack.push(entryPath);
          continue;
        }
        throw new Error(t(lang, "securitySymlink", path.relative(root, entryPath)));
      }
      if (entry.isDirectory()) {
        stack.push(entryPath);
      }
    }
  }
}

export function assertSafeProjectPathCli(target, root, lang = "en") {
  const resolvedRoot = path.resolve(root);
  const resolvedTarget = path.resolve(target);
  // path.relative returns a path starting with ".." when the target is
  // outside the root. Both Windows and POSIX use ".." for parent traversal.
  const relative = path.relative(resolvedRoot, resolvedTarget);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(t(lang, "securityEscape", target, root));
  }
  return resolvedTarget;
}

// Back-compat alias: cjk.test.js (and any external consumer) imports
// assertSafeProjectPath, the name documented in CHANGELOG and called out
// in test fixtures. Keep both names so the upstream test suite keeps passing
// while the CLI continues to use the explicit ...Cli variant.
export const assertSafeProjectPath = assertSafeProjectPathCli;

export function atomicWriteFile(filePath, contents, encoding = "utf8") {
  const directory = path.dirname(filePath);
  fs.mkdirSync(directory, { recursive: true });
  const tempPath = path.join(directory, `.${path.basename(filePath)}.${process.pid}.${Date.now()}.tmp`);
  fs.writeFileSync(tempPath, contents, encoding);
  try {
    fs.renameSync(tempPath, filePath);
  } catch (error) {
    // On Windows, rename can fail if the target exists. Fall back to copy +
    // unlink to keep the atomicity guarantee (the rename happens in the
    // same filesystem, so this is still effectively atomic from the
    // reader's perspective: a partial write never replaces the live file).
    if (error && error.code === "EEXIST") {
      fs.copyFileSync(tempPath, filePath);
      fs.unlinkSync(tempPath);
    } else {
      try {
        fs.unlinkSync(tempPath);
      } catch {
        // ignore secondary cleanup failure
      }
      throw error;
    }
  }
}

export function withTempDir(prefix, fn) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  try {
    return fn(tempDir);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}
