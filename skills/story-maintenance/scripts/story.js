#!/usr/bin/env node
// Bundled fallback for Story Skills CLI.
// Regenerate with: bun run build:fallback (preferred) or node scripts/rebuild-fallback.js
// This file is auto-generated; do not edit by hand.

import * as buffer from "node:buffer";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

// ===== src\i18n.js =====
// i18n.js - Story Skills CLI 双语消息字典
// Regenerate by editing this file directly.

const MESSAGES = {
  en: {
    helpUsage: "Usage: story <command> [options]",
    candidatesHeader: "Entity candidates (review, then create with story add):",
    alreadyCurrent: "Project already uses the current schema",
    reindexCurrent: "Registries already up to date",
    valid: "Project is valid",
    validFail: "Project validation failed",
    linksValid: "Links are valid",
    linksFail: "Link check failed",
    continuityValid: "Continuity is consistent",
    continuityFail: "Continuity check failed",
    missingSource: "An import source file or directory is required",
    missingProjectName: "A project name is required for init",
    needsEntityIdAndName: "rename requires an entity id and a new name",
    needsEntityId: "remove requires an entity id",
    optionDashNote: "Option values that begin with a dash must use the --option=value form.",
    noChaptersExport: "No chapters found to export",
    created: (kind, id, file) => `Created ${kind} ${id}: ${file}`,
    renamed: (kind, oldId, id, file) => `Renamed ${kind} ${oldId} to ${id}: ${file}`,
    removed: (kind, id, file) => `Removed ${kind} ${id}: ${file}`,
    imported: (chapters, root) => `Imported ${chapters} chapters into ${root}`,
    importedWithCount: (chapters, words, root) => `Imported ${chapters} chapters (${words} words) into ${root}`,
    candidate: (name, count) => `- ${name} (${count} mentions)`,
    projectCreated: (root) => `Created story project: ${root}`,
    migrated: (n) => `Migrated project to current schema: ${n} changes`,
    reindexed: (n) => `Updated ${n} registries`,
    exported: (n, file) => `Exported ${n} chapters to ${file}`,
    built: (n, format, file) => `Built ${n} chapters as ${format} to ${file}`,
    totalWords: (n) => `Total: ${n}`,
    chapterWords: (file, count) => `${file}: ${count}`,
    summary: (e, w) => `: ${e} errors, ${w} warnings`,
    unknownCommand: (cmd) => `Unknown command: ${cmd}`,
    invalidKind: (kind) => `Unknown entity kind: ${kind}`,
    unsupportedFormat: (f) => `Unsupported build format: ${f}`,
    storyTitleRequired: "A story title is required",
    storyDirExists: (root) => `${root} already exists. Use --force to overwrite starter files.`,
    entityNameRequired: (kind) => `A ${kind} name is required`,
    entityAlreadyExists: (file) => `${file} already exists`,
    entityNotFound: (kind, id) => `${kind} ${id} does not exist`,
    entityIdNotKebab: (label) => `${label} must be a kebab-case id`,
    symlinkRefused: (target) => `Refusing to use symlinked project directory: ${target}`,
    projectNotDir: (target) => `Project path is not a directory: ${target}`,
    projectOutsideRoot: (target) => `Refusing to use project directory outside root: ${target}`,
    pathOutsideRoot: (filePath) => `Refusing to access project path outside root: ${filePath}`,
    pathOutsideProjectRoot: (target) => `Refusing to access path outside project root: ${target}`,
    writeSymlinkRefused: (filePath) => `Refusing to write through symlink: ${filePath}`,
    importSourceNotFound: (source) => `Import source not found: ${source}`,
    noImportContent: "No chapter content found in import source",
    noImportFiles: (source) => `No markdown or text files found in ${source}`,
    frontmatterMissing: (filePath) => `${filePath} is missing YAML frontmatter`,
    frontmatterReplaceMissing: "Cannot replace missing YAML frontmatter",
    frontmatterBadLine: (line) => `Unsupported frontmatter line: ${line}`,
    securitySymlink: (entry) => `Refusing to follow symbolic link: ${entry}. Story Skills does not traverse symlinks inside a project to avoid reading files outside the project root.`,
    securityEscape: (target, root) => `Refusing path traversal: ${target} escapes project root ${root}.`,
  },
  zh: {
    helpUsage: "用法：story <命令> [选项]",
    candidatesHeader: "实体候选（确认后用 story add 创建）：",
    alreadyCurrent: "项目已是当前 schema",
    reindexCurrent: "注册表已是最新",
    valid: "项目有效",
    validFail: "项目校验失败",
    linksValid: "链接有效",
    linksFail: "链接检查失败",
    continuityValid: "连续性一致",
    continuityFail: "连续性检查失败",
    missingSource: "必须提供导入源文件或目录",
    missingProjectName: "init 必须提供项目标题",
    needsEntityIdAndName: "rename 必须提供实体 id 和新名字",
    needsEntityId: "remove 必须提供实体 id",
    optionDashNote: "选项值若以 - 开头，必须写成 --选项=值 的形式。",
    noChaptersExport: "没有可导出的章节",
    created: (kind, id, file) => `已创建 ${kind} ${id}：${file}`,
    renamed: (kind, oldId, id, file) => `已重命名 ${kind} ${oldId} → ${id}：${file}`,
    removed: (kind, id, file) => `已删除 ${kind} ${id}：${file}`,
    imported: (chapters, root) => `已导入 ${chapters} 个章节到 ${root}`,
    importedWithCount: (chapters, words, root) => `已导入 ${chapters} 个章节（${words} 字）到 ${root}`,
    candidate: (name, count) => `- ${name}（${count} 次提及）`,
    projectCreated: (root) => `已创建故事项目：${root}`,
    migrated: (n) => `已迁移项目到当前 schema：${n} 处变更`,
    reindexed: (n) => `已更新 ${n} 个注册表`,
    exported: (n, file) => `已导出 ${n} 个章节到 ${file}`,
    built: (n, format, file) => `已构建 ${n} 个章节为 ${format} 到 ${file}`,
    totalWords: (n) => `合计：${n} 字`,
    chapterWords: (file, count) => `${file}：${count} 字`,
    summary: (e, w) => `：${e} 个错误，${w} 个警告`,
    unknownCommand: (cmd) => `未知命令：${cmd}`,
    invalidKind: (kind) => `未知实体类型：${kind}`,
    unsupportedFormat: (f) => `不支持的构建格式：${f}`,
    storyTitleRequired: "请提供故事标题",
    storyDirExists: (root) => `${root} 已存在。用 --force 覆盖 starter 文件。`,
    entityNameRequired: (kind) => `请提供 ${kind} 的名称`,
    entityAlreadyExists: (file) => `${file} 已存在`,
    entityNotFound: (kind, id) => `${kind} ${id} 不存在`,
    entityIdNotKebab: (label) => `${label} 必须是 kebab-case 形式的 id`,
    symlinkRefused: (target) => `拒绝使用符号链接指向的项目目录：${target}`,
    projectNotDir: (target) => `项目路径不是目录：${target}`,
    projectOutsideRoot: (target) => `拒绝在 root 之外使用项目目录：${target}`,
    pathOutsideRoot: (filePath) => `拒绝访问 root 之外的项目路径：${filePath}`,
    pathOutsideProjectRoot: (target) => `拒绝访问项目根目录之外的路径：${target}`,
    writeSymlinkRefused: (filePath) => `拒绝通过符号链接写入：${filePath}`,
    importSourceNotFound: (source) => `找不到导入源：${source}`,
    noImportContent: "导入源里没找到章节正文",
    noImportFiles: (source) => `${source} 里没找到 markdown 或文本文件`,
    frontmatterMissing: (filePath) => `${filePath} 缺少 YAML frontmatter`,
    frontmatterReplaceMissing: "无法替换缺失的 YAML frontmatter",
    frontmatterBadLine: (line) => `不支持的 frontmatter 行：${line}`,
    securitySymlink: (entry) => `拒绝跟随符号链接：${entry}。Story Skills 不会穿越项目里的符号链接，避免读取项目根目录之外的文件。`,
    securityEscape: (target, root) => `拒绝路径穿越：${target} 越过了项目根目录 ${root}。`,
  }
};

// Module-level currentLang used by deep helpers (parseFrontmatter etc).
// CLI calls setLang(lang) before each command; exported entry points also take lang.
let currentLang = "en";

export function setLang(lang) {
  if (lang === "en" || lang === "zh") {
    currentLang = lang;
  }
}

export function getLang() {
  return currentLang;
}

const SUPPORTED = new Set(["en", "zh"]);

export function resolveLang(options, env) {
  const requested = (options && options.lang) || (env && env.STORY_SKILLS_LANG) || "en";
  return SUPPORTED.has(requested) ? requested : "en";
}

export function t(lang, key) {
  const args = Array.prototype.slice.call(arguments, 2);
  const dict = MESSAGES[lang] || MESSAGES.en;
  const template = dict[key] || MESSAGES.en[key];
  if (typeof template !== "function") return template;
  return template.apply(null, args);
}

const HELP_EN = "Usage: story <command> [options]\n\nCommands:\n  init <title>       Scaffold a story project\n  import <source>    Split an existing manuscript into a new story project\n  validate [path]    Check project structure, frontmatter, and registries\n  reindex [path]     Rebuild registry tables from markdown files\n  wordcount [path]   Count chapter prose words\n  links [path]       Check cross-reference targets and backlinks\n  continuity [path]  Check deterministic continuity contracts: deaths,\n                    promises, questions, casts, and durable state\n  report [path]      Summarize project inventory, progress, and checks\n  next [path]        Recommend the next writing and maintenance actions\n  doctor [path]      Show health checks plus actionable repair steps\n  migrate [path]     Upgrade a project to the current schema\n  add <kind> <name>  Create an entity file and reindex registries\n  rename <kind> <id> <name>\n                    Rename an entity and update id references\n  remove <kind> <id>\n                    Remove an entity and scrub id references\n  export [path]      Combine chapters into a manuscript markdown file\n  build [path]       Build a disposable book artifact in dist/\n\nOptions:\n  --title <name>            Story title for import\n  --dir <path>              Target directory for init or import\n  --genre <name>            Story genre for init\n  --sub-genre <name>         Story sub-genre for init\n  --setting-era <name>      Setting era for init\n  --theme <name>            Add a theme for init; repeatable\n  --themes <a,b>            Add comma-separated themes for init\n  --pov <style>             POV style for init\n  --tense <tense>           Narrative tense for init\n  --synopsis <text>         Starter synopsis for init\n  --force                   Allow init to overwrite starter files\n  --write                   Update chapter word-count frontmatter\n  --path <path>             Target story root for add/rename/remove\n  --out <file>              Output path for export/build\n  --format <name>           Output format for build (markdown, epub, docx)\n  --actionable              Include next actions in report\n  --number <n>              Chapter number for add chapter\n  --chapter <id>            Chapter id for add scene or continuity records\n  --scene <n>               Scene number for add scene\n  --type <name>             Entity type for add\n  --role <name>             Character role for add character\n  --status <name>           Entity status for add\n  --location <id>           Location reference for add\n  --character <id>          Character reference for add; repeatable\n  --member <id>             Faction member reference for add faction; repeatable\n  --owner <id>              Owner reference for add artifact\n  --arc <id>                Arc reference for add; repeatable\n  --introduced <id>         Chapter id for add question\n  --resolved <id>           Chapter id for add question\n  --planted <id>            Chapter id for add promise\n  --payoff <id>             Chapter id for add promise\n  --category <name>         Category for add term\n  --alias <name>            Alias for add term; repeatable\n  -h, --help                Show this help\n  --lang <en|zh>            Output language (default: en; override with STORY_SKILLS_LANG)\n\nOption values that begin with a dash must use the --option=value form.";

const HELP_ZH = "用法：story <命令> [选项]\n\n命令：\n  init <标题>          新建一个故事项目（生成完整骨架）\n  import <源>          拆分已有稿件到新的故事项目\n  validate [路径]      检查项目结构 / frontmatter / 注册表\n  reindex [路径]       重建所有 _index.md 注册表\n  wordcount [路径/     统计章节正文字数\n  links [路径/         检查交叉引用与反向链接\n  continuity [路径/    确定性的连续性检查：生死 / 伏笔 / 悬念 / 出场 / 状态\n  report [路径/        汇总项目清单 / 进度 / 检查结果\n  next [路径/          推荐下一步创作与维护动作\n  doctor [路径/        健康检查 + 优先级化的修复步骤\n  migrate [路径/       把旧 schema 升级到当前版本\n  add <kind> <名字>    新建实体文件并重建索引\n  rename <kind> <id> <名字>\n                      重命名实体并更新 id 引用\n  remove <kind> <id>   删除实体并清理 id 引用\n  export [路径/        把章节合并成一个稿件 markdown\n  build [路径/         在 dist/ 下构建一次性的书稿产物\n\n选项：\n  --title <名字>       import 用的故事标题\n  --dir <路径>         init / import 的输出目录\n  --genre <类型>       init 用的故事类型\n  --sub-genre <子类型> init 用的故事子类型\n  --setting-era <时代> init 用的时代背景\n  --theme <主题>       init 加一个主题；可重复\n  --themes <a,b>       init 加逗号分隔的多个主题\n  --pov <视角>         init 用的 POV 视角\n  --tense <时态>       init 用的叙事时态\n  --synopsis <简介>    init 用的起始梗概\n  --force              init 允许覆盖 starter 文件\n  --write              wordcount 把数字写回章节 frontmatter\n  --path <路径>        add/rename/remove 的目标项目根\n  --out <文件>         export/build 的输出路径\n  --format <名字>      build 的输出格式（markdown / epub / docx）\n  --actionable         report 末尾追加下一步动作\n  --number <n>         add chapter 的章节号\n  --chapter <id>       add scene 或连续性记录的章节 id\n  --scene <n>          add scene 的场景序号\n  --type <名字>        add 的实体类型\n  --role <角色>        add character 的角色定位\n  --status <状态>      add 的实体状态\n  --location <id>      add 的地点引用\n  --character <id>     add 的角色引用；可重复\n  --member <id>        add faction 的成员引用；可重复\n  --owner <id>         add artifact 的持有者引用\n  --arc <id>           add 的弧引用；可重复\n  --introduced <id>    add question 的提出章节\n  --resolved <id>      add question 的解答章节\n  --planted <id>       add promise 的埋设章节\n  --payoff <id>        add promise 的兑现章节\n  --category <类别>    add term 的类别\n  --alias <别名>       add term 的别名；可重复\n  -h, --help           显示此帮助\n  --lang <en|zh>       输出语言（默认 en；用 STORY_SKILLS_LANG 覆盖）\n\n选项值若以 - 开头，必须用 --选项=值 的形式。";

export function getHelp(lang) {
  return lang === "zh" ? HELP_ZH : HELP_EN;
}

// ===== src\security.js =====
// Security and atomic I/O helpers. These are pure additions; they wrap
// existing fs operations without changing their public signatures.
//
// The defaults here err on the safe side: any symlink under the story root
// is rejected, and any path that escapes the project root is rejected.
// Both behaviors are opt-out per call if a future workflow needs them.


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


// ===== src\frontmatter.js =====
const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

export function parseFrontmatter(markdown, filePath = "markdown") {
  const match = FRONTMATTER_PATTERN.exec(markdown);
  if (!match) {
    throw new Error(t(getLang(), "frontmatterMissing", filePath));
  }

  return {
    data: parseYaml(match[1]),
    body: markdown.slice(match[0].length),
    raw: match[1]
  };
}

export function stringifyFrontmatter(data) {
  const lines = ["---"];

  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        lines.push(`${key}: []`);
        continue;
      }

      lines.push(`${key}:`);
      for (const item of value) {
        if (isPlainObject(item)) {
          const entries = Object.entries(item);
          const [firstKey, firstValue] = entries[0];
          lines.push(`  - ${firstKey}: ${formatScalar(firstValue)}`);
          for (const [childKey, childValue] of entries.slice(1)) {
            lines.push(`    ${childKey}: ${formatScalar(childValue)}`);
          }
        } else {
          lines.push(`  - ${formatScalar(item)}`);
        }
      }
    } else {
      lines.push(`${key}: ${formatScalar(value)}`);
    }
  }

  lines.push("---", "", "");
  return lines.join("\n");
}

export function replaceFrontmatter(markdown, data) {
  const match = FRONTMATTER_PATTERN.exec(markdown);
  if (!match) {
    throw new Error(t(getLang(), "frontmatterReplaceMissing"));
  }

  return `${stringifyFrontmatter(data)}${markdown.slice(match[0].length)}`;
}

function parseYaml(source) {
  const lines = source.split(/\r?\n/);
  const data = {};

  for (let index = 0; index < lines.length;) {
    const line = lines[index];
    if (!line.trim() || line.trimStart().startsWith("#")) {
      index += 1;
      continue;
    }

    const pair = /^([A-Za-z0-9_-]+):(?:\s*(.*))?$/.exec(line);
    if (!pair) {
      throw new Error(t(getLang(), "frontmatterBadLine", line));
    }

    const [, key, rest = ""] = pair;
    if (rest !== "") {
      data[key] = parseScalar(rest);
      index += 1;
      continue;
    }

    const parsed = parseArray(lines, index + 1);
    if (parsed.nextIndex === index + 1) {
      data[key] = "";
      index += 1;
      continue;
    }

    data[key] = parsed.items;
    index = parsed.nextIndex;
  }

  return data;
}

function parseArray(lines, startIndex) {
  const items = [];
  let index = startIndex;

  while (index < lines.length) {
    const itemMatch = /^  -(?:\s+(.*))?$/.exec(lines[index]);
    if (!itemMatch) {
      break;
    }

    const itemText = itemMatch[1] ?? "";
    const objectMatch = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(itemText);
    if (!objectMatch) {
      items.push(parseScalar(itemText));
      index += 1;
      continue;
    }

    const item = {
      [objectMatch[1]]: parseScalar(objectMatch[2])
    };
    index += 1;

    while (index < lines.length) {
      const childMatch = /^    ([A-Za-z0-9_-]+):\s*(.*)$/.exec(lines[index]);
      if (!childMatch) {
        break;
      }

      item[childMatch[1]] = parseScalar(childMatch[2]);
      index += 1;
    }

    items.push(item);
  }

  return { items, nextIndex: index };
}

