# character-management · 角色管理（详细中文摘要）

> 英文原文：[../SKILL.md](../SKILL.md)（如需逐字指引请读英文）
> 适用触发词：创建角色 / 更新角色 / 添加角色 / 家谱 / 角色关系 / 角色时间线 / 角色弧 / 角色档案 / `create a character` / `update a character` / `add a character` / `build a family tree` / `character relationships` / `character timeline` / `character arc` / `character profile`

---

## 这个 skill 解决什么问题

维护 `characters/` 目录下的角色档案：

- 新增、编辑、删除角色文件（markdown + YAML frontmatter）。
- 建立、维护角色之间的关系（双向）。
- 维护家谱。
- 跨实体交叉引用（角色 ↔ 地点 / 势力 / 道具 / 弧线 / 章节）。
- 角色死亡追踪（与 `continuity/state.md` 一致）。

**前置条件**：项目已经存在（即 `story.md` 在项目根目录；如未初始化先跑 [`../story-init/`](../story-init/))。

---

## 创建角色（标准流程）

1. **读上下文**：`story.md`（题材 / 主题 / 语气）+ `characters/_index.md`（已有角色，避免重名 / 撞 id）。
2. **问基本信息**：角色名 + role（`protagonist` / `antagonist` / `supporting` / `minor`）。
3. **通过对话把档案搭起来**，覆盖：外貌与辨识特征 → 性格 / 怪癖 → 背景与转折事件 → 动机（外在欲望 vs 内在需求）→ 说话方式（让用户给一段示例对白）→ 角色弧（起点 / 转折 / 终点）→ 时间线上的关键事件。
4. **按 character-template 写文件**（见下），保存到 `characters/{name-kebab}.md`。
5. **CLI 优先**：能跑 `story` 时用

   ```shell
   story add character "{Name}" --role "{role}"
   ```

   CLI 会创建文件骨架并自动登记到 `_index.md`。
6. **更新 `_index.md`** 关系表 / 家谱表。
7. **关系双向更新**：在 `characters/mara-quill.md` 写了"认识 ilya-venn"，就要在 `characters/ilya-venn.md` 反向登记。
8. **CLI 维护命令**（如可用）：

   ```shell
   story reindex .
   story links .
   story validate .
   ```

---

## 更新角色

1. 读现有角色文件 + `characters/_index.md` 上下文。
2. 做请求的修改。
3. **关系改了 → 对端角色文件也要同步改**（双向）。
4. role / status 改了 → `_index.md` 同步。
5. CLI 维护三连：`reindex` / `links` / `validate`。

---

## 关系管理

完整关系类型清单与"反向配对"参考 [`./references/relationship-types.md`](./references/relationship-types.md)（英文原文，下方有本 skill 的中文摘要）。

添加关系时三件事：

- 在角色 A 的 frontmatter 加关系条目。
- 在角色 B 的 frontmatter 加**反向关系**条目。
- 在 `characters/_index.md` 的 Relationship Map 段更新。

常见的反向关系示例（仅举例，完整列表看英文 reference）：

- `lover` ↔ `lover`
- `parent` ↔ `child`
- `sibling` ↔ `sibling`
- `mentor` ↔ `apprentice`
- `friend` ↔ `friend`
- `rival` ↔ `rival`
- `enemy` ↔ `enemy`

---

## 家谱

家谱写在 `characters/_index.md` 的 `## Family Trees` 段，按家族分组，**用缩进表达代际关系**：

```markdown
## Family Trees

### Quill Family
- **Theo Quill** (deceased) - [theo-quill.md]
  - **Mara Quill** (active) - [mara-quill.md]
  - **Ilya Venn** (active) - [ilya-venn.md]
```

婚姻 / 伴侣关系用行内注释即可，不必另起字段。

---

## 跨实体引用规则

| 关系 | 写法 |
| --- | --- |
| 角色 ↔ 地点 | 角色 frontmatter `locations` 列表 + 地点 frontmatter `notable-characters` 列表（双向） |
| 角色 ↔ 势力 | 在 `worldbuilding/factions/{faction}.md` 的 `members` 列表里登记 |
| 角色 ↔ 道具 | 道具的 `owner` 字段引用角色 id |
| 角色 ↔ 弧线 | 弧线的 frontmatter `characters` 列表引用角色 id |
| 角色 ↔ 章节 | 章节的 `characters`（在场）或 `mentions`（提及）字段引用角色 id |
| 角色 ↔ 知识状态 | `continuity/state.md` 的 `knowledge-state` 条目引用角色 id |
| 角色 ↔ 物件状态 | `continuity/state.md` 的 `object-state` 条目若 owner 是角色，引用角色 id |

