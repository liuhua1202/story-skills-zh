import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const src = 'story-skills-zh/examples/yu-ye-zhi-mi';
const tmpRoot = 'story-skills-zh/.tmp';
fs.mkdirSync(tmpRoot, { recursive: true });
const tmp = path.join(tmpRoot, 'bad-zh-' + Date.now());
console.log('Cloning ' + src + ' -> ' + tmp);
fs.cpSync(src, tmp, { recursive: true });

// Break 1: add a non-existent chapter reference in arc
const arcFile = path.join(tmp, 'plot/arcs/yu-ye-de-shi.md');
let arc = fs.readFileSync(arcFile, 'utf8');
// Append at end: add a chapters list referencing a missing chapter
arc = arc.replace(/^themes:/m, 'chapters:\n  - chapter-99\nthemes:');
fs.writeFileSync(arcFile, arc, 'utf8');

// Break 2: change status to deceased + died-in to non-existent chapter
const charFile = path.join(tmp, 'characters/lu-wan.md');
let char = fs.readFileSync(charFile, 'utf8');
// Add died-in to a character that wasn't dead, plus change status
char = char.replace(/status:\s*\w+/, 'status: deceased');
if (!char.includes('died-in:')) {
  char = char.replace(/^status:/m, 'died-in: chapter-99\nstatus:');
}
fs.writeFileSync(charFile, char, 'utf8');

// Break 3: bad filename
const badFile = path.join(tmp, 'characters/badfile.md');
fs.writeFileSync(badFile, '---\nname: "BadFile"\n---\n# body');

// Break 4: remove required frontmatter
const chFile = path.join(tmp, 'chapters/chapter-01.md');
let ch = fs.readFileSync(chFile, 'utf8');
ch = ch.replace(/^pov:\s*\S+\n/m, '');
fs.writeFileSync(chFile, ch, 'utf8');

console.log('\n=== validate --lang zh ===');
try {
  const out = execSync('node story-skills-zh/bin/story.js validate "' + tmp + '" --lang zh', { encoding: 'utf8' });
  console.log(out);
} catch (e) {
  console.log(e.stdout || '');
  console.log(e.stderr || '');
}

console.log('\n=== validate (default lang, en) ===');
try {
  const out = execSync('node story-skills-zh/bin/story.js validate "' + tmp + '"', { encoding: 'utf8' });
  console.log(out);
} catch (e) {
  console.log(e.stdout || '');
  console.log(e.stderr || '');
}

console.log('\n=== continuity --lang zh ===');
try {
  const out = execSync('node story-skills-zh/bin/story.js continuity "' + tmp + '" --lang zh', { encoding: 'utf8' });
  console.log(out);
} catch (e) {
  console.log(e.stdout || '');
  console.log(e.stderr || '');
}

fs.rmSync(tmp, { recursive: true, force: true });
console.log('\n[done] temp project removed');
