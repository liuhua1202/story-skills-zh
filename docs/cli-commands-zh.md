# CLI 命令速查（中文版）

> 这份是按 `bin/story.js` / `src/cli.js` 里实际的子命令与选项整理出来的速查表。运行 `story --help` 或 `story <command> --help` 看完整英文输出。

---

## 1. 顶层命令一览

```shell
story init <title>       # 新建故事项目（生成完整骨架）
story import <source>    # 导入已有稿件（按章节切分）
story validate [path]    # 校验项目布局 / frontmatter / 注册表
story reindex [path]     # 重建所有 _index.md 注册表
story wordcount [path]   # 统计章节字数（--write 回写 frontmatter）
story links [path]       # 校验双向链接完整性
story continuity [path]  # 确定性连续性检查（生死 / 伏笔 / 状态 / 出场）
story report [path]      # 项目清单 / 进度 / 健康总览
story next [path]        # 推荐下一步动作
story doctor [path]      # 健康检查 + 优先级化修复步骤
story migrate [path]     # 把旧 schema 升级到当前版本
story add <kind> <name>  # 新建实体
story rename <kind> <id> <name>   # 重命名实体并更新引用
story remove <kind> <id>          # 删除实体并清理引用
story export [path]      # 把章节合并成单一稿件 markdown
story build [path]       # 在 dist/ 下构建书稿（md / epub / docx）
```

---

## 2. 通用选项

| 选项 | 说明 |
| --- | --- |
| `--path <path>` | add / rename / remove 的目标项目根目录（默认 cwd） |
| `--out <file>` | export / build 的输出路径 |
| `--format <name>` | build 的格式：`markdown` / `epub` / `docx` |
| `--write` | wordcount 写回章节 frontmatter |
| `--actionable` | report 输出下一步动作 |
| `--force` | init 允许覆盖 starter 文件 |
| `--help` / `-h` | 帮助 |

⚠️ `--path` 与 `--dir` 都会校验路径穿越：如果目标解析到 cwd 之外，CLI 拒绝并报错。

---

## 3. `init` —— 新建项目

```shell
story init "<标题>" \
  --genre "<类型>" \
  --sub-genre "<子类型>" \
  --setting-era "<时代>" \
  --pov first-person|third-person-limited|third-person-omniscient \
  --tense past|present|future|mixed \
  --theme "<主题>" --theme "<主题>" \      # 多次，每次一个
  --synopsis "<2-3 句梗概>" \
  --dir "<输出目录>" \
  [--force]
```

**生成的目录结构**：见 `story-init` skill 的中文索引卡。

**标题会经过 `kebabCase`**：纯英文 → `my-story`；中文若在拼音表里会拼成 pinyin（`林若` → `lin-ruo`）；未映射字会落到 `cjk-XXXXXXXX` hex fallback（详见 `kebabCase` 的中文索引卡）。

---

## 4. `add` —— 新建实体

```shell
story add character "<名字>" --path <project> --role protagonist
story add location  "<名字>" --path <project> --type landmark --character <char-id>
story add faction   "<名字>" --path <project> --type government --member <char-id> --location <loc-id>
story add artifact  "<名字>" --path <project> --type document --owner <char-id> --location <loc-id>
story add arc       "<名字>" --path <project> --type main --character <char-id> --theme <theme>
story add chapter   "<标题>" --path <project> --number <n> --pov <char-id> --location <loc-id> --character <char-id>
story add scene     "<标题>" --path <project> --chapter <ch-id> --scene <n> --pov <char-id> --location <loc-id> --character <char-id>
story add question  "<问题>" --path <project> --introduced <ch-id> --character <char-id>
story add promise   "<内容>" --path <project> --planted <ch-id> --arc <arc-id> --character <char-id>
story add term      "<术语>" --path <project> --category <cat> --alias <alias>
```

**注意**：
- `add` 是**确定性写入**：已存在同名实体直接报错（不会静默覆盖）。
- 创建后会**自动 reindex** 所有 `_index.md`。
- 写入后**自动建立反向引用**（在 `story links` 校验范围内）。

---

## 5. `rename` / `remove` —— 重命名 / 删除

```shell
story rename character <old-id> "<新名字>" --path <project>
story remove promise <id> --path <project>
```

会**全项目 grep + 替换**所有指向该 id 的引用，然后再 reindex。引用清理是确定性的，跑完后跑 `story links .` 验证。

---

## 6. `validate` / `links` / `continuity` —— 三件套

```shell
story validate .    # 检查布局 / frontmatter / 注册表 / schema-version
story links .       # 检查双向引用
story continuity .  # 检查连续性
```