function parseScalar(value) {
  const trimmed = value.trim();

  if (trimmed === "[]") {
    return [];
  }

  if (/^-?\d+$/.test(trimmed)) {
    return Number.parseInt(trimmed, 10);
  }

  if (/^-?\d+\.\d+$/.test(trimmed)) {
    return Number.parseFloat(trimmed);
  }

  if (trimmed.length >= 2 && trimmed.startsWith('"') && trimmed.endsWith('"')) {
    // formatScalar writes JSON strings, so unescape them; hand-written values
    // that are not valid JSON keep the historical quote-stripping behavior.
    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed.slice(1, -1);
    }
  }

  if (trimmed.length >= 2 && trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function formatScalar(value) {
  if (typeof value === "number") {
    return String(value);
  }

  if (value === null || value === undefined) {
    return "";
  }

  const text = String(value);
  if (text === "" || text === "[]" || /^-?\d+(\.\d+)?$/.test(text) || /^\s|\s$/.test(text) || /[:#\n"']/.test(text)) {
    return JSON.stringify(text);
  }

  return text;
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}


// ===== src\markdown.js =====
export function kebabCase(value) {
  const cleaned = String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u2018\u2019]/g, "");

  if (/[\u3400-\u9fff\uf900-\ufaff]/.test(cleaned)) {
    let allMapped = true;
    const transliterated = cleaned
      .split("")
      .map((char) => {
        if (/[A-Za-z0-9]/.test(char)) {
          return char.toLowerCase();
        }
        if (/[\u3400-\u9fff\uf900-\ufaff]/.test(char)) {
          const pinyin = cjkToPinyin(char);
          if (pinyin) {
            return pinyin;
          }
          allMapped = false;
        }
        return "";
      })
      .join("");
    if (allMapped) {
      const ascii = transliterated.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      if (ascii) {
        return ascii;
      }
    }
    return cjkFallback(cleaned);
  }

  return cleaned
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const CJK_PINYIN_INITIALS = {
  "\u738b": "wang", "\u674e": "li", "\u5f20": "zhang", "\u5218": "liu",
  "\u9648": "chen", "\u6768": "yang", "\u9ec4": "huang", "\u8d75": "zhao",
  "\u5434": "wu", "\u5468": "zhou", "\u5d2e": "xi", "\u6d2e": "kun",
  "\u6c64": "tang", "\u5e7f": "guang", "\u4f55": "he", "\u5b5d": "xiao",
  "\u6797": "lin", "\u66fe": "zeng", "\u4ec0": "shi", "\u4e07": "wan",
  "\u82cf": "su", "\u6731": "zhu", "\u9093": "deng", "\u8c46": "dou",
  "\u51af": "feng", "\u66f9": "cao", "\u5236": "zhi", "\u8d3a": "he",
  "\u5b9d": "bao", "\u91d1": "jin", "\u77f3": "shi", "\u7389": "yu",
  "\u83b9": "qi", "\u7ae0": "zhang", "\u4e91": "yun", "\u96e8": "yu",
  "\u98ce": "feng", "\u706b": "huo", "\u6c34": "shui", "\u6708": "yue",
  "\u661f": "xing", "\u6d77": "hai", "\u5c71": "shan", "\u6cb3": "he",
  "\u6e56": "hu", "\u6f6e": "chao", "\u6c5f": "jiang", "\u53bf": "xian",
  "\u9547": "zhen", "\u6751": "cun", "\u57ce": "cheng", "\u5e02": "shi",
  "\u5b66": "xue", "\u53cb": "you", "\u7236": "fu", "\u6bcd": "mu",
  "\u5144": "xiong", "\u5f1f": "di", "\u59d1": "gu", "\u59e8": "yi",
  "\u7237": "ye", "\u5974": "nu", "\u5a07": "jiao", "\u6028": "yuan",
  "\u751f": "sheng", "\u8001": "lao", "\u5e74": "nian",
  "\u65f6": "shi", "\u591c": "ye", "\u68a6": "meng", "\u9b42": "hun",
  "\u5fc3": "xin", "\u7075": "ling", "\u6c14": "qi", "\u529b": "li",
  "\u6f5c": "qian", "\u8857": "jie", "\u9053": "dao", "\u8def": "lu",
  "\u95e8": "men", "\u623f": "fang", "\u4f4f": "zhu", "\u5e9c": "fu",
  "\u5b9e": "shi", "\u865a": "xu", "\u9690": "yin", "\u9ed1": "hei",
  "\u767d": "bai", "\u7ea2": "hong", "\u84dd": "lan", "\u7eff": "lv",
  "\u9521": "xi", "\u94f6": "yin", "\u94dc": "tong",
  "\u94c1": "tie", "\u6728": "mu", "\u690d": "zhi", "\u82b1": "hua",
  "\u8349": "cao", "\u6811": "shu", "\u679c": "guo", "\u83b2": "lian",
  "\u67ab": "feng", "\u96ea": "xue", "\u971c": "shuang",
  "\u5929": "tian", "\u5730": "di", "\u5b87": "yu", "\u5b99": "zhou",
  "\u65e7": "jiu", "\u65b0": "xin", "\u53e4": "gu", "\u4eca": "jin",
  "\u672a": "wei", "\u5df2": "yi", "\u4e0a": "shang",
  "\u4e0b": "xia", "\u5de6": "zuo", "\u53f3": "you", "\u524d": "qian",
  "\u540e": "hou", "\u91cc": "li", "\u5916": "wai", "\u5185": "nei",
  "\u4e2d": "zhong", "\u5927": "da", "\u5c0f": "xiao", "\u591a": "duo",
  "\u5c11": "shao", "\u597d": "hao", "\u6076": "e", "\u7f8e": "mei",
  "\u4e11": "chou", "\u7231": "ai", "\u6068": "hen", "\u601d": "si",
  "\u5fd8": "wang", "\u8bb0": "ji", "\u540d": "ming", "\u5b57": "zi",
  "\u8a00": "yan", "\u8bed": "yu", "\u8bf4": "shuo", "\u8b66": "jing",
  "\u6d88": "xiao", "\u606f": "xi", "\u4f20": "chuan", "\u95f4": "jian",
  "\u82e5": "ruo"
};

function cjkToPinyin(char) {
  if (Object.prototype.hasOwnProperty.call(CJK_PINYIN_INITIALS, char)) {
    return CJK_PINYIN_INITIALS[char];
  }
  return "";
}

function cjkFallback(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return `cjk-${hash.toString(16).padStart(8, "0")}`;
}

export function titleCaseSlug(slug) {
  return String(slug)
    .split("-")
    .filter(Boolean)
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

export function wordCount(markdown) {
  const normalized = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/\[[^\]]+\]\([^)]+\)/g, " ")
    .replace(/[#>*_~|:-]/g, " ");

  // CJK languages do not have word boundaries. Insert spaces around each
  // Han, Hiragana, Katakana, and Hangul character so the whitespace-split
  // tokenization below treats each character as its own word. Latin words
  // are split on whitespace as before.
  const split = normalized.replace(
    /[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/g,
    " $& "
  );
  const tokens = split.split(/\s+/).filter((t) => /[\p{L}\p{N}]/u.test(t));
  return tokens.length;
}

export function chapterProse(markdownBody) {
  const chapterTextMatch = /^## Chapter Text\s*$/im.exec(markdownBody);
  if (chapterTextMatch) {
    return markdownBody.slice(chapterTextMatch.index + chapterTextMatch[0].length);
  }

  const outlineMatch = /^## Outline\s*$/im.exec(markdownBody);
  if (!outlineMatch) {
    return stripLeadingH1(markdownBody);
  }

  const afterOutline = markdownBody.slice(outlineMatch.index + outlineMatch[0].length);
  const dividerMatch = /^\s*---\s*$/m.exec(afterOutline);
  return dividerMatch ? afterOutline.slice(dividerMatch.index + dividerMatch[0].length) : afterOutline;
}

export function extractSection(markdown, heading) {
  const escaped = escapeRegExp(heading);
  const pattern = new RegExp(`^## ${escaped}\\s*$`, "im");
  const match = pattern.exec(markdown);
  if (!match) {
    return "";
  }

  const start = match.index + match[0].length;
  const rest = markdown.slice(start);
  const next = /^##\s+/m.exec(rest);
  return (next ? rest.slice(0, next.index) : rest).trim();
}

export function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripLeadingH1(markdownBody) {
  const match = /^(?:[ \t]*\r?\n)*[ \t]{0,3}#(?!#)[ \t]+[^\r\n]*(?:\r?\n|$)/.exec(markdownBody);
  return match ? markdownBody.slice(match[0].length) : markdownBody;
}


// ===== src\diagnostics.js =====
// diagnostics.js - 诊断消息字典（从 i18n.js 拆出）
// Regenerate by editing build-diag.js

const DIAGNOSTICS = {
  en: {
    diagMissingPath: (path) => `Missing required path: ${path}`,
    diagMissingFrontmatterField: (file, field) => `${file} is missing frontmatter field ${field}`,
    diagFilenameNotKebab: (file) => `${file} filename id must be kebab-case`,
    diagBadEnumValue: (file, field, value) => `${file} frontmatter field ${field} has unsupported value ${value}`,
        diagMustBeInteger: (file, field) => `${file} frontmatter field ${field} must be an integer`,
    diagFieldRelationshipsMustBeList: (file) => `${file} frontmatter field relationships must be a list`,
    diagFieldRelationshipsMustBeObjects: (file) => `${file} frontmatter field relationships must contain objects`,
    diagMustBeMapping: (entry) => `${entry} must be a mapping`,
diagMustBeScalar: (file, field) => `${file} frontmatter field ${field} must be a scalar`,
    diagMustBeList: (file, field) => `${file} frontmatter field ${field} must be a list`,
    diagListItemNotString: (file, field) => `${file} frontmatter field ${field} must contain only non-empty strings`,
    diagListItemNotObject: (file, field) => `${file} frontmatter field ${field} must contain objects`,
    diagRelationshipMissingCharacter: (file) => `${file} relationship is missing character`,
    diagRelationshipBadKebab: (file, character) => `${file} relationship character ${character} must be kebab-case`,
    diagRelationshipMissingType: (file, character) => `${file} relationship to ${character} is missing type`,
    diagFrontmatterFieldMissing: (file, field) => `${file} is missing frontmatter field ${field}`,
    diagAlreadyExists: (file) => `${file} already exists`,
    diagDoesNotExist: (file) => `${file} does not exist`,
    diagMissingChapter: (file, id) => `${file} references missing chapter ${id}`,
    diagMissingCharacter: (file, id) => `${file} references missing character ${id}`,
    diagMissingLocation: (file, id) => `${file} references missing location ${id}`,
    diagMissingArtifact: (file, id) => `${file} references missing artifact ${id}`,
    diagMissingArc: (file, id) => `${file} references missing arc ${id}`,
    diagMissingOwner: (file, id) => `${file} references missing owner ${id}`,
    diagMissingKnowledgeKnows: (file) => `${file} is missing knows`,
    diagObjectStateStatusMismatch: (entry, obj, artStatus) => `${entry} status ${obj} conflicts with ${artStatus} status ${artStatus}`,
    diagMissingRequiredPath: (path) => `Missing required path: ${path}`,
    diagDeathStatusMismatch: (file, diedIn, status) => `${file} has died-in ${diedIn} but status ${status}; set status: deceased`,
    diagDiedInMissingChapter: (file, diedIn) => `${file} died-in references missing chapter ${diedIn}`,
    diagPosthumousAppearance: (file, char, diedIn) => `${file} lists ${char}, who died in ${diedIn}; move posthumous appearances to mentions`,
    diagPovNotInCharacters: (file, pov) => `${file} POV character ${pov} is not listed in characters`,
    diagSceneCharacterNotInChapter: (file, scene, character, chapter) => `${scene} lists ${character} but ${chapter} does not list them in characters or mentions`,
    diagSceneLocationNotInChapter: (file, scene, location, chapter) => `${scene} is set in ${location} but ${chapter} does not list that location`,
    diagChapterSkip: (from, to) => `Chapter numbering skips from ${from} to ${to}`,
    diagPromiseOrder: (file, payoff, planted) => `${file} pays off in ${payoff} before it is planted in ${planted}`,
    diagPromisePaidOffNoPayoff: (file) => `${file} is paid-off but has no payoff chapter`,
    diagPromisePlantedMissing: (file) => `${file} is planted but has no planted chapter`,
    diagPromiseChekhov: (file, ch, n) => `${file} was planted in ${ch}, ${n} chapters ago, and has no payoff yet`,
    diagQuestionOrder: (file, resolved, introduced) => `${file} resolves in ${resolved} before it is introduced in ${introduced}`,
    diagQuestionStatusMissingResolved: (file, status) => `${file} is ${status} but has no resolved chapter`,
    diagQuestionStatusStillOpen: (file, resolved) => `${file} records resolved chapter ${resolved} but status is still open`,
    diagStoryCompletePromiseStillOpen: (file, status) => `story.md is complete but ${file} is still ${status}`,
    diagStoryCompleteQuestionStillOpen: (file) => `story.md is complete but ${file} is still open`,
    diagCurrentChapterAhead: (label, current, latest) => `${label} current-chapter ${current} is ahead of the latest chapter ${latest}`,
    diagCurrentChapterBehind: (label, current, latest) => `${label} current-chapter ${current} is behind the latest chapter ${latest}; update continuity state after drafting`,
    diagBacklinkMissing: (file, target) => `${file} relationship to ${target} is missing backlink; update both files when changing relationships`,
    diagRelationshipTypeMismatch: (file, target, type) => `${file} relationship ${type} to ${target} has no inverse in the linked file`,
    diagNotableCharacterMissingLocation: (file, charId) => `${file} notable character ${charId} is missing this location in locations list`,
    diagCharacterMissingLocation: (file, locId) => `${file} is missing this location in locations list`,
    diagLocationMissingNotableCharacters: (file, locId) => `${file} location ${locId} is missing this character in notable-characters list`,
    diagFactionMissingMember: (file, memId) => `${file} is missing this member in its character file`,
    diagArtifactMissingOwner: (file, ownerId) => `${file} is missing this owner in its character file`,
    diagChapterMissingPov: (file, povId) => `${file} references missing POV character ${povId}`,
    diagChapterMissingCharacter: (file, charId) => `${file} references missing character ${charId}`,
    diagChapterMissingLocation: (file, locId) => `${file} references missing location ${locId}`,
    diagChapterMissingArc: (file, arcId) => `${file} references missing arc ${arcId}`,
    diagSceneMissingChapter: (file, chId) => `${file} references missing chapter ${chId}`,
    diagSceneMissingPov: (file, povId) => `${file} references missing POV character ${povId}`,
    diagSceneMissingLocation: (file, locId) => `${file} references missing location ${locId}`,
    diagSceneMissingCharacter: (file, charId) => `${file} references missing character ${charId}`,
    diagSceneMissingArc: (file, arcId) => `${file} references missing arc ${arcId}`,
    diagQuestionMissingChapter: (file, chId) => `${file} references missing chapter ${chId}`,
    diagQuestionMissingCharacter: (file, charId) => `${file} references missing character ${charId}`,
    diagPromiseMissingChapter: (file, chId) => `${file} references missing chapter ${chId}`,
    diagPromiseMissingArc: (file, arcId) => `${file} references missing arc ${arcId}`,
    diagPromiseMissingCharacter: (file, charId) => `${file} references missing character ${charId}`,
    diagRegistryLinkMissing: (indexPath, link) => `${indexPath} is missing registry link ${link}`,
    diagChapterFilenameMismatch: (label) => `${label} filename must match chapter-{NN}.md`,
    diagChapterNumberMismatch: (label, fileNum) => `${label} number must match filename chapter number ${fileNum}`,
    diagChapterNumberMustBePositive: (label) => `${label} number must be greater than 0`,
    diagChapterDuplicate: (label, num, existing) => `${label} duplicates chapter number ${num} from ${existing}`,
    diagSceneNumberMustBePositive: (label) => `${label} scene must be greater than 0`,
    diagSchemaVersionMustBe: (v) => `story.md schema-version must be ${v}`,
    diagRegistryTypeMustBe: (label, expected) => `${label} type must be ${expected}`,
    diagStoryIdMustMatch: (label, expected) => `${label} story must be ${expected}`,
    diagChapterWordCountMismatch: (file, declared) => `${file} declares ${declared} words but the actual prose word count differs`,
    diagChapterMissingSceneRecord: (file) => `${file} has no machine-readable scene record; create a matching scenes/chapter-NN-scene-NN.md so continuity can read cast and state changes`,
  },
  zh: {
    diagMissingPath: (path) => `缺少必需路径：${path}`,
    diagMissingFrontmatterField: (file, field) => `${file} 缺少 frontmatter 字段：${field}`,
    diagFilenameNotKebab: (file) => `${file} 文件名 id 必须是 kebab-case`,
    diagBadEnumValue: (file, field, value) => `${file} 的 frontmatter 字段 ${field} 取了不支持的值：${value}`,
        diagMustBeInteger: (file, field) => `${file} 的 frontmatter 字段 ${field} 必须是整数`,
    diagFieldRelationshipsMustBeList: (file) => `${file} 的 frontmatter 字段 relationships 必须是列表`,
    diagFieldRelationshipsMustBeObjects: (file) => `${file} 的 frontmatter 字段 relationships 必须包含对象`,
    diagMustBeMapping: (entry) => `${entry} 必须是映射（mapping）`,
diagMustBeScalar: (file, field) => `${file} 的 frontmatter 字段 ${field} 必须是标量`,
    diagMustBeList: (file, field) => `${file} 的 frontmatter 字段 ${field} 必须是列表`,
    diagListItemNotString: (file, field) => `${file} 的 frontmatter 字段 ${field} 只能包含非空字符串`,
    diagListItemNotObject: (file, field) => `${file} 的 frontmatter 字段 ${field} 必须包含对象`,
    diagRelationshipMissingCharacter: (file) => `${file} 的一条关系缺少 character`,
    diagRelationshipBadKebab: (file, character) => `${file} 的关系 character ${character} 必须是 kebab-case`,
    diagRelationshipMissingType: (file, character) => `${file} 对 ${character} 的关系缺少 type`,
    diagFrontmatterFieldMissing: (file, field) => `${file} 缺少 frontmatter 字段：${field}`,
    diagAlreadyExists: (file) => `${file} 已存在`,
    diagDoesNotExist: (file) => `${file} 不存在`,
    diagMissingChapter: (file, id) => `${file} 引用了不存在的章节：${id}`,
    diagMissingCharacter: (file, id) => `${file} 引用了不存在的角色：${id}`,
    diagMissingLocation: (file, id) => `${file} 引用了不存在的地点：${id}`,
    diagMissingArtifact: (file, id) => `${file} 引用了不存在的道具：${id}`,
    diagMissingArc: (file, id) => `${file} 引用了不存在的弧：${id}`,
    diagMissingOwner: (file, id) => `${file} 引用了不存在的持有者：${id}`,
    diagMissingKnowledgeKnows: (file) => `${file} 缺 knows 字段`,
    diagObjectStateStatusMismatch: (entry, obj, artStatus) => `${entry} 的 status ${obj} 与 ${artStatus} 的 status 冲突`,
    diagMissingRequiredPath: (path) => `缺少必需路径：${path}`,
    diagDeathStatusMismatch: (file, diedIn, status) => `${file} 标了 died-in ${diedIn} 但 status 是 ${status}；请设为 status: deceased`,
    diagDiedInMissingChapter: (file, diedIn) => `${file} 的 died-in 引用了不存在的章节：${diedIn}`,
    diagPosthumousAppearance: (file, char, diedIn) => `${file} 列出了 ${char}，但 ${char} 在 ${diedIn} 已死亡；把死后出场移到 mentions`,
    diagPovNotInCharacters: (file, pov) => `${file} 的 POV 角色 ${pov} 没列在 characters 里`,
    diagSceneCharacterNotInChapter: (file, scene, character, chapter) => `${scene} 列出 ${character}，但 ${chapter} 的 characters / mentions 里都没有`,
    diagSceneLocationNotInChapter: (file, scene, location, chapter) => `${scene} 的场景设在 ${location}，但 ${chapter} 没列出这个地点`,
    diagChapterSkip: (from, to) => `章节编号从 ${from} 跳到 ${to}`,
    diagPromiseOrder: (file, payoff, planted) => `${file} 在 ${payoff} 兑现，却在 ${planted} 之后才埋设`,
    diagPromisePaidOffNoPayoff: (file) => `${file} 已是 paid-off 但没有 payoff 章节`,
    diagPromisePlantedMissing: (file) => `${file} 是 planted 但没有 planted 章节`,
    diagPromiseChekhov: (file, ch, n) => `${file} 在 ${ch} 埋设，${n} 章过去还没 payoff`,
    diagQuestionOrder: (file, resolved, introduced) => `${file} 在 ${resolved} 解答，却在 ${introduced} 之后才提出`,
    diagQuestionStatusMissingResolved: (file, status) => `${file} 状态是 ${status} 但没有 resolved 章节`,
    diagQuestionStatusStillOpen: (file, resolved) => `${file} 记了 resolved 章节 ${resolved} 但状态仍是 open`,
    diagStoryCompletePromiseStillOpen: (file, status) => `story.md 状态是 complete 但 ${file} 还是 ${status}`,
    diagStoryCompleteQuestionStillOpen: (file) => `story.md 状态是 complete 但 ${file} 仍是 open`,
    diagCurrentChapterAhead: (label, current, latest) => `${label} 的 current-chapter ${current} 超出了最新章节 ${latest}`,
    diagCurrentChapterBehind: (label, current, latest) => `${label} 的 current-chapter ${current} 落后于最新章节 ${latest}；写完章节后请同步连续性状态`,
    diagBacklinkMissing: (file, target) => `${file} 对 ${target} 的关系缺反向引用；改关系时要双向更新两边的文件`,
    diagRelationshipTypeMismatch: (file, target, type) => `${file} 对 ${target} 的 ${type} 关系在对方文件里没有对应的反向类型`,
    diagNotableCharacterMissingLocation: (file, charId) => `${file} 的知名角色 ${charId} 没把这个地点加进自己的 locations 列表`,
    diagCharacterMissingLocation: (file, locId) => `${file} 没把这个地点加进自己的 locations 列表`,
    diagLocationMissingNotableCharacters: (file, locId) => `${file} 的地点 ${locId} 没把这个角色加进自己的 notable-characters 列表`,
    diagFactionMissingMember: (file, memId) => `${file} 没把这个成员加进他的角色文件`,
    diagArtifactMissingOwner: (file, ownerId) => `${file} 没把这个持有者加进他的角色文件`,
    diagChapterMissingPov: (file, povId) => `${file} 引用了不存在的 POV 角色 ${povId}`,
    diagChapterMissingCharacter: (file, charId) => `${file} 引用了不存在的角色 ${charId}`,
    diagChapterMissingLocation: (file, locId) => `${file} 引用了不存在的地点 ${locId}`,
    diagChapterMissingArc: (file, arcId) => `${file} 引用了不存在的弧 ${arcId}`,
    diagSceneMissingChapter: (file, chId) => `${file} 引用了不存在的章节 ${chId}`,
    diagSceneMissingPov: (file, povId) => `${file} 引用了不存在的 POV 角色 ${povId}`,
    diagSceneMissingLocation: (file, locId) => `${file} 引用了不存在的地点 ${locId}`,
    diagSceneMissingCharacter: (file, charId) => `${file} 引用了不存在的角色 ${charId}`,
    diagSceneMissingArc: (file, arcId) => `${file} 引用了不存在的弧 ${arcId}`,
    diagQuestionMissingChapter: (file, chId) => `${file} 引用了不存在的章节：${chId}`,
    diagQuestionMissingCharacter: (file, charId) => `${file} 引用了不存在的角色：${charId}`,
    diagPromiseMissingChapter: (file, chId) => `${file} 引用了不存在的章节：${chId}`,
    diagPromiseMissingArc: (file, arcId) => `${file} 引用了不存在的弧：${arcId}`,
    diagPromiseMissingCharacter: (file, charId) => `${file} 引用了不存在的角色：${charId}`,
    diagRegistryLinkMissing: (indexPath, link) => `${indexPath} 缺注册表链接 ${link}`,
    diagChapterFilenameMismatch: (label) => `${label} 文件名必须符合 chapter-{NN}.md 格式`,
    diagChapterNumberMismatch: (label, fileNum) => `${label} 的 number 字段必须和文件名的章节号 ${fileNum} 一致`,
    diagChapterNumberMustBePositive: (label) => `${label} 的 number 必须大于 0`,
    diagChapterDuplicate: (label, num, existing) => `${label} 与 ${existing} 的章节号 ${num} 重复`,
    diagSceneNumberMustBePositive: (label) => `${label} 的 scene 必须大于 0`,
    diagSchemaVersionMustBe: (v) => `story.md 的 schema-version 必须是 ${v}`,
    diagRegistryTypeMustBe: (label, expected) => `${label} 的 type 必须是 ${expected}`,
    diagStoryIdMustMatch: (label, expected) => `${label} 的 story 字段必须是 ${expected}`,
    diagChapterWordCountMismatch: (file, declared) => `${file} 声明 ${declared} 字，但实际正文字数不一致`,
    diagChapterMissingSceneRecord: (file) => `${file} 缺配套的场景记录；建一个 scenes/chapter-NN-scene-NN.md 让连续性检查能读到出场名单和状态变更`,
  }
};

export function td(lang, key) {
  const args = Array.prototype.slice.call(arguments, 2);
  const dict = DIAGNOSTICS[lang] || DIAGNOSTICS.en;
  const template = dict[key];
  if (typeof template !== "function") return template;
  return template.apply(null, args);
}

// ===== src\continuity.js =====
// 重写 continuity.js：所有 push 点走 i18n

const CHEKHOV_CHAPTER_GAP = 3;

export function checkContinuity(project, lang = "en") {
  const errors = [];
  const warnings = [];
  const context = {
    chapterNumbers: new Map(project.chapters.map((chapter) => [chapter.id, chapter.number])),
    characters: new Map(project.characters.map((character) => [character.id, character])),
    locations: new Set(project.locations.map((location) => location.id)),
    artifacts: new Map(project.artifacts.map((artifact) => [artifact.id, artifact])),
    factions: new Set(project.factions.map((faction) => faction.id)),
    latestChapter: project.chapters.reduce((max, chapter) => Math.max(max, chapter.number), 0)
  };

  checkCharacterDeaths(project, context, errors, warnings, lang);
  checkChapterCasts(project, warnings, lang);
  checkSceneCasts(project, warnings, lang);
  checkChapterSequence(project, warnings, lang);
  checkPromises(project, context, errors, warnings, lang);
  checkQuestions(project, context, errors, lang);
  checkStoryCompletion(project, errors, lang);
  checkContinuityState(project, context, errors, warnings, lang);

  return { ok: errors.length === 0, errors, warnings };
}

function checkCharacterDeaths(project, context, errors, warnings, lang) {
  for (const character of project.characters) {
    if (!character.diedIn) {
      continue;
    }

    const label = relativeToRoot(project, character.file);
    if (character.status !== "deceased") {
      errors.push(td(lang, "diagDeathStatusMismatch", label, character.diedIn, character.status || "unset"));
    }

    const deathNumber = context.chapterNumbers.get(character.diedIn);
    if (deathNumber === undefined) {
      errors.push(td(lang, "diagDiedInMissingChapter", label, character.diedIn));
      continue;
    }

    for (const chapter of project.chapters) {
      if (chapter.number > deathNumber && castIncludes(chapter, character.id)) {
        errors.push(td(lang, "diagPosthumousAppearance", relativeToRoot(project, chapter.file), character.id, character.diedIn));
      }
    }

    for (const scene of project.scenes) {
      const sceneChapterNumber = context.chapterNumbers.get(scene.chapter);
      if (sceneChapterNumber !== undefined && sceneChapterNumber > deathNumber && castIncludes(scene, character.id)) {
        errors.push(td(lang, "diagPosthumousAppearance", relativeToRoot(project, scene.file), character.id, character.diedIn));
      }
    }
  }
}

function checkChapterCasts(project, warnings, lang) {
  for (const chapter of project.chapters) {
    if (chapter.pov && !chapter.characters.includes(chapter.pov)) {
      warnings.push(td(lang, "diagPovNotInCharacters", relativeToRoot(project, chapter.file), chapter.pov));
    }
  }
}

function checkSceneCasts(project, warnings, lang) {
  const chapters = new Map(project.chapters.map((chapter) => [chapter.id, chapter]));

  for (const scene of project.scenes) {
    const label = relativeToRoot(project, scene.file);
    if (scene.pov && !scene.characters.includes(scene.pov)) {
      warnings.push(td(lang, "diagPovNotInCharacters", label, scene.pov));
    }

    const chapter = chapters.get(scene.chapter);
    if (!chapter) {
      continue;
    }

    for (const characterId of scene.characters) {
      if (!chapter.characters.includes(characterId) && !chapter.mentions.includes(characterId)) {
        warnings.push(td(lang, "diagSceneCharacterNotInChapter", label, label, characterId, relativeToRoot(project, chapter.file)));
      }
    }

    if (scene.location && chapter.locations.length > 0 && !chapter.locations.includes(scene.location)) {
      warnings.push(td(lang, "diagSceneLocationNotInChapter", label, label, scene.location, relativeToRoot(project, chapter.file)));
    }
  }
}

function checkChapterSequence(project, warnings, lang) {
  const numbers = project.chapters
    .map((chapter) => chapter.number)
    .filter((number) => Number.isInteger(number) && number > 0)
    .sort((left, right) => left - right);

  for (let index = 1; index < numbers.length; index += 1) {
    if (numbers[index] > numbers[index - 1] + 1) {
      warnings.push(td(lang, "diagChapterSkip", numbers[index - 1], numbers[index]));
    }
  }
}

function checkPromises(project, context, errors, warnings, lang) {
  for (const promise of project.promises) {
    const label = relativeToRoot(project, promise.file);
    const plantedNumber = context.chapterNumbers.get(promise.planted);
    const payoffNumber = context.chapterNumbers.get(promise.payoff);

    if (plantedNumber !== undefined && payoffNumber !== undefined && payoffNumber < plantedNumber) {
      errors.push(td(lang, "diagPromiseOrder", label, promise.payoff, promise.planted));
    }

    if (promise.status === "paid-off" && !promise.payoff) {
      errors.push(td(lang, "diagPromisePaidOffNoPayoff", label));
    }

    if (promise.status === "planted" && !promise.planted) {
      errors.push(td(lang, "diagPromisePlantedMissing", label));
    }

    if (promise.status === "planted" && promise.planted && context.latestChapter > 0) {
      const plantedNumberLocal = context.chapterNumbers.get(promise.planted);
      if (plantedNumberLocal !== undefined && context.latestChapter - plantedNumberLocal >= CHEKHOV_CHAPTER_GAP) {
        warnings.push(td(lang, "diagPromiseChekhov", label, promise.planted, context.latestChapter - plantedNumberLocal));
      }
    }
  }
}

function checkQuestions(project, context, errors, lang) {
  for (const question of project.questions) {
    const label = relativeToRoot(project, question.file);
    const introducedNumber = context.chapterNumbers.get(question.introduced);
    const resolvedNumber = context.chapterNumbers.get(question.resolved);

    if (introducedNumber !== undefined && resolvedNumber !== undefined && resolvedNumber < introducedNumber) {
      errors.push(td(lang, "diagQuestionOrder", label, question.resolved, question.introduced));
    }

    if ((question.status === "answered" || question.status === "resolved") && !question.resolved) {
      errors.push(td(lang, "diagQuestionStatusMissingResolved", label, question.status));
    }

    if (question.status === "open" && question.resolved) {
      errors.push(td(lang, "diagQuestionStatusStillOpen", label, question.resolved));
    }
  }
}

function checkStoryCompletion(project, errors, lang) {
  if (project.story.data.status !== "complete") {
    return;
  }

  for (const promise of project.promises) {
    if (promise.status === "planned" || promise.status === "planted") {
      errors.push(td(lang, "diagStoryCompletePromiseStillOpen", relativeToRoot(project, promise.file), promise.status));
    }
  }

  for (const question of project.questions) {
    if (question.status === "open") {
      errors.push(td(lang, "diagStoryCompleteQuestionStillOpen", relativeToRoot(project, question.file)));
    }
  }
}

function checkContinuityState(project, context, errors, warnings, lang) {
  if (!project.continuity) {
    return;
  }

  const label = path.join("continuity", "state.md");
  const data = project.continuity.data;
  const currentChapter = data["current-chapter"];

  if (Number.isInteger(currentChapter)) {
    if (currentChapter > context.latestChapter) {
      errors.push(td(lang, "diagCurrentChapterAhead", label, currentChapter, context.latestChapter));
    } else if (currentChapter < context.latestChapter) {
      warnings.push(td(lang, "diagCurrentChapterBehind", label, currentChapter, context.latestChapter));
    }
  }

  for (const [index, entry] of stateEntries(data["character-state"]).entries()) {
    const entryLabel = `${label} character-state[${index}]`;
    if (!requireMapping(entry, entryLabel, errors, lang)) {
      continue;
    }
    if (!entry.character || !context.characters.has(entry.character)) {
      errors.push(td(lang, "diagMissingCharacter", entryLabel, entry.character || "(unset)"));
    }
    if (entry.location && !context.locations.has(entry.location)) {
      errors.push(td(lang, "diagMissingLocation", entryLabel, entry.location));
    }
  }

  for (const [index, entry] of stateEntries(data["knowledge-state"]).entries()) {
    const entryLabel = `${label} knowledge-state[${index}]`;
    if (!requireMapping(entry, entryLabel, errors, lang)) {
      continue;
    }
    if (!entry.character || !context.characters.has(entry.character)) {
      errors.push(td(lang, "diagMissingCharacter", entryLabel, entry.character || "(unset)"));
    }
    if (!entry.knows) {
      errors.push(td(lang, "diagMissingKnowledgeKnows", entryLabel));
    }
    if (entry["learned-in"] && !context.chapterNumbers.has(entry["learned-in"])) {
      errors.push(td(lang, "diagMissingChapter", entryLabel, entry["learned-in"]));
    }
  }

  for (const [index, entry] of stateEntries(data["object-state"]).entries()) {
    const entryLabel = `${label} object-state[${index}]`;
    if (!requireMapping(entry, entryLabel, errors, lang)) {
      continue;
    }
    const artifact = context.artifacts.get(entry.artifact);
    if (!entry.artifact || !artifact) {
      errors.push(td(lang, "diagMissingArtifact", entryLabel, entry.artifact || "(unset)"));
    }
    if (entry.owner && !context.characters.has(entry.owner) && !context.factions.has(entry.owner)) {
      errors.push(td(lang, "diagMissingOwner", entryLabel, entry.owner));
    }
    if (entry.location && !context.locations.has(entry.location)) {
      errors.push(td(lang, "diagMissingLocation", entryLabel, entry.location));
    }
    if (entry.status && artifact && artifact.status && entry.status !== artifact.status) {
      warnings.push(td(lang, "diagObjectStateStatusMismatch", entryLabel, entry.status, relativeToRoot(project, artifact.file)));
    }
  }
}

function castIncludes(record, characterId) {
  return record.pov === characterId || record.characters.includes(characterId);
}

function stateEntries(value) {
  return Array.isArray(value) ? value : [];
}

function requireMapping(entry, entryLabel, errors, lang) {
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
    errors.push(td(lang, "diagMustBeMapping", entryLabel));
    return false;
  }
  return true;
}

function relativeToRoot(project, file) {
  return path.relative(project.root, file);
}


// ===== src\story.js =====

export const STORY_SCHEMA_VERSION = 2;
// currentLang lives in i18n.js so all modules share it. Re-export for compatibility.


const REQUIRED_PATHS = [
  "story.md",
  "characters/_index.md",
  "worldbuilding/_index.md",
  "worldbuilding/locations",
  "worldbuilding/systems",
  "worldbuilding/factions",
  "worldbuilding/artifacts",
  "plot/_index.md",
  "plot/arcs",
  "plot/timeline.md",
  "chapters/_index.md",
  "scenes/_index.md",
  "continuity/state.md",
  "continuity/questions/_index.md",
  "continuity/questions",
  "continuity/promises/_index.md",
  "continuity/promises",
  "glossary/_index.md",
  "glossary/terms"
];

const INDEX_SCHEMAS = [
  [path.join("characters", "_index.md"), "character-registry"],
  [path.join("worldbuilding", "_index.md"), "world-registry"],
  [path.join("plot", "_index.md"), "plot-registry"],
  [path.join("plot", "timeline.md"), "timeline"],
  [path.join("chapters", "_index.md"), "chapter-registry"],
  [path.join("scenes", "_index.md"), "scene-registry"],
  [path.join("continuity", "questions", "_index.md"), "question-registry"],
  [path.join("continuity", "promises", "_index.md"), "promise-registry"],
  [path.join("glossary", "_index.md"), "glossary-registry"]
];

const STORY_STATUSES = new Set(["planning", "drafting", "in-progress", "revising", "complete", "abandoned"]);
const STORY_TENSES = new Set(["past", "present", "future", "mixed"]);
const CHARACTER_ROLES = new Set(["protagonist", "antagonist", "supporting", "minor", "narrator", "deuteragonist"]);
const CHARACTER_STATUSES = new Set(["alive", "deceased", "unknown", "missing"]);
const ARC_TYPES = new Set(["main", "subplot", "character", "thematic"]);
const ARC_STATUSES = new Set(["planned", "in-progress", "resolved"]);
const CHAPTER_STATUSES = new Set(["outline", "draft", "revised", "final", "complete"]);
const SCENE_STATUSES = new Set(["outline", "draft", "revised", "final", "complete"]);
const FACTION_TYPES = new Set(["family", "guild", "government", "military", "religion", "company", "community", "criminal", "other"]);
const FACTION_STATUSES = new Set(["active", "hidden", "declining", "defeated", "disbanded", "unknown"]);
const ARTIFACT_TYPES = new Set(["object", "weapon", "document", "technology", "relic", "symbol", "resource", "other"]);
const ARTIFACT_STATUSES = new Set(["active", "lost", "destroyed", "hidden", "transferred", "unknown"]);
const QUESTION_STATUSES = new Set(["open", "answered", "resolved", "dropped"]);
const PROMISE_STATUSES = new Set(["planned", "planted", "paid-off", "dropped"]);
const TERM_CATEGORIES = new Set(["person", "place", "faction", "artifact", "concept", "term", "other"]);

const RELATIONSHIP_INVERSES = new Map([
  ["parent", "child"],
  ["child", "parent"],
  ["grandparent", "grandchild"],
  ["grandchild", "grandparent"],
  ["uncle", "nephew"],
  ["aunt", "niece"],
  ["nephew", "uncle"],
  ["niece", "aunt"],
  ["mentor", "student"],
  ["student", "mentor"],
  ["employer", "subordinate"],
  ["subordinate", "employer"]
]);

const SYMMETRIC_RELATIONSHIPS = new Set([
  "sibling",
  "spouse",
  "partner",
  "friend",
  "ally",
  "rival",
  "enemy",
  "cousin",
  "colleague",
  "foil",
  "confidant",
  "love-interest"
]);

export function createStoryProject(options, lang = "en") {
  const title = String(options.title ?? "").trim();
  if (!title) {
    throw new Error(t(lang, "storyTitleRequired"));
  }

  const storyId = kebabCase(title);
  const root = path.resolve(options.cwd ?? process.cwd(), options.dir ?? storyId);
  if (fs.existsSync(root) && !options.force) {
    throw new Error(t(lang, "storyDirExists", root));
  }

  const themes = normalizeList(options.themes, ["change"]);
  fs.mkdirSync(path.join(root, "characters"), { recursive: true });
  fs.mkdirSync(path.join(root, "worldbuilding", "locations"), { recursive: true });
  fs.mkdirSync(path.join(root, "worldbuilding", "systems"), { recursive: true });
  fs.mkdirSync(path.join(root, "worldbuilding", "factions"), { recursive: true });
  fs.mkdirSync(path.join(root, "worldbuilding", "artifacts"), { recursive: true });
  fs.mkdirSync(path.join(root, "plot", "arcs"), { recursive: true });
  fs.mkdirSync(path.join(root, "chapters"), { recursive: true });
  fs.mkdirSync(path.join(root, "scenes"), { recursive: true });
  fs.mkdirSync(path.join(root, "continuity", "questions"), { recursive: true });
  fs.mkdirSync(path.join(root, "continuity", "promises"), { recursive: true });
  fs.mkdirSync(path.join(root, "glossary", "terms"), { recursive: true });

  writeFile(path.join(root, "story.md"), storyBible({
    title,
    storyId,
    genre: options.genre ?? "fiction",
    subGenre: options.subGenre ?? "general",
    settingEra: options.settingEra ?? "unspecified",
    themes,
    pov: options.pov ?? "third-person-limited",
    tense: options.tense ?? "past",
    synopsis: options.synopsis ?? "Add a 2-3 sentence synopsis here."
  }), { root });
  writeFile(path.join(root, "characters", "_index.md"), characterIndex(storyId, [], "", ""), { root });
  writeFile(path.join(root, "worldbuilding", "_index.md"), worldIndex(storyId, [], [], [], [], ""), { root });
  writeFile(path.join(root, "plot", "_index.md"), plotIndex(storyId, "three-act", [], "", ""), { root });
  writeFile(path.join(root, "plot", "timeline.md"), timeline(storyId), { root });
  writeFile(path.join(root, "chapters", "_index.md"), chapterIndex(storyId, []), { root });
  writeFile(path.join(root, "scenes", "_index.md"), sceneIndex(storyId, []), { root });
  writeFile(path.join(root, "continuity", "state.md"), continuityState(storyId), { root });
  writeFile(path.join(root, "continuity", "questions", "_index.md"), questionIndex(storyId, []), { root });
  writeFile(path.join(root, "continuity", "promises", "_index.md"), promiseIndex(storyId, []), { root });
  writeFile(path.join(root, "glossary", "_index.md"), glossaryIndex(storyId, []), { root });

  return { root, storyId, files: REQUIRED_PATHS.filter((entry) => entry.endsWith(".md")) };
}

export function scanProject(root) {
  const projectRoot = path.resolve(root);
  const story = readMarkdown(path.join(projectRoot, "story.md"), projectRoot);
  const storyId = kebabCase(story.data.title ?? path.basename(projectRoot));

  return {
    root: projectRoot,
    story,
    storyId,
    characters: readEntityFiles(projectRoot, "characters", (id, file, data) => ({
      id,
      file,
      name: data.name ?? titleCaseSlug(id),
      role: data.role ?? "",
      status: data.status ?? "",
      diedIn: data["died-in"] ?? "",
      relationships: asArray(data.relationships),
      locations: asArray(data.locations)
    })),
    locations: readEntityFiles(projectRoot, path.join("worldbuilding", "locations"), (id, file, data) => ({
      id,
      file,
      name: data.name ?? titleCaseSlug(id),
      type: data.type ?? "",
      region: data.region ?? "",
      notableCharacters: asArray(data["notable-characters"])
    })),
    systems: readEntityFiles(projectRoot, path.join("worldbuilding", "systems"), (id, file, data) => ({
      id,
      file,
      name: data.name ?? titleCaseSlug(id),
      type: data.type ?? ""
    })),
    factions: readEntityFiles(projectRoot, path.join("worldbuilding", "factions"), (id, file, data) => ({
      id,
      file,
      name: data.name ?? titleCaseSlug(id),
      type: data.type ?? "",
      status: data.status ?? "",
      members: asArray(data.members),
      locations: asArray(data.locations)
    })),
    artifacts: readEntityFiles(projectRoot, path.join("worldbuilding", "artifacts"), (id, file, data) => ({
      id,
      file,
      name: data.name ?? titleCaseSlug(id),
      type: data.type ?? "",
      status: data.status ?? "",
      owner: data.owner ?? "",
      location: data.location ?? ""
    })),
    arcs: readEntityFiles(projectRoot, path.join("plot", "arcs"), (id, file, data) => ({
      id,
      file,
      name: data.name ?? titleCaseSlug(id),
      type: data.type ?? "",
      status: data.status ?? "",
      characters: asArray(data.characters),
      themes: asArray(data.themes)
    })),
    chapters: readEntityFiles(projectRoot, "chapters", (id, file, data, markdown) => ({
      id,
      file,
      title: data.title ?? titleCaseSlug(id),
      number: Number(data.number ?? chapterNumberFromFile(file) ?? 0),
      pov: data.pov ?? "",
      status: data.status ?? "",
      characters: asArray(data.characters),
      mentions: asArray(data.mentions),
      locations: asArray(data.locations),
      arcsAdvanced: asArray(data["arcs-advanced"]),
      declaredWordCount: Number(data["word-count"] ?? 0),
      wordCount: wordCount(chapterProse(markdown.body))
    })).sort((left, right) => left.number - right.number || left.file.localeCompare(right.file)),
    scenes: readEntityFiles(projectRoot, "scenes", (id, file, data) => ({
      id,
      file,
      title: data.title ?? titleCaseSlug(id),
      // Coerce before the localeCompare sort below: a hand-written
      // `chapter: 3` parses as a number and must surface as a link error,
      // not a crash.
      chapter: String(data.chapter ?? ""),
      scene: Number(data.scene ?? sceneNumberFromFile(file) ?? 0),
      pov: data.pov ?? "",
      location: data.location ?? "",
      status: data.status ?? "",
      characters: asArray(data.characters),
      mentions: asArray(data.mentions),
      arcsAdvanced: asArray(data["arcs-advanced"]),
      stateChanges: asArray(data["state-changes"])
    })).sort((left, right) => left.chapter.localeCompare(right.chapter) || left.scene - right.scene || left.file.localeCompare(right.file)),
    questions: readEntityFiles(projectRoot, path.join("continuity", "questions"), (id, file, data) => ({
      id,
      file,
      title: data.title ?? titleCaseSlug(id),
      status: data.status ?? "",
      introduced: data.introduced ?? "",
      resolved: data.resolved ?? "",
      characters: asArray(data.characters)
    })),
    promises: readEntityFiles(projectRoot, path.join("continuity", "promises"), (id, file, data) => ({
      id,
      file,
      title: data.title ?? titleCaseSlug(id),
      status: data.status ?? "",
      planted: data.planted ?? "",
      payoff: data.payoff ?? "",
      arcs: asArray(data.arcs),
      characters: asArray(data.characters)
    })),
    glossaryTerms: readEntityFiles(projectRoot, path.join("glossary", "terms"), (id, file, data) => ({
      id,
      file,
      term: data.term ?? titleCaseSlug(id),
      category: data.category ?? "",
      aliases: asArray(data.aliases)
    })),
    continuity: fs.existsSync(path.join(projectRoot, "continuity", "state.md"))
      ? readMarkdown(path.join(projectRoot, "continuity", "state.md"), projectRoot)
      : null
  };
}

export function validateProject(root, options = {}) {
  const lang = options.lang ?? "en";
  const projectRoot = path.resolve(root);
  const errors = [];
  const warnings = [];

  for (const requiredPath of REQUIRED_PATHS) {
    if (!fs.existsSync(path.join(projectRoot, requiredPath))) {
      errors.push(td(lang, "diagMissingRequiredPath", requiredPath));
    }
  }

  if (errors.length > 0) {
    return { ok: false, errors, warnings };
  }

  const project = scanProject(projectRoot);
  validateStoryFrontmatter(project, errors, lang);
  validateIndexFrontmatter(project, errors, lang);
  validateCharacters(project, errors, lang);
  validateLocations(project, errors, lang);
  validateSystems(project, errors, lang);
  validateFactions(project, errors, lang);
  validateArtifacts(project, errors, lang);
  validateArcs(project, errors, lang);
  validateChapters(project, errors, lang);
  validateScenes(project, errors, lang);
  validateContinuityState(project, errors, lang);
  validateQuestions(project, errors, lang);
  validatePromises(project, errors, lang);
  validateGlossaryTerms(project, errors, lang);

  const indexChecks = [
    [path.join("characters", "_index.md"), project.characters.map((item) => `](${item.id}.md)`)],
    [path.join("worldbuilding", "_index.md"), project.locations.map((item) => `](locations/${item.id}.md)`)
      .concat(project.systems.map((item) => `](systems/${item.id}.md)`))
      .concat(project.factions.map((item) => `](factions/${item.id}.md)`))
      .concat(project.artifacts.map((item) => `](artifacts/${item.id}.md)`))],
    [path.join("plot", "_index.md"), project.arcs.map((item) => `](arcs/${item.id}.md)`)],
    [path.join("chapters", "_index.md"), project.chapters.map((item) => `](${path.basename(item.file)})`)],
    [path.join("scenes", "_index.md"), project.scenes.map((item) => `](${item.id}.md)`)],
    [path.join("continuity", "questions", "_index.md"), project.questions.map((item) => `](${item.id}.md)`)],
    [path.join("continuity", "promises", "_index.md"), project.promises.map((item) => `](${item.id}.md)`)],
    [path.join("glossary", "_index.md"), project.glossaryTerms.map((item) => `](terms/${item.id}.md)`)]
  ];

  for (const [indexPath, links] of indexChecks) {
    const markdown = safeRead(path.join(projectRoot, indexPath), projectRoot);
    for (const link of links) {
      if (!markdown.includes(link)) {
        warnings.push(td(lang, "diagRegistryLinkMissing", indexPath, link));
      }
    }
  }

  for (const chapter of project.chapters) {
    if (chapter.declaredWordCount !== chapter.wordCount) {
      warnings.push(td(lang, "diagChapterWordCountMismatch", path.relative(projectRoot, chapter.file), chapter.declaredWordCount));
    }

    if (!project.scenes.some((scene) => scene.chapter === chapter.id)) {
      warnings.push(td(lang, "diagChapterMissingSceneRecord", path.relative(projectRoot, chapter.file)));
    }
  }

  return { ok: errors.length === 0, errors, warnings };
}

export function validateLinks(root, options = {}) {
  const lang = options.lang ?? "en";
  const project = scanProject(root);
  const errors = [];
  const warnings = [];
  const characters = new Map(project.characters.map((item) => [item.id, item]));
  const locations = new Map(project.locations.map((item) => [item.id, item]));
  const chapters = new Map(project.chapters.map((item) => [item.id, item]));
  const arcs = new Map(project.arcs.map((item) => [item.id, item]));
  const factions = new Map(project.factions.map((item) => [item.id, item]));

  for (const character of project.characters) {
    for (const relationship of character.relationships) {
      const target = relationship.character;
      if (!characters.has(target)) {
        errors.push(td(lang, "diagMissingCharacter", relative(project, character.file), target));
      } else if (!characters.get(target).relationships.some((entry) => entry.character === character.id)) {
        errors.push(td(lang, "diagBacklinkMissing", relative(project, character.file), target));
      } else {
        const backlink = characters.get(target).relationships.find((entry) => entry.character === character.id);
        const expectedType = inverseRelationshipType(relationship.type);
        if (expectedType && backlink.type !== expectedType) {
          errors.push(td(lang, "diagRelationshipTypeMismatch", relative(project, character.file), target, relationship.type));
        }
      }
    }

    for (const locationId of character.locations) {
      if (!locations.has(locationId)) {
        errors.push(td(lang, "diagMissingLocation", relative(project, character.file), locationId));
      } else if (!locations.get(locationId).notableCharacters.includes(character.id)) {
        errors.push(td(lang, "diagCharacterMissingLocation", relative(project, character.file), locationId));
      }
    }
  }

  for (const location of project.locations) {
    for (const characterId of location.notableCharacters) {
      if (!characters.has(characterId)) {
        errors.push(td(lang, "diagMissingCharacter", relative(project, location.file), characterId));
      } else if (!characters.get(characterId).locations.includes(location.id)) {
        errors.push(td(lang, "diagLocationMissingNotableCharacters", relative(project, location.file), characterId));
      }
    }
  }

  for (const arc of project.arcs) {
    for (const characterId of arc.characters) {
      if (!characters.has(characterId)) {
        errors.push(td(lang, "diagMissingCharacter", relative(project, arc.file), characterId));
      }
    }
  }

  for (const chapter of project.chapters) {
    if (chapter.pov && !characters.has(chapter.pov)) {
      errors.push(td(lang, "diagChapterMissingPov", relative(project, chapter.file), chapter.pov));
    }

    for (const characterId of chapter.characters.concat(chapter.mentions)) {
      if (!characters.has(characterId)) {
        errors.push(td(lang, "diagChapterMissingCharacter", relative(project, chapter.file), characterId));
      }
    }
    for (const locationId of chapter.locations) {
      if (!locations.has(locationId)) {
        errors.push(td(lang, "diagChapterMissingLocation", relative(project, chapter.file), locationId));
      }
    }
    for (const arcId of chapter.arcsAdvanced) {
      if (!arcs.has(arcId)) {
        errors.push(td(lang, "diagChapterMissingArc", relative(project, chapter.file), arcId));
      }
    }
  }

  for (const faction of project.factions) {
    for (const characterId of faction.members) {
      if (!characters.has(characterId)) {
        errors.push(td(lang, "diagMissingCharacter", relative(project, faction.file), characterId));
      }
    }
    for (const locationId of faction.locations) {
      if (!locations.has(locationId)) {
        errors.push(td(lang, "diagMissingLocation", relative(project, faction.file), locationId));
      }
    }
  }

  for (const artifact of project.artifacts) {
    if (artifact.owner && !characters.has(artifact.owner) && !factions.has(artifact.owner)) {
      errors.push(td(lang, "diagMissingOwner", relative(project, artifact.file), artifact.owner));
    }
    if (artifact.location && !locations.has(artifact.location)) {
      errors.push(td(lang, "diagMissingLocation", relative(project, artifact.file), artifact.location));
    }
  }

  for (const scene of project.scenes) {
    if (scene.chapter && !chapters.has(scene.chapter)) {
      errors.push(td(lang, "diagSceneMissingChapter", relative(project, scene.file), scene.chapter));
    }
    if (scene.pov && !characters.has(scene.pov)) {
      errors.push(td(lang, "diagSceneMissingPov", relative(project, scene.file), scene.pov));
    }
    if (scene.location && !locations.has(scene.location)) {
      errors.push(td(lang, "diagSceneMissingLocation", relative(project, scene.file), scene.location));
    }
    for (const characterId of scene.characters.concat(scene.mentions)) {
      if (!characters.has(characterId)) {
        errors.push(td(lang, "diagSceneMissingCharacter", relative(project, scene.file), characterId));
      }
    }
    for (const arcId of scene.arcsAdvanced) {
      if (!arcs.has(arcId)) {
        errors.push(td(lang, "diagSceneMissingArc", relative(project, scene.file), arcId));
      }
    }
  }

  for (const question of project.questions) {
    for (const chapterId of [question.introduced, question.resolved].filter(Boolean)) {
      if (!chapters.has(chapterId)) {
        errors.push(td(lang, "diagQuestionMissingChapter", relative(project, question.file), chapterId));
      }
    }
    for (const characterId of question.characters) {
      if (!characters.has(characterId)) {
        errors.push(td(lang, "diagQuestionMissingCharacter", relative(project, question.file), characterId));
      }
    }
  }

  for (const promise of project.promises) {
    for (const chapterId of [promise.planted, promise.payoff].filter(Boolean)) {
      if (!chapters.has(chapterId)) {
        errors.push(td(lang, "diagPromiseMissingChapter", relative(project, promise.file), chapterId));
      }
    }
    for (const arcId of promise.arcs) {
      if (!arcs.has(arcId)) {
        errors.push(td(lang, "diagPromiseMissingArc", relative(project, promise.file), arcId));
      }
    }
    for (const characterId of promise.characters) {
      if (!characters.has(characterId)) {
        errors.push(td(lang, "diagPromiseMissingCharacter", relative(project, promise.file), characterId));
      }
    }
  }

  return { ok: errors.length === 0, errors, warnings };
}

export function checkProjectContinuity(root, options = {}) {
  return checkContinuity(scanProject(root), options.lang);
}

export function projectReport(root) {
  const project = scanProject(root);
  const validation = validateProject(project.root);
  const links = validateLinks(project.root);
  const continuity = checkContinuity(project);
  const totalWords = project.chapters.reduce((sum, chapter) => sum + chapter.wordCount, 0);

  return {
    root: project.root,
    title: project.story.data.title,
    storyId: project.storyId,
    schemaVersion: project.story.data["schema-version"],
    genre: project.story.data.genre,
    subGenre: project.story.data["sub-genre"],
    status: project.story.data.status,
    pov: project.story.data.pov,
    tense: project.story.data.tense,
    counts: {
      characters: project.characters.length,
      locations: project.locations.length,
      systems: project.systems.length,
      factions: project.factions.length,
      artifacts: project.artifacts.length,
      arcs: project.arcs.length,
      chapters: project.chapters.length,
      scenes: project.scenes.length,
      questions: project.questions.length,
      promises: project.promises.length,
      glossaryTerms: project.glossaryTerms.length,
      words: totalWords
    },
    chapters: project.chapters.map((chapter) => ({
      number: chapter.number,
      title: chapter.title,
      status: chapter.status,
      pov: chapter.pov,
      wordCount: chapter.wordCount
    })),
    arcs: project.arcs.map((arc) => ({
      name: arc.name,
      type: arc.type,
      status: arc.status,
      characters: arc.characters.length
    })),
    validation,
    links,
    continuity,
    actions: buildProjectActions(project, validation, links, continuity)
  };
}

export function formatProjectReport(report, options = {}) {
  const lines = [
    `# ${report.title}`,
    "",
    `Story ID: ${report.storyId}`,
    `Schema version: ${report.schemaVersion}`,
    `Status: ${report.status}`,
    `Genre: ${[report.genre, report.subGenre].filter(Boolean).join(" / ")}`,
    `POV/Tense: ${report.pov} / ${report.tense}`,
    "",
    "Inventory:",
    `- Characters: ${report.counts.characters}`,
    `- Locations: ${report.counts.locations}`,
    `- Systems: ${report.counts.systems}`,
    `- Factions: ${report.counts.factions}`,
    `- Artifacts: ${report.counts.artifacts}`,
    `- Arcs: ${report.counts.arcs}`,
    `- Chapters: ${report.counts.chapters}`,
    `- Scenes: ${report.counts.scenes}`,
    `- Questions: ${report.counts.questions}`,
    `- Promises: ${report.counts.promises}`,
    `- Glossary terms: ${report.counts.glossaryTerms}`,
    `- Total words: ${report.counts.words}`,
    "",
    "Chapters:"
  ];

  if (report.chapters.length === 0) {
    lines.push("- None");
  } else {
    for (const chapter of report.chapters) {
      lines.push(`- ${chapter.number}. ${chapter.title} (${chapter.status}, ${chapter.wordCount} words, POV: ${chapter.pov || "unspecified"})`);
    }
  }

  lines.push("", "Arcs:");
  if (report.arcs.length === 0) {
    lines.push("- None");
  } else {
    for (const arc of report.arcs) {
      lines.push(`- ${arc.name} (${arc.type}, ${arc.status}, ${arc.characters} characters)`);
    }
  }

  lines.push(
    "",
    "Checks:",
    `- Validate: ${formatCheck(report.validation)}`,
    `- Links: ${formatCheck(report.links)}`,
    `- Continuity: ${formatCheck(report.continuity)}`
  );

  if (options.actionable) {
    lines.push("", "Next Actions:");
    appendActionLines(lines, report.actions);
  }

  return `${lines.join("\n")}\n`;
}

export function projectActions(root) {
  const project = scanProject(root);
  const validation = validateProject(project.root);
  const links = validateLinks(project.root);
  const continuity = checkContinuity(project);
  return {
    root: project.root,
    title: project.story.data.title,
    storyId: project.storyId,
    actions: buildProjectActions(project, validation, links, continuity),
    validation,
    links,
    continuity
  };
}

export function formatActionReport(report) {
  const lines = [
    `# Next Writing Actions: ${report.title}`,
    "",
    `Checks: validate ${formatCheck(report.validation)}, links ${formatCheck(report.links)}, continuity ${formatCheck(report.continuity)}`,
    "",
    "Actions:"
  ];
  appendActionLines(lines, report.actions);
  return `${lines.join("\n")}\n`;
}

export function formatDoctorReport(report) {
  const lines = [
    `# Story Doctor: ${report.title}`,
    "",
    `Root: ${report.root}`,
    "",
    "Checks:",
    `- Validate: ${formatCheck(report.validation)}`,
    `- Links: ${formatCheck(report.links)}`,
    `- Continuity: ${formatCheck(report.continuity)}`,
    "",
    "Actions:"
  ];
  appendActionLines(lines, report.actions);
  return `${lines.join("\n")}\n`;
}

export function reindexProject(root) {
  const project = scanProject(root);
  const changed = [];
  const charactersIndexPath = path.join(project.root, "characters", "_index.md");
  const worldIndexPath = path.join(project.root, "worldbuilding", "_index.md");
  const plotIndexPath = path.join(project.root, "plot", "_index.md");
  const chaptersIndexPath = path.join(project.root, "chapters", "_index.md");
  const scenesIndexPath = path.join(project.root, "scenes", "_index.md");
  const questionsIndexPath = path.join(project.root, "continuity", "questions", "_index.md");
  const promisesIndexPath = path.join(project.root, "continuity", "promises", "_index.md");
  const glossaryIndexPath = path.join(project.root, "glossary", "_index.md");
  const existingCharacters = safeRead(charactersIndexPath, project.root);
  const existingWorld = safeRead(worldIndexPath, project.root);
  const existingPlot = safeRead(plotIndexPath, project.root);
  const plotFrontmatter = parseFrontmatter(existingPlot, "plot/_index.md").data;

  writeChanged(charactersIndexPath, characterIndex(
    project.storyId,
    project.characters,
    extractSection(existingCharacters, "Relationship Map"),
    extractSection(existingCharacters, "Family Trees")
  ), changed, project.root);
  writeChanged(worldIndexPath, worldIndex(
    project.storyId,
    project.locations,
    project.systems,
    project.factions,
    project.artifacts,
    extractSection(existingWorld, "World Overview")
  ), changed, project.root);
  writeChanged(plotIndexPath, plotIndex(
    project.storyId,
    plotFrontmatter.structure ?? "three-act",
    project.arcs,
    extractSection(existingPlot, "Story Structure"),
    extractSection(existingPlot, "Theme Tracking")
  ), changed, project.root);
  writeChanged(chaptersIndexPath, chapterIndex(project.storyId, project.chapters), changed, project.root);
  writeChanged(scenesIndexPath, sceneIndex(project.storyId, project.scenes), changed, project.root);
  writeChanged(questionsIndexPath, questionIndex(project.storyId, project.questions), changed, project.root);
  writeChanged(promisesIndexPath, promiseIndex(project.storyId, project.promises), changed, project.root);
  writeChanged(glossaryIndexPath, glossaryIndex(project.storyId, project.glossaryTerms), changed, project.root);

  return { changed };
}

export function computeWordCounts(root, options = {}) {
  const project = scanProject(root);
  const chapters = [];

  for (const chapter of project.chapters) {
    chapters.push({
      number: chapter.number,
      title: chapter.title,
      file: path.relative(project.root, chapter.file),
      wordCount: chapter.wordCount
    });

    if (options.write) {
      const markdown = readMarkdown(chapter.file, project.root);
      writeFile(chapter.file, replaceFrontmatter(markdown.rawMarkdown, {
        ...markdown.data,
        "word-count": chapter.wordCount
      }), { root: project.root });
    }
  }

  if (options.write) {
    reindexProject(project.root);
  }

  return {
    chapters,
    total: chapters.reduce((sum, chapter) => sum + chapter.wordCount, 0)
  };
}

export function exportManuscript(root, options = {}, lang = "en") {
  const project = scanProject(root);
  if (project.chapters.length === 0) {
    throw new Error(t(lang, "noChaptersExport"));
  }

  const output = resolveOutputPath(project, options.out, "manuscript.md", options.enforceRoot);
  const generatedBy = options.generatedBy ?? "story export";
  const manuscript = manuscriptParts(project);
  const lines = [`# ${manuscript.title}`, "", `<!-- Generated by ${generatedBy}. -->`, ""];

  for (const chapter of manuscript.chapters) {
    lines.push(`# Chapter ${chapter.number}: ${chapter.title}`, "", chapter.body, "");
  }

  writeFile(output.outFile, `${lines.join("\n").trimEnd()}\n`, output.writeOptions);
  return { outFile: output.outFile, chapters: project.chapters.length };
}

export function buildBook(root, options = {}, lang = "en") {
  const format = normalizeBuildFormat(options.format ?? "markdown");
  const project = scanProject(root);
  const extension = format === "markdown" ? "md" : format;
  const output = resolveOutputPath(project, options.out, path.join("dist", `${project.storyId}.${extension}`));

  if (format === "markdown") {
    const result = exportManuscript(project.root, {
      out: output.outFile,
      generatedBy: "story build",
      enforceRoot: output.enforceRoot
    });
    return { ...result, format };
  }

  const manuscript = manuscriptParts(project);
  if (format === "epub") {
    writeEpub(output.outFile, project.storyId, manuscript, output.writeOptions);
  } else {
    writeDocx(output.outFile, manuscript, output.writeOptions);
  }

  return { outFile: output.outFile, chapters: manuscript.chapters.length, format };
}

export function migrateProject(root) {
  const projectRoot = path.resolve(root);
  const storyPath = path.join(projectRoot, "story.md");
  const story = readMarkdown(storyPath, projectRoot);
  const storyId = kebabCase(story.data.title ?? path.basename(projectRoot));
  const changed = [];

  for (const directory of [
    path.join("worldbuilding", "factions"),
    path.join("worldbuilding", "artifacts"),
    "scenes",
    path.join("continuity", "questions"),
    path.join("continuity", "promises"),
    path.join("glossary", "terms")
  ]) {
    ensureDirectory(path.join(projectRoot, directory), changed, projectRoot);
  }

  ensureFile(path.join(projectRoot, "scenes", "_index.md"), sceneIndex(storyId, []), changed, projectRoot);
  ensureFile(path.join(projectRoot, "continuity", "state.md"), continuityState(storyId), changed, projectRoot);
  ensureFile(path.join(projectRoot, "continuity", "questions", "_index.md"), questionIndex(storyId, []), changed, projectRoot);
  ensureFile(path.join(projectRoot, "continuity", "promises", "_index.md"), promiseIndex(storyId, []), changed, projectRoot);
  ensureFile(path.join(projectRoot, "glossary", "_index.md"), glossaryIndex(storyId, []), changed, projectRoot);

  if (story.data["schema-version"] !== STORY_SCHEMA_VERSION) {
    writeFile(storyPath, replaceFrontmatter(story.rawMarkdown, {
      ...story.data,
      "schema-version": STORY_SCHEMA_VERSION
    }), { root: projectRoot });
    changed.push(storyPath);
  }

  const reindexed = reindexProject(projectRoot);
  return { root: projectRoot, changed: changed.concat(reindexed.changed) };
}

export function createEntity(root, options, lang = "en") {
  const project = scanProject(root);
  const kind = normalizeKind(options.kind);
  const name = String(options.name ?? "").trim();
  if (!name) {
    throw new Error(t(lang, "entityNameRequired", kind));
  }

  const entity = buildEntity(project, kind, name, options);
  if (fs.existsSync(entity.file)) {
    throw new Error(t(lang, "entityAlreadyExists", relative(project, entity.file)));
  }

  writeFile(entity.file, entity.markdown, { root: project.root });
  applyEntityBacklinks(project.root, kind, entity.id, readMarkdown(entity.file, project.root).data);
  const reindexed = reindexProject(project.root);
  return { kind, id: entity.id, file: entity.file, changed: [entity.file].concat(reindexed.changed) };
}

export function renameEntity(root, options, lang = "en") {
  const project = scanProject(root);
  const kind = normalizeKind(options.kind);
  const oldId = String(options.id ?? "").trim();
  const name = String(options.name ?? "").trim();
  if (!oldId || !name) {
    throw new Error(t(lang, "needsEntityIdAndName"));
  }

  const config = entityConfig(kind);
  const oldFile = path.join(project.root, config.dir, `${oldId}.md`);
  requireKebabId(oldId, `${kind} id`, lang);
  assertSafeProjectPath(oldFile, project.root, lang);
  if (!fs.existsSync(oldFile)) {
    throw new Error(t(lang, "entityNotFound", kind, oldId));
  }

  const markdown = readMarkdown(oldFile, project.root);
  const newId = kind === "chapter" ? oldId : kebabCase(name);
  const newFile = path.join(project.root, config.dir, `${newId}.md`);
  assertSafeProjectPath(newFile, project.root, lang);
  if (newFile !== oldFile && fs.existsSync(newFile)) {
    throw new Error(t(lang, "entityAlreadyExists", `${kind} ${newId}`));
  }

  const data = { ...markdown.data, [config.titleField]: name };
  writeFile(oldFile, replaceFrontmatter(markdown.rawMarkdown, data), { root: project.root });
  if (newFile !== oldFile) {
    fs.renameSync(oldFile, newFile);
    replaceEntityReferences(project.root, oldId, newId);
  }

  const reindexed = reindexProject(project.root);
  return { kind, oldId, id: newId, file: newFile, changed: [newFile].concat(reindexed.changed) };
}

export function removeEntity(root, options, lang = "en") {
  const project = scanProject(root);
  const kind = normalizeKind(options.kind);
  const id = String(options.id ?? "").trim();
  if (!id) {
    throw new Error(t(lang, "needsEntityId"));
  }

  const config = entityConfig(kind);
  const file = path.join(project.root, config.dir, `${id}.md`);
  requireKebabId(id, `${kind} id`, lang);
  assertSafeProjectPath(file, project.root, lang);
  if (!fs.existsSync(file)) {
    throw new Error(t(lang, "entityNotFound", kind, id));
  }

  fs.rmSync(file);
  removeEntityReferences(project.root, id);
  const reindexed = reindexProject(project.root);
  return { kind, id, file, changed: [file].concat(reindexed.changed) };
}

function storyBible(options) {
  return `${stringifyFrontmatter({
    title: options.title,
    "schema-version": STORY_SCHEMA_VERSION,
    genre: options.genre,
    "sub-genre": options.subGenre,
    "setting-era": options.settingEra,
    status: "planning",
    themes: options.themes,
    pov: options.pov,
    tense: options.tense
  })}# ${options.title}

## Synopsis

${options.synopsis}

## Tone & Style

Add notes on the story's voice, texture, and emotional register.

## Notes

`;
}

function characterIndex(storyId, characters, relationshipMap, familyTrees) {
  const rows = characters.length === 0
    ? ["| *No characters yet* | | | |"]
    : characters.map((character) => `| ${character.name} | ${character.role} | ${character.status} | [${character.id}](${character.id}.md) |`);

  return `${stringifyFrontmatter({ type: "character-registry", story: storyId })}# Characters

## Registry

| Name | Role | Status | File |
|------|------|--------|------|
${rows.join("\n")}

## Relationship Map

${relationshipMap || "*No relationships defined yet.*"}

## Family Trees

${familyTrees || "*No family trees defined yet.*"}
`;
}

function worldIndex(storyId, locations, systems, factions, artifacts, overview) {
  const locationRows = locations.length === 0
    ? ["| *No locations yet* | | | |"]
    : locations.map((location) => `| ${location.name} | ${titleCaseSlug(location.type)} | ${location.region} | [${location.id}](locations/${location.id}.md) |`);
  const systemRows = systems.length === 0
    ? ["| *No systems yet* | | |"]
    : systems.map((system) => `| ${system.name} | ${titleCaseSlug(system.type)} | [${system.id}](systems/${system.id}.md) |`);
  const factionRows = factions.length === 0
    ? ["| *No factions yet* | | | |"]
    : factions.map((faction) => `| ${faction.name} | ${titleCaseSlug(faction.type)} | ${faction.status} | [${faction.id}](factions/${faction.id}.md) |`);
  const artifactRows = artifacts.length === 0
    ? ["| *No artifacts yet* | | | |"]
    : artifacts.map((artifact) => `| ${artifact.name} | ${titleCaseSlug(artifact.type)} | ${artifact.status} | [${artifact.id}](artifacts/${artifact.id}.md) |`);

  return `${stringifyFrontmatter({ type: "world-registry", story: storyId })}# Worldbuilding

## World Overview

${overview || "*Describe the world at a high level here.*"}

## Locations

| Name | Type | Region | File |
|------|------|--------|------|
${locationRows.join("\n")}

## Systems

| Name | Type | File |
|------|------|------|
${systemRows.join("\n")}

## Factions

| Name | Type | Status | File |
|------|------|--------|------|
${factionRows.join("\n")}

## Artifacts

| Name | Type | Status | File |
|------|------|--------|------|
${artifactRows.join("\n")}
`;
}

function plotIndex(storyId, structure, arcs, storyStructure, themeTracking) {
  const arcRows = arcs.length === 0
    ? ["| *No arcs yet* | | | |"]
    : arcs.map((arc) => `| ${arc.name} | ${arc.type} | ${arc.status} | [${arc.id}](arcs/${arc.id}.md) |`);

  return `${stringifyFrontmatter({ type: "plot-registry", story: storyId, structure })}# Plot Structure

## Story Structure

${storyStructure || "**Model:** Three-Act Structure (adjust as needed)"}

## Arcs

| Name | Type | Status | File |
|------|------|--------|------|
${arcRows.join("\n")}

## Theme Tracking

${themeTracking || `| Theme | Arcs | Chapters |
|-------|------|----------|
| *No themes tracked yet* | | |`}
`;
}

function chapterIndex(storyId, chapters) {
  const rows = chapters.length === 0
    ? ["| *No chapters yet* | | | | | |"]
    : chapters.map((chapter) => `| ${chapter.number} | ${chapter.title} | ${chapter.pov} | ${chapter.status} | ${chapter.wordCount} | [${chapter.id}](${path.basename(chapter.file)}) |`);
  const total = chapters.reduce((sum, chapter) => sum + chapter.wordCount, 0);

  return `${stringifyFrontmatter({ type: "chapter-registry", story: storyId })}# Chapters

## Registry

| # | Title | POV | Status | Word Count | File |
|---|-------|-----|--------|------------|------|
${rows.join("\n")}

## Total Word Count: ${total}
`;
}

function timeline(storyId) {
  return `${stringifyFrontmatter({ type: "timeline", story: storyId })}# Story Timeline

| When | Event | Arc | Chapter |
|------|-------|-----|---------|
| *No events yet* | | | |
`;
}

function sceneIndex(storyId, scenes) {
  const rows = scenes.length === 0
    ? ["| *No scenes yet* | | | | | |"]
    : scenes.map((scene) => `| ${scene.chapter} | ${scene.scene} | ${scene.title} | ${scene.pov} | ${scene.status} | [${scene.id}](${scene.id}.md) |`);

  return `${stringifyFrontmatter({ type: "scene-registry", story: storyId })}# Scenes

## Registry

| Chapter | Scene | Title | POV | Status | File |
|---------|-------|-------|-----|--------|------|
${rows.join("\n")}
`;
}

function continuityState(storyId) {
  return `${stringifyFrontmatter({
    type: "continuity-state",
    story: storyId,
    "current-chapter": 0,
    "character-state": [],
    "object-state": [],
    "knowledge-state": []
  })}# Continuity State

## Current Story State

Track facts that must carry forward between chapters.

## Character State

| Character | Location | Physical State | Emotional State | Knowledge |
|-----------|----------|----------------|-----------------|-----------|
| *No state entries yet* | | | | |

## Object State

| Artifact | Owner | Location | Status |
|----------|-------|----------|--------|
| *No object state entries yet* | | | |

## Knowledge State

| Character | Knows | Learned In |
|-----------|-------|------------|
| *No knowledge entries yet* | | |
`;
}

function questionIndex(storyId, questions) {
  const rows = questions.length === 0
    ? ["| *No questions yet* | | | |"]
    : questions.map((question) => `| ${question.title} | ${question.status} | ${question.introduced} | [${question.id}](${question.id}.md) |`);

  return `${stringifyFrontmatter({ type: "question-registry", story: storyId })}# Continuity Questions

## Registry

| Question | Status | Introduced | File |
|----------|--------|------------|------|
${rows.join("\n")}
`;
}

function promiseIndex(storyId, promises) {
  const rows = promises.length === 0
    ? ["| *No promises yet* | | | |"]
    : promises.map((promise) => `| ${promise.title} | ${promise.status} | ${promise.planted} | [${promise.id}](${promise.id}.md) |`);

  return `${stringifyFrontmatter({ type: "promise-registry", story: storyId })}# Promises And Payoffs

## Registry

| Promise | Status | Planted | File |
|---------|--------|---------|------|
${rows.join("\n")}
`;
}

function glossaryIndex(storyId, terms) {
  const rows = terms.length === 0
    ? ["| *No terms yet* | | |"]
    : terms.map((term) => `| ${term.term} | ${term.category} | [${term.id}](terms/${term.id}.md) |`);

  return `${stringifyFrontmatter({ type: "glossary-registry", story: storyId })}# Glossary

## Registry

| Term | Category | File |
|------|----------|------|
${rows.join("\n")}
`;
}

function buildProjectActions(project, validation, links, continuity) {
  const actions = [];
  if (validation.errors.length > 0) {
    actions.push(action("P0", "Fix validation errors", `Run story validate . and repair ${validation.errors.length} schema or registry errors.`));
  }
  if (links.errors.length > 0) {
    actions.push(action("P0", "Fix broken references", `Run story links . and repair ${links.errors.length} missing references or backlinks.`));
  }
  if (continuity.errors.length > 0) {
    actions.push(action("P0", "Fix continuity contradictions", `Run story continuity . and repair ${continuity.errors.length} deterministic continuity errors.`));
  }
  if (continuity.warnings.length > 0) {
    actions.push(action("P1", "Review continuity warnings", `Run story continuity . and review ${continuity.warnings.length} continuity warnings.`));
  }
  const staleChapters = [];
  const chaptersWithoutScenes = [];
  let nextNumber = 1;
  for (const chapter of project.chapters) {
    if (chapter.declaredWordCount !== chapter.wordCount) {
      staleChapters.push(chapter);
    }
    let hasScene = false;
    for (const scene of project.scenes) {
      if (scene.chapter === chapter.id) {
        hasScene = true;
      }
    }
    if (!hasScene) {
      chaptersWithoutScenes.push(chapter);
    }
    nextNumber = Math.max(nextNumber, chapter.number + 1);
  }
  if (staleChapters.length > 0) {
    actions.push(action("P1", "Refresh word counts", `Run story wordcount . --write for ${staleChapters.length} chapters with stale counts.`));
  }
  if (chaptersWithoutScenes.length > 0) {
    actions.push(action("P1", "Add scene records", `Create machine-readable scene files for ${chaptersWithoutScenes.length} chapters so continuity has durable state.`));
  }
  const openQuestions = [];
  for (const question of project.questions) {
    if (question.status === "open") {
      openQuestions.push(question);
    }
  }
  if (openQuestions.length > 0) {
    actions.push(action("P2", "Track open questions", `${openQuestions.length} mysteries or continuity questions are still open.`));
  }
  const pendingPromises = [];
  for (const promise of project.promises) {
    if (promise.status === "planned" || promise.status === "planted") {
      pendingPromises.push(promise);
    }
  }
  if (pendingPromises.length > 0) {
    actions.push(action("P2", "Review promises and payoffs", `${pendingPromises.length} setup/payoff promises need planting or payoff decisions.`));
  }
  const activeArcNames = [];
  for (const arc of project.arcs) {
    if (arc.status !== "resolved" && activeArcNames.length < 3) {
      activeArcNames.push(arc.name);
    }
  }
  const nextLabel = activeArcNames.length > 0
    ? `advance ${activeArcNames.join(", ")}`
    : "establish the next story beat";
  actions.push(action("P2", `Draft chapter ${nextNumber}`, `Use story add chapter "Chapter ${nextNumber}" --number ${nextNumber}, then outline scenes to ${nextLabel}.`));
  if (project.characters.length === 0) {
    actions.push(action("P2", "Create first character", "Use story add character \"Name\" --role protagonist before drafting prose."));
  }
  if (actions.length === 1 && validation.ok && links.ok && continuity.ok && continuity.warnings.length === 0 && staleChapters.length === 0 && chaptersWithoutScenes.length === 0) {
    actions.unshift(action("P3", "Project is mechanically healthy", "No deterministic maintenance issues are blocking the next writing pass."));
  }
  return actions;
}

function action(priority, title, detail) {
  return { priority, title, detail };
}

function appendActionLines(lines, actions) {
  if (actions.length === 0) {
    lines.push("- No actions found");
    return;
  }

  for (const item of actions) {
    lines.push(`- [${item.priority}] ${item.title}: ${item.detail}`);
  }
}

function buildEntity(project, kind, name, options) {
  if (kind === "chapter") {
    const number = Number(options.number ?? project.chapters.reduce((max, chapter) => Math.max(max, chapter.number), 0) + 1);
    const id = `chapter-${String(number).padStart(2, "0")}`;
    return entityResult(project, kind, id, chapterFile(name, number, options));
  }

  if (kind === "scene") {
    const chapter = String(options.chapter ?? project.chapters.at(-1)?.id ?? "chapter-01").trim();
    requireKebabId(chapter, "chapter id", lang);
    const scene = Number(options.scene ?? nextSceneNumber(project, chapter));
    const id = `${chapter}-scene-${String(scene).padStart(2, "0")}`;
    return entityResult(project, kind, id, sceneFile(name, chapter, scene, options));
  }

  const id = kebabCase(name);
  switch (kind) {
    case "character":
      return entityResult(project, kind, id, characterFile(name, options));
    case "location":
      return entityResult(project, kind, id, locationFile(name, options));
    case "system":
      return entityResult(project, kind, id, systemFile(name, options));
    case "faction":
      return entityResult(project, kind, id, factionFile(name, options));
    case "artifact":
      return entityResult(project, kind, id, artifactFile(name, options));
    case "arc":
      return entityResult(project, kind, id, arcFile(name, options));
    case "question":
      return entityResult(project, kind, id, questionFile(name, options));
    case "promise":
      return entityResult(project, kind, id, promiseFile(name, options));
    case "term":
      return entityResult(project, kind, id, termFile(name, options));
    default:
      entityConfig(kind);
  }
}

function entityResult(project, kind, id, markdown) {
  const config = entityConfig(kind);
  return { id, markdown, file: path.join(project.root, config.dir, `${id}.md`) };
}

function entityConfig(kind) {
  const configs = {
    character: { dir: "characters", titleField: "name" },
    location: { dir: path.join("worldbuilding", "locations"), titleField: "name" },
    system: { dir: path.join("worldbuilding", "systems"), titleField: "name" },
    faction: { dir: path.join("worldbuilding", "factions"), titleField: "name" },
    artifact: { dir: path.join("worldbuilding", "artifacts"), titleField: "name" },
    arc: { dir: path.join("plot", "arcs"), titleField: "name" },
    chapter: { dir: "chapters", titleField: "title" },
    scene: { dir: "scenes", titleField: "title" },
    question: { dir: path.join("continuity", "questions"), titleField: "title" },
    promise: { dir: path.join("continuity", "promises"), titleField: "title" },
    term: { dir: path.join("glossary", "terms"), titleField: "term" }
  };
  const config = configs[kind];
  if (!config) {
    throw new Error(t(lang, "invalidKind", kind));
  }
  return config;
}

function normalizeKind(kind) {
  const normalized = String(kind ?? "").trim().toLowerCase().replace(/s$/, "");
  if (normalized === "glossary" || normalized === "glossary-term") {
    return "term";
  }
  return normalized;
}

function requireKebabId(id, label, lang = "en") {
  if (!isKebabId(id)) {
    throw new Error(t(lang, "entityIdNotKebab", label));
  }
}

function isKebabId(value) {
  const text = String(value ?? "").trim();
  return text !== "" && text === kebabCase(text);
}

function characterFile(name, options) {
  return `${stringifyFrontmatter({
    name,
    role: options.role ?? "supporting",
    status: options.status ?? "alive",
    aliases: [],
    relationships: [],
    locations: normalizeList(options.locations ?? options.location, []),
    tags: [],
    arc: options.arc ?? ""
  })}# ${name}

## Appearance

Add physical details that matter on the page.

## Personality & Traits

Add behavior, temperament, habits, and contradictions.

## Backstory

Add only story-relevant history.

## Motivations & Goals

External want, internal need, and the conflict between them.

## Voice & Speech Patterns

Add 2-3 example lines.

## Character Arc

- **Starting state:**
- **Key turning points:**
- **Ending state:**

## Timeline

| When | Event | Relevance |
|------|-------|-----------|
| | | |
`;
}

function locationFile(name, options) {
  return `${stringifyFrontmatter({
    name,
    type: options.type ?? "other",
    region: options.region ?? "",
    population: options.population ?? "",
    "controlled-by": options["controlled-by"] ?? "",
    "notable-characters": normalizeList(options.characters ?? options.character, []),
    tags: [],
    status: options.status ?? "unknown"
  })}# ${name}

## Description

Add sensory details and first impressions.

## History

Add relevant history.

## Culture & Customs

Add social norms, rituals, or local patterns.

## Notable Features

Add landmarks or practical story elements.

## Current State

Add what is true at the current story moment.
`;
}

function systemFile(name, options) {
  return `${stringifyFrontmatter({
    name,
    type: options.type ?? "other",
    prevalence: options.prevalence ?? "uncommon"
  })}# ${name}

## Overview

Summarize the system and why it matters.

## Rules & Limitations

Define costs, limits, and exceptions.

## History

Add origin and changes over time.

## Practitioners

Add users, institutions, or gatekeepers.

## Impact on Society

Add consequences for daily life and conflict.
`;
}

function factionFile(name, options) {
  return `${stringifyFrontmatter({
    name,
    type: options.type ?? "other",
    status: options.status ?? "active",
    members: normalizeList(options.members ?? options.member ?? options.characters ?? options.character, []),
    locations: normalizeList(options.locations ?? options.location, []),
    tags: []
  })}# ${name}

## Purpose

What the faction wants and why it exists.

## Power Base

Resources, influence, territory, leverage, or rituals.

## Members

Important members and their roles.

## Conflicts

Internal and external pressures.
`;
}

function artifactFile(name, options) {
  return `${stringifyFrontmatter({
    name,
    type: options.type ?? "object",
    status: options.status ?? "active",
    owner: options.owner ?? "",
    location: options.location ?? "",
    tags: []
  })}# ${name}

## Description

What it is and how readers recognize it.

## Function

What it can do, cannot do, costs, and constraints.

## History

Where it came from and why it matters.

## Current State

Who has it, where it is, and what changed recently.
`;
}

function arcFile(name, options) {
  return `${stringifyFrontmatter({
    name,
    type: options.type ?? "subplot",
    status: options.status ?? "planned",
    characters: normalizeList(options.characters ?? options.character, []),
    themes: normalizeList(options.themes ?? options.theme, []),
    acts: normalizeList(options.acts ?? options.act, [])
  })}# ${name}

## Setup

Initial state and inciting pressure.

## Rising Action

1. First escalation
2. Second escalation
3. Reversal or complication

## Climax

Decision point or highest tension.

## Resolution

What changes because of this arc.

## Plot Points

| # | Plot Point | Act | Chapter | Status | Notes |
|---|------------|-----|---------|--------|-------|
| 1 | | | | planned | |

## Foreshadowing

| Planted | Payoff | Chapter Planted | Chapter Payoff | Status |
|---------|--------|-----------------|----------------|--------|
| | | | | planned |
`;
}

function chapterFile(title, number, options) {
  return `${stringifyFrontmatter({
    title,
    number,
    pov: options.pov ?? "",
    locations: normalizeList(options.locations ?? options.location, []),
    characters: normalizeList(options.characters ?? options.character, []),
    "arcs-advanced": normalizeList(options.arcs ?? options.arc, []),
    status: options.status ?? "outline",
    "word-count": 0
  })}# Chapter ${number}: ${title}

## Outline

1. Opening beat
2. Escalation
3. Turn or decision

---

## Chapter Text

`;
}

function sceneFile(title, chapter, scene, options) {
  return `${stringifyFrontmatter({
    title,
    chapter,
    scene,
    pov: options.pov ?? "",
    location: options.location ?? "",
    characters: normalizeList(options.characters ?? options.character, []),
    "arcs-advanced": normalizeList(options.arcs ?? options.arc, []),
    status: options.status ?? "outline",
    "state-changes": []
  })}# ${title}

## Purpose

What this scene changes.

## Continuity Notes

Character state, object state, knowledge changes, and timeline facts.
`;
}

function questionFile(title, options) {
  return `${stringifyFrontmatter({
    title,
    status: options.status ?? "open",
    introduced: options.introduced ?? "",
    resolved: options.resolved ?? "",
    characters: normalizeList(options.characters ?? options.character, [])
  })}# ${title}

## Question

What the reader or continuity tracker needs answered.

## Evidence

Known clues, constraints, and contradictions.

## Resolution Plan

How and when this should resolve.
`;
}

function promiseFile(title, options) {
  return `${stringifyFrontmatter({
    title,
    status: options.status ?? "planned",
    planted: options.planted ?? "",
    payoff: options.payoff ?? "",
    arcs: normalizeList(options.arcs ?? options.arc, []),
    characters: normalizeList(options.characters ?? options.character, [])
  })}# ${title}

## Setup

What is promised to the reader.

## Payoff

How the story should answer the setup.

## Tracking Notes

Keep planted and payoff chapters current.
`;
}

function termFile(term, options) {
  return `${stringifyFrontmatter({
    term,
    category: options.category ?? "term",
    aliases: normalizeList(options.aliases ?? options.alias, [])
  })}# ${term}

## Definition

Define the term in story context.

## Usage Notes

How agents should use this term consistently.
`;
}

function nextSceneNumber(project, chapter) {
  return project.scenes
    .filter((scene) => scene.chapter === chapter)
    .reduce((max, scene) => Math.max(max, scene.scene), 0) + 1;
}

function ensureDirectory(directory, changed, root) {
  if (!fs.existsSync(directory)) {
    assertLexicallyInsideRoot(directory, root, lang);
    fs.mkdirSync(directory, { recursive: true });
    assertSafeProjectDirectory(directory, root);
    changed.push(directory);
    return;
  }

  assertSafeProjectDirectory(directory, root);
}

function ensureFile(filePath, contents, changed, root) {
  if (!fs.existsSync(filePath)) {
    writeFile(filePath, contents, { root });
    changed.push(filePath);
    return;
  }

  assertSafeProjectPath(filePath, root, lang);
}

function replaceEntityReferences(root, oldId, newId) {
  // Only replace whole ids: an id can be a substring of another id or of a
  // prose word, so matches adjacent to id characters must be left alone.
  const pattern = new RegExp(`(?<![a-z0-9-])${escapeRegExp(oldId)}(?![a-z0-9-])`, "g");
  for (const file of markdownFiles(root)) {
    const text = safeRead(file, root);
    const updated = text.replace(pattern, newId);
    if (updated !== text) {
      writeFile(file, updated, { root });
    }
  }
}

function removeEntityReferences(root, id) {
  for (const file of markdownFiles(root)) {
    if (!fs.existsSync(file)) {
      continue;
    }
    const markdown = readMarkdown(file, root);
    const data = removeReferenceFromData(markdown.data, id);
    if (JSON.stringify(data) !== JSON.stringify(markdown.data)) {
      writeFile(file, replaceFrontmatter(markdown.rawMarkdown, data), { root });
    }
  }
}

function applyEntityBacklinks(root, kind, id, data) {
  if (kind === "location") {
    for (const characterId of asArray(data["notable-characters"])) {
      if (isKebabId(characterId)) {
        addFrontmatterListValue(root, path.join("characters", `${characterId}.md`), "locations", id);
      }
    }
  }

  if (kind === "character") {
    for (const locationId of asArray(data.locations)) {
      if (isKebabId(locationId)) {
        addFrontmatterListValue(root, path.join("worldbuilding", "locations", `${locationId}.md`), "notable-characters", id);
      }
    }
  }
}

function addFrontmatterListValue(root, relativePath, field, value) {
  const filePath = path.join(root, relativePath);
  if (!fs.existsSync(filePath) || !value) {
    return;
  }

  assertSafeProjectPath(filePath, root, currentLang);
  const markdown = readMarkdown(filePath, root);
  const list = asArray(markdown.data[field]);
  if (!list.includes(value)) {
    writeFile(filePath, replaceFrontmatter(markdown.rawMarkdown, {
      ...markdown.data,
      [field]: list.concat(value)
    }), { root });
  }
}

function removeReferenceFromData(data, id) {
  const next = {};
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      const items = [];
      for (const item of value) {
        const objectHasReference = item && typeof item === "object" && Object.values(item).includes(id);
        if (item !== id && !objectHasReference) {
          items.push(item && typeof item === "object" && !Array.isArray(item) ? removeReferenceFromData(item, id) : item);
        }
      }
      next[key] = items;
    } else {
      next[key] = value === id ? "" : value;
    }
  }
  return next;
}

