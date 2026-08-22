import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export function makeTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "story-skills-"));
}

export function memoryIo(cwd) {
  const out = [];
  const err = [];
  return {
    cwd,
    stdout: {
      write(value) {
        out.push(String(value));
      }
    },
    stderr: {
      write(value) {
        err.push(String(value));
      }
    },
    output() {
      return out.join("");
    },
    error() {
      return err.join("");
    }
  };
}

export function writeMarkdown(filePath, frontmatter, body = "") {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `---\n${frontmatter.trim()}\n---\n${body}`, "utf8");
}

/**
 * Cross-platform path assertion helper.
 *
 * Some CLI commands embed project-relative paths in their output (e.g.,
 * "scenes/bad-scene.md frontmatter field status has unsupported value invalid").
 * On Windows, `path.join` produces backslash-separated paths, so the actual
 * output uses "\" while tests written for portability use "/".
 *
 * `pathContains` normalizes both sides to use the platform separator before
 * calling `String.prototype.includes`, allowing the same test to pass on
 * Windows, macOS, and Linux.
 *
 * Usage:
 *   expect(pathContains(actual, "scenes/bad-scene.md foo")).toBe(true);
 *
 * If `actual` is undefined/null, returns false (use case: asserting that an
 * optional output exists in some but not all cases).
 */
export function pathContains(actual, expected) {
  if (typeof actual !== "string") return false;
  if (typeof expected !== "string") return false;
  const sep = path.sep;
  const altSep = sep === "/" ? "\\" : "/";
  // Normalize both sides: replace the alternate separator with the platform's.
  // This way "scenes/bad-scene.md" matches "scenes\\bad-scene.md" on Windows,
  // and "scenes\\bad-scene.md" matches "scenes/bad-scene.md" on POSIX.
  const normalizedActual = actual.split(altSep).join(sep);
  const normalizedExpected = expected.split(altSep).join(sep);
  return normalizedActual.includes(normalizedExpected);
}