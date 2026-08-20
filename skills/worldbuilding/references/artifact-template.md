# 道具 / 器物模板（Artifact Template）

新建道具档案时使用此模板，路径约定：`worldbuilding/artifacts/{artifact-name-kebab}.md`。**道具**是有形或可被识别的物件——武器、文件、技术装置、信物、徽记、关键资源、不可移动的地标物——只要**它本身**就是情节的载体，就值得独立建档。

> 一次性的小物件（一只杯子、一件换洗衣服）不需要建档；它们只是舞台道具，归在场景 frontmatter 或正文里描述即可。

## frontmatter 字段表

| 字段 | 必填 | 类型 / 允许值 | 说明 |
| --- | --- | --- | --- |
| `name` | 是 | 字符串 | 道具名称 |
| `type` | 是 | `object` \| `weapon` \| `document` \| `technology` \| `relic` \| `symbol` \| `resource` \| `other` | 道具类型 |
| `status` | 是 | `active` \| `lost` \| `destroyed` \| `hidden` \| `transferred` \| `unknown` | 故事起始时道具的整体状态 |
| `owner` | 否 | kebab-case 角色或势力 id | 当前持有者；势力优先于个人 |
| `location` | 否 | kebab-case 地点 id | 当前所在地点；持有者身上的物品 `owner` + `location` 都填 |
| `tags` | 否 | 字符串数组 | 自由标签 |

## YAML 示例

```yaml
---
name: "北口令牌"
type: object
status: active
owner: shen-laotou
location: bei-kou-ya-zhan
tags:
  - 信物
  - 北境
  - 通行凭证
---
```

```yaml
---
name: "林氏半块玉佩"
type: relic
status: transferred
owner: lin-ruo
location: lin-ruo-shen-shang
tags:
  - 信物
  - 林家
  - 谜题
---
```

## 文件结构

```markdown
## 描述

道具**长什么样**——读者第一眼会注意到的视觉锚点。挑 2–3 个最具体的细节（材质、形状、铭文、磨损痕迹），不要用"古老的""神秘的""强大的"这种模糊形容词。

## 功能

道具**能做什么、不能做什么、代价是什么**：

- 主动能力（使用它会发生什么）
- 被动属性（持有者被动获得什么）
- 限制（次数 / 地点 / 时间 / 状态触发）
- 代价（材料、寿命、关系、健康、副作用）
- **硬边界**（它绝对做不到的事——契诃夫之枪的另一面）

> 契诃夫之枪：登场的关键道具必须开火；如果在本章登场却从未被使用，把这条信息登记到 `continuity/questions/` 或 `continuity/promises/` 里，避免遗漏。

## 历史

| 阶段 | 内容 |
| --- | --- |
| **起源** | 谁造的 / 何时造的 / 为什么造 |
| **历任持有者** | 持有顺序、每次交接发生了什么 |
| **剧情相关事件** | 哪些章节围绕它发生过关键事件 |

## 当前状态

故事时间点上的现状：

- **持有者**：是谁
- **位置**：在谁身上 / 什么地方 / 是否被隐藏
- **状态**：完好 / 损坏 / 部分失能
- **未兑现的风险**：还有什么隐患，可能在后续章节引爆

## 引用章节

列出本道具作为剧情关键道具出现的章节。`story validate .` 也会校验：出现在正文里的道具，是否都有独立档案可查。
```

## 使用说明

- **`owner` 与 `location` 同时填写**：当道具由某人贴身持有，两个字段都填（如 `owner: lin-ruo` + `location: lin-ruo-shen-shang`，或自由字符串 `林若身上`）。当道具被藏匿在某地点，`owner` 留空或填已知最后持有者，`location` 填藏匿地点。
- **`status: transferred` 与 `lost`**：`transferred` 表示已知转移到了某处；`lost` 表示下落不明。`transferred` 比 `lost` 信息更精确——优先用 `transferred`。
- **`type: document`**：信件、账本、契约、地图、卷轴都归这一类。`function` 段重点写"被谁读到会改变什么"。
- **`type: technology`**：技术装置（机关、装置、机器）。`function` 段写明工作原理与限制，**不要**把它写成"高科技魔法"——技术有自己的边界。
- **校验联动**：新增道具后跑 `story reindex .` 与 `story links .`，后者会校验章节内出现的道具引用是否能反查到档案。
