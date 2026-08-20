# 角色模板（Character Template）

新建角色档案时使用此模板，路径约定：`characters/{character-name-kebab}.md`。`kebab-case` 规则：用小写英文/拼音连字符形式（例：`林若` → `lin-ruo`），避免中文作为文件 id。`kebab` id 出现的位置：章节 `pov` / `characters`、地点 `notable-characters`、势力 `members`、道具 `owner`、弧线 `characters` 等——是一切交叉引用的钥匙。

## frontmatter 字段表

| 字段 | 必填 | 类型 / 允许值 | 说明 |
| --- | --- | --- | --- |
| `name` | 是 | 字符串 | 角色本名，与中文行文一致；可加引号 |
| `role` | 是 | `protagonist` \| `antagonist` \| `supporting` \| `minor` | 角色在故事中的功能位置 |
| `age` | 否 | 整数 | 年龄。叙事开始时的年龄，不是出生年份 |
| `status` | 是 | `alive` \| `deceased` \| `unknown` | 故事起始时的生存状态 |
| `died-in` | 否 | `chapter-{NN}` | 当 `status: deceased` 且死亡**发生在正文里**时填；用于让 `story continuity` 不把后续提及误判为死后复活 |
| `aliases` | 否 | 字符串数组 | 别号、绰号、化名；正文里称呼混用时便于检索 |
| `relationships` | 否 | 对象数组 | 与其它角色的关系（详见下方子表） |
| `locations` | 否 | kebab-case 地点 id 列表 | 与该角色深度绑定的地点；与地点的 `notable-characters` 互为反向引用 |
| `tags` | 否 | 字符串数组 | 自由标签，建议在项目内复用（如 `magic-user` / `court-official` / `li-family`） |
| `arc` | 否 | arc kebab id | 该角色主要归属的人物弧线 |

### `relationships[]` 子字段

| 子字段 | 必填 | 类型 | 说明 |
| --- | --- | --- | --- |
| `character` | 是 | kebab-case 角色 id | 对方的 id |
| `type` | 是 | 关系枚举（见 `relationship-types.md`） | 单向关系类型；写入时需在对方档案里写反向关系 |
| `note` | 否 | 字符串 | 简短注释，便于人读；脚本不解析 |

## YAML 示例

```yaml
---
name: "林若"
role: protagonist
age: 24
status: alive
aliases:
  - "拾灯人"
  - "北口孤女"
relationships:
  - character: chen-da
    type: antagonist
    note: "杀父之仇，但动机不只是私仇"
  - character: shen-laotou
    type: mentor
  - character: lin-ruo-de-jie-jie
    type: sibling
locations:
  - bei-kou-ya-zhan
  - yan-wang-zhai
tags:
  - magic-user
  - li-family
arc: jue-xin-zhi-lu
---
```

> `died-in` 与 `status: deceased` 配套使用。规则：
> - 角色**在正文里死亡**：`status: deceased` + `died-in: chapter-NN`
> - 角色**开篇前已死**（例如被回忆的父亲）：`status: deceased`，**不填** `died-in`；后续章节里只能出现在 `mentions`，不能进 `characters`

## 文件结构

```markdown
## 外观

身材、身高、识别特征（疤、痣、特异服饰）、典型装束、行走坐卧的姿态。挑能让人"远远认出"的 2–3 个锚点，其余留白。

## 性格与癖性

3–5 个核心特质，2–3 个怪癖或习惯。回答：什么场景下他/她会让读者意外？什么场景下他/她会做出读者预料之中的反应？

## 身世

塑造了今天这个人的关键事件。只写与剧情相关的；不要把人物百科堆在这里。

## 动机与目标

| 层 | 内容 |
| --- | --- |
| **外部目标** | 他/她想要得到什么（职位、宝物、复仇） |
| **内部需求** | 他/她真正需要什么（被认可、被宽恕、放下执念） |
| **冲突点** | 外部目标与内部需求何时何地互相拆台 |

## 关联地点

重要地点的简要说明。每个地点都应与 `worldbuilding/locations/<id>.md` 双向绑定。

## 声音与口癖

- 词汇层级（文绉绉 / 俚语 / 行话 / 学术语）
- 句长习惯（短促 / 慢条斯理 / 大段排比）
- 口头禅、起句偏好、收句偏好
- 方言、外语夹杂、口头禅式反问
- **2–3 句示例台词**——是校验声音一致性的基准

## 人物弧

| 阶段 | 内容 |
| --- | --- |
| **起点** | 故事开头他/她是什么样的人 |
| **转折** | 哪几次事件让他/她改变（与具体章节对齐） |
| **终点** | 故事结尾他/她变成什么样（或者"预期终点"，写到一半时回填） |

## 时间线

| 何时 | 事件 | 与剧情的关联 |
| --- | --- | --- |
|  |  |  |
```

## 使用说明

- **关系要双向维护**：A 写了 `type: parent` 指向 B，就要去 B 的档案里补一条 `type: child` 指向 A；具体反向映射见 `relationship-types.md`。
- **id 命名稳定**：角色 id 一旦被多个文件引用（地点、势力、弧线、章节），**不要再改名**——改了就等于把项目里的所有交叉引用全部打断。要改名时，先用 `story reindex .` 与 `story validate .` 检查依赖。
- **不要把人物放进章节 frontmatter 的 `mentions` 而不登记到项目里**：被提及的角色必须有自己的档案，否则连续性脚本无法校验。
- **`tags` 复用**：项目内同一类标签用同一个字符串（避免 `magic-user` 与 `mage` 与 `术士`混用）。
