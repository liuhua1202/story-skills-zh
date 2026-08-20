#!/usr/bin/env node
// End-to-end smoke test for CJK support and security fixes.
// Runs the story CLI as a subprocess (the way real users invoke it),
// not by importing internal modules, so this script catches both
// library bugs and CLI wiring bugs.
//
// Usage:  node scripts/smoke-cjk.js
// Exit 0 on full pass, 1 on any failure.

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cliPath = path.join(repoRoot, "bin", "story.js");

const results = [];
function record(name, ok, detail = "") {
  results.push({ name, ok, detail });
  const marker = ok ? "PASS" : "FAIL";
  console.log(`[${marker}] ${name}` + (detail ? `  -- ${detail}` : ""));
}

function run(args, options = {}) {
  const result = spawnSync(process.execPath, [cliPath, ...args], {
    cwd: options.cwd ?? repoRoot,
    encoding: "utf8"
  });
  return {
    code: result.status ?? 1,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? ""
  };
}

function makeWorkdir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "story-smoke-"));
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

// Extract the kebab-case id from a "Created <kind> <id>:" line.
// Uses a constrained character class so the regex does not eat the
// Windows drive-letter colon in the path that follows the id.
function extractId(stdout, kind) {
  const re = new RegExp(`Created ${kind} ([a-z0-9-]+):`);
  const m = stdout.match(re);
  return m ? m[1].trim() : "";
}

