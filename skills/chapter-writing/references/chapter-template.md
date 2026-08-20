# 章节模板（Chapter Template）

新建章节文件时使用此模板，路径约定：`chapters/chapter-{NN}.md`（`NN` 为两位数字，如 `01`、`02`）。章节是面向读者交付的散文单元；机读化的连续性细节请交给 `scenes/*.md`。

## frontmatter 字段表

| 字段 | 必填 | 类型 / 允许值 | 说明 |
| --- | --- | --- | --- |
| `title` | 是 | 字符串 | 章节标题。允许中文、标点、副标题；不需要与剧情描述重复 |
| `number` | 是 | 整数 | 章节序号，与文件名 `{NN}` 对齐，方便脚本索引 |
| `pov` | 是 | kebab-case 角色 id | 视角人物；与 `characters/_index.md` 对齐 |
| `locations` | 是 | kebab-case 地点 id 列表 | 本章**实际出现**的地点（不只是提到） |
| `characters` | 是 | kebab-case 角色 id 列表 | 本章**在场**或直接互动的角色 |
| `mentions` | 否 | kebab-case 角色 id 列表 | 仅被提及、回忆、录音、闪回中的角色——含已故角色。脚本据此区分"在场"与"被提及"，避免把已故角色的闪回误判为死后复活 |
| `arcs-advanced` | 否 | arc kebab id 列表 | 本章推动的弧线。空数组表示本章是过渡章或独立插曲 |
| `status` | 是 | `outline` \| `draft` \| `revised` \| `final` | 写作状态。`outline` 阶段不应进入正文创作 |
| `word-count` | 否 | 整数 | 字数（中文字符数）。建议每次 `story wordcount . --write` 后回填 |

## YAML 示例

```yaml
---
title: "夜渡北口"
number: 7
pov: lin-ruo
locations:
  - bei-kou-ya-zhan
  - yan-wang-zhai
characters:
  - lin-ruo
  - shen-laotou
mentions:
  - lin-ruo-de-mu-qin
arcs-advanced:
  - jue-xin-zhi-lu
  - yan-huo-xun-zong
status: draft
word-count: 4820
---
```

> `mentions` 与 `characters` 必须分开。判断口径：本章正文里这个角色是否出现并能产生互动（说话、被看见、被注视）。只被回忆、被谈论、闪回里出现、被人念到名字——一律走 `mentions`。

## 文件结构

正文建议沿用以下顺序，每个段落标题都用 `##` 二级标题。`outline` 段落保留在大纲-定稿迭代中，便于回溯"为什么这样写"。

```markdown
## 摘要（一句话）

{一句话讲清本章的因果输入与输出。例如：林若将北口令牌交给沈老头，换取了一条出城的暗道情报。}

## 大纲

*写正文之前定稿的分拍清单：*

1. {第一拍——发生了什么、推进了什么}
2. {第二拍}
3. {第三拍}
…

**本章推进的弧线节拍：**{对应 `arcs-advanced` 的具体节拍}
**本章埋下的伏笔：**{新布置的 setup，附对应 promise 文件 kebab}
**本章兑现的伏笔：**{本章兑现的旧 setup，附对应 promise 文件 kebab}

---

## 正文

{完整散文，从这里开始写。每场戏用 `---` 分隔。}
```

## 使用说明

- **章节 vs 场景**：一个章节里可以包含多场戏（用 `---` 分隔）。机读化的连续性元数据放在 `scenes/chapter-{NN}-scene-{NN}.md`，**不要**把每场戏的 `state-changes` 堆进章节 frontmatter。
- **POV 一致**：整个章节共用一个 `pov`。需要切视角时另开章节，或在 `## 正文` 内部用 `---` 分场并保持单场内 POV 不变。
- **状态推进**：人物受伤、获得物品、关系破裂等"会跨章影响后续"的副作用，写进对应场景的 `state-changes`，并在 `continuity/state.md` 里同步；不要只藏在正文里。
- **状态流转**：`outline` → `draft`（大纲确认后动笔）→ `revised`（自校一轮）→ `final`（终稿）。状态变更前后都建议跑一遍 `story validate .` 与 `story continuity .`。
