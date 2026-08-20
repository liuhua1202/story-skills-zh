# YAML 字段速查表（中文版）

> 这份是按 `docs/schema-v2.md` 与 `src/story.js` 里实际的常量整理出来的"字段速查"，不是翻译，而是按"我写项目时常查什么"的角度重排。完整 schema 与字段语义以 `docs/schema-v2.md` 为准。

---

## 1. 顶层文件：`story.md`

| 字段 | 必填 | 类型 | 允许值 / 写法 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | ✅ | string | 任意 | 项目标题，kebab-case 化的目录名从这里来 |
| `schema-version` | ✅ | int | `2` | 必须写 `2`，CLI 用来识别项目格式 |
| `genre` | ✅ | string | 任意 | 类型（如 `mystery` / `fantasy` / `romance`） |
| `sub-genre` | | string | 任意 | 子类型（`coastal` / `epic` 等） |
| `setting-era` | | string | 任意 | 时代背景（`near-future` / `medieval`） |
| `status` | ✅ | enum | `planning` / `drafting` / `in-progress` / `revising` / `complete` / `abandoned` | 项目当前状态 |
| `themes` | ✅ | list | 任意字符串列表 | 主题列表（2-4 个） |
| `pov` | ✅ | enum | `first-person` / `third-person-limited` / `third-person-omniscient` | 叙事视角 |
| `tense` | ✅ | enum | `past` / `present` / `future` / `mixed` | 叙事时态 |

下面（frontmatter 之后）是三个固定段：

```markdown
## Synopsis
（2-3 句梗概）

## Tone & Style
（语气风格笔记）

## Notes
（其他备注）
```

---

## 2. 角色文件：`characters/<kebab-id>.md`

| 字段 | 必填 | 类型 | 允许值 / 写法 | 说明 |
| --- | --- | --- | --- | --- |
| `name` | ✅ | string | 任意 | 展示用全名 |
| `role` | ✅ | enum | `protagonist` / `antagonist` / `supporting` / `minor` / `narrator` / `deuteragonist` | 角色定位 |
| `status` | ✅ | enum | `alive` / `deceased` / `unknown` / `missing` | 角色当前状态 |
| `aliases` | | list | 字符串列表 | 别名 / 化名 |
| `relationships` | | list | 对象列表 | 每条 `{character, type}`（双向） |
| `locations` | | list | 字符串 id 列表 | 该角色相关的地点 id（双向） |
| `tags` | | list | 字符串列表 | 标签（项目内统一写法） |
| `died-in` | | string | 章节 id（`chapter-NN`） | **仅**与 `status: deceased` 一起；写明页面上死亡的章节 |

**关系 `type` 常见值**（双向配对）：
- `parent` ↔ `child`
- `mentor` ↔ `apprentice`
- `lover` / `friend` / `enemy` / `rival`（对称，写同一字符串即可）

完整列表见英文 `references/relationship-types.md`。

---

## 3. 地点文件：`worldbuilding/locations/<id>.md`

| 字段 | 必填 | 类型 | 说明 |
| --- | --- | --- | --- |
| `name` | ✅ | string | 展示名 |
| `type` | ✅ | enum | `city` / `fortress` / `wilderness` / `building` / `landmark` / `region` 等 |
| `notable-characters` | | list | 与该地点相关的角色 id（双向） |
| `region` | | string | 所属大区（自由文本） |

---

## 4. 体系文件：`worldbuilding/systems/<id>.md`

| 字段 | 必填 | 类型 | 说明 |
| --- | --- | --- | --- |
| `name` | ✅ | string | 体系名 |
| `type` | ✅ | enum | `magic` / `technology` / `political` / `religious` / `economic` / `military` / `social` |

详细 prompt 模板见英文 `references/system-template.md`。

---

## 5. 势力文件：`worldbuilding/factions/<id>.md`

| 字段 | 必填 | 类型 | 允许值 |
| --- | --- | --- | --- |
| `name` | ✅ | string | 展示名 |
| `type` | ✅ | enum | `family` / `guild` / `government` / `military` / `religion` / `company` / `community` / `criminal` / `other` |
| `status` | ✅ | enum | `active` / `hidden` / `declining` / `defeated` / `disbanded` / `unknown` |
| `members` | | list | 成员角色 id（双向） |
| `locations` | | list | 相关地点 id（双向） |
| `tags` | | list | 自定义标签 |

---

## 6. 道具文件：`worldbuilding/artifacts/<id>.md`

| 字段 | 必填 | 类型 | 允许值 |
| --- | --- | --- | --- |
| `name` | ✅ | string | 展示名 |
| `type` | ✅ | enum | `object` / `weapon` / `document` / `technology` / `relic` / `symbol` / `resource` / `other` |
| `status` | ✅ | enum | `active` / `lost` / `destroyed` / `hidden` / `transferred` / `unknown` |
| `owner` | | string | 持有者（角色或势力 id） |
| `location` | | string | 当前所在地点 id |
| `tags` | | list | 自定义标签 |