const workdir = makeWorkdir();
try {
  // 1. Init a Chinese-titled project.
  const init = run(
    ["init", "林若的故事", "--genre", "fantasy", "--theme", "复仇", "--synopsis", "一个关于林若与青丘山的故事。"],
    { cwd: workdir }
  );
  const createdMatch = init.stdout.match(/Created story project: (.+)\r?\n/);
  const projectRoot = createdMatch ? createdMatch[1].trim() : null;
  const projectBasename = projectRoot ? path.basename(projectRoot) : "";
  const projectExists = projectRoot !== null && fs.existsSync(projectRoot);
  record(
    "init: Chinese title creates project",
    init.code === 0 && projectExists,
    `root=${projectBasename}`
  );
  if (!projectExists) {
    throw new Error(`init failed: exit=${init.code} stderr=${init.stderr.trim()}`);
  }
  const validId = /^[a-z0-9-]+$/.test(projectBasename) && projectBasename.length > 0;
  record(
    "init: storyId is kebab-case (pinyin or cjk hex)",
    validId,
    `id=${projectBasename}`
  );

  // 2-5. Add entities. All subsequent commands run from workdir so the
  // path traversal guard sees the project as inside the cwd.
  const addChar = run(
    ["add", "character", "林若", "--path", projectRoot, "--role", "protagonist"],
    { cwd: workdir }
  );
  const charId = extractId(addChar.stdout, "character");
  const charFile = path.join(projectRoot, "characters", `${charId}.md`);
  record(
    "add: Chinese character name produces kebab id",
    addChar.code === 0 && fs.existsSync(charFile) && /^[a-z0-9-]+$/.test(charId),
    `id=${charId}`
  );

  const addLoc = run(
    ["add", "location", "青丘山", "--type", "wilderness", "--character", charId, "--path", projectRoot],
    { cwd: workdir }
  );
  const locId = extractId(addLoc.stdout, "location");
  const locFile = path.join(projectRoot, "worldbuilding", "locations", `${locId}.md`);
  record(
    "add: Chinese location produces kebab id",
    addLoc.code === 0 && fs.existsSync(locFile) && /^[a-z0-9-]+$/.test(locId),
    `id=${locId}`
  );

  const addFac = run(
    ["add", "faction", "青丘宗", "--type", "religion", "--member", charId, "--location", locId, "--path", projectRoot],
    { cwd: workdir }
  );
  const facId = extractId(addFac.stdout, "faction");
  const facFile = path.join(projectRoot, "worldbuilding", "factions", `${facId}.md`);
  record(
    "add: Chinese faction produces kebab id",
    addFac.code === 0 && fs.existsSync(facFile) && /^[a-z0-9-]+$/.test(facId),
    `id=${facId}`
  );

  const addCh = run(
    ["add", "chapter", "林若下山", "--path", projectRoot, "--number", "1", "--pov", charId, "--location", locId, "--character", charId],
    { cwd: workdir }
  );
  const chapterId = extractId(addCh.stdout, "chapter");
  record(
    "add: Chinese chapter title",
    addCh.code === 0 && /^[a-z0-9-]+$/.test(chapterId),
    `id=${chapterId}`
  );

  // 6. Write Chinese prose and check wordcount.
  const chapterPath = path.join(projectRoot, "chapters", `${chapterId}.md`);
  if (fs.existsSync(chapterPath)) {
    const prose = "\n## Chapter Text\n\n林若沿着青石台阶走下山去。她回头望了一眼青丘山，然后转身离开。她在心里记下了这次离别。\n";
    fs.appendFileSync(chapterPath, prose, "utf8");
  }
  const wc = run(["wordcount", projectRoot, "--write"], { cwd: workdir });
  const totalLine = wc.stdout.split(/\r?\n/).find((line) => line.startsWith("Total:"));
  const total = totalLine ? Number(totalLine.replace("Total:", "").trim()) : 0;
  record(
    "wordcount: Chinese prose counted (>0)",
    wc.code === 0 && total > 0,
    `total=${total}`
  );

  // 7-9. Validate / links / continuity should pass.
  const validate = run(["validate", projectRoot], { cwd: workdir });
  record(
    "validate: clean CJK project passes",
    validate.code === 0,
    (validate.stdout + validate.stderr).trim().split(/\r?\n/)[0]
  );

  const links = run(["links", projectRoot], { cwd: workdir });
  record(
    "links: cross-refs resolve",
    links.code === 0,
    (links.stdout + links.stderr).trim().split(/\r?\n/)[0]
  );

  const continuity = run(["continuity", projectRoot], { cwd: workdir });
  record(
    "continuity: clean project passes",
    continuity.code === 0,
    (continuity.stdout + continuity.stderr).trim().split(/\r?\n/)[0]
  );

  // 10. Symlink protection.
  const linkPath = path.join(projectRoot, "characters", "evil-link.md");
  const linkTarget = path.join(projectRoot, "characters", `${charId}.md`);
  let createdLink = false;
  try {
    fs.symlinkSync(linkTarget, linkPath);
    createdLink = true;
  } catch (error) {
    record(
      "security: symlink protection triggers",
      true,
      `symlink create skipped on this fs (${error.code})`
    );
  }
  if (createdLink && fs.lstatSync(linkPath).isSymbolicLink()) {
    const afterSymlink = run(["validate", projectRoot], { cwd: workdir });
    const refused = afterSymlink.code !== 0 && /symbolic link/i.test(afterSymlink.stderr + afterSymlink.stdout);
    record(
      "security: symlink protection triggers",
      refused,
      refused ? "refused as expected" : `expected failure but got: code=${afterSymlink.code}`
    );
    try { fs.unlinkSync(linkPath); } catch {}
  }

  // 11. Path traversal protection. The temp dir is in os.tmpdir(), which is
  //     OUTSIDE the cwd we run from. So passing an absolute path inside
  //     workdir should NOT trip the guard; passing a `..`-relative path
  //     SHOULD trip it.
  const escapeTarget = path.join(workdir, "..", "..", "etc");
  const traversal = run(["validate", escapeTarget], { cwd: workdir });
  const refusedTraversal = traversal.code !== 0 && /path traversal/i.test(traversal.stderr);
  record(
    "security: path traversal refused",
    refusedTraversal,
    refusedTraversal ? "refused as expected" : `expected failure but got: code=${traversal.code}`
  );

  // 12. Import a manuscript with Chinese names.
  const manuscriptDir = makeWorkdir();
  const manuscriptPath = path.join(manuscriptDir, "manuscript.md");
  writeFile(
    manuscriptPath,
    [
      "## Chapter 1: 开篇",
      "",
      "林若走进青丘宗的大门。她与林若对视，然后转身。林若点头离去。",
      "",
      "## Chapter 2: 离开",
      "",
      "陈大在山脚下等着林若。他对陈大说，我们走吧。"
    ].join("\n")
  );
  const importCmd = run(
    ["import", manuscriptPath, "--title", "测试导入", "--dir", "imported-zh"],
    { cwd: workdir }
  );
  const importedRoot = path.join(workdir, "imported-zh");
  const importOk = importCmd.code === 0 && fs.existsSync(importedRoot);
  record(
    "import: Chinese-titled import creates project",
    importOk,
    importOk ? `root=${path.basename(importedRoot)}` : `stderr=${importCmd.stderr.trim()}`
  );
  if (importOk) {
    const candidateLines = importCmd.stdout.split(/\r?\n/).filter((line) => /\(\d+ mentions?\)/.test(line));
    const hasChineseCandidate = candidateLines.some((line) => /[\u4e00-\u9fff]/.test(line));
    record(
      "import: extracts Chinese name candidates",
      hasChineseCandidate,
      candidateLines.length === 0 ? "no candidates printed" : candidateLines.join(" | ")
    );
  }

  // 12b. Chinese diagnostics (--lang zh) work end-to-end.
  const zhValidate = run(
    ["validate", projectRoot, "--lang", "zh"],
    { cwd: workdir }
  );
  const zhOk = zhValidate.code === 0 && /项目有效/.test(zhValidate.stdout);
  record(
      "i18n: validate --lang zh outputs Chinese",
      zhOk,
      zhOk ? zhValidate.stdout.trim() : `unexpected: ${zhValidate.stderr || zhValidate.stdout}`
    );

  // 12d. Empty title returns Chinese error.
  const zhEmptyTitle = run(["init", "--lang", "zh"], { cwd: workdir });
  const zhEmptyOk = zhEmptyTitle.code !== 0 && /请提供故事标题/.test(zhEmptyTitle.stderr);
  record(
    "i18n: init --lang zh errors in Chinese",
    zhEmptyOk,
    zhEmptyOk ? "refused as expected" : zhEmptyTitle.stderr.trim()
  );

  // 12e. Security error in Chinese.
  const zhSecurity = run(["validate", "../..", "--lang", "zh"], { cwd: workdir });
  const zhSecOk = zhSecurity.code !== 0 && /拒绝路径穿越/.test(zhSecurity.stderr);
  record(
    "i18n: security refusal in Chinese",
    zhSecOk,
    zhSecOk ? "refused as expected" : zhSecurity.stderr.trim()
  );

  // 13. Duplicate add should fail.
  const dup = run(
    ["add", "character", "林若", "--path", projectRoot, "--role", "protagonist"],
    { cwd: workdir }
  );
  const refusedDup = dup.code !== 0 && /already exists/i.test(dup.stderr + dup.stdout);
  record(
    "duplicate: adding same character twice fails",
    refusedDup,
    refusedDup ? "refused as expected" : `expected failure but got: code=${dup.code}`
  );
} catch (error) {
  record("script: uncaught error", false, error.message);
} finally {
  fs.rmSync(workdir, { recursive: true, force: true });
}

const failedTests = results.filter((r) => !r.ok);
console.log("");
console.log(`Summary: ${results.length - failedTests.length}/${results.length} passed`);
if (failedTests.length > 0) {
  console.log("Failed:");
  for (const t of failedTests) {
    console.log(`  - ${t.name}: ${t.detail}`);
  }
  process.exit(1);
}
process.exit(0);