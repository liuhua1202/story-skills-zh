---
name: story-init
version: 0.3.1
description: |
  当用户说「开新故事」「初始化故事项目」「创建故事」「新书」「搭建一个故事」「开始写小说」,或想从零启动一个虚构写作项目时,使用本 skill。
  Or when the user says "start a new story", "initialize a story project", "create a novel", "set up a story", or wants to bootstrap a new fiction writing project from scratch, use this skill.
allowed-cli: story init, bun run story -- init, node ../story-maintenance/scripts/story.js init
scope: 新目录创建；只写新文件（不覆盖既有）
calls: [story-maintenance, character-management, worldbuilding, plot-structure]
changelog: ../CHANGELOG.md
---

<!--
Skill metadata fields above are documentation-only. See:
  ../common/project-conventions.md        跨 skill 通用约定（已抽离，本文件不再重复）
  ../common/cli-priority.md               CLI 调用优先级
  ../common/id-naming.md                  kebab-case / CJK 音译 / 命名规则
-->

# 故事初始化

## 这个 skill 做什么

帮用户在一个新目录里搭起 Story Skills v2 项目的完整骨架。所有产物都是带 YAML frontmatter 的 markdown 文件，跨实体双向引用，后续用 `story reindex .`、`story links .`、`story validate .` 等 CLI 命令保证一致性。

一次性产出：故事圣经、若干注册表、场景追踪、连续性状态、术语表、世界观目录、情节结构、章节追踪。

## 适用时机

- 启动新故事、新书、新虚构项目
- 给一个已有的故事想法搭目录骨架
- **不要**用在已有故事项目上新增内容 —— 那是各领域 skill 的事
- **不要**用来转换已有稿件或章节草稿 —— 那应当用 `story import <source> --title "{Title}"`，然后再根据它打印出的实体候选清单把故事圣经补全

## 工作流（checklist）

```
□ 0. 探测输入模式：新建 vs 导入已有稿件
□ 1. 收集基本信息（标题 / 类型 / 子类型 / 简介 / 时代 / 主题 / POV / 时态）
□ 2. 走 A 或 B 路径（见下文）
□ 3. 总结并给下一步建议
```

### 路径 A：CLI 模式（默认推荐）

如果 Story CLI 可用，**优先走这条**——CLI 是项目形态的唯一权威，CLI 写的文件 frontmatter / 字段顺序 / 编码都是确定的。

```shell
story init "{Title}" --genre "{genre}" --sub-genre "{sub-genre}" --setting-era "{era}" --pov "{pov-style}" --tense "{tense}" --synopsis "{synopsis}" --theme "{theme-1}" --theme "{theme-2}"
```

CLI 成功后，回头细化和补充：
- 读 `story.md`，根据 `references/mvp-skeleton.md` 检查 MVP 是否覆盖（见下文）
- 在 `World Overview` / `Tone & Style` / `Notes` 节填肉
- 用户没提供的字段（如 sub-genre / 多个 theme），**问一次**

### 路径 B：手动 fallback

CLI 不可用时（探测步骤见 `../common/cli-priority.md`），落到手工创建：

1. 建目录骨架（下面的树状结构）
2. 写各 `_index.md` 模板（本文件 §后续保留作 fallback 参考）
3. 写 `story.md`

只有 CLI 完全装不上时才用这条路径。手工模式的产物**有可能与 CLI 模式略有差异**，最终以 `story validate .` 通过为准。

### 路径 C：MVP 极简模式（用户信息不全）

用户只给了标题、没填 genre / 主题 / 简介，只跑 **最小可运行骨架**：

- 创建 `story.md`（只填 `title`、`schema-version: 2`、`status: planning`，其它字段留空或加占位）
- 创建 5 个空 `_index.md`（`characters/`、`worldbuilding/`、`plot/`、`chapters/`、`scenes/`）
- 创建 `continuity/state.md`（`current-chapter: 0`，其它空）
- 跳过 `continuity/questions/`、`continuity/promises/`、`glossary/terms/`（用户补素材时再加）

