<!--
Shared canonical reference / 跨 skill 共用根约定
This file is referenced from every SKILL.md. Do not duplicate its content
across SKILL.md files — add a one-line reference instead.
任何 skill 写过一次的规则,这里抽出来后由各 skill 引用,避免各 SKILL.md 之间 drift。
-->

# 跨 skill 通用约定

> 引用方式：在 SKILL.md 中用一句 "见 `../common/project-conventions.md`" 替代过去直接写的同内容段落。
>
> **修改本文件的任何约定,等于修改所有 skill 的行为**。请走与 `package.json` 版本同步的提交流程。

---

## 一、标识与命名

- **文件名一律 kebab-case**。所有实体文件用小写英文/拼音连字符(`sera-voss.md`、`ashen-citadel.md`、`yu-ye-zhi-mi.md`)。**不要用中文做文件 id**。
- **每个 markdown 文件带 YAML frontmatter**。frontmatter 是机读元数据,正文才是给人读的散文。
- **schema 版本**：根 `story.md` 的 frontmatter 第一件事写 `schema-version: 2`。任何低于 v2 的项目先跑 `story migrate .` 升档。
- **`_index.md`**：每个领域的权威注册表(`characters/_index.md`、`worldbuilding/_index.md`、`plot/_index.md`、`chapters/_index.md` 等),存领域元数据的权威索引。
- **`story.md`**：顶层故事圣经,所有 skill 都会读它拿语境(genre / sub-genre / setting-era / themes / pov / tense / status)。
- **章节文件名**：`chapters/chapter-{NN}.md`,`NN` 是两位数字,从 `01` 起递增;frontmatter 的 `number` 字段必须与文件名对齐。
- **场景文件名**：`scenes/chapter-{NN}-scene-{MM}.md`,`MM` 在章节内从 `1` 起递增;重排章节时同步调整前缀。
- **角色标识**：用 kebab-case 文件名去掉 `.md` 后缀(如 `sera-voss`)。一旦被多个文件引用,**不要再改名**——要改名先用 `story reindex .` 与 `story validate .` 检查依赖。

## 二、双向交叉引用

任何两个实体之间的引用都必须双向维护。CLI `story links .` 会强制要求：

| A 引用 B | B 必须反向引用 A |
| --- | --- |
| 角色地点关系 | 地点的 `notable-characters` 列表 |
| 阵营成员关系 | 角色 frontmatter 的阵营标识或阵营文件 `members` |
| 器物持有关系 | 角色档案的道具引用 / 阵营文件的器物清单 |
| 弧线人物 | 角色档案的 `arc` 字段(可选主弧一对一映射) |
| 章节 POV | 角色档案存在,角色文件 frontmatter 对齐章节状态 |
| 章节地点 | 地点 frontmatter 的 `chapters-used-in` 或反向链接 |
| 章节弧推进 | 弧文件情节点的"对应章节"列填章节 id |
| 伏笔兑现 | `continuity/promises/<id>.md` 中 setup / payoff 章节对齐弧的情节点 |

> 双向引用是项目一致性的最低门槛。任意一处单向缺失都会被 `story validate .` 标出。

## 三、死亡追踪

- 角色**当页死亡**:`status: deceased` + `died-in: chapter-{NN}`,让 `story continuity` 知道在哪章死亡。
- 角色**开篇前已死**(回忆人物):`status: deceased`,**不填** `died-in`;后续章节只能进 `mentions`,不能进 `characters`。
- 已故角色出现在后续章节:用 `mentions`,绝对不放到 `characters`,否则会被判为死后复活。

## 四、`mentions` vs `characters`(章节与场景 frontmatter)

- **`characters`**：本章/本场景里**真正出现并能产生互动**的角色(说话、被看见、被注视)。
- **`mentions`**：只被提及、回忆、录音、闪回中出现的角色——包括已故角色。

判定口径：POV 角色当下能听见这个角色说话、能看见他本人,进 `characters`;只能读到他的名字、从别人嘴里听说、或在回忆里看到,进 `mentions`。

## 五、CLI helper 留在外部

项目里**不要**写 `build-*.js` 这种本地构建/生成/批量写脚本去生成故事文件。Agent 能跑的 JS helper 只有：

1. 安装好的 Story CLI (`story`)
2. bundled fallback (`skills/story-maintenance/scripts/story.js`)
3. 直接在 `story-skills-zh/` 仓库里跑 (`bun run story --`)

不得不写的临时 helper 放在故事项目之外,完事删掉。CLI 的执行细节见 `common/cli-priority.md`。

## 六、跨 skill 触发的快捷词

下表列出每个 skill 的中文触发短词,**中英双语版本见各 SKILL.md 的 description 字段**。

| 触发的 skill | 中文关键词 |
| --- | --- |
| `story-init` | 开新故事 / 初始化故事项目 / 创建故事 / 新书 / 搭建一个故事 / 开始写小说 |
| `character-management` | 创建角色 / 更新角色 / 加一个角色 / 画人物谱 / 角色关系 / 人物弧 |
| `worldbuilding` | 创建地点 / 加个地点 / 魔法体系 / 政治体系 / 构建世界 / 加文化 |
| `plot-structure` | 创建情节弧 / 故事结构 / 加一个情节点 / 故事时间线 / 追踪伏笔 |
| `chapter-writing` | 写一章 / 下一章 / 章节大纲 / 起草章节 / 继续故事 / 写一个场景 |
| `revision-continuity` | 修订一章 / 编辑正文 / 连续性检查 / 找矛盾 / 审计角色状态 |
| `story-maintenance` | 验证 / 重建索引 / 修注册表 / 检查链接 / 字数统计 / 总结 |

## 七、permissions 范围(供各 skill frontmatter 引用)

每个 skill 都有自己的"读写 + bash 范围"。sketch:

| Skill | Bash 范围 | 写文件范围 | 备注 |
| --- | --- | --- | --- |
| `story-init` | `story init`, `bun run story -- init`, `node ../story-maintenance/scripts/story.js init` | 新目录创建；只写新文件 | 跑前先确认 `story.md` 不存在 |
| `character-management` | `story add character`, `story rename`, `story remove`, `story reindex`, `story links`, `story validate` | `characters/*.md`、相关反向引用文件 | 默认保守：不删既有正文 |
| `worldbuilding` | `story add faction/artifact`, `story reindex/links/validate` | `worldbuilding/**/*.md`、相关角色/弧引用 | 同上 |
| `plot-structure` | `story add arc/promise/question`, `story validate` | `plot/**/*.md`、`continuity/**`、弧反向章节引用 | 修改弧时要先看章节 frontmatter |
| `chapter-writing` | `story wordcount --write`, `story reindex`, `story links`, `story validate`, `story next` | `chapters/*.md`、`scenes/*.md`、相关连续性文件 | 不动 `worldbuilding/` 既有档案 |
| `revision-continuity` | `story wordcount --write`, `story reindex`, `story links`, `story validate`, `story continuity`, `story doctor` | 全文编辑 | **允许覆盖正文**,但每一步要写修订计划 |
| `story-maintenance` | 所有 `story *` 命令 | 默认只读；只写维护产物 (`wordcount --write`, `reindex` 等) | 不要碰正文 |

> 这些范围是**约定**,不是 OS 强制。Agent 在没有 hook 的环境里应自我约束。