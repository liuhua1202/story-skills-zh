# worldbuilding · 世界观搭建（详细中文摘要）

> 英文原文：[../SKILL.md](../SKILL.md)（如需逐字指引请读英文）
> 适用触发词：创建地点 / 添加地点 / 魔法体系 / 政治体系 / 搭世界观 / 添加文化 / 世界历史 / 科技体系 / 宗教 / 经济 / `create a location` / `add a location` / `magic system` / `political system` / `build the world` / `add culture` / `world history` / `technology system` / `religion` / `economy`

---

## 这个 skill 解决什么问题

维护 `worldbuilding/` 下四类实体：

- **locations**（地点）—— 城市、地标、秘境、房间等
- **systems**（体系）—— 魔法、科技、政治、宗教、经济、军事、社会等
- **factions**（势力）—— 组织、帮派、公司、政府、宗教团体等
- **artifacts**（道具）—— 武器、信物、载具、文献、装置等

所有实体带 YAML frontmatter，与 `characters/` 和 `continuity/state.md` 双向引用。

**前置条件**：项目已存在（`story.md` 在根目录；未初始化先跑 [`../story-init/`](../story-init/)）。

---

## 通用字段速查

四类实体共用 frontmatter 框架：

| 字段 | 必填 | 含义 |
| --- | --- | --- |
| `name` | 是 | 展示用名 |
| `type` | 是 | 子类型枚举（见各 reference） |
| `status` | 势力/道具：是 | `active` / `defunct` / `destroyed` / `lost` 等 |
| `members` | 势力：可选 | 成员角色 id 列表（双向：成员角色 frontmatter 也登记） |
| `locations` | 势力：可选 | 相关地点 id 列表（双向） |
| `tags` | 势力/道具：可选 | 自定义标签 |
| `owner` | 道具：可选 | 持有者（角色或势力 id） |
| `location` | 道具：可选 | 当前所在地点 id |
| `notable-characters` | 地点：可选 | 出名角色 id 列表（双向） |
| `practitioners` | 体系：可选 | 实践者（按角色 tag 引用） |

---

## 创建地点（标准流程）

1. 读 `story.md`（题材 / 时代 / 语气）+ `worldbuilding/_index.md`（已有什么）。
2. 问地点名 + type（`city` / `fortress` / `wilderness` / `building` / `landmark` / `region` 等，完整枚举见 location-template）。
3. 对话把档案搭起来：物理描述与氛围 → 相关历史 → 文化习俗 → 角色会互动的显著特征 → 在故事时间线上的当前状态。
4. 按 location-template 写文件，保存到 `worldbuilding/locations/{name-kebab}.md`。
5. 更新 `worldbuilding/_index.md` 的 Locations 表。
6. **双向**：在每个 notable-character 的角色文件的 `locations` 列表里加这个地点的 id。
7. CLI 维护三连：

   ```shell
   story reindex .
   story links .
   story validate .
   ```

---

## 创建体系（标准流程）

1. 读 `story.md` 题材 / 主题。
2. 读 `worldbuilding/_index.md` 已有体系。
3. **确认体系类型**（`magic` / `technology` / `political` / `religious` / `economic` / `military` / `social`），按 [`./references/world-element-types.md`](./references/world-element-types.md)（英文原文）里的提示展开。
4. 对话把档案搭起来（每种类型的核心问题不同，参考 world-element-types 的 prompt 清单）。
5. 按 system-template 写文件，保存到 `worldbuilding/systems/{name-kebab}.md`。
6. 更新 `_index.md`。
7. **与角色交叉引用**：用体系的角色（如 magic-users）应在角色的 `tags` 列表里有对应 tag。
8. CLI 维护三连。

---

## 创建势力（标准流程）

CLI 可用时优先：

```shell
story add faction "{Faction Name}" \
  --type "{family|guild|government|military|religion|company|community|criminal|other}" \
  --member {character-id} \
  --location {location-id}
```

不可用时手写 `worldbuilding/factions/{name-kebab}.md`，frontmatter 含 `name` / `type` / `status` / `members` / `locations` / `tags`。

对话把档案搭起来，覆盖：

- **目的与意识形态**
- **权力基础、资源、领土**
- **重要成员**
- **冲突与压力点**

---

## 创建道具（标准流程）

CLI 可用时优先：

```shell
story add artifact "{Artifact Name}" \
  --type "{object|weapon|document|technology|relic|symbol|resource|other}" \
  --owner {character-or-faction-id} \
  --location {location-id}
```

不可用时手写 `worldbuilding/artifacts/{name-kebab}.md`，frontmatter 含 `name` / `type` / `status` / `owner` / `location` / `tags`。

对话把档案搭起来，覆盖：

- **描述与识别细节**（怎么认出它）
- **功能、限制、代价**
- **历史与历任持有者**
- **当前持有者 / 位置 / 状态**

�️ 道具的 `status` 字段必须与 `continuity/state.md` 的 `object-state[].status` **保持一致**——被销毁的道具不能继续出现在 active 场景里，`story continuity .` 会校验。

---

## 更新现有世界观元素