function markdownFiles(root) {
  const files = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory() && entry.name !== "dist" && !entry.name.startsWith(".")) {
      files.push(...markdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files.sort();
}

function manuscriptParts(project) {
  if (project.chapters.length === 0) {
    throw new Error(t(lang, "noChaptersExport"));
  }

  const chapters = [];
  for (const chapter of project.chapters) {
    const markdown = readMarkdown(chapter.file, project.root);
    chapters.push({
      number: chapter.number,
      title: chapter.title,
      body: chapterProse(markdown.body).trim()
    });
  }

  return {
    title: project.story.data.title,
    chapters
  };
}

function writeEpub(outFile, storyId, manuscript, writeOptions = {}) {
  const chapterEntries = [];
  const chapterItems = [];
  const spineItems = [];
  for (const chapter of manuscript.chapters) {
    const id = `chapter-${String(chapter.number).padStart(2, "0")}`;
    chapterEntries.push({
      name: `OEBPS/${id}.xhtml`,
      content: chapterXhtml(chapter)
    });
    chapterItems.push(`<item id="${id}" href="${id}.xhtml" media-type="application/xhtml+xml"/>`);
    spineItems.push(`<itemref idref="${id}"/>`);
  }

  const modified = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
  writeZip(outFile, [
    { name: "mimetype", content: "application/epub+zip" },
    { name: "META-INF/container.xml", content: `<?xml version="1.0" encoding="UTF-8"?><container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>` },
    { name: "OEBPS/content.opf", content: `<?xml version="1.0" encoding="UTF-8"?><package version="3.0" unique-identifier="book-id" xmlns="http://www.idpf.org/2007/opf"><metadata xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:identifier id="book-id">${xmlEscape(storyId)}</dc:identifier><dc:title>${xmlEscape(manuscript.title)}</dc:title><dc:language>en</dc:language><meta property="dcterms:modified">${modified}</meta></metadata><manifest><item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>${chapterItems.join("")}</manifest><spine>${spineItems.join("")}</spine></package>` },
    { name: "OEBPS/nav.xhtml", content: navXhtml(manuscript) },
    ...chapterEntries
  ], writeOptions);
}

function navXhtml(manuscript) {
  const links = [];
  for (const chapter of manuscript.chapters) {
    links.push(`<li><a href="chapter-${String(chapter.number).padStart(2, "0")}.xhtml">Chapter ${chapter.number}: ${xmlEscape(chapter.title)}</a></li>`);
  }
  return `<?xml version="1.0" encoding="UTF-8"?><html xmlns="http://www.w3.org/1999/xhtml"><head><title>${xmlEscape(manuscript.title)}</title></head><body><nav epub:type="toc" xmlns:epub="http://www.idpf.org/2007/ops"><ol>${links.join("")}</ol></nav></body></html>`;
}

function chapterXhtml(chapter) {
  const paragraphs = [];
  for (const paragraph of markdownParagraphs(chapter.body)) {
    paragraphs.push(`<p>${xmlEscape(paragraph)}</p>`);
  }
  return `<?xml version="1.0" encoding="UTF-8"?><html xmlns="http://www.w3.org/1999/xhtml"><head><title>${xmlEscape(chapter.title)}</title></head><body><h1>Chapter ${chapter.number}: ${xmlEscape(chapter.title)}</h1>${paragraphs.join("")}</body></html>`;
}

function writeDocx(outFile, manuscript, writeOptions = {}) {
  const bodyParts = [paragraphXml(manuscript.title, "Title")];
  for (const chapter of manuscript.chapters) {
    bodyParts.push(paragraphXml(`Chapter ${chapter.number}: ${chapter.title}`, "Heading1"));
    for (const paragraph of markdownParagraphs(chapter.body)) {
      bodyParts.push(paragraphXml(paragraph));
    }
  }
  const body = bodyParts.join("");

  writeZip(outFile, [
    { name: "[Content_Types].xml", content: `<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>` },
    { name: "_rels/.rels", content: `<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>` },
    { name: "word/_rels/document.xml.rels", content: `<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>` },
    { name: "word/styles.xml", content: `<?xml version="1.0" encoding="UTF-8"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:pPr><w:spacing w:after="240"/><w:jc w:val="center"/></w:pPr><w:rPr><w:b/><w:sz w:val="56"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:pPr><w:spacing w:before="480" w:after="240"/></w:pPr><w:rPr><w:b/><w:sz w:val="32"/></w:rPr></w:style></w:styles>` },
    { name: "word/document.xml", content: `<?xml version="1.0" encoding="UTF-8"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${body}<w:sectPr/></w:body></w:document>` }
  ], writeOptions);
}

function paragraphXml(text, style = "") {
  const styleXml = style ? `<w:pPr><w:pStyle w:val="${style}"/></w:pPr>` : "";
  return `<w:p>${styleXml}<w:r><w:t>${xmlEscape(text)}</w:t></w:r></w:p>`;
}

// A thematic break: three or more of the same marker, optionally spaced.
const SCENE_BREAK_PATTERN = /^([*_-])( ?\1){2,}$/;

function markdownParagraphs(markdown) {
  const paragraphs = [];
  for (const paragraph of markdown
    .replace(/^#+\s+/gm, "")
    .split(/\n{2,}/)) {
    const trimmed = paragraph.replace(/\s+/g, " ").trim();
    if (trimmed) {
      paragraphs.push(SCENE_BREAK_PATTERN.test(trimmed) ? "* * *" : trimmed);
    }
  }
  return paragraphs;
}

function writeZip(outFile, entries, writeOptions = {}) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const entry of entries) {
    const name = Buffer.from(entry.name, "utf8");
    const content = Buffer.isBuffer(entry.content) ? entry.content : Buffer.from(entry.content, "utf8");
    const crc = crc32(content);
    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(0x04034b50, 0);
    localHeader.writeUInt16LE(20, 4);
    localHeader.writeUInt16LE(0, 6);
    localHeader.writeUInt16LE(0, 8);
    localHeader.writeUInt16LE(0, 10);
    localHeader.writeUInt16LE(0, 12);
    localHeader.writeUInt32LE(crc, 14);
    localHeader.writeUInt32LE(content.length, 18);
    localHeader.writeUInt32LE(content.length, 22);
    localHeader.writeUInt16LE(name.length, 26);
    localHeader.writeUInt16LE(0, 28);
    localParts.push(localHeader, name, content);

    const centralHeader = Buffer.alloc(46);
    centralHeader.writeUInt32LE(0x02014b50, 0);
    centralHeader.writeUInt16LE(20, 4);
    centralHeader.writeUInt16LE(20, 6);
    centralHeader.writeUInt16LE(0, 8);
    centralHeader.writeUInt16LE(0, 10);
    centralHeader.writeUInt16LE(0, 12);
    centralHeader.writeUInt16LE(0, 14);
    centralHeader.writeUInt32LE(crc, 16);
    centralHeader.writeUInt32LE(content.length, 20);
    centralHeader.writeUInt32LE(content.length, 24);
    centralHeader.writeUInt16LE(name.length, 28);
    centralHeader.writeUInt16LE(0, 30);
    centralHeader.writeUInt16LE(0, 32);
    centralHeader.writeUInt16LE(0, 34);
    centralHeader.writeUInt16LE(0, 36);
    centralHeader.writeUInt32LE(0, 38);
    centralHeader.writeUInt32LE(offset, 42);
    centralParts.push(centralHeader, name);
    offset += localHeader.length + name.length + content.length;
  }

  let centralSize = 0;
  for (const part of centralParts) {
    centralSize += part.length;
  }
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);
  writeFile(outFile, Buffer.concat(localParts.concat(centralParts, end)), writeOptions);
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

