# Mermaid / 可视化输出约定

> 当用户触发了"画"类关键词（"画人物谱" / "图" / "关系网" / "时间线图"），agent 输出 Mermaid 格式的关系图或时间线。落地位置和样式在本节统一。

---

## 落档位置

| 触发的图 | 落档文件 / 节 | 格式 |
| --- | --- | --- |
| 人物谱 / 角色关系图 | `characters/_index.md` 的 `## Relationship Map` 节 | `graph LR` |
| 家族树 | `characters/_index.md` 的 `## Family Trees` 节 | `graph TD` |
| 地点网络 | `worldbuilding/_index.md` 的 `## Locations` 节末尾 | `graph LR` |
| 阵营成员图 | `worldbuilding/_index.md` 的 `## Factions` 节末尾 | `graph LR` |
| 弧线时间线 | `plot/_index.md` 的 `## Story Structure` 节末尾 | `gantt` 或 `timeline` |
| 章节-弧线映射 | `plot/_index.md` 的 `## Theme Tracking` 节 | `flowchart LR` |
| 章节时间线 | `chapters/_index.md` 的 `## Timeline` 节 | `gantt` |

## 渲染约定

- **id 用 kebab-case**：`lin-ruo[林若]`，中文名放在方括号里
- **箭头**：双向关系用 `-->` / 同样双箭头；单向用 `-->` 加注释
- **节点类别**：用 `subgraph` 给阵营/家族/地点分组
- **数据源**：确保引用的 id 都已存在（avoid幻觉）；渲染前 `story reindex .`

## 触发词清单（让 Mermaid 输出的关键词）

| 关键词 | 输出位置 |
| --- | --- |
| 画人物谱 / 画关系图 / 角色关系图 / 可视化角色 | 人物关系图 |
| 画家族树 / 族谱 | 家族树 |
| 画地点网络 / 世界地图 / 地点关系 | 地点网络 |
| 画阵营 / 势力图 | 阵营成员图 |
| 画时间线 / 弧线图 | 弧线时间线 |
| 画章节-弧线映射 / 主题追踪图 | 章节-弧线映射 |
| 画进度 / 章节时间线 | 章节时间线 (gantt) |

## 不输出 Mermaid 的情况

- 用户没触"画"类词 → 还是文字关系描述
- 引用的角色/地点/弧/章节**还没落档** → 不要提前画，会成幻觉
- 项目很大（≥ 40 节点）→ 拆成多张分区域的图，避免一张图挤成一团

## 与 CLI 互操作

- Mermaid 图存进 `_index.md` 的 markdown body 部分，**不**进 YAML frontmatter
- `story reindex .` 会忽略 mermaid 块（视为正文），不会被破坏
- `story links .` 也不会校验 mermaid 里的 id —— mermaid 块的图若引用不存在的 id，**当前不报**；下一步计划是把 `mermaid-id 校验` 接进 `check-skill-consistency.mjs` 的扩展点（暂未实现）

## 示例

见 `character-management/SKILL.md` § 可视化的 mermaid demo 块。