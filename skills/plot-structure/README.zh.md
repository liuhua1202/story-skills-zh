# plot-structure · 情节结构（详细中文摘要）

> 英文原文：[../SKILL.md](../SKILL.md)（如需逐字指引请读英文）
> 适用触发词：创建情节弧 / 故事结构 / 添加情节点 / 故事时间线 / 追踪伏笔 / 节奏 / 幕结构 / 故事弧 / 情节大纲 / `create a plot arc` / `story structure` / `add a plot point` / `story timeline` / `track foreshadowing` / `pacing` / `act structure` / `story arc` / `plot outline`

---

## 这个 skill 解决什么问题

维护三类"故事层"实体：

- **情节弧（arcs）** —— 主线 / 支线 / 角色弧 / 主题弧
- **伏笔（promises）** —— 埋设 → 兑现
- **悬念（questions）** —— 提出 → 解答

以及**时间线**与**结构模型选择**。

所有产物都让 `story continuity .` 能做确定性检查：埋设早于兑现、提出早于解答、长线伏笔未兑现警告、状态冲突等。

**前置条件**：项目已存在（`story.md` 在根目录；未初始化先跑 [`../story-init/`](../story-init/)）。

---

## 选择故事结构

1. 读 `story.md` 题材 / 主题。
2. 看 [`./references/structure-models.md`](./references/structure-models.md)（英文原文）的可用结构清单。
3. 根据题材推荐一种（不确定时默认 **三幕结构**）。
4. 更新 `plot/_index.md` frontmatter `structure` 字段。
5. 在 `plot/_index.md` 的 Story Structure 段填 beat sheet。
6. CLI 校验：

   ```shell
   story validate .
   ```

---

## 创建情节弧（标准流程）

1. 读 `story.md` 主题 + `plot/_index.md` 已有弧线 + `characters/_index.md` 可用角色。
2. 问：弧名、type（`main` / `subplot` / `character` / `thematic`）、涉及的角色、服务的主题。
3. 对话把弧搭起来：**setup（铺垫）→ escalations（升级）→ climax（高潮）→ resolution（收束）**。
4. 按 arc-template 写文件，保存到 `plot/arcs/{arc-name-kebab}.md`。
5. 更新 `plot/_index.md` 的 Arcs 表与 Theme Tracking 表。
6. **角色存在性校验**：引用的角色 id 必须在 `characters/` 下存在；引用了不存在的就停下让用户先建。
7. CLI 维护三连：

   ```shell
   story reindex .
   story links .
   story validate .
   ```

---

## 管理情节点（plot points）

情节点写在弧文件内的 "Plot Points" 表里。新增一个情节点时：

1. 读对应弧文件。
2. 在表里追加，**带上章节引用**（如 `chapter-03`，如果已知）。
3. 把事件按时间顺序写入 `plot/timeline.md`。
4. 如果该情节点涉及伏笔，加到弧文件的 Foreshadowing 表。
5. 如果该情节点产生"读者承诺"或"谜题"，在 `continuity/promises/` 或 `continuity/questions/` 建对应记录。
6. CLI 校验：`story validate .`。

---

## 时间线管理

`plot/timeline.md` 是**全故事所有弧的事件统一时间线**。每行格式如：

```markdown
| When | Event | Arc | Chapter |
```

维护规则：

- **按时间顺序插入**（不是按章节顺序）。
- 关联到弧线（弧 id）与章节（章节 id）。
- **一条事件一行**，简洁。
- 复盘时检查时间一致性、节奏问题（事件扎堆 / 长间隔）、停滞的弧。

---

## 伏笔追踪

### 弧内伏笔

每个弧文件里的 Foreshadowing 表：

| 列 | 含义 |
| --- | --- |
| Planted | 埋设的具体内容 |
| Payoff | 兑现的具体内容 |
| Chapter Planted | 埋设所在章节 |
| Chapter Payoff | 兑现所在章节 |
| Status | `planned` / `planted` / `paid-off` |

写章节时，`planted` 状态且未兑现的项会被 `story continuity .` 以 warning 提醒，避免遗忘。

### 跨弧伏笔

更耐久的方式：在 `continuity/promises/{promise-kebab}.md` 建独立记录，frontmatter 字段：

- `status`
- `planted`（章节 id）
- `payoff`（章节 id）
- `arcs`（弧 id 列表）
- `characters`（角色 id 列表）

详见 promise-template（中文摘要见下）。

### 谜题 / 未解悬念

类似伏笔，建独立记录 `continuity/questions/{question-kebab}.md`，frontmatter 字段：

- `status`
- `introduced`（章节 id）
- `resolved`（章节 id）
- 相关角色 / 弧线（可选）

详见 question-template（中文摘要见下）。

---

## 跨实体引用规则

