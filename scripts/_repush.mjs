// Clean repush script. PAT from env only.
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PAT = process.env.GH_PAT_ALL || process.env.GH_PAT;
if (!PAT) { console.error('GH_PAT_ALL or GH_PAT required'); process.exit(1); }

const OWNER = 'liuhua1202';
const REPO = 'story-skills-zh';
const BRANCH = 'main';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
console.log('Pushing from:', repoRoot);

const skipDirs = new Set(['.git', 'node_modules', 'dist']);

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (skipDirs.has(e.name)) continue;
      out.push(...walk(full));
    } else if (e.isFile()) {
      out.push(full);
    }
  }
  return out;
}

function api(method, urlPath, body) {
  return new Promise((resolve, reject) => {
    const bodyStr = body == null ? '' : JSON.stringify(body);
    const req = https.request({
      hostname: 'api.github.com', path: urlPath, method,
      headers: {
        'Authorization': 'token ' + PAT,
        'User-Agent': 'clean-push',
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyStr),
      },
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve(data ? JSON.parse(data) : {}); }
          catch { resolve(data); }
        } else {
          reject(new Error('HTTP ' + res.statusCode + ': ' + data.slice(0, 500)));
        }
      });
    });
    req.on('error', reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

function b64(s) { return Buffer.from(s, 'utf8').toString('base64'); }

async function main() {
  console.log('Deleting existing repo...');
  try { await api('DELETE', '/repos/' + OWNER + '/' + REPO); console.log('  deleted'); }
  catch (e) { console.log('  delete: ' + e.message); }

  console.log('Recreating repo...');
  await api('POST', '/user/repos', {
    name: REPO, description: '中文完整本地化的 Story Skills 写作工具',
    private: false, auto_init: false,
  });
  console.log('  created');

  const allFiles = walk(repoRoot).map(f => path.relative(repoRoot, f).replace(/\\/g, '/'));
  console.log('Files:', allFiles.length);

  const firstIdx = allFiles.findIndex(f => f === 'README.md');
  const initialIdx = firstIdx >= 0 ? firstIdx : 0;
  const firstFile = allFiles[initialIdx];
  const remaining = allFiles.filter((_, i) => i !== initialIdx);
  console.log('First file:', firstFile);
  console.log('Remaining:', remaining.length);

  console.log('Pushing initial commit...');
  const firstContent = fs.readFileSync(path.join(repoRoot, firstFile), 'utf8');
  const initResult = await api('PUT', '/repos/' + OWNER + '/' + REPO + '/contents/' + firstFile, {
    message: 'Initial Chinese-localized Story Skills',
    content: b64(firstContent),
    branch: BRANCH,
  });
  console.log('  C1 SHA:', initResult.commit.sha);
  const baseTree = initResult.commit.tree.sha;

  console.log('Creating tree...');
  const treeItems = remaining.map(rel => ({
    path: rel, mode: '100644', type: 'blob',
    content: fs.readFileSync(path.join(repoRoot, rel), 'utf8'),
  }));
  const treeResult = await api('POST', '/repos/' + OWNER + '/' + REPO + '/git/trees', {
    base_tree: baseTree, tree: treeItems,
  });
  console.log('  T2 SHA:', treeResult.sha);
  console.log('  truncated:', treeResult.truncated);

  console.log('Creating commit...');
  const commitResult = await api('POST', '/repos/' + OWNER + '/' + REPO + '/git/commits', {
    message: 'Add all source files, examples, docs, scripts, and bundled fallback',
    tree: treeResult.sha, parents: [initResult.commit.sha],
  });
  console.log('  C2 SHA:', commitResult.sha);

  console.log('Updating main ref...');
  await api('PATCH', '/repos/' + OWNER + '/' + REPO + '/git/refs/heads/' + BRANCH, {
    sha: commitResult.sha, force: true,
  });

  console.log('Done: https://github.com/' + OWNER + '/' + REPO);
}

main().catch(e => { console.error('FAIL:', e.message); process.exit(1); });
