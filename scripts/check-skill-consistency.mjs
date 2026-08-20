#!/usr/bin/env node
// scripts/check-skill-consistency.mjs
//
// CI guardian for skills/. Walks every SKILL.md + skills/common/*.md,
// validates frontmatter, link resolution, version alignment, and call-graph
// soundness. Exits 0 on success, 1 on any failure.
//
// Run via: `bun run check:skills` or `node scripts/check-skill-consistency.mjs`
//
// What it checks:
//   1. Every SKILL.md has name + version + description + allowed-cli + scope + calls
//   2. Every SKILL.md version matches package.json
//   3. Every `../common/X.md` and `references/X.md` reference resolves
//   4. Every `calls:` target exists as a skill directory
//   5. `called-by:` references match actual invert-calls (informational)
//   6. Markdown ``` fences are balanced
//   7. common/README.md describes all 5 files actually present

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname ?? path.dirname(new URL(import.meta.url).pathname), "..");
const SKILLS_DIR = path.join(ROOT, "skills");
const COMMON_DIR = path.join(SKILLS_DIR, "common");
const PKG_PATH = path.join(ROOT, "package.json");

const errors = [];
const warnings = [];

function fail(skill, msg) { errors.push(`[${skill}] ${msg}`); }
function warn(skill, msg) { warnings.push(`[${skill}] ${msg}`); }

