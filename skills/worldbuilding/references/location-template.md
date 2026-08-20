# 地点模板（Location Template）

新建地点档案时使用此模板，路径约定：`worldbuilding/locations/{location-name-kebab}.md`。

地点档案是角色档案的"容器"——告诉读者"这里是什么样子、闻起来什么味道、住着什么人"。所有出现过的地点都应有独立档案；一次性场景（仅出现一次、无剧情意义）可以共用 `type: landmark` 或 `type: other`，不必单独建档。

## frontmatter 字段表

| 字段 | 必填 | 类型 / 允许值 | 说明 |
| --- | --- | --- | --- |
| `name` | 是 | 字符串 | 地点名称，与中文行文一致 |
| `type` | 是 | `city` \| `town` \| `village` \| `fortress` \| `ruins` \| `wilderness` \| `landmark` \| `region` \| `continent` \| `building` \| `other` | 地点类型。脚本据此决定在 `_index.md` 里归到哪一组 |
| `region` | 否 | 字符串 | 所属大区/国家/大陆名称 |
| `population` | 否 | 整数或描述 | 人口数或估算；虚构世界可用"约三千户"等表述 |
| `controlled-by` | 否 | kebab-case 角色或势力 id | 当前实际控制者；势力优先于角色 |
| `notable-characters` | 否 | kebab-case 角色 id 列表 | 与本地点深度绑定的角色；与角色档案的 `locations` 双向绑定 |
| `tags` | 否 | 字符串数组 | 自由标签；项目内复用 |
| `status` | 是 | `thriving` \| `declining` \| `abandoned` \| `contested` \| `hidden` | 故事起始时本地点的整体状态 |

## YAML 示例

```yaml
---
name: "北口驿站"
type: fortress
region: "北境"
population: "驻军二百，附户百余"
controlled-by: chen-da
notable-characters:
  - lin-ruo
  - shen-laotou
tags:
  - 边境
  - 关隘
  - 军镇
status: contested
---
```

```yaml
---
name: "阎王寨"
type: ruins
region: "北境·深山"
controlled-by: chen-da
tags:
  - 山寨
  - 反叛据点
status: hidden
---
```

## 文件结构

```markdown
## 描述

第一印象——抵达这里的人看到、听到、闻到、触摸到什么。挑 2–3 个具体感官细节（声音 + 气味 + 触感的组合最常见）。**避免用"壮丽""宏伟""阴森"这类抽象形容词**——换成具体可感的画面。

## 历史

本地点如何形成，发生过哪些与剧情相关的事件。不要把整个国家史搬进来；只写跟当前故事线有关的部分。

## 文化与风俗

本地居民如何生活：节庆、禁忌、日常作息、行业分工、饮食习惯、待客之道。挑能体现"这里与别处不同"的 2–3 处。

## 显著地标

| 名称 | 类型 | 在剧情中的作用 |
| --- | --- | --- |
| 鼓楼 | 建筑 | 沈老头的藏身处 |
| 北口石墙 | 防御工事 | 战场之一 |
| 古槐 | 自然物 | 主角儿时记忆锚点 |

## 当前态势

故事时间点上本地点的状态：政治归属、近期事件、内部矛盾、外部威胁、与其它地点的关系。常作为章节"开场氛围"的素材源。

## 引用本章

列出本地点作为场景出现的章节——`story validate .` 也会校验"哪些章节用了这个地点 id"是否与 `chapters/*.md` 的 `locations` 字段一致。
```

## 使用说明

- **id 双向绑定**：把角色加入 `notable-characters` 后，记得去对应角色档案的 `locations` 列表里加上本地点的 kebab id，否则反向引用会断。
- **`region` 用字符串而非 id**：除非该项目里已经有 `worldbuilding/locations/<region-id>.md`，否则自由文本即可。脚本不强制 region 也是地点。
- **`controlled-by` 是势力时填势力 id**：本地点目前由"哪一股力量"实际控制——是势力优先，不是统治者个人；统治者个人挂到 `notable-characters`。
- **`tags` 跨地点复用**：例如多个军事要塞都打 `军镇` 标签，便于在 `_index.md` 里按 tag 筛选。
- **废墟与隐藏地点**：status 为 `abandoned` / `hidden` 的地点仍然要在章节里登记 frontmatter——脚本只校验 id 是否存在，不校验地点是否有人住。