1. 读现有文件。
2. 做修改。
3. **双向更新** 涉及的其他实体（角色 / 章节 / 弧线 / state）。
4. `_index.md` 如有 name / type / status 变化要更新（建议直接 `story reindex .`）。
5. CLI 维护三连。

---

## 跨实体引用规则

| 关系 | 写法 |
| --- | --- |
| 地点 ↔ 角色 | 地点 `notable-characters` ↔ 角色 `locations`（双向） |
| 地点 ↔ 章节 | 章节 frontmatter `locations` 字段引用地点 id |
| 势力 ↔ 角色 | 势力 `members` ↔ 角色（按势力归属登记到角色侧） |
| 势力 ↔ 地点 | 势力 `locations` ↔ 地点（双向） |
| 道具 ↔ 持有者 | 道具 `owner` 字段（角色或势力 id） |
| 道具 ↔ 位置 | 道具 `location` 字段（地点 id） |
| 道具 ↔ 状态 | 道具 `status` ↔ `continuity/state.md` 的 `object-state[].status`（一致性） |
| 体系 ↔ 角色 | 体系引用 practitioner tag ↔ 角色 `tags` 用同一个 tag |

---

## location-template.md（中文摘要）

英文原文：[./references/location-template.md](./references/location-template.md)

空白地点档案模板，必填 frontmatter：`name` / `type`。可选：`notable-characters` / `status` / `tags` / 任何项目自定义字段。

正文段（具体分段以英文模板为准）通常覆盖：物理描述与氛围、相关历史、文化与习俗、显著特征、当前状态、与故事事件的关联。

---

## system-template.md（中文摘要）

英文原文：[./references/system-template.md](./references/system-template.md)

空白体系档案模板，必填 frontmatter：`name` / `type`。可选：`tags` / 自定义字段。

正文段（具体分段以英文模板为准）通常覆盖：体系的基本规则、来源 / 历史、与其他体系的关系、限制与代价、与其他世界观元素的连接。

---

## faction-template.md（中文摘要）

英文原文：[./references/faction-template.md](./references/faction-template.md)

空白势力档案模板，必填 frontmatter：`name` / `type` / `status`。可选：`members` / `locations` / `tags`。

正文段通常覆盖：目的与意识形态、权力基础与资源、领土、领导层与组织结构、重要成员、与其他势力的关系、当前冲突与压力点。

---

## artifact-template.md（中文摘要）

英文原文：[./references/artifact-template.md](./references/artifact-template.md)

空白道具档案模板，必填 frontmatter：`name` / `type` / `status`。可选：`owner` / `location` / `tags`。

正文段通常覆盖：外观描述与识别细节、功能与使用方式、限制与代价、历史与历任持有者、当前持有者 / 位置、与其他世界观元素的关系。

---

## world-element-types.md（中文摘要）

英文原文：[./references/world-element-types.md](./references/world-element-types.md)

按体系类型列出详细 prompt 清单，每个类型一组核心问题。覆盖的类型包括：

- **magic**（魔法体系）—— 规则 / 来源 / 学习路径 / 限制 / 代价
- **technology**（科技体系）—— 发展水平 / 普及度 / 关键发明 / 限制
- **political**（政治体系）—— 权力结构 / 制度 / 关键人物 / 冲突
- **religious**（宗教体系）—— 信条 / 组织 / 仪式 / 与权力关系
- **economic**（经济体系）—— 货币 / 贸易 / 阶层 / 资源
- **military**（军事体系）—— 编制 / 装备 / 战术 / 著名战役
- **social**（社会体系）—— 阶层 / 习俗 / 禁忌 / 日常

每个类型的具体 prompt 看英文文件。

---

## 修改后的维护命令

任何新增 / 删除 / 改名 / 重大修改之后跑：

```shell
story reindex .
story links .
story validate .
```

涉及道具的销毁 / 找回：

```shell
story continuity .       # 校验 object-state 与道具 status 一致
```

---

## 常见坑

1. **忘了 `story continuity .` 校验道具 status**：被销毁的道具还在场景里出现。
2. **`worldbuilding/_index.md` 手改**：会被 reindex 覆盖。
3. **type 字段不在枚举里**：保持一致便于后续筛选；项目自定义 type 写进 `tags` 比破坏枚举好。
4. **道具 / 地点 / 势力引用角色时用错 id 形式**：必须是 kebab-case 文件名去 `.md`。
5. **地点的 `notable-characters` 与角色侧 `locations` 不一致**：`story links .` 会立刻报缺链。

---

## 相关 skill

- [`../story-init/`](../story-init/) —— 起项目，建好 `worldbuilding/_index.md` 与四个子目录
- [`../character-management/`](../character-management/) —— 角色 ↔ 地点 / 势力 / 道具 的双向引用
- [`../plot-structure/`](../plot-structure/) —— 弧线引用地点 / 势力
- [`../chapter-writing/`](../chapter-writing/) —— 章节 frontmatter `locations` / `characters` 引用
- [`../revision-continuity/`](../revision-continuity/) —— `story continuity .` 校验道具状态
- [`../story-maintenance/`](../story-maintenance/) —— 所有 CLI 命令的总入口
