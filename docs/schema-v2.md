<!--
Bilingual file / 双语文件
Chinese translation above, English original below.
Original / 原作品：Story Skills by Daniel Dewhurst (2026) · MIT License
Source / 来源：https://github.com/danjdewhurst/story-skills
-->

# Story Skills Schema v2（中文译本）

Schema v2 保留"以 markdown 为主"的模型，并加入支撑长篇作品的持久化状态。每个文件仍是带 YAML frontmatter 的纯 markdown。CLI 校验机械契约；创意判断仍由 Agent 掌握。

## 必需布局

```text
story.md
characters/_index.md
worldbuilding/_index.md
worldbuilding/locations/
worldbuilding/systems/
worldbuilding/factions/
worldbuilding/artifacts/
plot/_index.md
plot/arcs/
plot/timeline.md
chapters/_index.md
scenes/_index.md
continuity/state.md
continuity/questions/_index.md
continuity/questions/
continuity/promises/_index.md
continuity/promises/
glossary/_index.md
glossary/terms/
```

## 核心规则

- `story.md` 必须包含 `schema-version: 2`。
- 实体文件名使用 kebab-case 标识符。
- 注册表是确定性的，可通过 `story reindex .` 重建。
- 章节正文字数通过 `story wordcount . --write` 重算。
- 交叉引用完整性通过 `story links .` 检查。
- 连续性契约（生死、伏笔/兑现、悬念、出场名单、持久化状态）由 `story continuity .` 检查。

## 实体 frontmatter

### Story（故事）

必填：`title`、`schema-version`、`genre`、`status`、`themes`、`pov`、`tense`。

### Characters（角色）

必填：`name`、`role`、`status`。

可选列表：`aliases`、`relationships`、`locations`、`tags`。

可选标量：`died-in`，即角色在页面上死亡的章节 id。要与 `status: deceased` 同时设置；`story continuity` 会随后对出现在更晚章节里的情况报错。第 1 章之前就已经死亡的角色使用 `status: deceased` 而不带 `died-in`。

### Worldbuilding（世界观）

地点要求 `name` 和 `type`。体系要求 `name` 和 `type`。

阵营要求 `name`、`type` 与 `status`；可以列出 `members`、`locations` 与 `tags`。

关键道具要求 `name`、`type` 与 `status`；可引用一个 `owner`（角色或阵营）和一个 `location`。

### Plot（情节）

弧线要求 `name`、`type` 与 `status`；可以列出 `characters`、`themes` 与 `acts`。

### Chapters And Scenes（章节与场景）

章节要求 `title`、`number` 与 `status`；可选的引用列表包括 `locations`、`characters`、`mentions`、`arcs-advanced`。

场景要求 `title`、`chapter`、`scene` 与 `status`。场景携带机器可读的连续性字段：`pov`、`location`、`characters`、`mentions`、`arcs-advanced` 与 `state-changes`。

`characters` 表示"在场"。`mentions` 表示"被提及、被回忆、被记录或在闪回中出现"；已故角色可以出现在 `mentions` 中而不触发连续性错误。

### Continuity（连续性）

`continuity/state.md` 存储 `current-chapter`、`character-state`、`object-state` 与 `knowledge-state`。

状态条目是被 `story continuity` 检查的映射列表：

- `character-state` 条目引用一个已存在的 `character`，可选地引用一个 `location`，加上自由形式的 `physical`、`emotional` 与 `knowledge` 注释。
- `object-state` 条目引用一个已存在的 `artifact`，可选的 `owner`（角色或阵营），可选的 `location`，以及一个必须与道具文件一致的 `status`。
- `knowledge-state` 条目引用一个已存在的 `character`、一个非空的 `knows` 事实，以及可选的 `learned-in` 章节 id。

悬念（question）要求 `title` 与 `status`；可选的章节引用是 `introduced` 与 `resolved`。

伏笔（promise）要求 `title` 与 `status`；可选的章节引用是 `planted` 与 `payoff`。

