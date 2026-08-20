---
name: revision-continuity
description: 当用户说「修订一章」「编辑正文」「连续性检查」「找矛盾」「审计角色状态」「查时间线一致性」「行编辑」「发展性编辑」「打磨草稿」,或想给已有故事材料做下一轮修订时,使用本 skill。
---

# 修订与连续性

## 这个 skill 做什么

在 Story Skills 项目上做修订,不掉连续性。本 skill 管定向章节编辑、连续性审计、发展性修订、行编辑,以及起草下一章前的 pre-flight。

## 前置条件

故事项目必须存在。先确认项目根目录有 `story.md`,CLI 可用时跑一下 `story report .` 看看当前状况。

## 修订工作流

### 1. 明确修订类型(除非用户已指定)

- **连续性审计** —— 找矛盾、过时的引用、时间线问题、缺失的反向链接、字数漂移
- **发展性修订** —— 改善结构、场景目的、角色动机、节奏、悬念张力、弧推进
- **行编辑** —— 改清晰度、声音、节奏、对话、感官具体性,但不动情节事实
- **校对 / 打磨** —— 修小毛病:措辞、语法、重复、格式

### 2. 读相关上下文

- `story.md`
- `chapters/_index.md`
- 目标章节文件
- 存在时,前后章节
- 章节 frontmatter 引用的角色、地点、系统、弧文件
- 对应的 `scenes/` 场景文件
- `continuity/state.md`、open questions、promises / payoffs
- 对连续性敏感的修订,还要看 `plot/timeline.md` 和进行中的弧文件

### 3. 写一份简短的修订计划

- 改什么
- 为了连续性必须保留什么
- 除了章节之外还可能动哪些文件

### 4. 直接在 markdown 文件里做定向编辑

不要写项目本地的脚本去重写正文。

### 5. 同步依赖元数据

- 章节 frontmatter `status`(`draft` → `revised`,只在合适的时候 `revised` → `final`)
- CLI 可用时通过 CLI 写章节 `word-count`
- 事件变了就改 `plot/timeline.md`
- POV、地点、参与者、状态变化移动了,就改 `scenes/` 记录
- 知识、物件归属、悬念状态、payoff 变了,就改 `continuity/state.md`、`continuity/questions/` 或 `continuity/promises/`
- 修订改了 setup / payoff,弧的情节点或伏笔状态也要跟着改
- 角色或地点的状态、关系、地点引用变了,文件也要同步

### 6. 跑维护

```shell
story wordcount . --write
story reindex .
story links .
story validate .
story continuity .
story doctor .
```

`story continuity` 确定性检查:死亡顺序(`died-in` vs 后续出场)、promise/question 章节顺序、未兑现的 setup、POV / 角色一致性、`continuity/state.md` 的引用。故意做的闪回、回忆、死者录音,放在章节或场景的 `mentions` 而不是 `characters` 里。

如果 `story` 没装,在本仓库用 `bun run story --`,或者用 bundled `story-maintenance/scripts/story.js`。

## 连续性审计清单

先跑 `story continuity .` 收集确定性结论,再去检查 CLI 判断不了的部分:

- **角色知识** —— 没人做基于自己没学到信息的事
- **角色状态** —— 受伤、情绪、阵营、地点、状态都往下传
- **时间线** —— 时间段、旅途时长、先后顺序、因果保持一致
- **情节弧** —— 改动后每个场景仍然在推进或有意暂停某条弧
- **伏笔** —— 已埋和已兑现的条目跟弧文件对得上
- **Promises / questions** —— 长效连续性记录跟章节现在揭示或保留的东西吻合
- **场景状态** —— 每个章节场景都有机读的 POV、地点、参与者、弧、状态变化记录
- **世界规则** —— 魔法、科技、政治、地理跟 worldview 文件一致
- **引用** —— 章节 frontmatter 列出所有推进的主要角色、地点、弧
- **注册表** —— 编辑完,索引、字数、链接都还是新的

## 报告输出

用户要的是审计而不是直接编辑,按严重度给出发现,带上文件引用和具体改法。用户要的是修订,就把改过的文件、改过的连续性事实、维护结果汇报一下。
