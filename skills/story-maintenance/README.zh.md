# story-maintenance · 项目维护 CLI（详细中文摘要）

> 英文原文：[../SKILL.md](../SKILL.md)（如需逐字指引请读英文）
> 适用触发词：校验 / 重建索引 / 修复注册表 / 检查链接 / 检查连续性 / 统计字数 / 项目汇总 / 导入稿件 / 导出稿件 / 跑 CLI / 做确定性维护 / `validate` / `reindex` / `repair registries` / `check links` / `check continuity` / `count words` / `summarize a story project` / `import an existing manuscript` / `export a manuscript` / `run the story CLI` / `perform deterministic maintenance on a Story Skills markdown project`

---

## 这个 skill 解决什么问题

暴露 `story` CLI 的 Agent 入口，**只做机械维护**，不做创意决策。覆盖：

- 结构校验（validate）
- 注册表重建（reindex）
- 字数统计与回写（wordcount）
- 链接校验（links）
- 连续性检查（continuity）
- 项目汇总（report）
- 下一步动作推荐（next）
- 修复指引（doctor）
- 模式升级（migrate）
- 实体增删改名（add / rename / remove）
- 稿件导入（import）
- 稿件导出（export / build）

**与创意 skill 的关系**：创意 skill（`character-management`、`worldbuilding`、`plot-structure`、`chapter-writing`、`revision-continuity`）做决策；本 skill 负责机械一致性。

---

## CLI 调用优先级

按顺序选择第一个可用的：

1. **已安装的二进制**：

   ```shell
   story <command>
   ```

2. **从本仓库跑 Bun**：

   ```shell
   bun run story -- <command>
   ```

3. **拷贝安装的 fallback**（`scripts/story.js` 相对本 skill 解析）：

   ```shell
   node scripts/story.js <command>
   ```

四个都没装时，按 `story-init` 的约定手做维护。

**纪律**：CLI 工具保留在项目外部。**禁止**把 `scripts/story.js` 复制进用户的故事项目；**禁止**用项目内 `build-*.js` 或生成器脚本生成故事内容。故事项目保持 markdown-first，外加用户明确请求的导出产物（如 `manuscript.md`）。

---

## 全部命令（按场景分组）

命令从**故事项目根目录**运行，或显式传路径。

### 校验类

```shell
story validate .       # 校验布局 / frontmatter / schema-version
story links .          # 校验双向链接完整性
story continuity .     # 连续性确定检查（见下文）
```

### 重建 / 同步类

```shell
story reindex .        # 重建所有 _index.md
story wordcount . --write   # 字数写回章节 frontmatter
```

### 汇总 / 指引类

```shell
story report .              # 项目状态 / 清单 / 健康总览
story report . --actionable # 同上 + 按优先级排序的修复动作
story next .                # 下一步该写什么的确定性推荐
story doctor .              # 哪些内容已过期 / 不一致 / 损坏
```

### 升级类

```shell
story migrate .             # 旧 schema → v2
```

### 实体操作类

```shell
story add character "Name"
story add location "Name"
story add faction "Name"
story add artifact "Name"
story add arc "Name"
story add chapter "Title"
story add scene "Title"
story add promise "..."
story add question "..."
story add term "..."

story rename character old-id "New Name"
story remove promise old-promise
```

CLI 适合做确定性的文件操作；创意内容（散文本身、角色背景细节）由对应 skill 处理。

### 导入 / 导出类

```shell
story import draft.md --title "Title"
story export . --out manuscript.md
story build . --format markdown   # 产物落 dist/
story build . --format epub       # 产物落 dist/
story build . --format docx       # 产物落 dist/
```

`dist/` 是可丢弃构建产物。markdown 项目本身是数据源。

---

## 命令使用时机速查

