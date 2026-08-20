---
name: worldbuilding
description: 当用户说「创建地点」「加个地点」「魔法体系」「政治体系」「构建世界」「加文化」「世界历史」「科技体系」「宗教」「经济」,或想发展故事的任何一个世界设定面向时,使用本 skill。
---

# 世界观构建

## 这个 skill 做什么

围绕故事项目搭建和管理世界观元素:地点、系统(魔法 / 政治 / 科技 等)、阵营、器物。统一以 markdown 文件落在 `worldbuilding/` 目录,带 YAML frontmatter,所有元素与角色和其他故事元素互相引用。

## 前置条件

项目根目录得有 `story.md`(由 `story-init` 创建)。确认存在再开始。

## 创建地点

1. 读 `story.md`,拿类型、时代、腔调这些背景
2. 读 `worldbuilding/_index.md`,看现有的地点和系统
3. 问用户地点的名字和类型(城市、堡垒、荒野 等)
4. 用对话把地点聊出来,覆盖:
   - 物理描写和氛围
   - 与故事相关的历史
   - 居民的风俗和文化
   - 角色会互动的显著特征
   - 当前时间线上的状态
5. 按 `references/location-template.md` 模板写文件
6. 存到 `worldbuilding/locations/{name-kebab}.md`
7. 更新 `worldbuilding/_index.md` 的 Locations 表
8. 如果列出了 notable-characters,核实对应角色文件存在,并把该地点的 kebab-case 标识加到每个角色文件的 `locations` frontmatter 列表里
9. CLI 可用就跑 `story reindex .`、`story links .`、`story validate .`

## 创建系统

1. 读 `story.md`,拿类型和主题信息
2. 读 `worldbuilding/_index.md`,看现有系统
3. 判断系统类型,翻 `references/world-element-types.md` 找对应类型的提示清单
4. 按那个清单通过对话聊系统
5. 按 `references/system-template.md` 写文件
6. 存到 `worldbuilding/systems/{name-kebab}.md`
7. 更新 `worldbuilding/_index.md` 的 Systems 表
8. 与跟系统互动的角色建立交叉引用(比如魔法系统对应用 `magic-user` tag 的角色)
9. CLI 可用就跑 `story reindex .`、`story links .`、`story validate .`

## 创建阵营

CLI 可用就用:

```shell
story add faction "{Faction Name}" --type "{family|guild|government|military|religion|company|community|criminal|other}"
```

否则手动创建 `worldbuilding/factions/{name-kebab}.md`,frontmatter 字段:`name`、`type`、`status`、`members`、`locations`、`tags`。

需要覆盖:

- 目的和意识形态
- 权力基础、地盘、资源
- 重要成员
- 冲突和施压点

## 创建器物

CLI 可用就用:

```shell
story add artifact "{Artifact Name}" --type "{object|weapon|document|technology|relic|symbol|resource|other}"
```

否则手动创建 `worldbuilding/artifacts/{artifact-kebab}.md`,frontmatter 字段:`name`、`type`、`status`、`owner`、`location`、`tags`。

需要覆盖:

- 外观描述和辨识要点
- 功能、约束和代价
- 历史和过往持有者
- 当前持有者 / 所在地的状态

## 更新世界元素

1. 读现有文件
2. 按需求改
3. 如果交叉引用变了,更新被链接的文件
4. 如果 name / type / status 变了,更新 `worldbuilding/_index.md`
5. CLI 可用就跑 `story reindex .`、`story links .`、`story validate .`

## 跨实体引用

- 地点通过 frontmatter 的 `notable-characters` 引用角色
- 角色通过 frontmatter 的 `locations` 引用地点
- 阵营引用角色成员和地点
- 器物引用持有者(角色或阵营)和当前所在地点
- 系统通过角色 tag 引用使用者
- 地点被某章节使用时,章节 frontmatter 的 `locations` 字段反向链接
- 元素陆续加上时,记得更新 `worldbuilding/_index.md` 顶部的 World Overview 节

## CLI 维护

优先用 Story CLI。`story` 没装但 `story-maintenance` skill 在,就用 `node ../story-maintenance/scripts/story.js` 加同样参数(路径相对本 skill 目录解析)。CLI 完全不可用时,手工做注册表和反向链接检查。

## 参考文件

- **`references/location-template.md`** —— 地点文件模板
- **`references/system-template.md`** —— 系统文件模板
- **`references/faction-template.md`** —— 阵营文件模板
- **`references/artifact-template.md`** —— 器物 / 物件文件模板
- **`references/world-element-types.md`** —— 每种系统类型(魔法、政治、科技、宗教、经济、军事、社会)的详细提示清单
