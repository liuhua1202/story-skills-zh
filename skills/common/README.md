# skills/common

共享约定 —— 7 个 SKILL.md 都引用的根规则。

## 文件清单

| 文件 | 内容 | 被引用方 |
| --- | --- | --- |
| `cli-priority.md` | Story CLI 三种调用方式的优先级 + 选择原则 + 失败处理 | 6 个领域 skill（除 story-maintenance 自身） |
| `continuity-audit-checklist.md` | 写作前自检 5 项 + 连续性审计 10 项 + CLI 自动覆盖项 | `chapter-writing`（pre-flight）+ `revision-continuity`（主体） |
| `cross-reference-rules.md` | 9 类跨实体引用规则 + tag 复用约束 | `character-management` / `worldbuilding` / `plot-structure` 的"跨实体引用"节 |
| `id-naming.md` | kebab-case / CJK 音译 / CJK fallback / id 改名约束 / 文件路径约定 | 所有引用 `kebab-case` 的 skill |
| `mermaid-output.md` | 当用户触发"画"类词时输出 Mermaid 图的约定（落地位置 + 触发词清单） | `character-management` 当前用了，其它 skill 渐进接入 |
| `project-conventions.md` | 文件命名 / schema / `_index.md` / `mentions vs characters` / 权限 sketch 等跨 skill 根约定 | 所有 7 个 skill |
| `README.md` | 本文件 |  |

## 修改纪律

**本目录任一文件的修改等同于修改所有引用方。** 走与 `package.json` 版本同步的提交流程：

1. 改 `package.json` version
2. 同步改 `.codex-plugin/plugin.json` 与 `.claude-plugin/plugin.json` 的 version
3. 改本目录相关文件
4. 跑 `bun run check:skills` 确认三方版本对齐 + frontmatter 完整

## 引用方式

在 SKILL.md 中替代过去的内联重复段落：

```markdown
> CLI 调用优先级见 `../common/cli-priority.md`
> 跨实体引用见 `../common/cross-reference-rules.md`
> id 命名见 `../common/id-naming.md`
> 连续性审计清单见 `../common/continuity-audit-checklist.md`
> 跨 skill 通用约定见 `../common/project-conventions.md`
> Mermaid 输出约定见 `../common/mermaid-output.md`
```