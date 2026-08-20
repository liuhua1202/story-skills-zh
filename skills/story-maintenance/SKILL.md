---
name: story-maintenance
version: 0.3.1
description: 当用户要验证、重建索引、修注册表、检查链接、检查连续性、字数统计、总结故事项目、导入已有稿件、导出稿件、跑 story CLI,或对 Story Skills markdown 项目做任意确定性维护时,使用本 skill。Or when the user asks to "validate the project", "reindex registries", "check links", "wordcount", "story report", "story import", or any other deterministic maintenance on a Story Skills project, use this skill.
allowed-cli: story *
scope: read-mostly, write-only-maintenance (wordcount --write, reindex, links, validate outputs)
calls: []
changelog: ../CHANGELOG.md
---

<!--
Bilingual metadata / 双语元数据
Frontmatter fields above (version, allowed-cli, scope, calls, called-by) are
documentation-only — see ../common/project-conventions.md for canonical
semantics and ../common/cli-priority.md for CLI invocation rules.
-->

# 故事维护

## 这个 skill 做什么

跑 Story Skills 项目的确定性维护。用 CLI 做结构验证、注册表重建、字数统计、链接检查、连续性检查、项目报告、next-action 报告、schema 迁移、实体 helper、稿件导入、稿件导出。创意性的事还是创作 skill 管；本 skill 只管机械的一致性。

## 工作流（checklist）

```
□ 1. 探测 CLI 可用性（见 ../common/cli-priority.md）
□ 2. 选对命令（见下文"命令清单"）
□ 3. 跑命令、收集输出
□ 4. 错误按"失败处理"对待
□ 5. 报告发现，让用户决定下一步
```

## CLI 调用方式

> 三种调用方式（按优先级）和选择原则、失败处理，统一见 `../common/cli-priority.md`。本节只列本 skill 的命令清单与每条的"何时跑"。

## 命令清单与何时用

| 命令 | 何时跑 |
| --- | --- |
| `story validate .` | 初始化之后、任何多文件编辑的末尾 |
| `story reindex .` | 新增 / 删除 / 重命名角色、地点、系统、弧、章节之后 |
| `story wordcount . --write` | 写或修订章节之后 |
| `story links .` | 改角色关系、notable locations、弧参与者、章节引用之后 |
| `story continuity .` | 起草或修订章节之后；用户问矛盾、死角色出现、未兑现伏笔、过时状态时也跑 |
| `story import draft.md --title "Title"` | 用户有现成稿件或章节草稿、想围绕它建 Story Skills 项目时 |
| `story report .` | 用户问项目状态、清单、进度、或者想要个快速健康总览时 |
| `story report . --actionable` | 同上，但要可执行的清单（按优先级排） |
| `story next .` | 起草前看 CLI 给的确定性下一步 |
| `story doctor .` | 用户问"什么 stale / 坏了 / 不一致"时 |
| `story migrate .` | 项目是旧 schema 或缺 v2 路径时 |
| `story add / rename / remove` | 适用于请求变更的、确定性的实体文件操作 |
| `story export . --out manuscript.md` | 用户明确要合并稿件到某个具体路径时 |
| `story build . --format {markdown\|epub\|docx}` | 用户要构建书稿产物时；落到 `dist/` |

## `story continuity` 自动检查

CLI 确定性覆盖：

- `died-in` 顺序（已故角色后续章节不能在 `characters` 出现）
- 承诺/悬念章节顺序
- 契诃夫之枪（已埋的伏笔需在后续章节标 `paid-off`）
- POV / cast 一致性
- `continuity/state.md` 引用

CLI 判断不了的部分：见 `../common/continuity-audit-checklist.md`。

## 失败处理

- CLI 错误当可操作的维护发现对待。
- 修掉损坏的引用、缺失的必需文件、过时的注册表、不对的字数 —— 只要请求的动作隐含要这么做。
- **不要为了过机械检查就覆盖掉创作正文或故事内容。**
- 验证警告如果是用户故意保留的数据，报告出来，不要静默改。
- 路径安全检查（`Refusing path traversal` / `Refusing to follow symbolic link`）——按字面提示改路径，不要试图绕过。



## 输出样本与错误速查

| 命令 | 输出样本 |
| --- | --- |
| `story validate .` | 看 `references/sample-outputs.md` § `validate` |
| `story continuity .` | 看 § `continuity` |
| `story next .` / `doctor .` | 看 § `next` 和 § `doctor` |
| 其它命令 | 全部在该 reference 文件同一页 |

最常见的 8 条错误速查见 `references/sample-outputs.md` 末尾"错误速查"段。完整排错表见 `OPERATIONS.md §7`。
## 跨 skill 通用约定

- 跨 skill 触发的快捷词、双向链接规则、kebab-case 命名、`mentions` vs `characters`、CLI helper 留在外部 等根约定，统一见 `../common/project-conventions.md`。
- 跨实体引用（角色↔地点、角色↔阵营、章节↔弧线 等 9 类反向映射）：`../common/cross-reference-rules.md`。
- 标识命名（kebab-case / CJK 音译 / CJK fallback）：`../common/id-naming.md`。