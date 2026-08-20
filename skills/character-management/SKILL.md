---
name: character-management
description: 当用户说「创建角色」「更新角色」「加一个角色」「画人物谱」「角色关系」「角色时间线」「人物弧」「人物档案」,或需要在故事项目里管理人物时,使用本 skill。
---

# 角色管理

## 这个 skill 做什么

围绕故事项目建立和维护丰满的角色档案。每个角色是 `characters/` 目录下的一篇 markdown 文件,带 YAML frontmatter,用 kebab-case 标识符跟其他故事元素互相引用。

## 前置条件

项目根目录里得有 `story.md`(由 `story-init` 创建)。先确认它存在再动手。

## 创建角色

1. 读 `story.md`,拿类型、主题、腔调这些背景信息
2. 读 `characters/_index.md`,看现有角色有哪些
3. 问用户角色的姓名和定位(`protagonist` / `antagonist` / `supporting` / `minor`)
4. 通过对话把档案搭起来,依次聊:
   - 外貌与辨识特征
   - 性格、特质和怪癖
   - 背景故事与塑造性事件
   - 动机(外在想要 vs 内在需要)
   - 说话方式和语言习惯(让用户给一两句示例对话)
   - 人物弧(起点状态、转折点、终点状态)
   - 角色时间线上的关键人生事件
5. 用 `references/character-template.md` 模板把文件写出来
6. 存到 `characters/{name-kebab}.md`;如果 CLI 可用,直接 `story add character "{Name}" --role "{role}"`
7. 同步更新 `characters/_index.md` 注册表
8. 如果关系里引用了别的角色,顺手把对方的文件也更新了
9. CLI 可用的话,在项目根目录跑一遍维护:

```shell
story reindex .
story links .
story validate .
```

## 更新角色

1. 读现有角色文件
2. 读 `characters/_index.md` 了解其他角色的背景
3. 按需求改
4. 如果关系变了,同步更新对方角色文件(双向)
5. 如果定位或状态变了,更新 `characters/_index.md`
6. CLI 可用就跑 `story reindex .`、`story links .`、`story validate .`

## 管理关系

完整的关系类型和反向配对见 `references/relationship-types.md`。

新增一条关系时:

- 在角色文件 frontmatter 里加关系条目
- 在对方角色文件 frontmatter 里加反向关系
- 同步更新 `characters/_index.md` 的 Relationship Map 节

## 人物谱(家族树)

家族树统一维护在 `characters/_index.md` 的 Family Trees 节,格式:

```markdown
## Family Trees

### {Family Name}
- **{Character Name}** ({status}) - [{name-kebab}.md]
  - **{Child Name}** - [{name-kebab}.md]
  - **{Child Name}** - [{name-kebab}.md]
```

子项缩进在父项下面,婚姻 / 伴侣关系用行内文字标注。

## 跨实体引用

- 当一个角色被世界观条目引用时(比如某地点的 `notable-characters`),反过来也补上链接
- 角色-地点的反向链接写在角色文件的 `locations` frontmatter 列表里
- 阵营成员关系写在 `worldbuilding/factions/{faction-kebab}.md` 的 `members` 里
- 器物的归属可以在 `worldbuilding/artifacts/{artifact-kebab}.md` 引用角色 ID
- 角色出现在情节弧里时,要在弧的 `characters` frontmatter 里列出
- 角色 tag 全项目保持一致(比如用了 `magic-user`,就处处都用 `magic-user`)

## CLI 维护

优先用 Story CLI。如果 `story` 没装但 `story-maintenance` skill 在,就用 `node ../story-maintenance/scripts/story.js` 加上同样的参数(路径相对本 skill 目录解析)。CLI 完全不可用时,手工做注册表和反向链接检查。

## 参考文件

- **`references/character-template.md`** —— 角色档案空白模板
- **`references/relationship-types.md`** —— 完整关系类型清单和反向配对
