---
name: plot-structure
description: 当用户说「创建情节弧」「故事结构」「加一个情节点」「故事时间线」「追踪伏笔」「节奏」「幕结构」「故事弧」「情节大纲」,或想规划和管理故事的叙事结构时,使用本 skill。
---

# 情节结构

## 这个 skill 做什么

规划和管理情节弧、情节点、伏笔和叙事时间线。每条弧是 `plot/arcs/` 下的一篇 markdown 文件,所有弧的合并时间线放在 `plot/timeline.md`。plot index 追踪所有弧的状态和主题覆盖。

## 前置条件

项目根目录得有 `story.md`(由 `story-init` 创建)。先确认存在。

## 选择故事结构

1. 读 `story.md`,拿类型和主题
2. 翻 `references/structure-models.md` 看可选结构
3. 基于类型给一个推荐(没有把握默认三幕)
4. 更新 `plot/_index.md` frontmatter 的 `structure` 字段
5. 在 story structure 节里填入 beat sheet
6. CLI 可用就跑 `story validate .`

## 创建弧

1. 读 `story.md` 拿主题
2. 读 `plot/_index.md` 了解现有弧
3. 读 `characters/_index.md` 看现有可用角色
4. 跟用户确认:
   - 弧的名字
   - 类型(`main` / `subplot` / `character` / `thematic`)
   - 涉及哪些角色
   - 服务哪些主题
5. 用对话把弧聊出来:setup → escalation → climax → resolution
6. 按 `references/arc-template.md` 写文件
7. 存到 `plot/arcs/{arc-name-kebab}.md`
8. 更新 `plot/_index.md` 的 Arcs 表
9. 更新 `plot/_index.md` 的主题追踪节
10. 如果引用了角色,核实他们在 `characters/` 里存在
11. CLI 可用就跑 `story reindex .`、`story links .`、`story validate .`

## 管理情节点

情节点写在弧文件的 Plot Points 表里。加情节点时:

1. 读对应弧的文件
2. 在表里添加该情节点,带上章节引用(已知的话)
3. 按时间顺序把事件加到 `plot/timeline.md`
4. 如果情节点带伏笔,加进弧的 foreshadowing 表
5. 如果情节点形成读者承诺或悬念,创建或更新 `continuity/promises/` 或 `continuity/questions/` 里的一条记录
6. CLI 可用就跑 `story validate .`

## 时间线管理

`plot/timeline.md` 是跨所有弧的全故事事件总时间线。

加事件时:

- 按时间顺序插入
- 链接到对应的弧和章节
- 每条事件一行,简短扼要

复核时间线时:

- 检查时间顺序的一致性
- 识别节奏问题(事件挤在一块、长时间空白)
- 标记那些没有推进的弧

## 伏笔追踪

每条弧在自己的 Foreshadowing 表里追踪伏笔:

- **Planted** —— 埋下了什么暗示或铺垫
- **Payoff** —— 怎么兑现
- **Chapter Planted / Chapter Payoff** —— 各在哪一章
- **Status** —— `planned` / `planted` / `paid-off`

写章节时,把状态还是 `planted`、但还没兑现的条目挑出来当提醒。

跨弧的长效 setup / payoff 追踪,统一维护在 `continuity/promises/{promise-kebab}.md`,字段:`status`、`planted`、`payoff`、`arcs`、`characters`。悬念或开放连续性的追踪放在 `continuity/questions/{question-kebab}.md`。

## 跨实体引用

- 弧通过 frontmatter 的 `characters` 字段引用角色
- 弧通过 frontmatter 的 `themes` 字段引用主题
- 情节点引用章节
- 时间线条目链接弧和章节
- `plot/_index.md` 的主题追踪节把主题映射到弧和章节
- promises 和 questions 引用章节、弧和相关角色

## CLI 维护

优先用 Story CLI。`story` 没装但 `story-maintenance` skill 在,就用 `node ../story-maintenance/scripts/story.js` 加同样参数(路径相对本 skill 目录解析)。CLI 完全不可用时,手工做注册表和反向链接检查。

## 参考文件

- **`references/arc-template.md`** —— 弧文件模板(frontmatter + 各节)
- **`references/question-template.md`** —— 连续性问题 / 悬念模板
- **`references/promise-template.md`** —— setup / payoff 追踪模板
- **`references/structure-models.md`** —— 故事结构模型(三幕、英雄之旅、Save the Cat、起承转合、五幕)以及对应的 beat sheet