const CRC_TABLE = [];
for (let index = 0; index < 256; index += 1) {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) {
    value = (value & 1) ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  }
  CRC_TABLE.push(value >>> 0);
}

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function readEntityFiles(root, relativeDir, mapEntity) {
  const directory = path.join(root, relativeDir);
  if (!fs.existsSync(directory)) {
    return [];
  }

  assertSafeProjectDirectory(directory, root);
  return fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md") && entry.name !== "_index.md")
    .map((entry) => entry.name)
    .sort()
    .map((file) => {
      const fullPath = path.join(directory, file);
      const markdown = readMarkdown(fullPath, root);
      return mapEntity(path.basename(file, ".md"), fullPath, markdown.data, markdown);
    });
}

function readMarkdown(filePath, root) {
  if (root) {
    assertSafeProjectPath(filePath, root, currentLang);
  }
  const rawMarkdown = fs.readFileSync(filePath, "utf8");
  const parsed = parseFrontmatter(rawMarkdown, filePath);
  return { ...parsed, rawMarkdown };
}

function writeFile(filePath, contents, options = {}) {
  const target = prepareWriteTarget(filePath, options.root);
  fs.writeFileSync(target, contents, "utf8");
}

function writeChanged(filePath, contents, changed, root) {
  if (safeRead(filePath, root) !== contents) {
    writeFile(filePath, contents, { root });
    changed.push(filePath);
  }
}