function parseYaml(raw) {
  // Minimal YAML frontmatter parser for our simple schema.
  // Handles scalar, scalar-value with inline content, list `[]`, list-of-strings `[a, b]`,
  // and multi-line scalar (`description: |`). Does NOT handle nested objects.
  const out = {};
  const lines = raw.split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const m = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line);
    if (!m) { i++; continue; }
    const key = m[1];
    let value = m[2];
    if (value === "|") {
      // Block scalar — collect indented lines until blank or de-indented
      const block = [];
      i++;
      while (i < lines.length) {
        const bl = lines[i];
        if (bl === "" || /^[A-Za-z]/.test(bl)) break;
        block.push(bl.replace(/^  /, ""));
        i++;
      }
      out[key] = block.join("\n").trim();
      continue;
    }
    if (value === "" && i + 1 < lines.length && /^\s+-\s/.test(lines[i+1])) {
      // List under key
      const items = [];
      i++;
      while (i < lines.length && /^\s+-\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\s+-\s+/, "").replace(/^['"]|['"]$/g, "").trim());
        i++;
      }
      out[key] = items;
      continue;
    }
    // Inline `[a, b, c]` list
    if (/^\[.*\]$/.test(value)) {
      out[key] = value.slice(1, -1).split(",").map((s) => s.trim().replace(/^['"]|['"]$/g, "")).filter(Boolean);
    } else {
      out[key] = value.replace(/^['"]|['"]$/g, "").trim();
    }
    i++;
  }
  return out;
}

function readFrontmatter(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!m) return null;
  return parseYaml(m[1]);
}

function listSkills() {
  return fs.readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== "common")
    .map((d) => ({
      name: d.name,
      dir: path.join(SKILLS_DIR, d.name),
      skillPath: path.join(SKILLS_DIR, d.name, "SKILL.md")
    }))
    .filter((s) => fs.existsSync(s.skillPath));
}

// 1. frontmatter + version + required fields
function checkFrontmatter(skill, pkgVersion) {
  const text = fs.readFileSync(skill.skillPath, "utf8");
  const meta = readFrontmatter(text);
  if (!meta) { fail(skill.name, "no valid YAML frontmatter"); return null; }

  const required = ["name", "version", "description", "allowed-cli", "scope", "calls"];
  for (const k of required) {
    if (meta[k] === undefined) fail(skill.name, `missing required frontmatter field: ${k}`);
  }
  if (meta.name !== skill.name) fail(skill.name, `frontmatter name "${meta.name}" != directory "${skill.name}"`);
  if (meta.version && meta.version !== pkgVersion) fail(skill.name, `version "${meta.version}" != package.json "${pkgVersion}"`);

  return meta;
}

// 3. reference resolution
function checkReferences(skill) {
  const text = fs.readFileSync(skill.skillPath, "utf8");
  const refs = [...text.matchAll(/\.\.\/common\/([\w-]+\.md)|references\/([\w-]+\.md)/g)];
  for (const m of refs) {
    const g1 = m[1]; const g2 = m[2];
    if (g1) {
      const full = path.join(skill.dir, "..", "common", g1);
      if (!fs.existsSync(full)) fail(skill.name, `broken ../common ref: ${m[0]}`);
    } else if (g2) {
      const full = path.join(skill.dir, "references", g2);
      if (!fs.existsSync(full)) fail(skill.name, `broken references ref: ${m[0]}`);
    }
  }
}

// 4. calls graph
function checkCallGraph(skills, byName) {
  for (const s of skills) {
    const text = fs.readFileSync(s.skillPath, "utf8");
    const meta = readFrontmatter(text);
    if (!meta) continue;
    const calls = Array.isArray(meta.calls) ? meta.calls : [];
    for (const target of calls) {
      if (target === "story-maintenance" || target === "shared") continue;
      if (!byName.has(target)) fail(s.name, `calls: target "${target}" not found in skills/`);
    }
  }
}

// 5. called-by cross-check (informational)
function checkCalledByInverse(skills, byName) {
  for (const s of skills) {
    const text = fs.readFileSync(s.skillPath, "utf8");
    const meta = readFrontmatter(text);
    if (!meta) continue;
    const cb = Array.isArray(meta["called-by"]) ? meta["called-by"] : [];
    if (cb.length === 0) continue;
    // For each stated caller, check that it actually lists us in its calls:
    for (const caller of cb) {
      if (!byName.has(caller)) { warn(s.name, `called-by references unknown skill: ${caller}`); continue; }
      const callerText = fs.readFileSync(byName.get(caller).skillPath, "utf8");
      const callerMeta = readFrontmatter(callerText);
      if (!callerMeta) continue;
      const callerCalls = Array.isArray(callerMeta.calls) ? callerMeta.calls : [];
      if (!callerCalls.includes(s.name)) {
        warn(s.name, `claimed called-by: ${caller}, but ${caller} does not call us`);
      }
    }
  }
}

// 6. markdown fence balance
function checkFenceBalance(skill) {
  const text = fs.readFileSync(skill.skillPath, "utf8");
  const n = (text.match(/```/g) || []).length;
  if (n % 2 !== 0) fail(skill.name, `unbalanced \`\`\` fences (${n} occurrences)`);
}

function checkCommonDir() {
  if (!fs.existsSync(COMMON_DIR)) { fail("(common)", "skills/common/ directory missing"); return; }
  const files = fs.readdirSync(COMMON_DIR).filter((f) => f.endsWith(".md") && f !== "README.md");
  const readme = path.join(COMMON_DIR, "README.md");
  if (!fs.existsSync(readme)) { warn("(common)", "README.md missing in skills/common/"); return; }
  const readmeText = fs.readFileSync(readme, "utf8");
  for (const f of files) {
    if (!readmeText.includes(f)) warn("(common)", `common/${f} not mentioned in common/README.md`);
  }
}

// === main ===
const pkg = JSON.parse(fs.readFileSync(PKG_PATH, "utf8"));
const pkgVersion = pkg.version;

const skills = listSkills();
const byName = new Map(skills.map((s) => [s.name, s]));

checkCommonDir();
for (const s of skills) {
  checkFrontmatter(s, pkgVersion);
  checkReferences(s);
  checkFenceBalance(s);
}
checkCallGraph(skills, byName);
checkCalledByInverse(skills, byName);

// output
const summary = [];
summary.push(`Skills checked: ${skills.length}`);
summary.push(`Package version: ${pkgVersion}`);
if (errors.length === 0) {
  console.log("✓ skill consistency check passed");
  for (const w of warnings) console.log(`  warning: ${w}`);
  console.log(summary.join("\n"));
  process.exit(0);
}
console.error(`✗ skill consistency check failed (${errors.length} errors, ${warnings.length} warnings)`);
for (const e of errors) console.error(`  ${e}`);
for (const w of warnings) console.error(`  warning: ${w}`);
console.error(summary.join("\n"));
process.exit(1);