### Glossary（术语表）

术语条目要求 `term` 与 `category`，加上可选的 `aliases`。

## 迁移

运行：

```shell
story migrate .
story reindex .
story validate .
```

迁移会创建 v2 目录与注册表文件，把 `story.md` 升级到 `schema-version: 2`，并重建索引。它不会凭空捏造创意内容。

---

# Story Skills Schema v2 (English Original)

Schema v2 keeps the markdown-first model and adds durable state for longer works. Every file remains plain markdown with YAML frontmatter. The CLI validates the mechanical contract; agents still own creative judgment.

## Required Layout

```text
story.md
characters/_index.md
worldbuilding/_index.md
worldbuilding/locations/
worldbuilding/systems/
worldbuilding/factions/
worldbuilding/artifacts/
plot/_index.md
plot/arcs/
plot/timeline.md
chapters/_index.md
scenes/_index.md
continuity/state.md
continuity/questions/_index.md
continuity/questions/
continuity/promises/_index.md
continuity/promises/
glossary/_index.md
glossary/terms/
```

## Core Rules

- `story.md` must include `schema-version: 2`.
- Entity filenames are kebab-case identifiers.
- Registries are deterministic and rebuilt with `story reindex .`.
- Chapter prose word counts are recalculated with `story wordcount . --write`.
- Cross-reference integrity is checked with `story links .`.
- Continuity contracts (deaths, promises/payoffs, questions, casts, durable state) are checked with `story continuity .`.

## Entity Frontmatter

### Story

Required: `title`, `schema-version`, `genre`, `status`, `themes`, `pov`, `tense`.

### Characters

Required: `name`, `role`, `status`.

Optional lists: `aliases`, `relationships`, `locations`, `tags`.

Optional scalar: `died-in`, the chapter id in which the character dies on the page. Set it together with `status: deceased`; `story continuity` then errors on appearances in later chapters. Characters who died before chapter 1 should use `status: deceased` without `died-in`.

### Worldbuilding

Locations require `name` and `type`. Systems require `name` and `type`.

Factions require `name`, `type`, and `status`; they may list `members`, `locations`, and `tags`.

Artifacts require `name`, `type`, and `status`; they may reference an `owner` character or faction and a `location`.

### Plot

Arcs require `name`, `type`, and `status`; they may list `characters`, `themes`, and `acts`.

### Chapters And Scenes

Chapters require `title`, `number`, and `status`; optional reference lists are `locations`, `characters`, `mentions`, and `arcs-advanced`.

Scenes require `title`, `chapter`, `scene`, and `status`. Scenes carry machine-readable continuity fields: `pov`, `location`, `characters`, `mentions`, `arcs-advanced`, and `state-changes`.

`characters` means present in-scene. `mentions` means referenced, remembered, recorded, or seen in flashback; deceased characters may appear there without triggering continuity errors.

### Continuity

`continuity/state.md` stores `current-chapter`, `character-state`, `object-state`, and `knowledge-state`.

State entries are lists of mappings checked by `story continuity`:

- `character-state` entries reference an existing `character` and optionally a `location`, plus free-form `physical`, `emotional`, and `knowledge` notes.
- `object-state` entries reference an existing `artifact`, an optional `owner` (character or faction), an optional `location`, and a `status` that must agree with the artifact file.
- `knowledge-state` entries reference an existing `character`, a non-empty `knows` fact, and an optional `learned-in` chapter id.

Questions require `title` and `status`; optional chapter references are `introduced` and `resolved`.

Promises require `title` and `status`; optional chapter references are `planted` and `payoff`.

### Glossary

Glossary terms require `term` and `category`, plus optional `aliases`.

## Migration

Run:

```shell
story migrate .
story reindex .
story validate .
```

Migration creates the v2 directories and registry files, upgrades `story.md` to `schema-version: 2`, and reindexes the project. It does not invent creative content.