function safeRead(filePath, root) {
  if (!fs.existsSync(filePath)) {
    return "";
  }

  if (root) {
    assertSafeProjectPath(filePath, root, currentLang);
  }
  return fs.readFileSync(filePath, "utf8");
}

function resolveOutputPath(project, out, defaultRelativePath, enforceRoot) {
  const rawOut = out ?? defaultRelativePath;
  const outFile = path.resolve(project.root, rawOut);
  const shouldEnforceRoot = enforceRoot ?? !path.isAbsolute(String(rawOut));
  return {
    outFile,
    enforceRoot: shouldEnforceRoot,
    writeOptions: shouldEnforceRoot ? { root: project.root } : {}
  };
}

function prepareWriteTarget(filePath, root) {
  const target = path.resolve(filePath);
  if (root) {
    assertLexicallyInsideRoot(target, root, currentLang);
  }

  fs.mkdirSync(path.dirname(target), { recursive: true });

  if (root) {
    assertSafeProjectParent(target, root, currentLang);
  }

  rejectSymlinkTarget(target, currentLang);
  return target;
}

function assertSafeProjectPath(filePath, root, lang = "en") {
  const target = path.resolve(filePath);
  assertLexicallyInsideRoot(target, root, currentLang);
  assertSafeProjectParent(target, root, currentLang);
  rejectSymlinkTarget(target, currentLang);
}

