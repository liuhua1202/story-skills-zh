# Story Skills · 中文使用指南

> 本目录是 [danjdewhurst/story-skills](https://github.com/danjdewhurst/story-skills) v0.3.1 的本地镜像，仅供个人使用。
>
> - **许可证**：MIT（见同目录 `LICENSE`）
> - **英文原版位置**：`../story-skills/`（与本目录平行的 `story-skills/` 文件夹）
> - **本指南范围**：中文导航 + 索引。**不**包含 `SKILL.md` / `references/*.md` 的全文中文译本——请直接打开英文 `SKILL.md` 跟随指令；本文档负责帮你"什么时候读哪份文件、跑哪条命令、产物落到哪里"。
> - **已双语化的文件**：`README.md`、`AGENTS.md`、`docs/first-20-minutes.md`、`docs/schema-v2.md`、两份 `plugin.json`。其余技能原文请用英文阅读。

---

## 1. 这个项目是什么

Story Skills 是一套用 markdown 驱动虚构作品写作的 Agent 技能集 + 配套 CLI：

- **技能（skills/）**：7 个 `SKILL.md`，指导 Agent 在不同阶段做什么。
- **CLI（bin/, src/）**：Bun/Node 工具，确定性地维护项目（校验、索引、字数、链接、连续性、导出）。
- **数据契约（docs/schema-v2.md）**：所有故事实体都是带 YAML frontmatter 的 markdown 文件，跨技能双向引用。
- **示例（examples/）**：3 个完整故事项目（一个奇幻、一个近未来悬疑、一个故意写崩用来演示连续性检查）。

CLI 把"故事圣经"当作可校验的契约，专门捕获**长程一致性错误**——这是普通 LLM 提示词搞不定、但能靠 frontmatter + 校验脚本确定性地搞定的部分（死角色复活、伏笔兑现早于埋设、契诃夫之枪未开火、过期状态等）。

---

## 2. 安装到 Codex（或 Claude Code）

### 方案 A：把 `story-skills-zh/` 整个目录作为本地插件装载

Codex 会自动识别仓库级与用户级技能目录。把整个 `story-skills-zh/` 软链或复制到：

- 用户级：`~/.agents/skills/story-skills/`（个人全部项目可见）
- 仓库级：`<某个项目根>/.agents/skills/story-skills/`（仅该仓库可见）

例如：

```shell
# PowerShell（管理员或当前用户均可）
New-Item -ItemType SymbolicLink -Path "$env:USERPROFILE\.agents\skills\story-skills" -Target "C:\Users\liuhua\Desktop\project\007-Story\story-skills-zh"
```

或者直接复制：

```shell
Copy-Item -Recurse story-skills-zh $env:USERPROFILE\.agents\skills\story-skills
```

随后在 Codex 对话里直接说：

- "开始一个新故事"
- "创建一个角色档案"
- "写下一章"
- "对最新一章做连续性检查"
- "校验我的故事项目"

Codex 会根据对话意图自动路由到对应技能。

### 方案 B：通过 `.codex-plugin/` 清单作为插件安装

`story-skills-zh/.codex-plugin/plugin.json` 已经按 Codex 插件清单格式写好（含中文 `displayName`、`shortDescription`、`longDescription` 与 `defaultPrompt`）。如果你有自己的本地 marketplace 仓库，把这个目录推过去即可。

> 注意：本目录的 plugin 版本号 `0.3.1` 与上游同步，未做版本号调整。请勿对外发布为新版本。

---

## 3. 技能索引（什么时候用什么 skill）

| 中文触发词 | 英文触发词 | 读哪份 SKILL.md | 跑哪些命令 | 产物落到哪 |
| --- | --- | --- | --- | --- |
| 开始一个新故事 | Start a new story | `skills/story-init/SKILL.md` | `story init "<标题>" --genre ...` | 当前目录下生成完整项目骨架 |
| 创建一个角色 | Create a character | `skills/character-management/SKILL.md` | `story add character "<名字>" --role ...` | `characters/<id>.md` + 双向更新 `_index.md` |
| 改一个角色 | Edit a character | `skills/character-management/SKILL.md` | 同上 + `story reindex .` | `characters/<id>.md` |
| 加一个地点 / 势力 / 道具 / 体系 | Add a location / faction / artifact / system | `skills/worldbuilding/SKILL.md` | `story add location ...` / `story add faction ...` / `story add artifact ...` / `story add system ...` | `worldbuilding/<dir>/<id>.md` |
| 规划情节弧 / 伏笔 / 悬念 | Plan an arc / promise / question | `skills/plot-structure/SKILL.md` | `story add arc ...` / `story add promise ...` / `story add question ...` | `plot/arcs/<id>.md` / `continuity/promises/<id>.md` / `continuity/questions/<id>.md` |
| 写下一章 | Write the next chapter | `skills/chapter-writing/SKILL.md` | `story next .`（推荐先跑）→ 起草 → `story add chapter ...` | `chapters/chapter-XX.md` + `scenes/chapter-XX-scene-YY.md` |
| 修订 / 连续性审查 | Revise / continuity audit | `skills/revision-continuity/SKILL.md` | `story continuity .` / `story doctor .` / `story links .` | 不写新文件；输出问题清单 |
| 校验项目 | Validate the project | `skills/story-maintenance/SKILL.md` | `story validate .` / `story reindex .` / `story wordcount . --write` | 更新 `_index.md` 与 frontmatter 字数 |
| 导出稿件 | Export manuscript | `skills/story-maintenance/SKILL.md` | `story export . --out manuscript.md` / `story build . --format epub\|docx\|markdown` | `dist/` 下生成（可丢弃构建产物） |

更详细的功能说明参考各 `skills/<name>/README.zh.md`（本目录新增的中文索引小卡片）。

---

## 4. 推荐工作流（与 `docs/first-20-minutes.md` 对应）

1. **开局**：`story init "<标题>" ...` 生成项目骨架，编辑 `story.md` 把圣经写完。
2. **搭骨架**：用 `character-management` / `worldbuilding` / `plot-structure` 把核心实体先建起来（不必一次全建，边写边补也行）。
3. **起草章节**：跑 `story next .` 看下一步该写什么 → 用 `chapter-writing` 起稿 → 跑 `story continuity .`。
4. **每章之后**：`story reindex .` → `story wordcount . --write` → `story links .` → `story validate .` → `story continuity .`。
5. **导出**：稿件定稿后用 `story export` 或 `story build` 输出 markdown / epub / docx。
6. **CI**：参考 `templates/github/` 下两份 GitHub Actions 工作流（`story-checks.yml`、`draft-next-chapter.yml`），可把 PR 当成章节审阅流水线。

---

## 5. 关键概念速查

- **`story.md`**：顶层故事圣经，所有技能都会读取；必须含 `schema-version: 2`。
- **kebab-case 标识符**：实体的文件名 / id 形如 `mara-quill`、`bellwether-reef`。引用时严格用这个 id。
- **`_index.md` 文件**：每个领域（characters / worldbuilding / plot / chapters / scenes / continuity / glossary）的注册表，由 `story reindex .` 自动重建，**不要手改**。
- **`characters` vs `mentions`**（在章节/场景里）：
  - `characters` = 在场。
  - `mentions` = 被提及、被回忆、被记录或在闪回中出现；已故角色可放这里而不触发连续性错误。
- **`status`**：每个实体的 `status`（`active` / `deceased` / `destroyed` / `draft` / `published` 等）必须与 `continuity/state.md` 一致。
- **持久化状态**（`continuity/state.md`）：跟踪每个角色的身体/情绪/知识、每个道具的位置/状态、每个角色的"知道什么"。长篇作品靠它维持确定性的连续性。

完整字段约定请读 `docs/schema-v2.md`（已双语化）。

---

## 6. 目录结构（与上游一致）

```
story-skills-zh/
├── LICENSE                     MIT 原样
├── README.md                   双语（已译）
├── README.zh.md                本文件
├── AGENTS.md                   双语（已译）
├── package.json / bunfig.toml  原样
├── docs/
│   ├── first-20-minutes.md     双语（已译）
│   └── schema-v2.md            双语（已译）
├── .codex-plugin/plugin.json   Codex 插件清单（中文描述）
├── .claude-plugin/plugin.json  Claude Code 插件清单（中文描述）
├── src/ / bin/ / scripts/      CLI 源码（原样）
├── test/                       Bun 测试（原样）
├── templates/github/           GitHub Actions 工作流（原样）
├── examples/                   示例故事项目（创作内容，原样保留英文）
└── skills/
    ├── story-init/README.zh.md
    ├── character-management/README.zh.md
    ├── worldbuilding/README.zh.md
    ├── plot-structure/README.zh.md
    ├── chapter-writing/README.zh.md
    ├── revision-continuity/README.zh.md
    └── story-maintenance/README.zh.md
    每个 skill 的 SKILL.md 与 references/*.md 保持英文原样
```

---

## 7. 我做了什么 / 我没做什么（透明说明）

**做了**：

- 把上游仓库原样镜像到 `story-skills-zh/`（LICENSE、源码、配置、模板、示例全部保留）。
- 把 4 份"项目级文档"做了双语版（`README.md` / `AGENTS.md` / `docs/first-20-minutes.md` / `docs/schema-v2.md`），并在中英之间用分隔线明确标注。
- 把 `plugin.json` 的用户可见字段（`description`、`interface.shortDescription`、`interface.longDescription`、`interface.defaultPrompt`、`keywords`）补上中文。
- 写了本文件作为中文导航总览。
- 在 7 个 skill 目录下各加一份 `README.zh.md` 中文索引小卡片（见下）。

**没做**：

- 没有逐文件全文双语化 7 个 `SKILL.md` 与 14 个 `references/*.md`。这些是 Agent 直接读取的操作指令，建议保留英文原文以避免指令歧义。
- 没有翻译 `examples/` 下的章节草稿等创作内容。
- 没有修改任何代码、测试、CI 配置、版本号、依赖。

---

## 8. 下一步建议

- 跑一次 `bun install && bun run test`（在 `story-skills/` 原版仓库下）确认基线测试通过；然后用 `story-skills-zh/` 作为装载目录即可。
- 想加新技能：在 `skills/<your-skill>/` 下加 `SKILL.md`（YAML frontmatter 含 `name` 与 `description`），参考 `skills/chapter-writing/` 的结构。
- 跟踪上游：`git -C story-skills pull` 拉取更新；冲突时优先保留英文原版，把中文导航同步更新即可。
