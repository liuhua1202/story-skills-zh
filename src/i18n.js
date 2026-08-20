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