function assertSafeProjectDirectory(directory, root) {
  const target = path.resolve(directory);
  assertLexicallyInsideRoot(target, root, currentLang);
  const stats = lstatIfExists(target);

  if (stats) {
    if (stats.isSymbolicLink()) {
      throw new Error(t(lang, "symlinkRefused", target));
    }

    if (!stats.isDirectory()) {
      throw new Error(t(lang, "projectNotDir", target));
    }
  }

  const rootReal = fs.realpathSync(path.resolve(root));
  const directoryReal = fs.realpathSync(target);
  if (!isPathInside(rootReal, directoryReal)) {
    throw new Error(t(lang, "projectOutsideRoot", target));
  }
}

function assertSafeProjectParent(filePath, root, lang = "en") {
  const rootReal = fs.realpathSync(path.resolve(root));
  const parentReal = fs.realpathSync(path.dirname(path.resolve(filePath)));
  if (!isPathInside(rootReal, parentReal)) {
    throw new Error(t(lang, "pathOutsideRoot", filePath));
  }
}

function assertLexicallyInsideRoot(filePath, root, lang = "en") {
  const rootPath = path.resolve(root);
  const target = path.resolve(filePath);
  if (!isPathInside(rootPath, target)) {
    throw new Error(t(lang, "pathOutsideProjectRoot", target));
  }
}

