<!--
Shared canonical reference / 连续性审计清单
Source of truth for: chapter-writing (pre-flight) + revision-continuity (主体)
修改本文件 = 修改两处 skill 的清单
-->

# 连续性审计清单

> 本清单是 `chapter-writing`(写作前自检)和 `revision-continuity`(审计清单)共用的权威版本。
>
> 引用方式：用一句 "见 `../common/continuity-audit-checklist.md`" 替代过去直接写的同内容段落。
>
> 先跑 `story continuity .` 收集确定性结论,再去检查 CLI 判断不了的部分。

---

## 写作前自检（5 项必过）

1. **上一章结尾**：情绪、动作、信息、断点——不要和本章开头打架。
2. **角色状态**：受伤、装备、情感、关系、已知信息——别让上章断了腿的人这章就跑步。
3. **时间线**：钟点、日期、季节、出行时长——别让"三天后到达"实际只过了一天。
4. **地点与道具**：地点是否登记在 `worldbuilding/locations/`？关键物品是否在 `continuity/state.md`？
5. **弧线进度**：本章应推进哪几条弧线的哪些节拍？是否要埋/兑现伏笔？

## 连续性审计清单（10 项）

| # | 检查项 | 怎么验 |
| --- | --- | --- |
| 1 | **角色知识** | 没人做基于自己没学到信息的事 |
| 2 | **角色状态** | 受伤、情绪、阵营、地点、状态都往下传 |
| 3 | **时间线** | 时间段、旅途时长、先后顺序、因果保持一致 |
| 4 | **情节弧** | 改动后每个场景仍然在推进或有意暂停某条弧 |
| 5 | **伏笔** | 已埋和已兑现的条目跟弧文件对得上 |
| 6 | **承诺 / 悬念** | 长效连续性记录跟章节现在揭示或保留的东西吻合 |
| 7 | **场景状态** | 每个章节场景都有机读的 POV、地点、参与者、弧、状态变化记录 |
| 8 | **世界规则** | 魔法、科技、政治、地理跟 worldbuilding 文件一致 |
| 9 | **引用** | 章节 frontmatter 列出所有推进的主要角色、地点、弧 |
| 10 | **注册表** | 编辑完,索引、字数、链接都还是新的 |

## 写完后反向检查

- 本章埋下的伏笔、抛出的问题、造成的状态变化,是否都登记到 `continuity/promises/` / `continuity/questions/` / 场景的 `state-changes`?
- 本章出现的所有角色、地点、道具,是否都登记在项目里？id 是否用 kebab-case?
- 已故角色本章只在 `mentions` 出现,没有进 `characters`?
- `continuity/state.md` 是否已同步更新?

## `story continuity` 自动覆盖的确定性检查

CLI 已经确定性检查的子项(agent 不必手动验):

- `died-in` 顺序 —— 已故角色后续章节不能在 `characters` 出现
- 承诺/悬念章节顺序 —— `continuity/promises/` 与 `continuity/questions/` 中的章节 id 不乱序
- 契诃夫之枪 —— 已埋的伏笔需在后续章节标 `paid-off`
- POV/cast 一致性 —— 章节 `pov` 与第一个场景 `pov` 对齐
- `continuity/state.md` 引用 —— state 文件中提到的所有实体都存在