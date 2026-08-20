# story-init · 故事初始化（详细中文摘要）

> 英文原文：[../SKILL.md](../SKILL.md)（如需逐字指引请读英文）
> 适用触发词：开始一个新故事 / 初始化故事项目 / 新建一本书 / 搭项目骨架 / `start a new story` / `initialize a story project`

---

## 这个 skill 解决什么问题

在一个**空目录**里生成 Story Skills v2 项目骨架，并写入顶层故事圣经 `story.md`。所有产物都是带 YAML frontmatter 的 markdown 文件，跨实体双向引用，由 `story reindex .` 等 CLI 命令保证一致性。

**适合**：

- 用户从零开始一个新故事 / 小说 / 书。
- 用户有一个点子，想落地为带圣经和注册表的 markdown 项目。

**不适合**（应改用其他 skill）：

- 给现有故事加内容 → `character-management` / `worldbuilding` / `plot-structure` / `chapter-writing`。
- 把现成 markdown 稿件反向工程成 Story Skills 项目 → 跑 `story import <source> --title "..."`，让 CLI 切分并生成骨架与实体候选。

---

## 工作流（按推荐顺序）

### 第 1 步：先收集故事基本信息

需要向用户问清楚：

- **标题**（最终用作 `story.md` 的 `title` 字段）
- **类型** `genre` 与 **子类型** `sub-genre`（如 `mystery` / `coastal`、`fantasy` / `grimdark`）
- **时代背景** `setting-era`（如 `near-future`、`medieval`、`contemporary`）
- **2-3 句梗概** `synopsis`
- **2-4 个主题** `themes`（用 `--theme` 多次传入）
- **POV 视角** `pov`：`first-person` / `third-person-limited` / `third-person-omniscient`
- **时态** `tense`：`past` / `present`

### 第 2 步：优先用 CLI 生成骨架

**首选**：已安装的 `story` CLI

```shell
story init "{Title}" \
  --genre "{genre}" \
  --sub-genre "{sub-genre}" \
  --setting-era "{era}" \
  --pov "{pov-style}" \
  --tense "{tense}" \
  --synopsis "{synopsis}" \
  --theme "{theme-1}" \
  --theme "{theme-2}"
```

**次选**：拷贝安装场景下的 fallback

```shell
node ../story-maintenance/scripts/story.js init "{Title}"
```

**末选**：CLI 都没装时**不要**自己造一个结构不一样的项目。停下来请用户先安装 CLI，或者手动按 [../SKILL.md](../SKILL.md) 第 2 步里的目录树手写文件。手写非常繁琐，会快速偏离上游约定。

### 第 3 步：CLI 执行后会生成的目录结构

CLI 会按 v2 规范创建以下布局（**`{story-title-kebab}` 是标题的 kebab-case 形式**）：

```
{story-title-kebab}/
├── story.md                       # 顶层圣经（必填 schema-version: 2）
├── characters/
│   └── _index.md                  # 角色注册表
├── worldbuilding/
│   ├── _index.md                  # 世界观概览注册表
│   ├── locations/                 # 地点（空目录）
│   ├── systems/                   # 体系（空目录）
│   ├── factions/                  # 势力（空目录）
│   └── artifacts/                 # 道具（空目录）
├── plot/
│   ├── _index.md                  # 弧线注册表
│   ├── arcs/                      # 弧线（空目录）
│   └── timeline.md                # 时间线
├── scenes/
│   └── _index.md                  # 场景注册表
├── continuity/
│   ├── state.md                   # 持久化状态（character-state / object-state / knowledge-state）
│   ├── questions/
│   │   └── _index.md              # 悬念注册表
│   └── promises/
│       └── _index.md              # 伏笔注册表
├── glossary/
│   ├── _index.md                  # 术语注册表
│   └── terms/                     # 术语条目（空目录）
└── chapters/
    └── _index.md                  # 章节注册表
```

### 第 4 步：CLI 落盘后的收尾校验

```shell
story validate {story-title-kebab}
```

如果 fallback 路径，把 `story` 换成 `node ../story-maintenance/scripts/story.js`，路径相对本 skill 解析。