function rejectSymlinkTarget(filePath, lang = "en") {
  if (lstatIfExists(filePath)?.isSymbolicLink()) {
    throw new Error(t(lang, "writeSymlinkRefused", filePath));
  }
}

function lstatIfExists(filePath) {
  return fs.lstatSync(filePath, { throwIfNoEntry: false }) ?? null;
}

function isPathInside(root, target) {
  const relativePath = path.relative(root, target);
  return relativePath === "" || (!relativePath.startsWith("..") && !path.isAbsolute(relativePath));
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeList(value, fallback) {
  const values = value === undefined || value === true ? [] : Array.isArray(value) ? value : [value];
  const list = [];
  for (const valueItem of values) {
    for (const part of String(valueItem).split(",")) {
      const trimmed = part.trim();
      if (trimmed) {
        list.push(trimmed);
      }
    }
  }
  return list.length > 0 ? list : fallback;
}

function normalizeBuildFormat(value) {
  const format = String(value).trim().toLowerCase();
  if (format === "markdown" || format === "md") {
    return "markdown";
  }

  if (format === "epub" || format === "docx") {
    return format;
  }

  throw new Error(t(lang, "unsupportedFormat", value));
}

function validateStoryFrontmatter(project, errors, lang) {
  const data = project.story.data;
  requireFields(data, ["title", "schema-version", "genre", "status", "themes", "pov", "tense"], "story.md", errors, lang);
  requireScalar(data, "title", "story.md", errors, lang);
  requireScalar(data, "genre", "story.md", errors, lang);
  requireScalar(data, "status", "story.md", errors, lang);
  requireArray(data, "themes", "story.md", errors, lang);
  requireScalar(data, "pov", "story.md", errors, lang);
  requireScalar(data, "tense", "story.md", errors, lang);
  validateEnum(data, "status", STORY_STATUSES, "story.md", errors, lang);
  validateEnum(data, "tense", STORY_TENSES, "story.md", errors, lang);
  if (data["schema-version"] !== undefined && data["schema-version"] !== STORY_SCHEMA_VERSION) {
    errors.push(td(lang, "diagSchemaVersionMustBe", STORY_SCHEMA_VERSION));
  }
}

function validateIndexFrontmatter(project, errors, lang) {
  for (const [relativePath, expectedType] of INDEX_SCHEMAS) {
    const label = relativePath;
    const data = readMarkdown(path.join(project.root, relativePath), project.root).data;
    requireFields(data, ["type", "story"], label, errors, lang);
    requireScalar(data, "type", label, errors, lang);
    requireScalar(data, "story", label, errors, lang);
    if (data.type !== undefined && data.type !== expectedType) {
      errors.push(td(lang, "diagRegistryTypeMustBe", label, expectedType));
    }

    if (data.story !== undefined && data.story !== project.storyId) {
      errors.push(td(lang, "diagStoryIdMustMatch", label, project.storyId));
    }

    if (relativePath === path.join("plot", "_index.md")) {
      requireFields(data, ["structure"], label, errors, lang);
      requireScalar(data, "structure", label, errors, lang);
    }
  }
}

function validateCharacters(project, errors, lang) {
  for (const character of project.characters) {
    const label = relative(project, character.file);
    const data = readMarkdown(character.file, project.root).data;
    validateEntityId(character.id, label, errors, lang);
    requireFields(data, ["name", "role", "status"], label, errors, lang);
    requireScalar(data, "name", label, errors, lang);
    requireScalar(data, "role", label, errors, lang);
    requireScalar(data, "status", label, errors, lang);
    validateEnum(data, "role", CHARACTER_ROLES, label, errors, lang);
    validateEnum(data, "status", CHARACTER_STATUSES, label, errors, lang);
    if (data["died-in"] !== undefined) {
      requireScalar(data, "died-in", label, errors, lang);
    }
    validateStringArray(data, "aliases", label, errors, lang);
    validateStringArray(data, "locations", label, errors, lang);
    validateStringArray(data, "tags", label, errors, lang);
    validateRelationships(data, label, errors, lang);
  }
}

function validateLocations(project, errors, lang) {
  for (const location of project.locations) {
    const label = relative(project, location.file);
    const data = readMarkdown(location.file, project.root).data;
    validateEntityId(location.id, label, errors, lang);
    requireFields(data, ["name", "type"], label, errors, lang);
    requireScalar(data, "name", label, errors, lang);
    requireScalar(data, "type", label, errors, lang);
    validateStringArray(data, "notable-characters", label, errors, lang);
    validateStringArray(data, "tags", label, errors, lang);
  }
}

function validateSystems(project, errors, lang) {
  for (const system of project.systems) {
    const label = relative(project, system.file);
    const data = readMarkdown(system.file, project.root).data;
    validateEntityId(system.id, label, errors, lang);
    requireFields(data, ["name", "type"], label, errors, lang);
    requireScalar(data, "name", label, errors, lang);
    requireScalar(data, "type", label, errors, lang);
    if (data.prevalence !== undefined) {
      requireScalar(data, "prevalence", label, errors, lang);
    }
  }
}

function validateFactions(project, errors, lang) {
  for (const faction of project.factions) {
    const label = relative(project, faction.file);
    const data = readMarkdown(faction.file, project.root).data;
    validateEntityId(faction.id, label, errors, lang);
    requireFields(data, ["name", "type", "status"], label, errors, lang);
    requireScalar(data, "name", label, errors, lang);
    requireScalar(data, "type", label, errors, lang);
    requireScalar(data, "status", label, errors, lang);
    validateEnum(data, "type", FACTION_TYPES, label, errors, lang);
    validateEnum(data, "status", FACTION_STATUSES, label, errors, lang);
    validateStringArray(data, "members", label, errors, lang);
    validateStringArray(data, "locations", label, errors, lang);
    validateStringArray(data, "tags", label, errors, lang);
  }
}

function validateArtifacts(project, errors, lang) {
  for (const artifact of project.artifacts) {
    const label = relative(project, artifact.file);
    const data = readMarkdown(artifact.file, project.root).data;
    validateEntityId(artifact.id, label, errors, lang);
    requireFields(data, ["name", "type", "status"], label, errors, lang);
    requireScalar(data, "name", label, errors, lang);
    requireScalar(data, "type", label, errors, lang);
    requireScalar(data, "status", label, errors, lang);
    requireScalar(data, "owner", label, errors, lang);
    requireScalar(data, "location", label, errors, lang);
    validateEnum(data, "type", ARTIFACT_TYPES, label, errors, lang);
    validateEnum(data, "status", ARTIFACT_STATUSES, label, errors, lang);
    validateStringArray(data, "tags", label, errors, lang);
  }
}

function validateArcs(project, errors, lang) {
  for (const arc of project.arcs) {
    const label = relative(project, arc.file);
    const data = readMarkdown(arc.file, project.root).data;
    validateEntityId(arc.id, label, errors, lang);
    requireFields(data, ["name", "type", "status"], label, errors, lang);
    requireScalar(data, "name", label, errors, lang);
    requireScalar(data, "type", label, errors, lang);
    requireScalar(data, "status", label, errors, lang);
    validateEnum(data, "type", ARC_TYPES, label, errors, lang);
    validateEnum(data, "status", ARC_STATUSES, label, errors, lang);
    validateStringArray(data, "characters", label, errors, lang);
    validateStringArray(data, "themes", label, errors, lang);
    validateStringArray(data, "acts", label, errors, lang);
  }
}

function validateChapters(project, errors, lang) {
  const seenNumbers = new Map();

  for (const chapter of project.chapters) {
    const label = relative(project, chapter.file);
    const data = readMarkdown(chapter.file, project.root).data;
    const filenameNumber = chapterNumberFromFile(chapter.file);

    validateEntityId(chapter.id, label, errors, lang);
    requireFields(data, ["title", "number", "status"], label, errors, lang);
    requireScalar(data, "title", label, errors, lang);
    requireScalar(data, "status", label, errors, lang);
    requireInteger(data, "number", label, errors, lang);
    validateEnum(data, "status", CHAPTER_STATUSES, label, errors, lang);
    validateStringArray(data, "locations", label, errors, lang);
    validateStringArray(data, "characters", label, errors, lang);
    validateStringArray(data, "mentions", label, errors, lang);
    validateStringArray(data, "arcs-advanced", label, errors, lang);
    if (data.pov !== undefined) {
      requireScalar(data, "pov", label, errors, lang);
    }
    if (data["word-count"] !== undefined) {
      requireInteger(data, "word-count", label, errors, lang);
    }

    if (filenameNumber === 0) {
      errors.push(td(lang, "diagChapterFilenameMismatch", label));
    } else if (Number.isInteger(data.number) && data.number !== filenameNumber) {
      errors.push(td(lang, "diagChapterNumberMismatch", label, filenameNumber));
    }

    if (Number.isInteger(data.number)) {
      if (data.number <= 0) {
        errors.push(td(lang, "diagChapterNumberMustBePositive", label));
      }

      const existing = seenNumbers.get(data.number);
      if (existing) {
        errors.push(td(lang, "diagChapterDuplicate", label, data.number, existing));
      } else {
        seenNumbers.set(data.number, label);
      }
    }
  }
}

function validateScenes(project, errors, lang) {
  for (const scene of project.scenes) {
    const label = relative(project, scene.file);
    const data = readMarkdown(scene.file, project.root).data;
    validateEntityId(scene.id, label, errors, lang);
    requireFields(data, ["title", "chapter", "scene", "status"], label, errors, lang);
    requireScalar(data, "title", label, errors, lang);
    requireScalar(data, "chapter", label, errors, lang);
    requireScalar(data, "status", label, errors, lang);
    requireInteger(data, "scene", label, errors, lang);
    validateEnum(data, "status", SCENE_STATUSES, label, errors, lang);
    validateStringArray(data, "characters", label, errors, lang);
    validateStringArray(data, "mentions", label, errors, lang);
    validateStringArray(data, "arcs-advanced", label, errors, lang);
    validateObjectArray(data, "state-changes", label, errors, lang);
    if (data.pov !== undefined) {
      requireScalar(data, "pov", label, errors, lang);
    }
    if (data.location !== undefined) {
      requireScalar(data, "location", label, errors, lang);
    }
    if (Number.isInteger(data.scene) && data.scene <= 0) {
      errors.push(td(lang, "diagSceneNumberMustBePositive", label));
    }
  }
}

function validateContinuityState(project, errors, lang) {
  const label = path.join("continuity", "state.md");
  const data = project.continuity.data;
  requireFields(data, ["type", "story", "current-chapter"], label, errors, lang);
  requireScalar(data, "type", label, errors, lang);
  requireScalar(data, "story", label, errors, lang);
  requireInteger(data, "current-chapter", label, errors, lang);
  validateObjectArray(data, "character-state", label, errors, lang);
  validateObjectArray(data, "object-state", label, errors, lang);
  validateObjectArray(data, "knowledge-state", label, errors, lang);
  if (data.type !== undefined && data.type !== "continuity-state") {
    errors.push(td(lang, "diagRegistryTypeMustBe", label, "continuity-state"));
  }
  if (data.story !== undefined && data.story !== project.storyId) {
    errors.push(td(lang, "diagStoryIdMustMatch", label, project.storyId));
  }
}

function validateQuestions(project, errors, lang) {
  for (const question of project.questions) {
    const label = relative(project, question.file);
    const data = readMarkdown(question.file, project.root).data;
    validateEntityId(question.id, label, errors, lang);
    requireFields(data, ["title", "status"], label, errors, lang);
    requireScalar(data, "title", label, errors, lang);
    requireScalar(data, "status", label, errors, lang);
    requireScalar(data, "introduced", label, errors, lang);
    requireScalar(data, "resolved", label, errors, lang);
    validateEnum(data, "status", QUESTION_STATUSES, label, errors, lang);
    validateStringArray(data, "characters", label, errors, lang);
  }
}

function validatePromises(project, errors, lang) {
  for (const promise of project.promises) {
    const label = relative(project, promise.file);
    const data = readMarkdown(promise.file, project.root).data;
    validateEntityId(promise.id, label, errors, lang);
    requireFields(data, ["title", "status"], label, errors, lang);
    requireScalar(data, "title", label, errors, lang);
    requireScalar(data, "status", label, errors, lang);
    requireScalar(data, "planted", label, errors, lang);
    requireScalar(data, "payoff", label, errors, lang);
    validateEnum(data, "status", PROMISE_STATUSES, label, errors, lang);
    validateStringArray(data, "arcs", label, errors, lang);
    validateStringArray(data, "characters", label, errors, lang);
  }
}

function validateGlossaryTerms(project, errors, lang) {
  for (const term of project.glossaryTerms) {
    const label = relative(project, term.file);
    const data = readMarkdown(term.file, project.root).data;
    validateEntityId(term.id, label, errors, lang);
    requireFields(data, ["term", "category"], label, errors, lang);
    requireScalar(data, "term", label, errors, lang);
    requireScalar(data, "category", label, errors, lang);
    validateEnum(data, "category", TERM_CATEGORIES, label, errors, lang);
    validateStringArray(data, "aliases", label, errors, lang);
  }
}

function validateEntityId(id, label, errors, lang) {
  if (id !== kebabCase(id)) {
    errors.push(td(lang, "diagFilenameNotKebab", label));
  }
}

function requireScalar(data, field, label, errors, lang) {
  if (data[field] !== undefined && (Array.isArray(data[field]) || typeof data[field] === "object")) {
    errors.push(td(lang, "diagMustBeScalar", label, field));
  }
}

function requireArray(data, field, label, errors, lang) {
  if (data[field] !== undefined && !Array.isArray(data[field])) {
    errors.push(td(lang, "diagMustBeList", label, field));
  }
}

function requireInteger(data, field, label, errors, lang) {
  if (data[field] !== undefined && !Number.isInteger(data[field])) {
    errors.push(td(lang, "diagMustBeInteger", label, field));
  }
}

function validateStringArray(data, field, label, errors, lang) {
  if (data[field] === undefined) {
    return;
  }

  if (!Array.isArray(data[field])) {
    errors.push(td(lang, "diagMustBeList", label, field));
    return;
  }

  for (const item of data[field]) {
    if (typeof item !== "string" || item.trim() === "") {
      errors.push(td(lang, "diagListItemNotString", label, field));
    }
  }
}

function validateObjectArray(data, field, label, errors, lang) {
  if (data[field] === undefined) {
    return;
  }

  if (!Array.isArray(data[field])) {
    errors.push(td(lang, "diagMustBeList", label, field));
    return;
  }

  for (const item of data[field]) {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      errors.push(td(lang, "diagListItemNotObject", label, field));
    }
  }
}

