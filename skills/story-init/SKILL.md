---
name: story-init
description: 当用户说「开新故事」「初始化故事项目」「创建故事」「新书」「搭建一个故事」「开始写小说」,或想从零启动一个虚构写作项目时,使用本 skill。
---

# 故事初始化

## 这个 skill 做什么

帮用户在一个新目录里搭起 Story Skills v2 项目的完整骨架。所有产物都是带 YAML frontmatter 的 markdown 文件,跨实体双向引用,后续用 `story reindex .`、`story links .`、`story validate .` 等 CLI 命令保证一致性。

一次性产出:故事圣经、若干注册表、场景追踪、连续性状态、术语表、世界观目录、情节结构、章节追踪。

## 适用时机

- 启动新故事、新书、新虚构项目
- 给一个已有的故事想法搭目录骨架
- **不要**用在已有故事项目上新增内容 —— 那是各领域 skill 的事
- **不要**用来转换已有稿件或章节草稿 —— 那应当用 `story import <source> --title "{Title}"`,然后再根据它打印出的实体候选清单把故事圣经补全

## 工作流

### 第一步:收集基本信息

需要向用户问清楚:

- 标题
- 类型与子类型
- 一句话简介(2-3 句)
- 时代背景 / 时间段
- 核心主题(2-4 个)
- 视角风格(`first-person` / `third-person-limited` / `third-person-omniscient`)
- 时态(`past` / `present`)

### 第二步:优先用 Story CLI

如果 Story CLI 可用,优先用它生成起步项目,然后回头检查和细化生成的文件:

```shell
story init "{Title}" --genre "{genre}" --sub-genre "{sub-genre}" --setting-era "{era}" --pov "{pov-style}" --tense "{tense}" --synopsis "{synopsis}" --theme "{theme-1}" --theme "{theme-2}"
```

如果没有 `story` 命令、但 `story-maintenance` skill 自带了脚本,就用相对路径调它:

```shell
node ../story-maintenance/scripts/story.js init "{Title}"
```

两者都没有,就按下面手动建文件。

### 第三步:建目录骨架

在当前工作目录下创建以下结构:

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

### 第四步:写 `story.md` 故事圣经

```yaml
---
title: "{Title}"
schema-version: 2
genre: {genre}
sub-genre: {sub-genre}
setting-era: {era}
status: planning
themes:
  - {theme-1}
  - {theme-2}
pov: {pov-style}
tense: {tense}
---
```

frontmatter 下面再补这几节:

- **Synopsis** —— 用户给的那段 2-3 句简介
- **Tone & Style** —— 一句话讲讲这个故事的腔调和声音(从类型和主题推导)
- **Notes** —— 留空,给用户自己填

### 第五步:填充各 `_index.md`

**`characters/_index.md`:**

```markdown
---
type: character-registry
story: {story-title-kebab}
---

# Characters

## Registry

| Name | Role | Status | File |
|------|------|--------|------|
| *No characters yet* | | | |

## Relationship Map

*No relationships defined yet.*

## Family Trees

*No family trees defined yet.*
```

**`worldbuilding/_index.md`:**

```markdown
---
type: world-registry
story: {story-title-kebab}
---

# Worldbuilding

## World Overview

*Describe the world at a high level here.*

## Locations

| Name | Type | Region | File |
|------|------|--------|------|
| *No locations yet* | | | |

## Systems

| Name | Type | File |
|------|------|------|
| *No systems yet* | | |

## Factions

| Name | Type | Status | File |
|------|------|--------|------|
| *No factions yet* | | | |

## Artifacts

| Name | Type | Status | File |
|------|------|--------|------|
| *No artifacts yet* | | | |
```

**`plot/_index.md`:**

```markdown
---
type: plot-registry
story: {story-title-kebab}
structure: three-act
---

# Plot Structure

## Story Structure

**Model:** Three-Act Structure (adjust as needed)

## Arcs

| Name | Type | Status | File |
|------|------|--------|------|
| *No arcs yet* | | | |

## Theme Tracking

| Theme | Arcs | Chapters |
|-------|------|----------|
| *No themes tracked yet* | | |
```