**退出码**：有 errors → `1`；纯 warnings → `0`；完全干净 → `0`。

**典型 errors**：
- `Missing required path: ...` —— 必需文件不存在
- `... is missing frontmatter field ...` —— 缺必填字段
- `... references missing chapter <id>` —— 引用了不存在的章节
- `... lists <char>, who died in <ch>; move posthumous appearances to mentions` —— 死角色错误出场

**典型 warnings**：
- `... POV character <id> is not listed in characters` —— POV 不在 `characters` 字段
- `... current-chapter N is behind the latest chapter M` —— 状态过期
- `... was planted N chapters ago, and has no payoff yet` —— 长线伏笔提醒

---

## 7. `wordcount` —— 字数统计

```shell
story wordcount .              # 只统计
story wordcount . --write      # 写回各章 frontmatter 的 `word-count`
```

**字数规则**：
- 拉丁词按空格切分；CJK 每个汉字 / 假名 / 韩字各算 1。
- 代码块、内联代码、链接、Markdown 标记不计入。
- 输出每章 `file: count` 一行 + `Total: N`。

---

## 8. `reindex` —— 重建注册表

```shell
story reindex .    # 重建所有 _index.md
```

**何时跑**：
- 新增 / 删除 / 重命名任何实体后
- 大批量 frontmatter 修改后
- 注册表与实际文件不同步时

**不做**：
- 不会修改任何业务字段
- 重建所有 `_index.md` 注册表（characters / worldbuilding / plot / chapters / scenes / continuity/questions / continuity/promises / glossary 共 8 个），不碰 `plot/timeline.md` 与 `continuity/state.md`
- 写入是**原子**的（temp + rename），中途崩溃不会留半截文件

---

## 9. `report` / `next` / `doctor` —— 决策辅助

```shell
story report .               # 完整清单（标题 / 类型 / 状态 / 字数 / checks）
story report . --actionable  # 在 report 末尾追加"next actions"
story next .                 # 列出按优先级排序的下一步动作
story doctor .               # 列出过期 / 不一致 / 损坏的内容
```

**`next` 推荐顺序**（典型）：
1. 还没起的项目 → `init`
2. 缺核心实体 → `add character/location/...`
3. 写章节前 → `next` 看推荐章节；写完后 → `wordcount --write` + `reindex` + `links` + `validate` + `continuity`
4. 修订 → `doctor` + `continuity`

---

## 10. `migrate` —— 旧 schema 升级

```shell
story migrate .
```

会创建 v2 必备目录（`scenes/`、`continuity/{questions,promises}/`、`glossary/terms/`）、补齐缺失的 `_index.md` 与 `continuity/state.md`，并把 `story.md` 的 `schema-version` 升级到 `2`。**不修改**任何业务内容。

---

## 11. `export` / `build` —— 输出

```shell
story export . --out manuscript.md               # 输出单一 markdown
story build . --format markdown --out book.md   # 同 export
story build . --format epub                     # 输出 EPUB 到 dist/<id>.epub
story build . --format docx                     # 输出 DOCX 到 dist/<id>.docx
```

`dist/` 是**可丢弃**的构建产物，markdown 项目本身是数据源。

---

## 12. 常见错误及含义

| 报错 | 含义 | 修法 |
| --- | --- | --- |
| `Refusing path traversal: ...` | `--path` / `--dir` 解析到 cwd 之外 | 用 cwd 之内的相对或绝对路径 |
| `Refusing to follow symbolic link: ...` | 项目里有符号链接 | 删除链接，或把它替换成真实文件 |
| `Missing required path: ...` | 必需文件不存在 | 跑 `story migrate .` 或重新 `init` |
| `<file> is missing YAML frontmatter` | 实体文件缺 frontmatter | 加 `---` 开头的 frontmatter |
| `<file> already exists` | `add` 时撞到已有实体 | 改名后重试，或用 `rename` |
| `<file> filename id must be kebab-case` | 文件名不符合 | 重命名为 kebab-case |
| `<file> frontmatter field <x> has unsupported value <v>` | 字段值不在枚举里 | 改成枚举里的允许值（见 `docs/yaml-fields-zh.md`） |

---

## 13. 安全 / 路径约束

- `scanProject` 会**拒绝项目里的符号链接**（防止读 /etc/passwd 之类）
- `assertSafeProjectPath` 在所有 CLI 路径入口检查，**拒绝 `..` 逃逸**
- reindex 写入是**原子**的（temp + rename），崩溃不会留半截 `_index.md`

详细实现见 `src/security.js`。
