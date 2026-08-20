---
name: character-management
version: 0.3.1
description: |
  当用户说「创建角色」「更新角色」「加一个角色」「画人物谱」「角色关系」「角色时间线」「人物弧」「人物档案」,或需要在故事项目里管理人物时,使用本 skill。
  Or when the user says "create a character", "add protagonist", "character profile", "character arc", "人物小传", or wants to manage people in a Story Skills project, use this skill.
allowed-cli: story add character, story rename, story remove, story reindex, story links, story validate
scope: characters/*.md + reverse-link files in worldbuilding, plot, factions, artifacts
calls: [story-maintenance]
changelog: ../CHANGELOG.md
---

<!--
Skill metadata fields above are documentation-only. See:
  ../common/project-conventions.md        跨 skill 通用约定
  ../common/cli-priority.md               CLI 调用优先级
  ../common/cross-reference-rules.md      跨实体引用 9 类规则
  ../common/id-naming.md                  kebab-case / CJK 音译 / 命名规则
-->

# 角色管理

## 这个 skill 做什么

围绕故事项目建立和维护丰满的角色档案。每个角色是 `characters/` 目录下的一篇 markdown 文件，带 YAML frontmatter，用 kebab-case 标识符跟其他故事元素互相引用。

## 工作流（checklist）

```
□ 1. 读 story.md + characters/_index.md 拿语境
□ 2. 选模式：深度访谈（protagonist/antagonist/supporting）或 快速创建（minor）
□ 3. 通过对话把档案搭起来
□ 4. 用 references/character-template.md 模板落档
□ 5. 维护双向引用（见 ../common/cross-reference-rules.md）
□ 6. CLI 跑 reindex + links + validate
```

## 前置条件

项目根目录里得有 `story.md`（由 `story-init` 创建）。先确认它存在再动手。

## 创建角色（深度模式）

适用于 `protagonist` / `antagonist` / `supporting` 角色。

1. 读 `story.md`，拿类型、主题、腔调这些背景信息
2. 读 `characters/_index.md`，看现有角色有哪些
3. 问用户角色的姓名和定位（`protagonist` / `antagonist` / `supporting` / `minor`）
4. 通过对话把档案搭起来，依次聊：
   - 外貌与辨识特征
   - 性格、特质和怪癖
   - 背景故事与塑造性事件
   - 动机（外在想要 vs 内在需要）
   - 说话方式和语言习惯（**这一步必须有**：让用户给一两句示例台词）
   - 人物弧（起点状态、转折点、终点状态）
   - 角色时间线上的关键人生事件
5. 用 `references/character-template.md` 模板把文件写出来
6. 存到 `characters/{name-kebab}.md`；如果 CLI 可用，直接 `story add character "{Name}" --role "{role}"`
7. 同步更新 `characters/_index.md` 注册表
8. **双向检查表（写完一条就勾一行）**：

| 关系类型 | A → B 写了？ | B → A 反向写了？ |
| --- | --- | --- |
| 例：`parent` 到 chen-da | ☐ | ☐（B 处写 `child`） |

9. CLI 可用的话，在项目根目录跑一遍维护：

```shell
story reindex .
story links .
story validate .
```

## 创建角色（快速模式）

适用于 `minor` / 背景 / 一句话即可的角色。**只问三件**：

1. 名字
2. 一句话身份（例："北口酒馆老板，对林若有救命之恩"）
3. tags（例：`["minor", "bei-kou-local"]`）

落档到 `characters/{id}.md` 的最小骨架（姓名 + role + status + 一句话身份 + tags），其余节默认空。`story_init` 后再补。

## 更新角色

1. 读现有角色文件
2. 读 `characters/_index.md` 了解其他角色的背景
3. 按需求改
4. 如果关系变了，**同步更新对方角色文件**（双向）
5. 如果定位或状态变了，更新 `characters/_index.md`
6. CLI 可用就跑 `story reindex .`、`story links .`、`story validate .`

## 管理关系

完整的关系类型和反向配对见 `references/relationship-types.md`。

新增一条关系时：

- 在角色文件 frontmatter 里加关系条目
- 在对方角色文件 frontmatter 里加反向关系
- 同步更新 `characters/_index.md` 的 Relationship Map 节

关系类型选错会让 `story validate .` 漏检。**关系字符串必须从 `references/relationship-types.md` 的枚举里挑**，不要自己造。

## 人物谱（家族树）

家族树统一维护在 `characters/_index.md` 的 Family Trees 节，格式：

```markdown
## Family Trees

### {Family Name}
- **{Character Name}** ({status}) - [{name-kebab}.md]
  - **{Child Name}** - [{name-kebab}.md]
  - **{Child Name}** - [{name-kebab}.md]
```

子项缩进在父项下面，婚姻 / 伴侣关系用行内文字标注。

## 可视化（用户触发了"画"类词时）

当用户说"画人物谱"/"画关系图"/"可视化角色"时，在 `characters/_index.md` 的 Relationship Map 节下加一个 Mermaid 块：

```mermaid
graph LR
  chen-da[陈大] -- antagonist --> lin-ruo[林若]
  lin-ruo -- student --> shen-laotou[沈老头]
```

不要生成独立可视化文件——就地落在 `_index.md`，便于引用。

## CLI 维护

> CLI 三种调用方式的优先级与失败处理统一见 `../common/cli-priority.md`。

CLI 完全不可用时，手工做注册表和反向链接检查。

## 跨实体引用

> 9 类双向引用规则（角色↔地点、角色↔阵营、角色↔道具、章节↔弧线 等）见 `../common/cross-reference-rules.md`。

## 参考文件

- **`references/character-template.md`** —— 角色档案模板（含完整 frontmatter 字段表）
- **`references/relationship-types.md`** —— 完整关系类型清单和反向配对
- **`../common/project-conventions.md`** —— 跨 skill 命名 / schema / `mentions vs characters` / 权限约定
- **`../common/id-naming.md`** —— kebab-case / CJK 音译规则