| 关系 | 写法 |
| --- | --- |
| 弧 ↔ 角色 | 弧 frontmatter `characters` ↔ 角色（按弧归属登记） |
| 弧 ↔ 主题 | 弧 frontmatter `themes` ↔ `plot/_index.md` 的 Theme Tracking |
| 弧 ↔ 章节 | 章节 frontmatter `arcs-advanced`（被推进的弧 id 列表） |
| 时间线 ↔ 弧 | 时间线条目含 `Arc` 列 |
| 时间线 ↔ 章节 | 时间线条目含 `Chapter` 列 |
| 主题 ↔ 弧 ↔ 章节 | `plot/_index.md` 的 Theme Tracking 表聚合 |
| 伏笔 / 悬念 ↔ 章节 | `planted` / `payoff` / `introduced` / `resolved` 引用章节 id |
| 伏笔 / 悬念 ↔ 角色 | `characters` 字段引用角色 id |
| 伏笔 / 悬念 ↔ 弧 | `arcs` 字段引用弧 id |

---

## arc-template.md（中文摘要）

英文原文：[./references/arc-template.md](./references/arc-template.md)

空白情节弧模板，必填 frontmatter：`name` / `type` / `status`。可选：`characters` / `themes` / `acts`。

正文段（具体分段以英文模板为准）通常覆盖：弧的简介、Plot Points 表、Foreshadowing 表、与主题的关联、与其他弧的关系。

---

## promise-template.md（中文摘要）

英文原文：[./references/promise-template.md](./references/promise-template.md)

空白伏笔记录模板，必填 frontmatter：`title` / `status`。可选：`planted`（章节 id）/ `payoff`（章节 id）/ `arcs`（弧 id 列表）/ `characters`（角色 id 列表）。

正文段通常覆盖：埋设的内容、计划兑现的内容、当前状态、与故事节奏的关系。

**顺序约束**：`planted` 章节必须在 `payoff` 章节之前，否则 `story continuity .` 报错。

---

## question-template.md（中文摘要）

英文原文：[./references/question-template.md](./references/question-template.md)

空白悬念记录模板，必填 frontmatter：`title` / `status`。可选：`introduced`（章节 id）/ `resolved`（章节 id）/ `arcs` / `characters`。

正文段通常覆盖：问题是什么、已知线索、可能的解答方向、当前状态。

**顺序约束**：`introduced` 章节必须在 `resolved` 章节之前，否则 `story continuity .` 报错。

---

## structure-models.md（中文摘要）

英文原文：[./references/structure-models.md](./references/structure-models.md)

按结构模型列出，每种含：

- **适用题材**
- **beat sheet**（关键情节点）
- **节奏建议**
- **常见变体**

覆盖的结构模型（具体段落看英文文件）：

- **三幕结构（Three-Act）** —— 通用默认
- **英雄之旅（Hero's Journey）** —— 神话 / 成长
- **Save the Cat** —— 当代商业剧本
- **起承转合（Kishōtenketsu）** —— 四幕，无冲突
- **五幕结构（Five-Act）** —— 戏剧 / 长篇
- **侦探 / 谜题结构** —— mystery / thriller
- **其他项目自定义**

选择结构后写到 `plot/_index.md` frontmatter `structure` 字段，并在 Story Structure 段填 beat sheet。

---

## 修改后的维护命令

任何新增 / 删除 / 改名 / 重大修改之后：

```shell
story reindex .
story links .
story validate .
story continuity .    # 检查伏笔 / 悬念顺序、未兑现警告、状态冲突
```

---

## 常见坑

1. **`planted` 章节填到了 `payoff` 之后**：`story continuity .` 立刻报错。
2. **伏笔兑现了但弧文件里 status 没改**：维护三连里 `reindex` 不会改弧文件的状态字段，需要手动改。
3. **长线伏笔忘了兑现**：`story continuity .` 会以 warning 提醒，但**不会**自动修复。
4. **把所有弧都写在 `plot/_index.md` 里**：`_index.md` 只放清单与概览，细节放 `plot/arcs/<id>.md`。
5. **角色 ↔ 弧引用不一致**：`story links .` 会报缺链。
6. **把"角色想做的事"写成弧**：弧是故事层面的因果链，角色动机放在角色档案的 `motivations` 字段。

---

## 相关 skill

- [`../story-init/`](../story-init/) —— 起项目，建好 `plot/` 目录
- [`../character-management/`](../character-management/) —— 角色弧（character arc）与角色档案的衔接
- [`../worldbuilding/`](../worldbuilding/) —— 弧涉及的地点 / 势力
- [`../chapter-writing/`](../chapter-writing/) —— 起草章节时推进弧、埋设 / 兑现伏笔
- [`../revision-continuity/`](../revision-continuity/) —— `story continuity .` 校验顺序
- [`../story-maintenance/`](../story-maintenance/) —— 所有 CLI 命令的总入口
