# MVP 骨架自检清单（CLI 跑完 `story init` 后用）

> `story init` 跑完后，用本清单检查产物是否完整、字段是否需要回填。本清单分两段：**必检**（任何项目都得过）和 **回填**（用户后续补料时用）。

---

## 必检（CLI 跑完立刻做）

- [ ] `story.md` 存在，frontmatter 里有 `schema-version: 2`
- [ ] `story.md` 的 `status` 是 `planning`（不是 `drafting`，除非用户已经写第一章）
- [ ] 5 个领域目录都各有 `_index.md`：`characters/`、`worldbuilding/`、`plot/`、`sccenes/`、`chapters/`
- [ ] `chapters/_index.md` 末尾有 `## Total Word Count: 0`
- [ ] `continuity/state.md` 存在，`current-chapter: 0`，三个状态列表（`character-state`、`object-state`、`knowledge-state`）即使空也都有
- [ ] `scenes/_index.md` frontmatter 写 `type: scene-registry`
- [ ] `plot/_index.md` frontmatter 有 `structure: three-act`（默认兜底；用户改其它结构就改这个字段）

跑一次：

```shell
story validate .
```

任何报错，按 `diagnostics` 中的 `code`（`diagXxx`）对照 `src/diagnostics.js` 的双语文本去定位修复。

---

## 回填（用户慢慢补料时用）

每次 `story init` 跑完，**用户可能没给的字段**和**对应的回填位置**：

| 用户没及时答的 | 写到哪 | 默认占位 |
| --- | --- | --- |
| 一句话简介 | `story.md` 的 `## Synopsis` 节 | "TBD — 待用户补" |
| 腔调与声音 | `story.md` 的 `## Tone & Style` 节 | 一句话从 genre / themes 推导 |
| 主题第 3、4 个 | `story.md` frontmatter `themes:` 数组 | `["tbd-1", "tbd-2"]`（占位，建议尽快改） |
| 子类型（sub-genre） | `story.md` frontmatter `sub-genre:` | 留空（optional） |
| 时代背景 setting-era | `story.md` frontmatter `setting-era:` | 留空（optional） |
| World Overview 描述 | `worldbuilding/_index.md` 的 `## World Overview` 节 | "待补" |

## 路径回查

CLI 跑完之后，**确认目录名称匹配标题的 kebab-case**：

```
{story-title-kebab}/
```

如果 CLI 用了某种 CJK fallback hash（如 `cjk-45f1a965`），见 `../common/id-naming.md` 的"临时绕过"——把 `story: your-kebab-id` 直接写到 `story.md` 的 frontmatter 里。