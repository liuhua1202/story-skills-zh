<!--
Bilingual file / 双语文件
Chinese translation above, English original below.
中文译本在上，英文原文在下。

Original work / 原作品：Story Skills by Daniel Dewhurst (2026)
Source / 来源：https://github.com/danjdewhurst/story-skills
License / 许可证：MIT (see LICENSE file in this directory)
Translation / 翻译说明：Functional documentation translation; structure, file
names, command names, identifiers, and code blocks are preserved verbatim.
-->

<div align="center">

# ✨ Story Skills · 故事写作技能集

**面向 Agent 的小说创作技能：用 markdown 来规划、追踪与撰写故事。**

Story Skills 为 Agent 提供一套统一的虚构作品项目格式：故事圣经、角色档案、世界观设定、阵营、关键道具、情节弧线、场景状态、连续性问题、伏笔/兑现、时间线与章节草稿。一切都是带 YAML frontmatter 的纯 markdown，并打包为标准的 Agent Skills，同时提供 Codex 与 Claude Code 插件支持。

配套的 CLI 把"故事圣经"当成可校验的契约：连续性引擎（continuity engine）能确定性地捕获"死角色复活""伏笔兑现早于埋设""契诃夫之枪未开火""过期的故事状态"等问题——在读者发现之前就先一步报错。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Agent Skills](https://img.shields.io/badge/Agent_Skills-SKILL.md-blue)](https://agentskills.io)
[![Codex](https://img.shields.io/badge/Codex-plugin-10A37F)](https://developers.openai.com/codex)
[![Claude Code](https://img.shields.io/badge/Claude_Code-plugin-blueviolet)](https://docs.anthropic.com/en/docs/claude-code)

</div>

---

> 基于开放的 **Agent Skills** 标准构建。可作为 **Codex** 或 **Claude Code** 插件安装，也可使用 Agent Skills CLI 安装，或者直接把 `skills/` 目录复制到任何支持 `SKILL.md` 的 Agent 中。

## 🚀 快速开始

```shell
# Codex 插件
codex plugin marketplace add danjdewhurst/story-skills
codex plugin add story-skills@story-skills

# Claude Code 插件
/plugin marketplace add danjdewhurst/story-skills
/plugin install story-skills@story-skills
```

如果你的 Agent 兼容 `SKILL.md`，也可以用 Agent Skills CLI 安装整个技能包：

```shell
npx skills add danjdewhurst/story-skills

# 或使用 Bun
bunx skills add danjdewhurst/story-skills
```

然后对 Agent 说 **「Start a new story / 开始一个新故事」** 即可搭建项目骨架。

## 🔎 连续性引擎（The Continuity Engine）

跨长程的一致性是语言模型最薄弱的环节，也是普通提示词修不好的问题。Story Skills 把这件事做成确定性的：角色生死、伏笔/兑现、未解悬念、场景出场名单、长期知识/物品状态都写在 frontmatter 里，`story continuity` 会像编译器检查类型错误一样对待剧情矛盾。

[`examples/the-unraveled-thread/`](examples/the-unraveled-thread/) 是一个"故意写崩"的悬疑示例。它能通过 `story validate` 与 `story links` —— 每个文件格式都正确——但剧情本身站不住：

```text
$ story continuity examples/the-unraveled-thread
Continuity check failed: 4 errors, 3 warnings
error: chapters/chapter-04.md lists edran-vale, who died in chapter-02; move posthumous appearances to mentions
error: continuity/promises/the-broken-compass.md pays off in chapter-02 before it is planted in chapter-03
error: continuity/questions/who-burned-the-mill.md resolves in chapter-02 before it is introduced in chapter-03
error: continuity/state.md knowledge-state[0] references missing chapter chapter-05
warning: chapters/chapter-03.md POV character nessa-thorn is not listed in characters
warning: continuity/promises/the-sealed-letter.md was planted in chapter-01, 3 chapters ago, and has no payoff yet
warning: continuity/state.md object-state[0] status active conflicts with worldbuilding/artifacts/vales-compass.md status destroyed
```

这些发现都精确到文件、可复现 —— CI 会在每次提交时断言它们。有意的闪回与死后提及，可以通过章节中的 `mentions` 字段合规地保留。`story doctor` 与 `story next` 把同样的检查整合进优先级化的修复动作。

## ✍️ 强烈推荐：Better Writing（更好的写作）

若想获得更强的章节草稿与修订质量，请把 [forjd/better-writing](https://github.com/forjd/better-writing) 与 Story Skills 一起安装。它提供语气校准、反"通稿式"写作检查与最终文笔润色。

```shell
npx skills add forjd/better-writing
```

或者用 Bun：

```shell
bunx skills add forjd/better-writing
```

Story Skills 单独也能用，但章节起草与修订在搭配 `better-writing` 时效果更好。

## 📦 安装

<details>
<summary><strong>Codex</strong></summary>

```shell
# 加入 marketplace
codex plugin marketplace add danjdewhurst/story-skills

# 安装插件
codex plugin add story-skills@story-skills
```

不通过插件安装，直接使用本地技能：

```shell
git clone https://github.com/danjdewhurst/story-skills.git
cp -r story-skills/skills/* ~/.agents/skills/

# 或者安装为仓库级技能（仅当前仓库可见）
cp -r story-skills/skills/* .agents/skills/
```

Codex 会自动识别仓库级与用户级技能。仍然推荐使用插件方式安装本技能包。

</details>

<details>
<summary><strong>Claude Code</strong></summary>

```shell
# 加入 marketplace
/plugin marketplace add danjdewhurst/story-skills

# 安装插件
/plugin install story-skills@story-skills
```

</details>

<details>
<summary><strong>任意支持 <code>SKILL.md</code> 的 Agent</strong></summary>

直接把 `skills/` 下的每个子目录复制到你的 Agent 能识别的技能目录中。

</details>

## 🧱 技能（Skills）

| 技能 / Skill | 用途 |
| --- | --- |
| `story-init` | 初始化故事项目（生成完整目录骨架与圣经） |
| `character-management` | 添加/编辑角色档案，处理双向关系 |
| `worldbuilding` | 维护地点、势力、关键物品、体系 |
| `plot-structure` | 规划情节弧线、伏笔、悬念与时间线 |
| `chapter-writing` | 基于既有设定撰写下一章节 |
| `revision-continuity` | 修订与连续性审查，捕获矛盾 |
| `story-maintenance` | CLI 命令与项目维护工具集 |

## 🛠️ 配套 CLI

技能指导创意工作流；CLI 处理机械性的维护工作：校验、注册表重建、字数统计、链接检查、导出与可丢弃的构建产物。

```shell
# 列出所有命令
story --help

# 重新生成 _index.md 注册表
story reindex

# 把字数写回 frontmatter
story wordcount --write

# 检查双向链接
story links

# 验证 frontmatter 与项目布局
story validate

# 跑连续性检查（角色生死、伏笔、状态等）
story continuity
```

CLI 是可选的。技能本身也能工作，但 CLI 能把维护工作自动化。详见 [`docs/first-20-minutes.md`](docs/first-20-minutes.md)。

## ✅ 验证（Sanity Check）

任何修改后都跑一遍：

```shell
bun run test
bun run check:fallback
node skills/story-maintenance/scripts/story.js --help
```

## 🤖 通过 Pull Request 自动写一本书

一个具备确定性检查的故事项目，可以被 Agent 在无人值守的情况下推进。[`templates/github/`](templates/github/) 中的工作流能把一个故事仓库变成"自我起草的成书流水线"：

- [`story-checks.yml`](templates/github/story-checks.yml) 在每次 push 与 PR 上跑 `story validate`、`story links`、`story continuity` —— 含连续性矛盾的章节 PR 无法合并。
- [`draft-next-chapter.yml`](templates/github/draft-next-chapter.yml) 按计划运行 [Claude Code](https://github.com/anthropics/claude-code-action)：调用 `story next` 获取下一步确定性动作，用 chapter-writing 技能起草下一章，更新场景记录与连续性状态，跑维护检查，并开一个 PR 等候审阅。

把这两个文件复制到你故事仓库的 `.github/workflows/`，再添加一个 `ANTHROPIC_API_KEY` secret，就能每天早上审阅一个章节 PR。

## 📥 导入已有稿件

大多数写作者并不是从空白页面起步的。`story import` 能把现成稿件反向工程成一个 Story Skills 项目：

```shell
story import draft.md --title "The Lost Coast" --genre mystery
```

它会按章节标题切分稿件（或导入一个章节目录），生成准确字数的完整项目布局与注册表，并打印出反复出现的人名候选，让 Agent 可以接着用 `story add character` 与 `story add location` 把圣经补全。

## 📁 项目结构

运行 **story-init** 会生成如下布局：

```
my-story/
├── story.md                  # 故事圣经：标题、类型、主题、视角、时态
├── characters/
│   └── _index.md             # 角色注册表
├── worldbuilding/
│   ├── _index.md             # 世界概览
│   ├── locations/
│   ├── systems/
│   ├── factions/
│   └── artifacts/
├── plot/
│   ├── _index.md             # 情节弧概览
│   ├── arcs/
│   └── timeline.md
├── scenes/
│   └── _index.md             # 机器可读的场景注册表
├── continuity/
│   ├── state.md              # 角色、物品与知识状态
│   ├── questions/
│   │   └── _index.md
│   └── promises/
│       └── _index.md
├── glossary/
│   ├── _index.md
│   └── terms/
└── chapters/
    └── _index.md             # 章节注册表
```

## ⚙️ 工作原理

每个故事元素都是一个带 YAML frontmatter 的 markdown 文件。技能之间相互引用，使项目保持一致：

- **`story.md`** 是顶层圣经，所有技能都会读取
- `story.md` 包含 **`schema-version: 2`**，CLI 据此识别不兼容的项目格式
- 角色、地点、弧线使用 **kebab-case 标识符**（如 `sera-voss`）
- **`_index.md`** 文件充当每个领域的注册表
- 关系与引用 **双向维护**
- 场景记录与连续性状态让角色知识、物品归属与埋设/兑现追踪持久化
- 故事内容直接以 markdown 创建；项目格式不包含自动生成的构建脚本

## 📖 示例

- 阅读 [**The Cormorant Tide**](https://github.com/danjdewhurst/the-cormorant-tide)，一个用 Story Skills 生成的完整故事项目。
- [`examples/the-last-ember/`](examples/the-last-ember/) 完整的奇幻示例：三个角色、两个地点、一套魔法体系、一个带伏笔的情节弧与第一章草稿。
- [`examples/harbor-of-second-light/`](examples/harbor-of-second-light/) 近未来海岸悬疑示例：记忆技术、死后证人弧线、完整的连续性状态与第一章草稿。
- [`examples/the-unraveled-thread/`](examples/the-unraveled-thread/) 一个故意写崩的项目，展示连续性引擎能捕获的每一类问题。

## 🚢 发布

Codex 使用 `.codex-plugin/plugin.json` 作为插件版本来源。Claude Code 使用 `.claude-plugin/plugin.json`。每次发布都要同时更新两处版本号，让已安装的用户能收到更新；marketplace 条目保持无版本号，避免出现重复的版本状态。发布前跑 `bun run check:metadata` 以确认 package 与插件元数据一致。

分发元数据：Claude Code 用 `.claude-plugin/`，Codex 用 `.codex-plugin/` 加 `.agents/plugins/marketplace.json`。`plugins/story-skills` 符号链接是刻意的：Codex marketplace 条目必须指向子插件目录，因此用 symlink 把仓库根的插件暴露出来，避免重复 `skills/`。

## 📄 许可证

[MIT](LICENSE) · Copyright (c) 2026 Daniel Dewhurst

本目录为上游仓库的双语本地化版本（含中文译本），翻译仅在本地使用；如需再分发，请同时附带原始 LICENSE 与本说明。

---

# ✨ Story Skills

**Agent Skills for planning, tracking, and drafting fiction in markdown.**

Story Skills gives agents a shared project format for fiction: a story bible, character files, worldbuilding notes, factions, artifacts, plot arcs, scene state, continuity questions, promises/payoffs, timelines, and chapter drafts. Everything is plain markdown with YAML frontmatter, packaged as standard Agent Skills with Codex and Claude Code plugin support.

The companion CLI treats the story bible as a checkable contract: a **continuity engine** catches dead characters walking, payoffs that land before their setup, unfired Chekhov guns, and stale story state — deterministically, before a reader ever could.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Agent Skills](https://img.shields.io/badge/Agent_Skills-SKILL.md-blue)](https://agentskills.io)
[![Codex](https://img.shields.io/badge/Codex-plugin-10A37F)](https://developers.openai.com/codex)
[![Claude Code](https://img.shields.io/badge/Claude_Code-plugin-blueviolet)](https://docs.anthropic.com/en/docs/claude-code)

</div>

---

> Built on the open **Agent Skills** standard. Install it as a **Codex** or **Claude Code** plugin, with the Agent Skills CLI, or copy the `skills/` folders into any agent that supports `SKILL.md`.

## 🚀 Quick Start

```shell
# Codex plugin
codex plugin marketplace add danjdewhurst/story-skills
codex plugin add story-skills@story-skills

# Claude Code plugin
/plugin marketplace add danjdewhurst/story-skills
/plugin install story-skills@story-skills
```

For compatible `SKILL.md` agents, you can also install the bundle with the Agent Skills CLI:

```shell
npx skills add danjdewhurst/story-skills

# Or with Bun
bunx skills add danjdewhurst/story-skills
```

Then ask **"Start a new story"** to scaffold the project.

## 🔎 The Continuity Engine

Long-range consistency is the thing language models are worst at and prompts cannot fix. Story Skills makes it deterministic: character deaths, promises/payoffs, open questions, scene casts, and durable knowledge/object state live in frontmatter, and `story continuity` treats contradictions like a compiler treats type errors.

[`examples/the-unraveled-thread/`](examples/the-unraveled-thread/) is a deliberately broken mystery. It passes `story validate` and `story links` cleanly — every file is well-formed — but the story itself doesn't hold together:

```text
$ story continuity examples/the-unraveled-thread
Continuity check failed: 4 errors, 3 warnings
error: chapters/chapter-04.md lists edran-vale, who died in chapter-02; move posthumous appearances to mentions
error: continuity/promises/the-broken-compass.md pays off in chapter-02 before it is planted in chapter-03
error: continuity/questions/who-burned-the-mill.md resolves in chapter-02 before it is introduced in chapter-03
error: continuity/state.md knowledge-state[0] references missing chapter chapter-05
warning: chapters/chapter-03.md POV character nessa-thorn is not listed in characters
warning: continuity/promises/the-sealed-letter.md was planted in chapter-01, 3 chapters ago, and has no payoff yet
warning: continuity/state.md object-state[0] status active conflicts with worldbuilding/artifacts/vales-compass.md status destroyed
```

These findings are exact, file-addressed, and reproducible — CI asserts them on every commit. Intentional flashbacks and posthumous appearances stay legal via the chapter `mentions` field. `story doctor` and `story next` fold the same checks into prioritized repair actions.

## ✍️ Highly Recommended: Better Writing

For stronger chapter drafts and revision passes, install [forjd/better-writing](https://github.com/forjd/better-writing) alongside Story Skills. It adds voice calibration, anti-generic writing checks, and a final prose-quality pass.

```shell
npx skills add forjd/better-writing
```

Or with Bun:

```shell
bunx skills add forjd/better-writing
```

Story Skills works without it, but chapter drafting and revision are better when agents can use `better-writing`.

## 📦 Installation

<details>
<summary><strong>Codex</strong></summary>

```shell
# Add the marketplace
codex plugin marketplace add danjdewhurst/story-skills

# Install the plugin
codex plugin add story-skills@story-skills
```

For local skill authoring without a plugin install:

```shell
git clone https://github.com/danjdewhurst/story-skills.git
cp -r story-skills/skills/* ~/.agents/skills/

# Or install to a specific repo as repo-scoped skills
cp -r story-skills/skills/* .agents/skills/
```

Codex detects repo and user skills automatically. The plugin install is still the recommended path for this bundle.

</details>

<details>
<summary><strong>Claude Code</strong></summary>

```shell
# Add the marketplace
/plugin marketplace add danjdewhurst/story-skills

# Install the plugin
/plugin install story-skills@story-skills
```

</details>

<details>
<summary><strong>Any <code>SKILL.md</code>-compatible agent</strong></summary>

Copy each subdirectory of `skills/` into your agent's skills directory.

</details>

## 🧱 Skills

| Skill | Purpose |
| --- | --- |
| `story-init` | Initialize a story project (full layout + bible) |
| `character-management` | Add/edit character files, maintain bidirectional relationships |
| `worldbuilding` | Maintain locations, factions, artifacts, and systems |
| `plot-structure` | Plan arcs, promises, open questions, and timelines |
| `chapter-writing` | Draft the next chapter from existing material |
| `revision-continuity` | Revision and continuity audit, catches contradictions |
| `story-maintenance` | CLI commands and project maintenance toolkit |

## 🛠️ Companion CLI

Skills guide creative workflows; the CLI handles mechanical maintenance: validation, registry rebuilds, word counts, link checks, exports, and disposable builds.

```shell
# List every command
story --help

# Rebuild the _index.md registries
story reindex

# Write word counts back into frontmatter
story wordcount --write

# Verify bidirectional links
story links

# Validate frontmatter and project layout
story validate

# Run continuity checks (deaths, promises, state, etc.)
story continuity
```

The CLI is optional. The skills work standalone, but the CLI automates maintenance. See [`docs/first-20-minutes.md`](docs/first-20-minutes.md).

## 🧪 Sanity Check

After any change, run:

```shell
bun run test
bun run check:fallback
node skills/story-maintenance/scripts/story.js --help
```

## 🤖 Write A Book Via Pull Requests

A story project with deterministic checks is a story project an agent can advance unattended. The [`templates/github/`](templates/github/) workflows turn a story repository into a self-drafting book:

- [`story-checks.yml`](templates/github/story-checks.yml) runs `story validate`, `story links`, and `story continuity` on every push and pull request, so a chapter PR cannot merge with a continuity contradiction.
- [`draft-next-chapter.yml`](templates/github/draft-next-chapter.yml) runs [Claude Code](https://github.com/anthropics/claude-code-action) on a schedule: it asks `story next` for the next deterministic action, drafts the next chapter with the chapter-writing skill, updates scene records and continuity state, runs the maintenance checks, and opens a pull request for review.

Copy both files into `.github/workflows/` in the repository that holds your story project, add an `ANTHROPIC_API_KEY` secret, and review one chapter PR per morning.

## 📥 Import An Existing Manuscript

Most writers don't start from a blank page. `story import` reverse-engineers a Story Skills project from work in progress:

```shell
story import draft.md --title "The Lost Coast" --genre mystery
```

It splits the manuscript on chapter headings (or imports a directory of chapter files), creates the full project layout with accurate word counts and registries, and prints recurring proper-name candidates so an agent can follow up with `story add character` and `story add location` to build out the bible.

## 📁 Project Structure

Running **story-init** creates this layout:

```
my-story/
├── story.md                  # Story bible — title, genre, themes, POV, tense
├── characters/
│   └── _index.md             # Character registry
├── worldbuilding/
│   ├── _index.md             # World overview
│   ├── locations/
│   ├── systems/
│   ├── factions/
│   └── artifacts/
├── plot/
│   ├── _index.md             # Arc overview
│   ├── arcs/
│   └── timeline.md
├── scenes/
│   └── _index.md             # Machine-readable scene registry
├── continuity/
│   ├── state.md              # Character, object, and knowledge state
│   ├── questions/
│   │   └── _index.md
│   └── promises/
│       └── _index.md
├── glossary/
│   ├── _index.md
│   └── terms/
└── chapters/
    └── _index.md             # Chapter registry
```

## ⚙️ How It Works

Every story element is a markdown file with YAML frontmatter. The skills cross-reference those files so the project stays consistent:

- **`story.md`** is the top-level bible read by all skills
- `story.md` includes **`schema-version: 2`** so the CLI can detect incompatible project formats
- Characters, locations, and arcs use **kebab-case identifiers** (e.g., `sera-voss`)
- **`_index.md`** files serve as registries for each domain
- Relationships and references are maintained **bidirectionally**
- Scene records and continuity state make character knowledge, object ownership, and setup/payoff tracking durable
- Story content is created directly as markdown; generated build scripts are not part of the project format

## 📖 Examples

- Read [**The Cormorant Tide**](https://github.com/danjdewhurst/the-cormorant-tide), a full story project generated with Story Skills.
- Explore [`examples/the-last-ember/`](examples/the-last-ember/) for a complete fantasy example: three characters, two locations, a magic system, a plot arc with foreshadowing, and a drafted first chapter.
- Explore [`examples/harbor-of-second-light/`](examples/harbor-of-second-light/) for a near-future coastal mystery example with memory technology, a posthumous witness arc, populated continuity state, and a drafted first chapter.
- Explore [`examples/the-unraveled-thread/`](examples/the-unraveled-thread/) for a deliberately broken project that demonstrates every class of finding the continuity engine reports.

## 🚢 Releasing

Codex uses `.codex-plugin/plugin.json` as its plugin version source. Claude Code uses `.claude-plugin/plugin.json`. Bump both versions for every published change so installed users receive updates; keep marketplace entries unversioned to avoid duplicate version state. Run `bun run check:metadata` before publishing to confirm package and plugin metadata are aligned.

Distribution metadata lives in `.claude-plugin/` for Claude Code and `.codex-plugin/` plus `.agents/plugins/marketplace.json` for Codex. The `plugins/story-skills` symlink is intentional: Codex marketplace entries must point at a child plugin directory, so the symlink exposes the repo-root plugin without duplicating `skills/`.

## 📄 License

[MIT](LICENSE) · Copyright (c) 2026 Daniel Dewhurst

This directory is a bilingual local-mirror build of the upstream repository (with a Chinese translation included). It is for local use only; if you redistribute it, please ship the original LICENSE and this notice alongside.
