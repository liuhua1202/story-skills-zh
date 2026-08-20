# chapter-writing · 章节写作（详细中文摘要）

> 英文原文：[../SKILL.md](../SKILL.md)（如需逐字指引请读英文）
> 适用触发词：写章节 / 下一章 / 章节大纲 / 起草章节 / 继续故事 / 写场景 / 章节大纲 / `write a chapter` / `next chapter` / `chapter outline` / `draft chapter` / `continue the story` / `write a scene` / `outline a chapter`

---

## 这个 skill 解决什么问题

基于既有圣经（角色 / 世界观 / 弧 / 伏笔 / 悬念 / state）起草**下一章**：

- 用 outline-first 工作流保证不跑题。
- 输出章节正文文件 + 配套场景文件，供 `story continuity .` 校验。
- 写完后更新所有交叉引用（章节索引、时间线、伏笔、state）。

**前置条件**：项目存在，且至少有：

- `story.md`（顶层圣经）
- `characters/` 下至少一个角色
- 推荐有 `plot/_index.md`（第一章非强制，但有弧线后节奏更稳）

---

## 推荐的搭配技能

起草 / 修订章节正文**之前**，检查当前 Agent 环境里有没有 [`better-writing`](https://github.com/forjd/better-writing) 这个 skill。

- **有** → 用它做散文质量、语气校准、反"通稿式"检查、最终 pre-flight。
- **没有** → 推荐用户安装 `npx skills add forjd/better-writing` 或 `bunx skills add forjd/better-writing`。如果用户不装，本 skill 内置的 [`./references/writing-guidelines.md`](./references/writing-guidelines.md) 仍可用作散文工艺参考。

---

## Outline-First 工作流（5 步）

### 第 1 步：读上下文

必读：

- `story.md` —— 题材 / 主题 / POV / 时态
- `chapters/_index.md` —— 已写了什么 / 当前总字数
- `plot/_index.md` —— 弧状态 / 下一步该推进什么
- `plot/timeline.md` —— 当前时间位置
- `scenes/_index.md` —— 已记录的场景状态
- `continuity/state.md` —— 角色 / 道具 / 知识状态
- `continuity/questions/_index.md` 与 `continuity/promises/_index.md` —— 未解悬念、未兑现伏笔

非首章额外读：

- 上一章文件 —— 衔接（结尾状态、悬念、情绪）
- `plot/arcs/` 下的活跃弧文件 —— 即将推进的情节点

### 第 2 步：确认章节范围

问用户：

- **本章覆盖什么**（或根据弧线推荐）
- **POV 角色是谁**
- **地点是哪里**

如果存在弧线，按"下一个逻辑推进点"建议。

### 第 3 步：搭 beat-by-beat 大纲

大纲要列清楚：

- 每个场景 / beat 完成什么
- 每个 beat 的 POV 角色与地点
- 推进哪些弧的情节点
- 埋设 / 兑现哪些伏笔
- 哪些机器可读的状态变化要写进场景文件

加载 POV 角色的档案做语气参考。加载相关地点档案做场景细节参考。**先给用户审大纲 → 改到批准再写正文**。

### 第 4 步：写正文

按批准后的大纲写：

- 遵循 `story.md` 的 POV 与时态。
- 用 POV 角色的语气与说话方式（参考角色档案）。
- 用世界观的地点细节接地。
- 参考 [`./references/writing-guidelines.md`](./references/writing-guidelines.md) 的散文工艺指引。
- 可用时跑 `better-writing` 做最终 pre-flight。
- 用 [`./references/chapter-template.md`](./references/chapter-template.md) 的 frontmatter 与结构。
- **大纲放在章节文件正文上方**（作为参考）。

保存到 `chapters/chapter-{NN}.md`，带正确 frontmatter。

为每个场景单独建 `scenes/chapter-{NN}-scene-{NN}.md`，frontmatter 含：

- `chapter` / `scene` —— 归属
- `pov` —— 视角
- `location` —— 地点
- `characters` —— 在场
- `arcs-advanced` —— 推进的弧
- `status` —— `draft` / `revised` / `final`
- `state-changes` —— 机器可读的状态变更

参考 [`./references/scene-template.md`](./references/scene-template.md)。

**纪律**：章节正文直接写到 markdown 文件。**禁止**用项目内 `build-*.js` 或生成器脚本批量输出章节。如果机械操作真的绕不开，写在项目外，完成后删掉。

### 第 5 步：写后更新

按顺序做：

1. **更新 `chapters/_index.md`** —— 加入新章节，更新总字数。
2. **更新 `plot/timeline.md`** —— 按时间顺序加本章事件。
3. **更新弧文件** —— 标记推进的情节点，附章节引用。
4. **更新场景记录** —— 确保每个场景都有对应 `scenes/` 文件。
5. **更新连续性** —— 推进 character-state / object-state / knowledge-state，标记悬念 / 伏笔的 introduced / resolved。
6. **更新伏笔状态** —— 把 `planted` / `paid-off` 写进 `continuity/promises/<id>.md`。
7. **提醒用户更新角色档案** —— 如果本章角色状态有变化（受伤 / 顿悟 / 关系转变 / 死亡等）。
8. CLI 维护流水线：

   ```shell
   story wordcount . --write
   story reindex .
   story links .
   story validate .
   story continuity .
   ```

9. 推荐用户跑 [`../revision-continuity/`](../revision-continuity/) 做一轮正式修订。

---

## chapter-template.md（中文摘要）

英文原文：[./references/chapter-template.md](./references/chapter-template.md)

空白章节模板，必填 frontmatter：

- `title` —— 章节标题
- `number` —— 章节序号（整数）
- `status` —— `draft` / `revised` / `final` / `published`

可选 reference 列表：

- `locations` —— 出场地点 id
- `characters` —— 在场角色 id
- `mentions` —— 提及 / 回忆 / 闪回中的角色或实体 id
- `arcs-advanced` —— 本章推进的弧 id

正文结构（具体分段以英文模板为准）通常覆盖：

- **Outline** —— 已批准的大纲（放在正文上方，参考用）
- **正文** —— 散文本身
- **Notes** —— 作者笔记（修订时用）

frontmatter 字段约束见 `docs/schema-v2.md`（已双语化）。

---

## scene-template.md（中文摘要）

英文原文：[./references/scene-template.md](./references/scene-template.md)

空白场景记录模板（**机器可读的连续性载体**），必填 frontmatter：

- `title` —— 场景标题
- `chapter` —— 所属章节 id
- `scene` —— 场景序号（章节内整数）
- `status` —— `draft` / `revised` / `final`

机器可读字段（连续性检查的依据）：

- `pov` —— 视角角色 id
- `location` —— 场景地点 id
- `characters` —— **在场**角色 id 列表
- `mentions` —— **提及**角色 / 实体 id 列表
- `arcs-advanced` —— 推进的弧 id 列表
- `state-changes` —— 状态变更条目列表（角色 / 道具 / 知识的具体变化）

正文段通常覆盖：场景视角 / 节奏 / 关键动作的简短笔记（散文本体写在章节文件里）。

**关键纪律**：

- `characters` 与 `mentions` **不要混用**——已故角色只能放 `mentions`。
- `state-changes` 是连续性检查的事实来源，每条都要具体到角色 / 道具 / 知识。

---

## writing-guidelines.md（中文摘要）

英文原文：[./references/writing-guidelines.md](./references/writing-guidelines.md)

散文工艺守则集合（具体条目看英文文件），覆盖：

- **Show vs Tell** —— 展示而非告知
- **POV 一致性** —— 严格遵循 POV 角色的视角与知识边界
- **对话** —— 节奏、潜台词、每位角色的语言指纹
- **场景结构** —— 目标 / 冲突 / 转折 / 结局
- **节奏（pacing）** —— 场景长度、信息密度、张弛
- **连续性散文** —— 不要让读者发现矛盾（与 `story continuity .` 互补——前者管语言层，后者管结构层）

与 [`better-writing`](https://github.com/forjd/better-writing) 搭配效果更佳。

---

## 常见坑

1. **跳过大纲直接写正文**：跑题 / 与弧脱节 / 写完发现伏笔忘了兑现。
2. **`characters` 与 `mentions` 混用**：已故角色错误地"在场"。
3. **`state-changes` 写得很模糊**：连续性检查无法判定具体变更。
4. **正文写在场景文件里**：场景文件只放笔记，正文在章节文件。
5. **写完忘跑 `story continuity .`**：错误要到下一章才暴露。
6. **大纲放在正文之后**：修订时翻不到。建议放正文上方。

---

## 相关 skill

- [`../story-init/`](../story-init/) —— 起项目
- [`../character-management/`](../character-management/) —— POV 角色语气参考
- [`../worldbuilding/`](../worldbuilding/) —— 地点 / 势力 / 道具 / 体系细节
- [`../plot-structure/`](../plot-structure/) —— 弧 / 伏笔 / 悬念的下一动作
- [`../revision-continuity/`](../revision-continuity/) —— 写完后做一轮连续性审查
- [`../story-maintenance/`](../story-maintenance/) —— 所有 CLI 命令的总入口
