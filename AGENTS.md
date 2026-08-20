<!--
Bilingual file / 双语文件
Chinese translation above, English original below.

Original / 原作品：Story Skills by Daniel Dewhurst (2026)
Source / 来源：https://github.com/danjdewhurst/story-skills
License / 许可证：MIT
-->

# Agent 指令（中文译本）

这些指令适用于整个 `story-skills` 仓库。

## 项目概览

Story Skills 是一个 Bun/Node 包，提供面向虚构写作工作流的 Agent Skills，外加一个小巧但确定性的 `story` CLI。核心格式是带 YAML frontmatter 的纯 markdown。技能负责指导创意工作流；CLI 处理机械性的维护工作，如校验、注册表重建、字数统计、链接检查、导出与可丢弃的构建。

主要目录：

- `skills/` - 已发布的 `SKILL.md` 工作流及其参考文件
- `src/` - `story` CLI 的源码模块
- `bin/story.js` - package 的二进制入口
- `skills/story-maintenance/scripts/story.js` - 拷贝安装场景下的 Node 兼容 fallback CLI
- `test/` - Bun 测试
- `examples/` - Story Skills 项目示例
- `.codex-plugin/`、`.claude-plugin/`、`.agents/` - 插件与 marketplace 元数据

## 开发命令

本地开发使用 Bun：

```shell
bun install
bun run story -- --help
bun run build:fallback
bun run check:fallback
bun run test
bun run test:coverage
```

日常验证用 `bun run test`。修改 `src/` 下的 CLI 行为后，跑 `bun run build:fallback` 重新生成 fallback，再用 `bun run check:fallback` 确认生成的 fallback 是最新的。当改动影响到 CLI 行为、解析、项目扫描、校验、fallback 生成或发布就绪度时，使用 `bun run test:coverage`。

## 实现规则

- 运行时代码兼容 Node 18，并保持 package 的 ESM 风格。
- 优先使用标准 `node:` 导入；在现有 CLI 代码已使用同步文件系统 API 的地方继续保持。
- 保留"以 markdown 为主"的项目模型。不要新增项目本地的生成器脚本或生成故事内容的构建脚本。
- 修改 `src/` 下的 CLI 行为后，跑 `bun run build:fallback` 重新生成 `skills/story-maintenance/scripts/story.js`，因为拷贝式安装依赖该 fallback。
- 为行为改动新增或更新聚焦的 Bun 测试。
- 示例要保持真实可用；若修改故事项目格式，示例与测试要同步更新。

## 技能编写规范

- 每个技能位于 `skills/<skill-name>/SKILL.md`，YAML frontmatter 包含 `name` 与 `description`。
- 技能指令要面向 Agent 且可操作：读什么、改什么、跑哪些检查、何时向用户确认。
- 参考文件放在对应技能的 `references/` 目录。
- 故事实体使用 kebab-case 标识符，并在领域需要双向链接处维护反向引用。
- 在涉及新增/删除/重命名/修改故事实体的指令之后，要引导 Agent 跑相应的维护命令：`story reindex`、`story wordcount --write`、`story links` 与/或 `story validate`。

## Git 与提交

- 使用 Conventional Commits 风格，例如 `feat: add chapter export option`、`fix: repair registry validation` 或 `docs: update skill instructions`。
- 一次提交只对应一个逻辑变更。

## 发布元数据

发布时，保持以下文件的版本号一致：

- `package.json`
- `.codex-plugin/plugin.json`
- `.claude-plugin/plugin.json`

除非现有发布流程有变化，marketplace 条目应保持无版本号。

## 自动产物与本地工件

不要提交：

- `node_modules/`
- `coverage/`
- 示例 `dist/` 目录下自动生成的故事构建产物（除非明确要求）
- 编辑器或系统的交换文件

## 评审清单

完成代码或技能修改前自检：

- 相关测试通过。
- CLI 帮助与技能文档在命令名与选项上仍然一致。
- 内置的维护 fallback 是最新的：`bun run check:fallback`。
- 内置的维护 fallback 仍可用 Node 运行：`node skills/story-maintenance/scripts/story.js --help`。
- Story Skills 项目的注册表、反向链接与字数统计仍然是确定性的。

---

# Agent Instructions (English Original)

These instructions apply to the entire `story-skills` repository.

## Project Overview

Story Skills is a Bun/Node package that ships Agent Skills for fiction-writing workflows plus a small deterministic `story` CLI. The core format is plain markdown with YAML frontmatter. Skills guide creative workflows; the CLI handles mechanical maintenance such as validation, registry rebuilds, word counts, link checks, exports, and disposable builds.

Primary paths:

- `skills/` - published `SKILL.md` workflows and their reference files
- `src/` - source modules for the `story` CLI
- `bin/story.js` - package binary entrypoint
- `skills/story-maintenance/scripts/story.js` - Node-compatible bundled fallback CLI for copied skill installs
- `test/` - Bun tests
- `examples/` - sample Story Skills projects
- `.codex-plugin/`, `.claude-plugin/`, `.agents/` - plugin and marketplace metadata

## Development Commands

Use Bun for local development:

```shell
bun install
bun run story -- --help
bun run build:fallback
bun run check:fallback
bun run test
bun run test:coverage
```

Use `bun run test` for normal verification. Use `bun run build:fallback` after changing CLI behavior in `src/`, then use `bun run check:fallback` to confirm the generated fallback is current. Use `bun run test:coverage` when changes affect CLI behavior, parsing, project scanning, validation, fallback generation, or release readiness.

## Implementation Rules

- Keep runtime code compatible with Node 18 and the package's ESM style.
- Prefer standard `node:` imports and synchronous filesystem APIs where existing CLI code already uses them.
- Preserve the markdown-first project model. Do not add project-local generator scripts or build scripts that emit story content.
- When modifying CLI behavior in `src/`, run `bun run build:fallback` to regenerate `skills/story-maintenance/scripts/story.js` because copied skill installs rely on that fallback.
- Add or update focused Bun tests for behavior changes.
- Keep examples realistic and valid; if you change the story project format, update examples and tests together.

## Skill Authoring

- Every skill lives in `skills/<skill-name>/SKILL.md` with YAML frontmatter containing `name` and `description`.
- Keep skill instructions operational and agent-facing: what to read, what to edit, what checks to run, and when to ask the user.
- Reference files belong under the relevant skill's `references/` directory.
- Story entities should use kebab-case identifiers and maintain bidirectional links where the domain requires them.
- After instructions that add, remove, rename, or revise story entities, direct agents to run the appropriate maintenance commands: `story reindex`, `story wordcount --write`, `story links`, and/or `story validate`.

## Git And Commits

- Use Conventional Commits for commit messages, such as `feat: add chapter export option`, `fix: repair registry validation`, or `docs: update skill instructions`.
- Keep commits focused on one logical change.

## Release Metadata

For published changes, keep version metadata aligned across:

- `package.json`
- `.codex-plugin/plugin.json`
- `.claude-plugin/plugin.json`

Marketplace entries should remain unversioned unless the existing release process changes.

## Generated And Local Artifacts

Do not commit:

- `node_modules/`
- `coverage/`
- generated story build output under example `dist/` directories unless explicitly requested
- editor or OS swap files

## Review Checklist

Before finishing code or skill changes, check:

- The relevant tests pass.
- CLI help and skill docs still agree on command names and options.
- The bundled maintenance fallback is current: `bun run check:fallback`.
- The bundled maintenance fallback still runs with Node: `node skills/story-maintenance/scripts/story.js --help`.
- Registries, backlinks, and word counts remain deterministic for Story Skills projects.