### 第 5 步：给用户的下一步建议清单

跑完之后告诉用户：

- "添加你的第一个角色" → 触发 `character-management`
- "开始搭世界观" → 触发 `worldbuilding`
- "定义情节结构" → 触发 `plot-structure`
- 跑 `story next .` 看 CLI 推荐的确定性下一步动作

---

## 跨 skill 通用约定（写项目时一直要遵守）

下面这些是 Story Skills 整套约定的核心，写在 `story-init` 的 SKILL.md 里但适用于**所有**后续 skill：

### 文件命名

- **所有实体文件名一律 kebab-case**（如 `sera-voss.md`、`ashen-citadel.md`）。
- **角色 id** = kebab-case 文件名去掉 `.md`（如 `sera-voss`）。其他文件**只能**用这个 id 引用，禁止任何变体写法。

### YAML frontmatter

- **每个 markdown 文件都要带 frontmatter**。
- `story.md` 的 frontmatter 必须含 `schema-version: 2`，CLI 据此判断项目格式兼容性。
- 实体 frontmatter 的必填字段以各 skill 的 reference 模板为准。

### 注册表

- 每个领域（characters / worldbuilding / plot / chapters / scenes / continuity / glossary）都有 `_index.md`，是**该领域的权威注册表**。
- `_index.md` 由 `story reindex .` **自动重建**，不要手改。
- 新增 / 删除 / 重命名 / 修改实体后，**必须**重跑 `story reindex .`。

### 双向链接

- 任何跨实体引用都要在两端都登记（如 `worldbuilding/locations/bellwether-reef.md` 里出现 `mara-quill`，就要在 `characters/mara-quill.md` 的 `locations` 列表里反向登记）。
- 跑 `story links .` 校验双向完整性。

### 死亡与在场

- 角色**在页面上死亡**时：同时设置 `status: deceased` 和 `died-in: chapter-{NN}`，让 `story continuity .` 能捕获死后异常出场。
- 第 1 章之前就已经死亡的角色：只设 `status: deceased`，**不要**设 `died-in`。
- 章节 / 场景 frontmatter 里区分：
  - `characters` = **在场**（在场参与动作）
  - `mentions` = **提及 / 回忆 / 记录 / 闪回**（已故角色只能放这里）

### 创作纪律

- **故事内容直接以 markdown 创作**。
- **禁止**在项目里写生成器脚本或 `build-*.js` 来批量生成章节 / 角色 / 地点等。
- CLI 工具保留在项目外部：Agent 只能跑 `story` / `bun run story --` / `story-maintenance/scripts/story.js`。**不要**把脚本复制进用户项目，并清理任何临时脚本。

---

## 写项目骨架时的常见坑

1. **跑完 `init` 后立刻手改 `_index.md`**：会被下一次 `story reindex .` 覆盖回去。注册表永远是 CLI 生成的。
2. **`schema-version` 字段写错**：`story.md` 的 `schema-version: 2` 必须存在，否则所有校验命令都会拒识项目。
3. **CLI 没装就手搓结构**：手搓出来的布局很容易漏掉 `scenes/`、`continuity/questions/`、`glossary/` 等 v2 支持目录，导致后面 `validate` 报错。强烈建议先装 CLI。
4. **把大纲 / 章节草稿塞进 `story.md`**：`story.md` 是顶层圣经，正文应该写在 `chapters/chapter-XX.md`。`story.md` 下面只放梗概、语气风格、备注等简短章节。
5. **目录命名变体**：`{story-title-kebab}` 必须严格 kebab-case，否则 CLI 找不到项目。

---

## 相关 skill

- 起完项目后通常紧接着：
  - [`../character-management/`](../character-management/) —— 加第一个角色
  - [`../worldbuilding/`](../worldbuilding/) —— 搭地点 / 势力 / 道具 / 体系
  - [`../plot-structure/`](../plot-structure/) —— 定义情节弧 / 伏笔 / 悬念
  - [`../chapter-writing/`](../chapter-writing/) —— 起草第一章
- 维护类命令集中在 [`../story-maintenance/`](../story-maintenance/)。
