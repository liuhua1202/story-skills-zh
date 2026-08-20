<!--
Shared canonical reference / 跨实体引用规则
Source of truth for: character-management, worldbuilding, plot-structure 的"跨实体引用"段
修改本文件 = 修改三处 skill 的引用规则
-->

# 跨实体引用规则

> 本文件是 `character-management` / `worldbuilding` / `plot-structure` 共用的"跨实体引用"段权威版本。
>
> 引用方式：用一句 "跨实体引用见 `../common/cross-reference-rules.md`" 替代过去直接写的同内容段落。
>
> 双向引用是 `story links .` 强制要求的，详尽的反向映射表见 `character-management/references/relationship-types.md`。

---

## 一、角色 ↔ 地点

- 角色通过 frontmatter 的 `locations` 字段引用地点(kebab-case id 列表)。
- 地点通过 frontmatter 的 `notable-characters` 引用角色。
- 两者互为反向引用，**任何一处变更都要同步改另一边**。
- 缺一会让 `story links .` 报错：`diagCharacterMissingLocation` / `diagLocationMissingNotableCharacters` / `diagNotableCharacterMissingLocation`。

## 二、角色 ↔ 阵营

- 阵营文件 frontmatter 的 `members` 字段引用角色。
- 角色档案的 `tags` 列表中可以加阵营标识(如 `magic-user`、`court-official`、`li-family`)以便交叉筛选,但**主阵营关系还是走阵营文件的 `members`**。
- 缺一会报错：`diagFactionMissingMember`。

## 三、角色 ↔ 道具（器物）

- 道具(artifact)文件 frontmatter 的 `owner` 字段引用角色或阵营。
- 角色档案可以加 `tags` 标识关键道具,但**主持有关系走道具文件的 `owner`**。
- 缺一会报错：`diagArtifactMissingOwner`。

## 四、角色 ↔ 弧线

- 弧线文件 frontmatter 的 `characters` 字段引用角色。
- 角色档案的 `arc` 字段标识主弧(一对一);`tags` 可以列其它副弧。
- 弧线推进情节点时在弧文件的"情节点"表里更新章节引用。

## 五、地点 ↔ 章节

- 章节 frontmatter 的 `locations` 字段列出该章实际出现的地点。
- 地点文件的 `chapters-used-in`(可选)或 `notable-characters` 反向链接。
- 缺一会让 `story links .` 报警。

## 六、章节 ↔ 弧线

- 章节 frontmatter 的 `arcs-advanced` 字段列出该章推进的弧线。
- 弧文件的"情节点"表的"对应章节"列反向引用章节 id。

## 七、系统 ↔ 角色

- 系统(魔法/政治/科技等)通过**角色 tags**(如 `magic-user`)引用使用者。
- 系统文件自身不存角色列表,是靠 tags 聚合出来的。

## 八、承诺 ↔ 章节 / 弧线 / 角色

- `continuity/promises/<id>.md` 的 `planted` / `payoff` 字段引用章节 id。
- `arcs` 字段引用弧线,`characters` 字段引用角色(可能不止一个)。

## 九、跨领域触发的规则

| 用户做的操作 | 必须同步更新的反向文件 |
| --- | --- |
| 新增角色 → 写到 `characters/{id}.md` | 如果有阵营/地点/弧引用,把对方 `members` / `notable-characters` / `characters` 也改了 |
| 删除角色 | 反向文件里删掉条目;如果有章节引用,改章节 `mentions` |
| 重命名角色 | 用 `story rename character old-id "New Name"`;重命名后再跑 `story reindex .` + `story links .` |
| 角色死亡 | 改 `status: deceased` + 填 `died-in: chapter-{NN}`;后续章节的 `characters` 列表清掉这个角色,改进 `mentions` |
| 角色状态变化(受伤/揭秘/关系破裂) | 改角色档案;改 `continuity/state.md`;如果有章节引用,改章节 frontmatter |

## 十、tag 复用约束

项目内同一类标签用同一个字符串。**绝不用同义词**:`magic-user` 与 `mage` 与 `术士` 不允许并存。

`story validate .` 不会自动强制 tag 一致性,**这是约定层面的责任**。新建 skill 第一次引入新 tag 类型时,在本文件加一行定义,让后人知道项目内置了哪些 tag 词汇。