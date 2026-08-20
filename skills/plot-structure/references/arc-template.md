# 弧线模板（Arc Template）

新建情节弧线时使用此模板，路径约定：`plot/arcs/{arc-name-kebab}.md`。一条弧线是一组有起点、高潮、终点的情节事件，可能跨越多条主线（主角人物弧、爱情弧、政治弧、主题弧……）。

## frontmatter 字段表

| 字段 | 必填 | 类型 / 允许值 | 说明 |
| --- | --- | --- | --- |
| `name` | 是 | 字符串 | 弧线名称；出现在 `plot/_index.md` 索引里 |
| `type` | 是 | `main` \| `subplot` \| `character` \| `thematic` | 主线 / 支线 / 人物 / 主题 |
| `status` | 是 | `planned` \| `in-progress` \| `resolved` | 整条弧线的整体状态 |
| `characters` | 否 | kebab-case 角色 id 列表 | 直接卷入的角色 |
| `themes` | 否 | 主题字符串列表 | 该弧线服务的主题；与 `story.md` 的 themes 对齐 |
| `acts` | 否 | `act-1` \| `act-2` \| `act-3`（可重复） | 弧线主要落点所在的幕；可跨幕 |

## YAML 示例

```yaml
---
name: "绝心之路"
type: main
status: in-progress
characters:
  - lin-ruo
  - chen-da
  - shen-laotou
themes:
  - 复仇与放下
  - 权力的代价
acts:
  - act-1
  - act-2
  - act-3
---
```

> `type` 影响后续校验：
> - `main` 至少需要一个 `in-progress` 的状态点，否则 `story validate .` 会报警
> - `subplot` 的 `status: resolved` 不应晚于其最后一个出场角色的 `died-in` 章节
> - `character` 通常与某角色的人物弧一对一映射
> - `thematic` 必须至少关联一个 `themes` 条目

## 文件结构

```markdown
## 起因（Setup）

弧线开始前的世界状态。是什么事件让这条弧线**开始**——也就是开端事件（inciting incident）。一两段。

## 升级（Rising Action）

按时间顺序的关键升级、转折、复杂化：

1. 第一次升级
2. 第二次升级 / 反转
3. 中段变化（midpoint）
4. 逼近高潮的最后一次升级

## 高潮（Climax）

弧线的最高张力点。哪一刻、谁做了什么、结果是什么。

## 收束（Resolution）

弧线如何结束。世界和角色发生了什么变化。是否留下余响（其它弧线的引线）。

## 情节点（Plot Points）

| # | 情节点 | 所在幕 | 对应章节 | 状态 | 备注 |
| --- | --- | --- | --- | --- | --- |
| 1 | 林若在北口旧宅发现父亲留下的密信 | act-1 | chapter-03 | written | 引出本弧 |
| 2 | 沈老头交付令牌 | act-2 | chapter-07 | written | 弧线推进 |
| 3 | 与陈大在阎王寨决战 | act-3 | chapter-21 | planned | 高潮 |
| 4 |  |  |  | planned |  |
```

> `状态` 字段建议用：`planned`（计划中） / `planted`（已埋设但未展开） / `written`（正文已写到） / `revised`（修订过） / `paid-off`（已兑现 / 已解决）。

## 伏笔追踪（Foreshadowing）

| 埋设 | 兑现 | 埋设章节 | 兑现章节 | 状态 |
| --- | --- | --- | --- | --- |
| 林若左肩旧伤在阴雨时隐隐作痛 | 后续章节揭示是陈大部下所伤 | chapter-03 | chapter-18 | planted |
| 沈老头的令牌背面刻着"南渡"二字 | 用于打开北口密道 | chapter-07 | chapter-15 | planted |

> 跨弧的、需要长程兑现的 setup/payoff，建议同时在 `continuity/promises/<promise-kebab>.md` 单独建档，避免弧线被裁后丢失。

---

## 使用说明

- **弧线 vs 章节**：弧线是横切结构，章节是纵向切片。一个章节可以推进多条弧线的多个情节点；一条弧线可以跨越几十章。两者不要混用文件。
- **情节点细化**：每条情节点尽量带"对应章节"——便于 `story next .` 推测下一个落点。
- **弧线之间的耦合**：当一条弧线的高潮恰好是另一条弧线的起因时，在两条弧线的"情节点"表里各登记一行，并在 `note` 里写明耦合关系。
- **status 流转**：`planned`（大纲阶段） → `in-progress`（第一个情节点落地后） → `resolved`（最后兑现后）。主线弧线 `resolved` 后，记得把关联的 promise / question 一并关闭。
- **校验联动**：每次更新弧线后跑 `story reindex .` 与 `story validate .`；后者会校验情节点的章节 id 是否真实存在。
