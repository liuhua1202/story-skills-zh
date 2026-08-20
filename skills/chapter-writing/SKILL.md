---
name: chapter-writing
description: 当用户说「写一章」「下一章」「章节大纲」「起草章节」「继续故事」「写一个场景」「把章节列出来」,或想为故事项目写正文时,使用本 skill。
---

# 章节写作

## 这个 skill 做什么

按「先大纲后正文」的流程写章节。从其他故事元素(角色、世界、情节)汇集上下文以保持一致性,先搭出逐拍大纲让用户过目,再写完整正文。写完再回头更新所有交叉引用(章节索引、时间线、伏笔)。

## 前置条件

项目里至少要有:

- `story.md`(故事圣经)
- `characters/` 里至少有一个角色
- `plot/_index.md` 里的情节结构(写头几章不是强求,但建议有)

## 配套 skill

写正文或修订章节之前,先看看当前 agent 环境里有没有 `better-writing` skill。

- 如果有,就用它管正文质量、声音校准、反通用化检查,以及落档前的最后 pre-flight
- 如果没有,建议安装 [forjd/better-writing](https://github.com/forjd/better-writing):

```shell
npx skills add forjd/better-writing
```

或:

```shell
bunx skills add forjd/better-writing
```

用户不装也行,那就用本 skill 自带的 `references/writing-guidelines.md`。

## 大纲优先工作流

### 第一步:汇集上下文

读这些文件搞清楚故事当前状态:

- `story.md` —— 类型、主题、POV、时态
- `chapters/_index.md` —— 已写章节、当前字数
- `plot/_index.md` —— 弧状态、下一拍该做什么
- `plot/timeline.md` —— 时间线上的当前位置
- `scenes/_index.md` —— 已经记录好的场景状态
- `continuity/state.md` —— 角色、物件、知识状态
- `continuity/questions/_index.md` 和 `continuity/promises/_index.md` —— 未解的悬念和 setup/payoff 承诺

如果不是第一章,再加读:

- 上一章的文件 —— 接连续性(结尾状态、悬念、情绪)
- `plot/arcs/` 里正在进行的弧文件 —— 看接下来要打的拍

### 第二步:确定章节范围

问用户:

- 这一章覆盖什么?(或者基于情节弧给个建议)
- 谁做 POV?
- 哪个 / 哪些地点?

情节弧存在的话,推荐接下来应该推进的拍。

### 第三步:搭大纲

逐拍列出来:

- 每个场景 / 拍要完成什么
- 每个拍的 POV 角色和地点
- 推进了哪些弧的情节点
- 要埋或兑现的伏笔
- 这一拍要登记的、可机读的状态变化

加载 POV 角色文件做声音参考。加载相关地点文件做场景细节。

把大纲交给用户审,改到通过。

### 第四步:写章节

大纲过稿后,写完整正文:

- 遵循 `story.md` 里的 POV 和时态
- 用 POV 角色档案里的说话方式和语言习惯
- 场景里嵌入从世界观文件拿到的地点细节
- 翻 `references/writing-guidelines.md` 看正文打磨建议
- 落档前如果 `better-writing` 可用,先过一遍它
- 用 `references/chapter-template.md` 的章节模板
- 把通过的大纲放在正文上方(留作参考)

存到 `chapters/chapter-{NN}.md`,带合适的 frontmatter。

每个场景对应创建或更新 `scenes/chapter-{NN}-scene-{NN}.md`。场景 frontmatter 字段:`chapter`、`scene`、`pov`、`location`、`characters`、`arcs-advanced`、`status`、`state-changes`,让连续性脱离散文也能存活。

正文直接写到章节 markdown 文件里。**不要**用项目里的本地构建 / 生成 / 批量写脚本(比如 `build-*.js`)去生成章节。如果某个机械操作实在必须用临时 helper,放在故事项目之外,完事删掉。

### 第五步:写完后的更新

正文落档后:

1. **更新 `chapters/_index.md`** —— 注册表加章节,刷新总字数
2. **更新 `plot/timeline.md`** —— 把本章发生的事件按时间顺序加进去
3. **更新弧文件** —— 把推进的情节点标上章节引用
4. **更新场景记录** —— 确保每个场景都有对应的 `scenes/` 文件
5. **更新连续性** —— 角色状态、物件归属、知识、悬而未决的问题、承诺 / payoff 都往下接
6. **更新伏笔** —— 把已埋或已兑现的条目标上 `planted` 或 `paid-off`,写清章节引用
7. **记录角色变化** —— 如果某角色状态改了(受伤、揭秘、关系变化),提醒用户去更新角色文件
8. **CLI 可用就跑维护:**

```shell
story wordcount . --write
story reindex .
story links .
story validate .
story next .
```

把改过的地方总结给用户。

## 场景分隔

章节内部的场景用 `---` 分隔。每个场景要有明确的 POV 角色(就算和上一个场景同 POV)和地点。

## 修订交接

当用户要修订、行编辑、打磨或连续性检查已有章节,改用 `revision-continuity` skill。本 skill 只管起草和章节创建;`revision-continuity` 管定向编辑、连续性审计和起草后清理。

## CLI 维护

优先用 Story CLI。`story` 没装但 `story-maintenance` skill 在,就用 `node ../story-maintenance/scripts/story.js` 加同样参数(路径相对本 skill 目录解析)。CLI 完全不可用时,手工做注册表、反向链接和字数检查。

## 参考文件

- **`references/chapter-template.md`** —— 章节文件 frontmatter + 结构模板
- **`references/scene-template.md`** —— 场景的机读连续性模板
- **`references/writing-guidelines.md`** —— 正文打磨指南:show-don't-tell、POV、对话、节奏、场景结构、连续性
