# Sample Outputs（命令输出示例）

> 第一次跑某个命令前，先看本文件里的样本对照——知道输出长什么样就能判断是否异常。

---

## `story validate .`

成功：

```
Project is valid: 0 errors, 0 warnings
```

失败（节选）：

```
error: characters/lin-ruo.md is missing frontmatter field status
error: chapters/chapter-7.md references missing location bei-kou-missing
warning: characters/_index.md has stale registry entry, run story reindex .
```

按报错前缀定位：

| 前缀 | 含义 |
| --- | --- |
| `error:` | 必须修才能继续 |
| `warning:` | 不阻塞但应该处理 |
| `Project is valid:` | 没有 error / warning |

## `story reindex .`

典型输出（成功的项目）：

```
Reindexed 5 character registries
Reindexed 4 worldbuilding registries
Reindexed 2 plot registries
Reindexed 1 chapter registry
Reindexed 1 scene registry
Reindexed 1 continuity registry
Reindexed 1 glossary registry
```

如果其中一个返回 0：说明该领域目录是空的（或缺文件）。清单见 `../project-conventions.md` 的"标识与命名"节。

## `story wordcount . --write`

```
chapter-01.md: 4820 字
chapter-02.md: 5200 字
chapter-03.md: 4310 字
合计：14330 字
```

数字单位是"中文字符"（CJK-aware tokenize）。

## `story links .`

成功：

```
Links are valid (12 characters × 4 locations × 2 factions).
```

失败：

```
error: characters/lin-ruo.md relationship to chen-da is missing backlink
error: worldbuilding/locations/bei-kou-ya-zhan.md location missing this character in notable-characters list
```

## `story continuity .`

成功：

```
Continuity is consistent. 3 promises open, 1 paid off, 2 questions pending.
```

失败（节选）：

```
error: characters/chen-da.md status deceased but appears in chapters/chapter-12.md characters list
error: continuity/promises/find-ling-pai.md payoff is later than arc resolution chapter
warning: continuity/questions/what-happened-to-shen.md has not been referenced in 5 chapters
```

## `story report .`

```
Project: 雨夜之谜 (yu-ye-zhi-mi)
Schema: v2
Status: drafting (current-chapter: 7)

Chapters: 7 written, 5 outline, 0 revised, 0 final
Characters: 12 (8 alive, 4 deceased)
Locations: 5, Systems: 2, Factions: 3, Artifacts: 4
Arcs: 2 main + 3 subplot
Promises: 5 open, 2 paid-off
Questions: 3 open

Health:
  ✓ continuity
  ✓ links
  ✓ reindex
  ⚠ 1 chapter has no scene file (chapter-04)
  ⚠ 2 characters missing alive-character entry in continuity/state.md
```

`story report . --actionable` 在每个 `⚠` / `✗` 项下列具体修复命令。

## `story next .`

```
Next recommended action:
  story wordcount chapters/chapter-08.md  → 估算字数（起草前）
  → 起草 chapter-08 (大纲优先用 chapter-writing skill)
  → 起草完跑 story wordcount . --write && story reindex .
```

## `story doctor .`

```
Doctor report:
  ⚠ chapter-04 has no scene files (expected scenes/chapter-04-scene-1.md)
  ✗ characters/old-name.md has 0 incoming references (candidate for archive)
  ⚠ continuity/promises/old-promise.md status not updated since chapter-05
  Actions:
    story add scene chapter-04  →  create missing scene
    story remove character old-name  →  remove orphan
    story migrate continuity/promises/old-promise.md  →  sync status
```

---

# 错误速查（mini 版）

完整版见 `OPERATIONS.md §7`。这里只列最常见的 8 条。

| 症状 | 大概率原因 | 怎么处理 |
| --- | --- | --- |
| `story` 命令找不到 | `bin/story.js` 没装到 PATH | 重开 shell；或装 Bun / 用 `npx story` / 直接调 `node bin/story.js` |
| `Missing required path: story.md` | 在项目根外跑了 `story validate` | 显式给路径：`story validate ./my-project` |
| `Refusing path traversal: ...` | 用了 `--path` 或 `--dir` 指向 cwd 外面 | 检查参数，相对路径起 |
| `Refusing to follow symbolic link` | 项目里有符号链接 | `security.js` 故意拒的；清理掉，或 `assertNoSymlinks(root, { skip: [...] })` |
| `frontmatter field status has unsupported value X` | 用了 schema v2 不接受的状态字面量 | 翻 `docs/yaml-fields-zh.md` 看枚举允许值 |
| `assertSafeProjectPath is not a function` | 旧 fixture 用了 alias 名 | `src/security.js` 已加向后兼容，重 build 即可 |
| `ReferenceError: lang is not defined` | 上游 v0.3.1 漏洞 | 本仓库已修（`lang` → `currentLang()`）。如果你 fork 自上游，要同步补丁 |
| `Unknown entity kind: ghost` | `story add ghost ...` | `add` 只接受：character / location / faction / artifact / system / arc / promise / question / scene |