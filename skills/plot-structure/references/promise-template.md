# 承诺（伏笔 / Setup-Payoff）模板

新建伏笔/承诺条目时使用此模板，路径约定：`continuity/promises/{promise-kebab}.md`。

"承诺"是给读者的隐性契约：你在某章做了一次暗示、埋伏笔、抛线索，读者就会期待你在后续章节兑现。一次只跟踪一个承诺；多条独立线索请拆成多个文件。

> 与弧线"伏笔追踪表"的区别：弧线表追踪的是**该弧线内部**的 setup/payoff；本文件追踪的是**跨弧线、跨章节、跨人物**的承诺——比如一枚在第一卷出现的钥匙要在第三卷开门。

## frontmatter 字段表

| 字段 | 必填 | 类型 / 允许值 | 说明 |
| --- | --- | --- | --- |
| `title` | 是 | 字符串 | 一句话讲清这个承诺是什么 |
| `status` | 是 | `planned` \| `planted` \| `paid-off` \| `dropped` | 整体状态 |
| `planted` | 否 | `chapter-{NN}` | 埋伏笔的章节 id；`planned` 阶段可空 |
| `payoff` | 否 | `chapter-{NN}` | 兑现的章节 id；`planted` 阶段必须为空 |
| `arcs` | 否 | arc kebab id 列表 | 涉及到的弧线 |
| `characters` | 否 | kebab-case 角色 id 列表 | 涉及到的角色 |

## 状态流转

| 状态 | 含义 | 必须满足 |
| --- | --- | --- |
| `planned` | 已决定要做，但还没写到正文 | `title` + `arcs` |
| `planted` | 已经埋伏笔 | `planted` 字段已填，`payoff` 仍为空 |
| `paid-off` | 已兑现 | `planted` 与 `payoff` 都已填 |
| `dropped` | 主动放弃兑现 | `note` 段说明放弃原因，避免日后读者疑问 |

`story validate .` 会校验：

- `planted` 章节是否真实存在
- `payoff` 章节是否在 `planted` 之后（避免"兑现早于埋设"）
- `paid-off` 时 `payoff` 字段是否已填

## YAML 示例

```yaml
---
title: "北口令牌背面的'南渡'二字"
status: planted
planted: chapter-07
payoff: chapter-15
arcs:
  - jue-xin-zhi-lu
  - yan-huo-xun-zong
characters:
  - lin-ruo
  - shen-laotou
---
```

```yaml
---
title: "林若父亲留给她的半块玉佩"
status: planned
arcs:
  - jue-xin-zhi-lu
characters:
  - lin-ruo
---
```

## 文件结构

```markdown
## 承诺内容（Setup）

这个承诺**对读者来说意味着什么**——读者会期待看到什么。避免写成"主角要怎么怎么做"；写的是"读者被引导相信什么"。

## 兑现方式（Payoff）

兑现这个承诺应该**长什么样**——读者看到这里会感到"原来如此"。可以是揭示、对称、回归、反讽、变形等。

## 追踪备注（Tracking Notes）

- 当前是否已经埋伏笔？
- 是否已经在某条弧线的"伏笔追踪表"里登记？（建议双登记）
- 是否会因为章节顺序调整而被提前兑现？
- 兑现章节是否需要为它专门新建一个情节点？
```

## 使用说明

- **不要把弧线内部的伏笔单独建档**——弧线内部伏笔写进 `plot/arcs/<arc>.md` 的伏笔表即可，跨弧线的长程伏笔才进 `continuity/promises/`。
- **状态变更前后跑校验**：`planted → paid-off` 时同步把弧线表里的对应行更新；`story continuity .` 会输出"已经埋设但未兑现"的承诺清单。
- **`dropped` 要留痕**：放弃兑现的承诺也要写明放弃原因，方便后续修订时回溯决定。
- **兑现章节不要写"以后再揭晓"**：当 `status: paid-off` 时，`payoff` 必须指向一个具体章节，不要留作承诺给续集。