| 时机 | 跑什么 |
| --- | --- |
| 项目初始化后 | `story validate .` |
| 多文件编辑完成时 | `story validate .` |
| 新增 / 删除 / 重命名 实体（角色 / 地点 / 体系 / 弧 / 章节） | `story reindex .` |
| 写完或修订完章节 | `story wordcount . --write` |
| 改动角色关系 / 显著地点 / 弧参与者 / 章节引用 | `story links .` |
| 起草或修订完一章 | `story continuity .` |
| 用户问矛盾 / 死角色复活 / 伏笔未兑现 / 状态过期 | `story continuity .` |
| 用户问项目状态 / 清单 / 进度 / 健康 | `story report .` / `story report . --actionable` |
| 起草前看下一步该做什么 | `story next .` |
| 用户问哪些内容已过期 / 不一致 / 损坏 | `story doctor .` |
| 项目是旧 schema 或缺 v2 路径 | `story migrate .` |
| 想做确定性的实体文件操作 | `story add` / `story rename` / `story remove` |
| 用户要合并稿到特定路径 | `story export . --out ...` |
| 用户要构建书稿（markdown / epub / docx） | `story build . --format ...` |

---

## `story continuity` 做什么

`story continuity .` 是 Story Skills 的**招牌**——它把语言模型最薄弱、提示词修不好的"长程一致性"做成确定性检查。具体包括：

- **死亡顺序**：`died-in` 章节 vs 之后章节 `characters` 字段的引用
- **伏笔 / 悬念章节顺序**：`planted` 必须在 `payoff` 之前；`introduced` 必须在 `resolved` 之前
- **契诃夫之枪**：长线 planted 但未 paid-off 的项以 warning 提醒
- **POV / 在场一致性**：场景里 POV 角色未在 `characters` 中会被标
- **`continuity/state.md` 引用完整性**：`character-state` / `object-state` / `knowledge-state` 条目引用的角色 / 道具 / 章节都存在

跑之前先读 [`../revision-continuity/`](../revision-continuity/) 的中文摘要了解完整审计流程。

---

## 失败处理

- **CLI 报错**当成可执行的 maintenance finding 来处理。
- **修** 缺引用 / 缺文件 / 过期注册表 / 错字数 等——如果用户请求的任务暗示要修。
- **不**为通过机械校验而覆盖创意散文或故事内容。
- **如果验证警告是有意为之的用户数据**，要报告而不是默默修改。

---

## scripts/story.js（CLI fallback）

`scripts/story.js` 是一个打包好的 Node 兼容 CLI fallback，与上游仓库一致，**已原样保留在 `story-skills-zh/skills/story-maintenance/scripts/story.js`**。

- 用户从本仓库用 `node` 直接跑它。
- 走 `bun run build:fallback` 会从 `src/` 重新生成它。
- **不要**把它复制进用户的具体故事项目。

源码细节不需要 Agent 关心——它已经定型，按上面的命令格式调用即可。

---

## 常见坑

1. **跑 `validate` 但忘跑 `reindex`**：注册表过期，frontmatter 已变但 `_index.md` 没更新。
2. **跑 `links` 但没修**：`story links .` 只会报错，不会自动修。
3. **把 `scripts/story.js` 复制进项目**：违反 markdown-first 纪律，且脚本会过时。
4. **用 `story add chapter` 后不写散文**：CLI 只建骨架，正文还是要手动写。
5. **跑 `continuity` 看到 warning 不当回事**：长线伏笔忘了兑现真的会丢。
6. **`story doctor .` 输出的优先级顺序误读**：`--actionable` 是关键参数。

---

## 相关 skill

- 几乎所有其他 skill 在写 / 改 / 删之后都会引导跑这里的命令
- [`../revision-continuity/`](../revision-continuity/) —— `continuity` / `doctor` / `next` 的主要消费方
- [`../story-init/`](../story-init/) —— 项目初始化阶段
- [`../character-management/`](../character-management/) / [`../worldbuilding/`](../worldbuilding/) / [`../plot-structure/`](../plot-structure/) / [`../chapter-writing/`](../chapter-writing/) —— 这些 skill 的指令结尾都会调用本 skill 的命令
