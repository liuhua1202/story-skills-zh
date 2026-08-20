# 势力模板（Faction Template）

新建势力档案时使用此模板，路径约定：`worldbuilding/factions/{faction-name-kebab}.md`。

势力 = 有共同目的、能在故事世界里**采取集体行动**的群体：家族、行会、政府、军队、宗门、公司、社区、秘密结社……一伙"临时凑起来的雇佣兵"不算势力，要等他们有名字、有口号、有据点才算。

## frontmatter 字段表

| 字段 | 必填 | 类型 / 允许值 | 说明 |
| --- | --- | --- | --- |
| `name` | 是 | 字符串 | 势力名称，可加引号 |
| `type` | 是 | `family` \| `guild` \| `government` \| `military` \| `religion` \| `company` \| `community` \| `criminal` \| `other` | 势力类型。脚本据此归到 `_index.md` 的分组 |
| `status` | 是 | `active` \| `hidden` \| `declining` \| `defeated` \| `disbanded` \| `unknown` | 故事起始时势力的整体状态 |
| `members` | 否 | kebab-case 角色 id 列表 | 重要成员。**不是全员名单**——只列在剧情里需要被引用的角色 |
| `locations` | 否 | kebab-case 地点 id 列表 | 据点、势力范围显著的地点 |
| `tags` | 否 | 字符串数组 | 自由标签；项目内复用 |

## YAML 示例

```yaml
---
name: "陈氏北口镇守军"
type: military
status: active
members:
  - chen-da
  - chen-da-de-you
  - bei-kou-bai-hu
locations:
  - bei-kou-ya-zhan
  - yan-wang-zhai
tags:
  - 军阀
  - 北境
  - 私兵
---
```

```yaml
---
name: "拾灯会"
type: community
status: hidden
members:
  - lin-ruo
  - shen-laotou
locations:
  - yan-wang-zhai
tags:
  - 秘密结社
  - 同乡会
---
```

## 文件结构

```markdown
## 目的（Purpose）

这个势力**想要什么**、**为什么存在**。一两段讲清核心利益和意识形态。

| 维度 | 内容 |
| --- | --- |
| **公开目标** | 在台面上宣称的目标 |
| **真实目的** | 实际追求的目标（可与公开目标不同） |
| **存在理由** | 为什么需要存在——它解决了什么问题 |

## 权力基础（Power Base）

凭什么让外人听它的：

- **资源**：金钱、矿产、人脉、贸易路线
- **影响**：舆论、宗教解释权、官方授权
- **领地**：据点、控制区、安全屋
- **合法性**：血统、传统、神授、契约
- **秘密**：贿赂清单、黑料、仪式、暗号
- **杠杆**：对谁握有什么把柄

## 重要成员（Members）

不需要列全员（那是组织架构图）。挑在剧情里会直接出现 / 直接说话的角色：

| 角色 | 在势力里的位置 | 与剧情的关联 |
| --- | --- | --- |
| 陈大 | 镇守使 | 反派核心 |
| 陈大之友 | 副将 | 第一幕反派打手 |
| 北口百户 | 百户长 | 第三幕倒戈者 |

## 冲突（Conflicts）

| 维度 | 内容 |
| --- | --- |
| **内部矛盾** | 派系、继承、路线之争 |
| **外部对手** | 哪些势力与它对立 |
| **压力点** | 哪些事件 / 弱点一旦被戳到就会塌 |
| **未爆的雷** | 可能在后续章节引爆的暗线 |

## 符号与辨识

旗帜、口号、徽记、服饰、切口——读者看一眼就能认出来的视觉锚点。
```

## 使用说明

- **重要成员 vs 全员名单**：`members` 字段只登记剧情直接触及的角色；NPC 群体写进正文，不要堆到 frontmatter 里，否则 `story validate .` 会要求每个 NPC 都有完整档案。
- **势力 vs 体系**：`political` 类型体系是**制度**（议会、税法、继承法），`government` 类型势力是**组织**（议会下设的某个机构）。两者分清楚，不要混写。
- **据点与控制范围**：`locations` 列据点（势力直接驻扎的地方），不是控制区。一支军队驻扎在三个要塞，但实际控制十个县——三个要塞写 `locations`，十个县的县级影响写在正文。
- **`status: hidden` 与 `disbanded` 的区别**：`hidden` 表示仍存在但刻意隐藏；`disbanded` 表示已解散、不可再行动。
- **校验联动**：新增势力后跑 `story reindex .` 与 `story validate .`；后者会校验 `type` 与 `status` 枚举。
