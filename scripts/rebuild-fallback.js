// 智能 ESM bundler for Story Skills CLI
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const entry = path.join(repoRoot, "bin", "story.js");
const outFile = path.join(repoRoot, "skills", "story-maintenance", "scripts", "story.js");

const visited = new Set();
const ordered = [];
const nodeImports = new Set();

function visit(filePath) {
  const abs = path.resolve(filePath);
  if (visited.has(abs)) return;
  visited.add(abs);
  const content = fs.readFileSync(abs, "utf8");
  const importRe = /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))?\s+from\s+)?["']([^"']+)["'];?/g;
  let m;
  while ((m = importRe.exec(content))) {
    const p = m[1];
    if (p.startsWith(".")) {
      const resolved = path.resolve(path.dirname(abs), p);
      const candidates = [resolved, resolved + ".js", path.join(resolved, "index.js")];
      for (const c of candidates) {
        if (fs.existsSync(c)) { visit(c); break; }
      }
    } else {
      nodeImports.add(p);
    }
  }
  ordered.push({ abs, rel: path.relative(repoRoot, abs) });
}

visit(entry);

const declsByName = new Map();
for (const { abs, rel } of ordered) {
  const lines = fs.readFileSync(abs, "utf8").split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];
    let m;
    if ((m = ln.match(/^(?:export\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/))) {
      if (!declsByName.has(m[1])) declsByName.set(m[1], []);
      declsByName.get(m[1]).push({ file: rel, line: i + 1 });
    } else if ((m = ln.match(/^(?:export\s+)?const\s+([A-Za-z_$][\w$]*)\s*=/))) {
      if (!declsByName.has(m[1])) declsByName.set(m[1], []);
      declsByName.get(m[1]).push({ file: rel, line: i + 1 });
    } else if ((m = ln.match(/^(?:export\s+)?let\s+([A-Za-z_$][\w$]*)\s*=/))) {
      if (!declsByName.has(m[1])) declsByName.set(m[1], []);
      declsByName.get(m[1]).push({ file: rel, line: i + 1 });
    }
  }
}

const renames = new Map();
for (const [name, decls] of declsByName) {
  if (decls.length < 2) continue;
  for (let i = 1; i < decls.length; i++) {
    const d = decls[i];
    const fileKey = d.file.replace(/[^A-Za-z0-9]/g, "_");
    renames.set(`${d.file}|${name}`, `${fileKey}_${name}`);
  }
}

const SHEBANG_RE = /^#!.*\r?\n/;
const IMPORT_RE = /^[ \t]*import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))?\s+from\s+)?["'][^"']+["'];?[ \t]*\r?\n?/gm;

const out = [];
out.push("#!/usr/bin/env node");
out.push("// Bundled fallback for Story Skills CLI.");
out.push("// Regenerate with: bun run build:fallback (preferred) or node scripts/rebuild-fallback.js");
out.push("// This file is auto-generated; do not edit by hand.");
out.push("");
if (nodeImports.size > 0) {
  for (const imp of [...nodeImports].sort()) {
  const spec = imp.startsWith("node:") ? imp.slice(5) : imp;
  out.push(`import * as ${spec} from "${imp}";`);
}
  out.push("");
}

for (const { abs, rel } of ordered) {
  let content = fs.readFileSync(abs, "utf8");
  content = content.replace(SHEBANG_RE, "");
  content = content.replace(IMPORT_RE, "");
  const myRenames = [...renames.entries()].filter(([k]) => k.startsWith(rel + "|"));
  for (const [key, newName] of myRenames) {
    const oldName = key.split("|")[1];
    const re = new RegExp(`(?<![A-Za-z0-9_$])${oldName}(?![A-Za-z0-9_$])`, "g");
    content = content.replace(re, newName);
  }
  out.push(`// ===== ${rel} =====`);
  out.push(content);
  out.push("");
}

fs.writeFileSync(outFile, out.join("\n"), "utf8");
console.log(`Wrote ${outFile}`);
console.log(`  ${ordered.length} files merged, ${nodeImports.size} node: imports deduped`);
console.log(`  ${renames.size} identifier renames applied`);
if (renames.size > 0) {
  for (const [k, v] of renames) console.log(`    ${k} -> ${v}`);
}