function validateRelationships(data, label, errors, lang) {
  if (data.relationships === undefined) {
    return;
  }

  if (!Array.isArray(data.relationships)) {
    errors.push(td(lang, "diagFieldRelationshipsMustBeList", label));
    return;
  }

  for (const relationship of data.relationships) {
    if (!relationship || typeof relationship !== "object" || Array.isArray(relationship)) {
      errors.push(td(lang, "diagFieldRelationshipsMustBeObjects", label));
      continue;
    }

    if (typeof relationship.character !== "string" || relationship.character.trim() === "") {
      errors.push(td(lang, "diagRelationshipMissingCharacter", label));
    } else if (relationship.character !== kebabCase(relationship.character)) {
      errors.push(td(lang, "diagFilenameNotKebab", label));
    }

    if (typeof relationship.type !== "string" || relationship.type.trim() === "") {
      errors.push(td(lang, "diagRelationshipMissingType", label, relationship.character));
    }
  }
}

function validateEnum(data, field, allowed, label, errors, lang) {
  if (data[field] !== undefined && typeof data[field] === "string" && !allowed.has(data[field])) {
    errors.push(td(lang, "diagBadEnumValue", label, field, data[field]));
  }
}

function inverseRelationshipType(type) {
  if (RELATIONSHIP_INVERSES.has(type)) {
    return RELATIONSHIP_INVERSES.get(type);
  }

  return SYMMETRIC_RELATIONSHIPS.has(type) ? type : "";
}

function formatCheck(result) {
  const status = result.ok ? "ok" : "failed";
  return `${status} (${result.errors.length} errors, ${result.warnings.length} warnings)`;
}

function requireFields(data, fields, label, errors, lang) {
  for (const field of fields) {
    if (data[field] === undefined || data[field] === "") {
      errors.push(td(lang, "diagFrontmatterFieldMissing", label, field));
    }
  }
}

function chapterNumberFromFile(file) {
  const match = /chapter-(\d+)/.exec(path.basename(file));
  return match ? Number.parseInt(match[1], 10) : 0;
}

function relative(project, file) {
  return path.relative(project.root, file);
}


// ===== src\import.js =====

const CHAPTER_HEADING_PATTERN = /^chapter\s*(?:\d+|[ivxlc]+)?\s*[:.\-–—]*\s*(.*)$/i;
const src_import_js_FRONTMATTER_PATTERN = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/;
const CANDIDATE_THRESHOLD = 3;
const CANDIDATE_LIMIT = 25;
const CANDIDATE_STOPWORDS = new Set([
  "A", "An", "And", "At", "But", "By", "Dr", "For", "He", "Her", "His", "I", "If", "In", "It", "Its",
  "Mr", "Mrs", "Ms", "No", "Not", "Of", "On", "Or", "She", "That", "The", "Then", "They", "Their",
  "This", "To", "We", "When", "While", "With", "Yes", "You"
]);

export function importManuscript(options, lang = "en") {
  const rawSource = String(options.source ?? "").trim();
  if (!rawSource) {
    throw new Error(t(lang, "missingSource"));
  }

  const cwd = options.cwd ?? process.cwd();
  const source = path.resolve(cwd, rawSource);
  if (!fs.existsSync(source)) {
    throw new Error(t(lang, "importSourceNotFound", source));
  }

  const chapters = splitChapters(readSourceDocuments(source));
  if (chapters.length === 0) {
    throw new Error(t(lang, "noImportContent"));
  }

  const created = createStoryProject({
    title: options.title,
    cwd,
    dir: options.dir,
    genre: options.genre,
    subGenre: options.subGenre,
    settingEra: options.settingEra,
    themes: options.themes,
    pov: options.pov,
    tense: options.tense,
    synopsis: options.synopsis ?? `Imported from ${path.basename(source)}. Replace with a 2-3 sentence synopsis.`,
    force: options.force
  });

  let totalWords = 0;
  chapters.forEach((chapter, index) => {
    const number = index + 1;
    const words = wordCount(chapter.prose);
    totalWords += words;
    const file = path.join(created.root, "chapters", `chapter-${String(number).padStart(2, "0")}.md`);
    fs.writeFileSync(file, chapterMarkdown(chapter.title, number, words, chapter.prose), "utf8");
  });

  reindexProject(created.root);

  return {
    root: created.root,
    storyId: created.storyId,
    chapters: chapters.length,
    words: totalWords,
    candidates: extractNameCandidates(chapters.map((chapter) => chapter.prose).join("\n\n"))
  };
}

export function extractNameCandidates(prose) {
  const counts = new Map();

  for (const match of prose.matchAll(/\b[A-Z][a-z']+(?:\s+[A-Z][a-z']+)+\b/g)) {
    const words = match[0].replace(/\s+/g, " ").split(" ");
    while (words.length > 0 && CANDIDATE_STOPWORDS.has(words[0])) {
      words.shift();
    }
    if (words.length > 0) {
      addCandidate(counts, words.join(" "));
    }
  }

  for (const match of prose.matchAll(/(?<=[a-z][,;:]?\s)(?<![A-Z][a-z']*\s)[A-Z][a-z']+\b(?!\s+[A-Z][a-z'])/g)) {
    if (!CANDIDATE_STOPWORDS.has(match[0])) {
      addCandidate(counts, match[0]);
    }
  }


  // CJK name extraction: 1-4 consecutive Han characters are treated as a candidate.
  // The candidate is reported verbatim so the user can rename it via `story rename`.
  for (const match of prose.matchAll(/[\u4e00-\u9fff]{2}/g)) {
    const candidate = match[0];
    if (!CANDIDATE_STOPWORDS.has(candidate)) {
      addCandidate(counts, candidate);
    }
  }
  return [...counts.entries()]
    .filter(([, count]) => count >= CANDIDATE_THRESHOLD)
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, CANDIDATE_LIMIT)
    .map(([name, count]) => ({ name, count }));
}

function addCandidate(counts, name) {
  counts.set(name, (counts.get(name) ?? 0) + 1);
}

function readSourceDocuments(source) {
  if (fs.statSync(source).isFile()) {
    return [{ name: path.basename(source), text: fs.readFileSync(source, "utf8") }];
  }

  const documents = fs.readdirSync(source, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.(md|markdown|txt)$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort()
    .map((name) => ({ name, text: fs.readFileSync(path.join(source, name), "utf8") }));

  if (documents.length === 0) {
    throw new Error(t(lang, "noImportFiles", source));
  }

  return documents;
}

function splitChapters(documents) {
  const chapters = [];

  for (const document of documents) {
    const text = document.text.replace(src_import_js_FRONTMATTER_PATTERN, "").replace(/\r\n/g, "\n");
    const sections = splitByChapterHeadings(text);
    if (sections.length > 0) {
      chapters.push(...sections);
    } else {
      chapters.push(singleChapter(text, document.name));
    }
  }

  return chapters.filter((chapter) => chapter.prose !== "");
}

function splitByChapterHeadings(text) {
  const lines = text.split("\n");
  const sections = [];
  let current = null;
  const preamble = [];

  for (const line of lines) {
    const heading = /^#{1,6}\s+(.*)$/.exec(line);
    const chapterMatch = heading ? CHAPTER_HEADING_PATTERN.exec(heading[1].trim()) : null;
    if (chapterMatch) {
      if (current) {
        sections.push(finishChapter(current));
      }
      current = { title: chapterMatch[1].trim() || heading[1].trim(), lines: [] };
    } else if (current) {
      current.lines.push(line);
    } else {
      preamble.push(line);
    }
  }

  if (!current) {
    return [];
  }

  sections.push(finishChapter(current));
  const opening = stripTitleHeading(preamble.join("\n")).trim();
  if (opening !== "") {
    sections.unshift({ title: "Opening", prose: opening });
  }

  return sections;
}

function finishChapter(section) {
  return { title: section.title, prose: section.lines.join("\n").trim() };
}

function singleChapter(text, fileName) {
  const headingMatch = /^#\s+(.*)$/m.exec(text);
  if (headingMatch) {
    return {
      title: headingMatch[1].trim(),
      prose: text.slice(headingMatch.index + headingMatch[0].length).trim()
    };
  }

  return {
    title: titleCaseSlug(path.basename(fileName, path.extname(fileName))),
    prose: text.trim()
  };
}

function stripTitleHeading(text) {
  return text.replace(/^\s*#\s+[^\n]*\n?/, "");
}

function chapterMarkdown(title, number, words, prose) {
  return `${stringifyFrontmatter({
    title,
    number,
    pov: "",
    locations: [],
    characters: [],
    "arcs-advanced": [],
    status: "draft",
    "word-count": words
  })}# Chapter ${number}: ${title}

## Chapter Text

${prose}
`;
}


// ===== src\cli.js =====



export function runCli(argv, io) {
  const parsed = parseArgs(argv);
  const lang = resolveLang(parsed.options);
  setLang(lang);
  const cwd = io.cwd ?? process.cwd();
  const command = parsed.positionals[0];

  try {
    if (!command || command === "help" || parsed.options.help) {
      io.stdout.write(getHelp(lang));
      return 0;
    }

    if (command === "init") {
      const title = parsed.positionals.slice(1).join(" ");
      const result = createStoryProject({
        title,
        cwd,
        dir: parsed.options.dir,
        genre: parsed.options.genre,
        subGenre: parsed.options["sub-genre"],
        settingEra: parsed.options["setting-era"],
        themes: collectThemes(parsed.options),
        pov: parsed.options.pov,
        tense: parsed.options.tense,
        synopsis: parsed.options.synopsis,
        force: Boolean(parsed.options.force)
      }, lang);
      io.stdout.write(t(lang, "projectCreated", result.root) + "\n");
      return 0;
    }

    if (command === "import") {
      const result = importManuscript({
        source: parsed.positionals[1],
        title: parsed.options.title,
        cwd,
        dir: parsed.options.dir,
        genre: parsed.options.genre,
        subGenre: parsed.options["sub-genre"],
        settingEra: parsed.options["setting-era"],
        themes: collectThemes(parsed.options),
        pov: parsed.options.pov,
        tense: parsed.options.tense,
        synopsis: parsed.options.synopsis,
        force: Boolean(parsed.options.force)
      }, lang);
      io.stdout.write(t(lang, "importedWithCount", result.chapters, result.words, result.root));
      if (result.candidates.length > 0) {
        io.stdout.write(t(lang, "candidatesHeader"));
        for (const candidate of result.candidates) {
          io.stdout.write(t(lang, "candidate", candidate.name, candidate.count));
        }
      }
      return 0;
    }

    const root = assertSafeProjectPathCli(path.resolve(cwd, parsed.positionals[1] ?? "."), cwd, lang);
    if (command === "validate") {
      return reportResult(io, validateProject(root, { lang }), lang, t(lang, "valid"), t(lang, "validFail"));
    }

    if (command === "links") {
      return reportResult(io, validateLinks(root, { lang }), lang, t(lang, "linksValid"), t(lang, "linksFail"));
    }

    if (command === "continuity") {
      return reportResult(io, checkProjectContinuity(root, { lang }), lang, t(lang, "continuityValid"), t(lang, "continuityFail"));
    }

    if (command === "report") {
      io.stdout.write(formatProjectReport(projectReport(root), { actionable: Boolean(parsed.options.actionable) }));
      return 0;
    }

    if (command === "next") {
      io.stdout.write(formatActionReport(projectActions(root)));
      return 0;
    }

    if (command === "doctor") {
      io.stdout.write(formatDoctorReport(projectActions(root)));
      return 0;
    }

    if (command === "migrate") {
      const result = migrateProject(root);
      io.stdout.write(result.changed.length === 0
        ? t(lang, "alreadyCurrent")
        : t(lang, "migrated", result.changed.length));
      return 0;
    }

    if (command === "add") {
      const result = createEntity(targetRoot(cwd, parsed), {
        ...parsed.options,
        kind: parsed.positionals[1],
        name: parsed.positionals.slice(2).join(" ")
      }, lang);
      io.stdout.write(t(lang, "created", result.kind, result.id, result.file));
      return 0;
    }

    if (command === "rename") {
      const result = renameEntity(targetRoot(cwd, parsed), {
        ...parsed.options,
        kind: parsed.positionals[1],
        id: parsed.positionals[2],
        name: parsed.positionals.slice(3).join(" ")
      }, lang);
      io.stdout.write(t(lang, "renamed", result.kind, result.oldId, result.id, result.file));
      return 0;
    }

    if (command === "remove") {
      const result = removeEntity(targetRoot(cwd, parsed), {
        ...parsed.options,
        kind: parsed.positionals[1],
        id: parsed.positionals[2]
      }, lang);
      io.stdout.write(t(lang, "removed", result.kind, result.id, result.file));
      return 0;
    }

    if (command === "reindex") {
      const result = reindexProject(root);
      io.stdout.write(result.changed.length === 0
        ? t(lang, "reindexCurrent")
        : t(lang, "reindexed", result.changed.length));
      return 0;
    }

    if (command === "wordcount") {
      const result = computeWordCounts(root, { write: Boolean(parsed.options.write) });
      for (const chapter of result.chapters) {
        io.stdout.write(t(lang, "chapterWords", chapter.file, chapter.wordCount) + "\n");
      }
      io.stdout.write(t(lang, "totalWords", result.total) + "\n");
      return 0;
    }

    if (command === "export") {
      const result = exportManuscript(root, { out: parsed.options.out }, lang);
      io.stdout.write(t(lang, "exported", result.chapters, result.outFile) + "\n");
      return 0;
    }

    if (command === "build") {
      const result = buildBook(root, {
        out: parsed.options.out,
        format: parsed.options.format
      }, lang);
      io.stdout.write(t(lang, "built", result.chapters, result.format, result.outFile) + "\n");
      return 0;
    }

    io.stderr.write(t(lang, "unknownCommand", command) + getHelp(lang));
    return 1;
  } catch (error) {
    io.stderr.write(`${error.message}\n`);
    return 1;
  }
}

export function parseArgs(argv) {
  const positionals = [];
  const options = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "-h" || arg === "--help") {
      options.help = true;
      continue;
    }

    if (!arg.startsWith("--")) {
      positionals.push(arg);
      continue;
    }

    const equalIndex = arg.indexOf("=");
    const key = arg.slice(2, equalIndex === -1 ? undefined : equalIndex);
    const inlineValue = equalIndex === -1 ? undefined : arg.slice(equalIndex + 1);
    const nextValue = argv[index + 1];
    const hasSeparateValue = inlineValue === undefined && nextValue !== undefined && !nextValue.startsWith("-");
    const value = inlineValue ?? (hasSeparateValue ? nextValue : true);

    if (hasSeparateValue) {
      index += 1;
    }

    if (options[key] === undefined) {
      options[key] = value;
    } else {
      options[key] = Array.isArray(options[key]) ? options[key].concat(value) : [options[key], value];
    }
  }

  return { positionals, options };
}

function collectThemes(options) {
  return []
    .concat(options.theme ?? [])
    .concat(options.themes ?? [])
    .filter((value) => value !== undefined && value !== true);
}

function targetRoot(cwd, parsed) {
  return path.resolve(cwd, parsed.options.path ?? ".");
}

function reportResult(io, result, lang, successMessage, failureMessage) {
  const output = result.ok ? io.stdout : io.stderr;
  output.write(`${result.ok ? successMessage : failureMessage}` + t(lang, "summary", result.errors.length, result.warnings.length));

  for (const error of result.errors) {
    io.stderr.write(`error: ${error}\n`);
  }

  for (const warning of result.warnings) {
    output.write(`warning: ${warning}\n`);
  }

  return result.ok ? 0 : 1;
}


// ===== bin\story.js =====

process.exitCode = runCli(process.argv.slice(2), {
  cwd: process.cwd(),
  stdout: process.stdout,
  stderr: process.stderr
});

