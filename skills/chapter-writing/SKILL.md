---
name: chapter-writing
version: 0.3.1
description: |
  当用户说「写一章」「下一章」「章节大纲」「起草章节」「继续故事」「写一个场景」「把章节列出来」,或想为故事项目写正文时,使用本 skill。
  Or when the user says "write a chapter", "next chapter", "chapter outline", "draft the chapter", "continue the story", or wants to draft prose for a Story Skills project, use this skill.
allowed-cli: story wordcount --write, story reindex, story links, story validate, story next
scope: chapters/*.md + scenes/*.md + continuity/** + reverse-link files
calls: [story-maintenance, revision-continuity]
changelog: ../CHANGELOG.md
---

<!--
Skill metadata fields above are documentation-only. See:
  ../common/project-conventions.md        跨 skill 通用约定
  ../common/cli-priority.md               CLI 调用优先级
  ../common/continuity-audit-checklist.md 写作前 5 项 + 审计 10 项
  ../common/cross-reference-rules.md      跨实体引用 9 类规则
  ../common/id-naming.md                  kebab-case / CJK 音译 / 命名规则
-->

# 章节写作

## 这个 skill 做什么

按"先大纲后正文"的流程写章节。从其他故事元素（角色、世界、情节）汇集上下文以保持一致性，先搭出逐拍大纲让用户过目，再写完整正文。写完再回头更新所有交叉引用（章节索引、时间线、伏笔）。

## 工作流（checklist）

```
□ 0. 探测 better-writing skill 是否可用（用就优先）
□ 1. 分层读上下文（必读 / 条件 / 按场景——见下文）
□ 2. 写作前自检过 5 项（../common/continuity-audit-checklist.md）
□ 3. 确定章节范围（问用户范围 / POV / 地点）
□ 4. 搭大纲 → 先落盘到 chapters/chapter-NN-outline.md（status: outline）
□ 5. 用户审批大纲
□ 6. 写正文到 chapters/chapter-NN.md
□ 7. 同步场景文件 / 时间线 / 弧线 / 连续性 / 字数
□ 8. CLI 跑 wordcount --write + reindex + links + validate + next
□ 9. 总结改动汇报
```

## 前置条件

项目里至少要有：

- `story.md`（故事圣经）
- `characters/` 里至少有一个角色
- `plot/_index.md` 里的情节结构（写头几章不是强求，但建议有）

## 配套 skill

写正文或修订章节之前，先看看当前 agent 环境里有没有 `better-writing` skill。

- 如果有，就用它管正文质量、声音校准、反通用化检查，以及落档前的最后 pre-flight
- 如果没有，建议安装 [forjd/better-writing](https://github.com/forjd/better-writing)：

```shell
npx skills add forjd/better-writing
```

或：

```shell
bunx skills add forjd/better-writing
```

用户不装也行，那就用本 skill 自带的 `references/writing-guidelines.md`。

## 第一步：分层汇集上下文

不要无差别读 8 个文件——按场景条件加载：

**L1 必读（任何章节都读）**：

- `story.md` —— 类型、主题、POV、时态
- `chapters/_index.md` —— 已写章节、当前字数
- `continuity/state.md` —— 角色、物件、知识状态

**L2 条件读（按章节判断）**：

- 不是第一章：上一章的文件 —— 接连续性（结尾状态、悬念、情绪）
- 不是第一章：`plot/arcs/` 里 `status: in-progress` 的弧文件 —— 看下一拍该做什么
- 本章涉及 promise/question：`continuity/promises/_index.md` / `continuity/questions/_index.md`
- 项目存在：完整 `plot/_index.md`、`plot/timeline.md`、`scenes/_index.md`

**L3 按场景按需读（仅本场景涉及）**：

- POV 角色的角色档案（仅取与本章相关的几节，不要全读长档案）
- 场景地点的 `worldbuilding/locations/<id>.md`
- 当章涉及的弧文件里相关的情节点段

> 长项目 token 优化提示：`characters/<id>.md` 通常几百行，但本章只需要"声音与口癖"+"人物弧"两节。不要整文读，用 Grep 抽取相关节即可。

## 第二步：写作前自检 5 项

见 `../common/continuity-audit-checklist.md` 的"写作前自检"段。**5 项任何一项不过，先回 L2 / L3 补料，不动笔**。

## 第三步：确定章节范围

问用户：

- 这一章覆盖什么？（或者基于情节弧给个建议）
- 谁做 POV？
- 哪个 / 哪些地点？

情节弧存在的话，推荐接下来应该推进的拍。

## 第四步：搭大纲 → 先落盘

逐拍列出来：

- 每个场景 / 拍要完成什么
- 每个拍的 POV 角色和地点
- 推进了哪些弧的情节点
- 要埋或兑现的伏笔
- 这一拍要登记的、可机读的状态变化

加载 POV 角色文件做声音参考（仅"声音与口癖"节）。加载相关地点文件做场景细节。

**把大纲交给用户审之前，先落盘**：

```text
chapters/chapter-NN-outline.md     ← 大纲（status: outline，先审后动笔）
chapters/chapter-NN.md             ← 正文（status: draft，落档中）
```

`chapter-NN-outline.md` 的好处：

- 用户来回迭代大纲不会丢
- 修订时能 `git diff outline vs prose` 看"想写的"vs"实际写的"
- `story next` 也能从 outline 推断下一步

大纲部分字段：

```markdown
---
title: "{章节标题}"
number: {NN}
pov: {character-id}
arcs-advanced: [{arc-id-1}, {arc-id-2}]
status: outline
---

## 摘要

{一句话讲本章的因果输入与输出。}

## 拍

1. **{拍 1}** —— {POV} 在 {地点}，{做什么}，推进 {arc-1} 的 {beat}
   - state-changes: {target} ── {change}
2. **{拍 2}** —— ...

## 本章埋下的伏笔

- {promise-id-1}：setup 在 {chapter-id-?}，payoff 预设在 {chapter-id-?}

## 本章兑现的伏笔

- {promise-id-2}：本章 payoff，状态从 planted → paid-off
```

把大纲交给用户审，改到通过。

## 第五步：写正文

大纲过稿后，写完整正文：

- 遵循 `story.md` 里的 POV 和时态
- 用 POV 角色档案里的说话方式和语言习惯
- 场景里嵌入从世界观文件拿到的地点细节
- 翻 `references/writing-guidelines.md` 看正文打磨建议
- 落档前如果 `better-writing` 可用，先过一遍它
- 用 `references/chapter-template.md` 的章节模板
- 把通过的大纲放在正文上方（留作参考）

存到 `chapters/chapter-{NN}.md`，带合适的 frontmatter。

每个场景对应创建或更新 `scenes/chapter-{NN}-scene-{MM}.md`。场景 frontmatter 字段：`chapter`、`scene`、`pov`、`location`、`characters`、`arcs-advanced`、`status`、`state-changes`，让连续性脱离散文也能存活。状态流转：`outline` → `draft` → `revised` → `final` → `complete`（已写入 `continuity/state.md`）。

正文直接写到章节 markdown 文件里。**不要**用项目里的本地构建 / 生成 / 批量写脚本（比如 `build-*.js`）去生成章节。如果某个机械操作实在必须用临时 helper，放在故事项目之外，完事删掉。

### 字数自查

按 `references/writing-guidelines.md` 第十一节对照：

| 章节类型 | 字数参考（中文字符） |
| --- | --- |
| 短过渡章 | 1500–2500 |
| 标准剧情章 | 3000–5000 |
| 重大节拍章 | 5000–8000 |
| 高潮章 | 6000–10000 |

本章若超过 10000 字，提示用户考虑拆章或加场景分隔（内部 `---`）。

## 第六步：写完后的同步

正文落档后：

1. **更新 `chapters/_index.md`** —— 注册表加章节，刷新总字数
2. **更新 `plot/timeline.md`** —— 把本章发生的事件按时间顺序加进去
3. **更新弧文件** —— 把推进的情节点标上章节引用
4. **更新场景记录** —— 每个场景都有对应的 `scenes/` 文件，状态推进到 `complete`
5. **更新连续性** —— 角色状态、物件归属、知识、悬而未决的问题、承诺 / payoff 都往下接
6. **更新伏笔** —— 已埋或已兑现的条目标上 `planted` 或 `paid-off`，写清章节引用
7. **角色变化同步** —— **主动询问用户**是否要在落档时同步更新相关角色档案；yes 则改该步为"现在同步更新"
8. **CLI 可用就跑维护**：

```shell
story wordcount . --write
story reindex .
story links .
story validate .
story next .
```

把改过的地方总结给用户。

## 场景分隔

章节内部的场景用 `---` 分隔。每个场景要有明确的 POV 角色（就算和上一个场景同 POV）和地点。

## 修订交接

当用户要修订、行编辑、打磨或连续性检查已有章节，**改用 `revision-continuity` skill**。本 skill 只管起草和章节创建；`revision-continuity` 管定向编辑、连续性审计和起草后清理。

## CLI 维护

> CLI 三种调用方式的优先级与失败处理统一见 `../common/cli-priority.md`。

CLI 完全不可用时，手工做注册表、反向链接和字数检查。

## 跨实体引用

> 9 类双向引用规则见 `../common/cross-reference-rules.md`。

## 写作后反向检查

> 见 `../common/continuity-audit-checklist.md` 的"写完后反向检查"段。

## 参考文件

- **`references/chapter-template.md`** —— 章节文件 frontmatter + 结构模板
- **`references/scene-template.md`** —— 场景的机读连续性模板
- **`references/writing-guidelines.md`** —— 正文打磨指南：show-don't-tell、POV、对话、节奏、场景结构、连续性
- **`../common/continuity-audit-checklist.md`** —— 写作前自检 5 项 + 连续性审计 10 项
- **`../common/project-conventions.md`** —— 跨 skill 通用约定
- **`../common/id-naming.md`** —— kebab-case / CJK 音译规则
- **`../common/cross-reference-rules.md`** —— 9 类双向引用规则