⚠️ 道具的 `status` 必须与 `continuity/state.md` 中 `object-state[].status` 一致。

---

## 7. 弧线文件：`plot/arcs/<id>.md`

| 字段 | 必填 | 类型 | 允许值 |
| --- | --- | --- | --- |
| `name` | ✅ | string | 弧名 |
| `type` | ✅ | enum | `main` / `subplot` / `character` / `thematic` |
| `status` | ✅ | enum | `planned` / `in-progress` / `resolved` |
| `characters` | | list | 涉及角色 id |
| `themes` | | list | 服务的主题（与 `story.md` 的 `themes` 对齐） |
| `acts` | | list | 幕结构（自由文本） |

---

## 8. 章节文件：`chapters/chapter-NN.md`

| 字段 | 必填 | 类型 | 允许值 |
| --- | --- | --- | --- |
| `title` | ✅ | string | 章节标题 |
| `number` | ✅ | int | 章节序号（整数） |
| `status` | ✅ | enum | `outline` / `draft` / `revised` / `final` / `complete` |
| `word-count` | | int | 字数（CLI 跑 `wordcount --write` 自动写回） |
| `pov` | | string | 该章 POV 角色 id |
| `locations` | | list | 出场地点 id |
| `characters` | | list | **在场**角色 id |
| `mentions` | | list | **提及**角色 id（已故角色只能放这里） |
| `arcs-advanced` | | list | 推进的弧 id |

⚠️ **章节 frontmatter 的 `characters` 与 `mentions` 必须严格区分**：死角色不能放进 `characters`，否则 `story continuity` 报错。

---

## 9. 场景文件：`scenes/chapter-NN-scene-NN.md`

| 字段 | 必填 | 类型 | 说明 |
| --- | --- | --- | --- |
| `title` | ✅ | string | 场景标题 |
| `chapter` | ✅ | string | 所属章节 id（`chapter-NN`） |
| `scene` | ✅ | int | 章节内场景序号 |
| `status` | ✅ | enum | `outline` / `draft` / `revised` / `final` / `complete` |
| `pov` | | string | 视角角色 id |
| `location` | | string | 场景地点 id |
| `characters` | | list | **在场**角色 id |
| `mentions` | | list | **提及**角色 / 实体 id |
| `arcs-advanced` | | list | 推进的弧 id |
| `state-changes` | | list | 状态变更条目（对象列表：`{character, location, physical, emotional, knowledge}` / `{artifact, owner, location, status}` / `{character, knows, learned-in}`） |

---

## 10. 连续性状态：`continuity/state.md`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `current-chapter` | int | 当前推进到的章节序号 |
| `character-state` | list | 角色状态条目（每条 `{character, location?, physical?, emotional?, knowledge?}`） |
| `object-state` | list | 道具状态条目（每条 `{artifact, owner?, location?, status}`） |
| `knowledge-state` | list | 知识状态条目（每条 `{character, knows, learned-in?}`） |

⚠️ `object-state[].status` 必须与对应道具文件的 `status` 一致。

---

## 11. 悬念 / 伏笔

**悬念**：`continuity/questions/<id>.md`

| 字段 | 必填 | 类型 |
| --- | --- | --- |
| `title` | ✅ | string |
| `status` | ✅ | enum: `open` / `answered` / `resolved` / `dropped` |
| `introduced` | | string（章节 id） |
| `resolved` | | string（章节 id） |
| `characters` | | list |

**伏笔**：`continuity/promises/<id>.md`

| 字段 | 必填 | 类型 |
| --- | --- | --- |
| `title` | ✅ | string |
| `status` | ✅ | enum: `planned` / `planted` / `paid-off` / `dropped` |
| `planted` | | string（章节 id） |
| `payoff` | | string（章节 id） |
| `arcs` | | list |
| `characters` | | list |

⚠️ `planted` 章节必须在 `payoff` 之前；`introduced` 必须在 `resolved` 之前；`story continuity` 会校验。

---

## 12. 术语条目：`glossary/terms/<id>.md`

| 字段 | 必填 | 类型 |
| --- | --- | --- |
| `term` | ✅ | string |
| `category` | ✅ | enum: `person` / `place` / `faction` / `artifact` / `concept` / `term` / `other` |
| `aliases` | | list |

---

## 13. 注册表文件：每个领域一份 `_index.md`

注册表**永远不要手改**，由 `story reindex .` 重建。frontmatter 必含：

| 领域 | `type` 字段值 |
| --- | --- |
| `characters/_index.md` | `character-registry` |
| `worldbuilding/_index.md` | `world-registry` |
| `plot/_index.md` | `plot-registry` |
| `plot/timeline.md` | `timeline` |
| `chapters/_index.md` | `chapter-registry` |
| `scenes/_index.md` | `scene-registry` |
| `continuity/questions/_index.md` | `question-registry` |
| `continuity/promises/_index.md` | `promise-registry` |
| `glossary/_index.md` | `glossary-registry` |
| `continuity/state.md` | `continuity-state` |
