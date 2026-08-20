<!--
Shared canonical reference / CLI 调用方式统一约定
Source of truth for: story-init, character-management, worldbuilding, plot-structure, chapter-writing, revision-continuity, story-maintenance
修改本文件 = 修改所有 skill 的 CLI 行为
-->

# Story CLI 调用优先级

> 本文件是 Story CLI 三种调用方式的唯一权威说明。所有 SKILL.md 在引用 CLI 时必须用本文件的优先级与名称。
>
> 引用方式：用一句 "CLI 优先级见 `../common/cli-priority.md`" 替代过去直接写的同内容段落。

---

## 三种调用方式（按优先级）

1. **`story <command>`** —— Story CLI 已通过 `npm install -g` / 仓库 bin 安装到 `PATH`。
2. **`bun run story -- <command>`** —— 在 `story-skills-zh/` 仓库根目录里跑(开发态,bin 还在源码层)。
3. **`node scripts/story.js <command>`** —— bundled 后备。`scripts/story.js` 是 `bin/story.js` 经 `bun build` 编译出的 Node 兼容副本,路径相对 `skills/story-maintenance/` 解析。**拷贝式安装场景依赖这一档**。

三者都没有时,回退到手工作法：**严格按 `story-init` SKILL.md 第三步起的目录骨架与文件模板手工创建**。

## 选择原则

- Agent 在用户工作目录跑时,**先探测** `command -v story`(POSIX)或 `Get-Command story`(PowerShell)能不能拿到。
- 不能拿到则探测 `package.json` 有没有声明 `bin.story`(`bun run story` 走仓库 bin)。
- 还不行则探测当前 skill 上级目录的 `../story-maintenance/scripts/story.js` 是否存在。
- 三级失败时报清晰错误："Story CLI 未安装；请先安装 `story-skills-zh` 或初始化项目"。

## 失败处理

- CLI 错误当可操作的维护发现对待(由 `story-maintenance` SKILL.md 的 "失败处理" 节管辖)。
- **不要为了过机械检查就覆盖掉创作正文或故事内容**。
- 验证警告如果是用户故意保留的数据,报告出来,不要静默改。
- 路径安全检查(`Refusing path traversal`、`Refusing to follow symbolic link`)——按字面提示改路径,不要试图绕过。

## 必跑的三件套(每次多文件编辑结束)

```shell
story reindex .   # 重建注册表
story links .     # 校验双向链接
story validate .  # 全面校验
```

`chapter-writing` 与 `revision-continuity` 还会再加 `story wordcount . --write` 与 `story continuity .` / `story doctor .`。