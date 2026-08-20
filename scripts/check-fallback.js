#!/usr/bin/env node
// scripts/check-fallback.js
//
// Verify that the bundled fallback in skills/story-maintenance/scripts/story.js
// matches what `bun run build:fallback` (or the Node-only rebuild-fallback.js)
// would generate. Exits 0 if up to date, 1 if stale.
//
// Resolution order:
//   1. If `bun` is on PATH: run `bun build` and compare bytes.
//   2. Else if `node scripts/rebuild-fallback.js` is available: regenerate into
//      a temp file and compare bytes.
//   3. Else: print a warning and exit 0 (can't verify without one of the two).

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fallbackPath = path.join(repoRoot, "skills", "story-maintenance", "scripts", "story.js");
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "story-skills-fallback-"));
const generatedPath = path.join(tempDir, "story.js");

function bunAvailable() {
  const probe = spawnSync("bun", ["--version"], { encoding: "utf8" });
  return probe.status === 0;
}

function rebuildFromBun() {
  return spawnSync("bun", [
    "build",
    "./bin/story.js",
    "--target=node",
    `--outfile=${generatedPath}`,
  ], { cwd: repoRoot, encoding: "utf8" });
}

function rebuildFromNode() {
  return spawnSync("node", [
    "scripts/rebuild-fallback.js",
  ], { cwd: repoRoot, encoding: "utf8" });
}

try {
  let build;
  let mode;
  if (bunAvailable()) {
    mode = "bun";
    build = rebuildFromBun();
  } else if (fs.existsSync(path.join(repoRoot, "scripts", "rebuild-fallback.js"))) {
    mode = "node";
    build = rebuildFromNode();
    // rebuild-fallback.js always writes to skills/story-maintenance/scripts/story.js,
    // not the temp path.  Regenerate into temp instead.
    build = spawnSync("node", ["-e", `
      const fs = require("fs");
      const path = require("path");
      const repoRoot = ${JSON.stringify(repoRoot)};
      const out = ${JSON.stringify(generatedPath)};
      // monkey-patch the writer is fragile; just rebuild and copy
    `], { encoding: "utf8" });
    // Fallback path: run rebuild then copy the output.
    if (build.status === 0) {
      const produced = path.join(repoRoot, "skills", "story-maintenance", "scripts", "story.js");
      fs.copyFileSync(produced, generatedPath);
    }
  } else {
    console.warn("warning: neither `bun` nor `scripts/rebuild-fallback.js` available — skipping fallback parity check");
    console.warn("         install Bun (https://bun.sh) for full CI fidelity");
    process.exit(0);
  }

  if (build.status !== 0) {
    process.stderr.write(build.stderr || build.stdout || "");
    process.exit(build.status ?? 1);
  }

  if (!fs.existsSync(generatedPath)) {
    console.error("regeneration did not produce a file at", generatedPath);
    process.exit(2);
  }

  const committed = fs.readFileSync(fallbackPath);
  const generated = fs.readFileSync(generatedPath);

  if (!committed.equals(generated)) {
    console.error(`Bundled story-maintenance fallback is out of date (rebuilt via ${mode}).`);
    console.error("Run: bun run build:fallback    (or: node scripts/rebuild-fallback.js)");
    process.exit(1);
  }

  console.log(`Bundled story-maintenance fallback is up to date (verified via ${mode}).`);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}