告诉用户"接下来你可以随时补字段，或跑 `story reindex .` + `story validate .` 看是否健康"。

## 第一步：分流

| 用户说的 | 走哪条路径 |
| --- | --- |
| "我要写一个新故事" / "从零开始" / "新书" | 路径 A |
| "我有 50 章稿件，转成项目" / "把 docx 转过来" | `story import <source> --title`（不在本 skill 内，由 `story-maintenance` 管） |
| "只给标题，其他以后补" / "我想先搭骨架" | 路径 C（MVP） |
| `story init` 不可用 | 路径 B（手动 fallback） |

## 第二步：收集基本信息

需要向用户问清楚：

- 标题
- 类型与子类型
- 一句话简介（2-3 句）
- 时代背景 / 时间段
- 核心主题（2-4 个）
- 视角风格（`first-person` / `third-person-limited` / `third-person-omniscient`）
- 时态（`past` / `present`）

如果用户答不全，按 MVP 模式（路径 C）落档，等他回来再补。

## 手动 fallback 用：目录骨架

CLI 模式下不需要手建。下面是项目应该长成的形状（**manual fallback 或 audit 用**）：

```
{story-title-kebab}/
├── story.md
├── characters/
│   └── _index.md
├── worldbuilding/
│   ├── _index.md
│   ├── locations/
│   ├── systems/
│   ├── factions/
│   └── artifacts/
├── plot/
│   ├── _index.md
│   ├── arcs/
│   └── timeline.md
├── scenes/
│   └── _index.md
├── continuity/
│   ├── state.md
│   ├── questions/
│   │   └── _index.md
│   └── promises/
│       └── _index.md
├── glossary/
│   ├── _index.md
│   └── terms/
└── chapters/
    └── _index.md
```

## 第三步：CLI 可用时跑一次体检

```shell
story validate {story-title-kebab}
```

如果用 bundled fallback，把 `story` 换成 `node ../story-maintenance/scripts/story.js`（相对本 skill 目录解析）。

## 第四步：总结并给出下一步建议

写完后告诉用户接下来可以做什么：

- "添加第一个角色" —— 触发 `character-management` skill
- "开始搭建世界观" —— 触发 `worldbuilding` skill
- "设计情节结构" —— 触发 `plot-structure` skill
- "不确定就跑 `story next .`" —— CLI 按当前状态给确定性下一步
- "不满意可以 `story doctor .` 看 stale 啥"

## 跨 skill 通用约定（精简版）

> **完整版约定见 `../common/project-conventions.md`。** 本节只列高频在 init 阶段就生效的约束。

- **文件名用 kebab-case**（详：`../common/id-naming.md`）—— 不要用中文做文件 id
- **每个文件带 YAML frontmatter** —— `story.md` 第一行写 `schema-version: 2`
- **`_index.md`** —— 每个领域的权威注册表
- **`story.md`** —— 顶层故事圣经，所有 skill 都会读它
- **死亡追踪** —— 角色当页死亡时，`status: deceased` + `died-in: chapter-{NN}`；开篇前已死不开 `died-in`
- **`mentions` vs `characters`** —— 真正出现的角色放 `characters`，回忆 / 引用 / 闪回里出现的放 `mentions`
- **`story.md` 状态字段**：`planning` → `drafting` → `revised` → `complete`
- **CLI helper 留在外部** —— 不在项目里写 `build-*.js` 生成故事

## 参考文件

- **`../common/project-conventions.md`** —— 跨 skill 通用约定完整版（命名、双向引用、`mentions` vs `characters`、权限 sketch 等）
- **`../common/cli-priority.md`** —— Story CLI 三种调用优先级
- **`../common/id-naming.md`** —— kebab-case / CJK 音译规则