**`plot/timeline.md`:**

```markdown
---
type: timeline
story: {story-title-kebab}
---

# Story Timeline

| When | Event | Arc | Chapter |
|------|-------|-----|---------|
| *No events yet* | | | |
```

**`chapters/_index.md`:**

```markdown
---
type: chapter-registry
story: {story-title-kebab}
---

# Chapters

## Registry

| # | Title | POV | Status | Word Count | File |
|---|-------|-----|--------|------------|------|
| *No chapters yet* | | | | | |

## Total Word Count: 0
```

v2 还需要这几个支持文件:

- `scenes/_index.md`,frontmatter 写 `type: scene-registry`
- `continuity/state.md`,frontmatter 写 `type: continuity-state`,`current-chapter: 0`,`character-state`、`object-state`、`knowledge-state` 三个列表留空
- `continuity/questions/_index.md`,frontmatter 写 `type: question-registry`
- `continuity/promises/_index.md`,frontmatter 写 `type: promise-registry`
- `glossary/_index.md`,frontmatter 写 `type: glossary-registry`

如果手动初始化搞得太繁琐,停下来请用户安装或跑 Story CLI,不要自己造一个不同的项目形态。

### 第六步:总结并给出下一步建议

写完后告诉用户接下来可以做什么:

- 「添加第一个角色」 —— 触发 `character-management` skill
- 「开始搭建世界观」 —— 触发 `worldbuilding` skill
- 「设计情节结构」 —— 触发 `plot-structure` skill
- 「跑 `story next .`」 —— 看 CLI 给出的确定性下一步

### 第七步:CLI 可用时跑一次体检

```shell
story validate {story-title-kebab}
```

如果用 bundled fallback,把 `story` 换成 `node ../story-maintenance/scripts/story.js`(相对本 skill 目录解析)。

## 跨 skill 通用约定

这些约定对所有 story skill 都适用:

- **文件名用 kebab-case** —— 所有实体文件一律 kebab-case(例如 `sera-voss.md`、`ashen-citadel.md`)
- **每个文件都带 YAML frontmatter** —— 用来装结构化元数据
- **schema version** —— `story.md` 的 frontmatter 写 `schema-version: 2`
- **`_index.md`** —— 每个领域的权威注册表
- **`story.md`** —— 顶层故事圣经,所有 skill 都会读它拿语境
- **双向交叉链接** —— 引用其他实体,两边文件都得改
- **角色标识** —— 用 kebab-case 文件名去掉扩展名(例如 `sera-voss`)
- **死亡追踪** —— 角色当页死亡时,把 `status` 设成 `deceased`、`died-in` 设成 `chapter-{NN}`,这样 `story continuity` 才能在后续章节里把它当成死后出场标出来
- **`mentions` vs `characters`** —— 章节和场景 frontmatter 中,真正出现在场景里的角色放 `characters`;只在引用、回忆、录像、闪回里出现的角色放 `mentions`
- **场景标识** —— 用 `chapter-{NN}-scene-{NN}`,文件落在 `scenes/`
- **连续性状态** —— 在 `continuity/state.md`,待解问题和伏笔承诺分别放在 `continuity/questions/` 和 `continuity/promises/`
- **markdown-first 产物** —— 直接在目标的 `.md` 文件里创建和编辑故事内容。不要在项目里写 `build-*.js` 这种本地构建/生成/批量写脚本去生成故事文件
- **CLI helper 留在外部** —— Agent 能跑的 JS helper 只有装好的或 bundled 的 Story CLI(`story`、`bun run story --`、或 `story-maintenance/scripts/story.js`),用来做确定性维护。**不要**把脚本复制进用户的故事项目,任何不得不写的临时 helper 用完就删掉