**标签一致性**：例如某个项目用 `magic-user` 这个 tag，所有地方都写成 `magic-user`，不要变体（`mage` / `magician` / `wizard`）。

---

## 角色死亡追踪

这是连续性检查的关键：

- **页面上死亡**：`status: deceased` + `died-in: chapter-{NN}`。`story continuity .` 会检查该角色在 `died-in` 之后章节的 `characters` 字段——若仍在场就报错。
- **第 1 章之前就已经死亡**：只设 `status: deceased`，**不要**设 `died-in`。
- **死后提及**（回忆 / 闪回 / 录音 / 录像）：章节 / 场景里用 `mentions` 字段引用，不要放进 `characters`，否则会触发连续性错误。

---

## character-template.md（中文摘要）

英文原文：[./references/character-template.md](./references/character-template.md)

空白角色档案模板，必填字段（写在 YAML frontmatter）：

- `name` —— 完整姓名（展示用）
- `role` —— 角色定位：`protagonist` / `antagonist` / `supporting` / `minor`
- `status` —— 当前状态：`active` / `deceased` / `missing` / `unknown` 等

可选字段：

- `aliases` —— 别名 / 化名列表
- `relationships` —— 关系列表（每条引用另一个角色 id 与关系类型）
- `locations` —— 已知地点列表（双向引用）
- `tags` —— 标签列表
- `died-in` —— 仅在 `status: deceased` 且**页面上死亡**时填写（章节 id，如 `chapter-03`）

frontmatter 下方通常分若干段落（具体分段以英文模板为准），覆盖：外貌、性格、背景、动机、说话风格、角色弧、关键事件时间线、与其他角色的关系细节。

---

## relationship-types.md（中文摘要）

英文原文：[./references/relationship-types.md](./references/relationship-types.md)

按类别列出可用的关系类型，每条都标注**反向关系**（例如 `parent` ↔ `child`、`mentor` ↔ `apprentice`），便于双向登记。

主要类别（具体条目与扩展请查英文文件）：

- **家庭**：`parent` / `child` / `sibling` / `spouse` / `cousin` 等
- **浪漫**：`lover` / `ex-lover` / `crush` 等
- **社交**：`friend` / `acquaintance` / `neighbor` 等
- **职业**：`colleague` / `superior` / `subordinate` 等
- **指导**：`mentor` / `apprentice` / `teacher` 等
- **冲突**：`enemy` / `rival` / `nemesis` / `debtee` / `creditor` 等
- **其他**：项目自定义

使用规则：双向登记时不要硬塞——如果 A 觉得 B 是 `mentor` 而 B 觉得 A 只是 `acquaintance`，按 A 的视角登记 `mentor`，按 B 的视角登记 `acquaintance`，不要强行对称。

---

## 修改后的维护命令

任何新增 / 删除 / 重命名 / 重大修改之后跑：

```shell
story reindex .           # 重建 _index.md
story wordcount . --write # 字数（如有正文）
story links .             # 检查双向链接完整性
story validate .          # 校验 frontmatter 与布局
```

涉及死亡状态变更时，额外跑 `story continuity .`。

---

## 常见坑

1. **忘了双向更新关系**：`story links .` 会立刻报缺链。
2. **`status: deceased` 却忘了填 `died-in`**：`story continuity .` 没法判断死亡章节。
3. **死后角色错误地出现在 `characters` 而非 `mentions`**：触发"死角色复活"错误。
4. **角色 id 用别的写法**（如 `Mara_Quill` / `maraQuill`）：所有引用失效，CLI 找不到对应文件。
5. **家谱写在角色文件里而不是 `_index.md`**：`_index.md` 会被 reindex 覆盖。

---

## 相关 skill

- [`../story-init/`](../story-init/) —— 起项目
- [`../worldbuilding/`](../worldbuilding/) —— 角色 ↔ 地点 / 势力 / 道具
- [`../plot-structure/`](../plot-structure/) —— 角色 ↔ 弧线
- [`../chapter-writing/`](../chapter-writing/) —— 起草章节时引用角色
- [`../revision-continuity/`](../revision-continuity/) —— 跑 `story continuity .` 找死角色复活等问题
- [`../story-maintenance/`](../story-maintenance/) —— 所有维护命令的总入口
