# revision-continuity · 修订与连续性审查（详细中文摘要）

> 英文原文：[../SKILL.md](../SKILL.md)（如需逐字指引请读英文）
> 适用触发词：修订章节 / 编辑散文 / 连续性检查 / 找不一致 / 审计角色状态 / 时间线一致性 / 行编辑 / 结构编辑 / 润色 / 准备下一轮修订 / `revise a chapter` / `edit prose` / `continuity check` / `find inconsistencies` / `audit character state` / `check timeline consistency` / `line edit` / `developmental edit` / `polish a draft` / `prepare existing story material for the next revision pass`

---

## 这个 skill 解决什么问题

对**已有** Story Skills 项目做修订，**不破坏连续性**。具体四种修订模式：

- **连续性审计（Continuity audit）** —— 找矛盾 / 过时引用 / 时间线问题 / 缺链 / 字数漂移
- **结构修订（Developmental revision）** —— 改结构 / 场景目的 / 角色动机 / 节奏 / 赌注 / 弧推进
- **行编辑（Line edit）** —— 改清晰度 / 语气 / 节奏 / 对白 / 感官细节，**不动情节事实**
- **校对润色（Proof / polish）** —— 改小措辞 / 语法 / 重复 / 格式

**前置条件**：项目存在（`story.md` 在根目录）。CLI 可用时建议先跑 `story report .` 看项目健康总览。

---

## 修订工作流（6 步）

### 第 1 步：明确修订模式

除非用户已经指定，否则先问清楚要走哪种 pass（四种模式见上文）。

### 第 2 步：读上下文

按目标范围读：

- `story.md`
- `chapters/_index.md`
- 目标章节（们）
- 相邻章节（前 / 后）
- 章节 frontmatter 引用的角色 / 地点 / 体系 / 弧文件
- 对应的 `scenes/` 场景文件
- `continuity/state.md`、未解悬念、未兑现伏笔
- `plot/timeline.md` 与活跃弧文件（连续性敏感编辑必备）

### 第 3 步：写一个简短修订计划

包含：

- **改什么**
- **为连续性必须保留什么**
- **可能还要更新哪些文件**（超出本章本身的）

### 第 4 步：直接编辑 markdown

**不要**用项目内脚本批量改稿——直接在目标文件上做定点编辑。

### 第 5 步：更新依赖的元数据

按实际情况更新：

- 章节 frontmatter `status`（`draft` → `revised` → `final`，**只在合适时**升 `final`）
- 章节 `word-count`（CLI：`story wordcount . --write`）
- `plot/timeline.md`（事件有变时）
- `scenes/` 记录（POV / 地点 / 参与者 / 状态变更变了时）
- `continuity/state.md`、`continuity/questions/`、`continuity/promises/`（知识 / 道具归属 / 谜题状态 / 伏笔变了时）
- 弧文件里的情节点或伏笔状态（setup / payoff 改了时）
- 角色或地点文件（状态 / 关系 / 地点引用变了时）

### 第 6 步：跑维护流水线

```shell
story wordcount . --write
story reindex .
story links .
story validate .
story continuity .
story doctor .
```

`story continuity` 是核心：它确定性地检查

- 死亡顺序（`died-in` vs 之后章节的 `characters` 引用）
- 伏笔 / 悬念章节顺序
- 未兑现的契诃夫之枪
- POV / 在场一致性
- `continuity/state.md` 引用完整性

对于故意为之的闪回 / 记忆 / 录音，把死角色放进章节或场景的 `mentions` 而不是 `characters`。

CLI 不可用时用：

```shell
bun run story -- ...
# 或
node ../story-maintenance/scripts/story.js ...
```

---

## 连续性审计检查清单

跑完 `story continuity .` 拿到确定性 findings 之后，**CLI 不能判定的部分**由人 / Agent 检查：

| 维度 | 检查什么 |
| --- | --- |
| 角色知识 | 没人依据未获得的信息行动 |
| 角色状态 | 伤势 / 情绪 / 阵营 / 位置 / 状态前后一致 |
| 时间线 | 时段 / 旅行时间 / 顺序 / 因果连贯 |
| 情节弧 | 每个改动的场景仍在推进或有意暂停某条弧 |
| 伏笔 | planted / paid-off 与弧文件对齐 |
| 承诺 / 悬念 | durable 记录与章节实际揭示 / 隐藏的内容匹配 |
| 场景状态 | 每个章节场景都有 POV / 地点 / 参与者 / 弧 / state-change 笔记 |
| 世界规则 | 魔法 / 科技 / 政治 / 地理与世界观文件一致 |
| 引用 | 章节 frontmatter 列出散文里出现的所有主要角色 / 地点 / 弧 |
| 注册表 | 改完后 indexes / 字数 / 链接都是最新的 |

---

## 报告格式

### 用户要求审计而非直接编辑时

按严重程度排序输出 findings，每条带：

- 文件路径
- 具体问题
- 具体修复建议

### 用户要求修订时

输出修订总结：

- 改了哪些文件
- 改了哪些连续性事实
- 维护流水线结果

---

## 常见坑

1. **跳过 `story continuity .` 直接动笔**：错误埋到下一章才发现。
2. **行编辑时改了情节事实**：破坏连续性。行编辑只能动语言层。
3. **`status` 草率升 `final`**：之后再改要回到 `revised`，破坏 git 历史语义。
4. **改了章节正文但忘改 `scenes/` 记录**：机器可读的状态对不上散文事实。
5. **改了伏笔顺序但忘了同步 `continuity/promises/<id>.md`**：`planted` / `payoff` 字段要对齐。
6. **用项目内脚本批量改稿**：违反 markdown-first 纪律。

---

## 相关 skill

- [`../chapter-writing/`](../chapter-writing/) —— 起草新章节时的预防性纪律
- [`../story-maintenance/`](../story-maintenance/) —— 所有 CLI 命令入口
- 其他 5 个 skill 都间接相关（修订会触及角色 / 地点 / 弧 / 状态 / 章节任何一处）
