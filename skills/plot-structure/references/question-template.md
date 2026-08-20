# 悬念 / 连续性问题模板

新建悬念条目时使用此模板，路径约定：`continuity/questions/{question-kebab}.md`。

"问题"是**故事里**需要回答的谜团或必须守护的连续性细节——读者视角的伏笔用 `promises/`，**角色或剧情内部**需要追踪的悬疑、矛盾、隐藏真相用 `questions/`。一个文件只跟踪一个问题。

> 与 `promises/` 的区别：
> - `promises/`：你向读者许诺过"我会解释这件事"
> - `questions/`：角色或剧情**内部**留有一个尚未解开的事实，不一定告诉读者

例如：
- 谁烧了米家账本？→ `question`（剧情内部谜团，读者并不知道有这个问题）
- 林若父亲留下的玉佩最终会交给谁？→ 同时是 `promise`（读者知情）+ `question`（剧情追踪）

## frontmatter 字段表

| 字段 | 必填 | 类型 / 允许值 | 说明 |
| --- | --- | --- | --- |
| `title` | 是 | 字符串 | 一句话讲清这个问题是什么 |
| `status` | 是 | `open` \| `answered` \| `resolved` \| `dropped` | 状态 |
| `introduced` | 否 | `chapter-{NN}` | 问题**第一次出现**的章节 |
| `resolved` | 否 | `chapter-{NN}` | 问题**被解决**的章节 |
| `characters` | 否 | kebab-case 角色 id 列表 | 与问题相关的角色 |

## 状态流转

| 状态 | 含义 | 必须满足 |
| --- | --- | --- |
| `open` | 已抛出但未解 | 至少有 `title` + 某条线索/角色 |
| `answered` | 答案已知（某角色已经知道），但**读者尚未知晓** | `characters` 中标记知情者 |
| `resolved` | 读者与角色都已知道答案，问题关闭 | `resolved` 字段已填 |
| `dropped` | 主动放弃追踪 | 在文件正文里说明放弃原因 |

`story continuity .` 会输出：

- 当前所有 `open` 与 `answered` 的问题清单（用于检查遗忘）
- `resolved` 但 `resolved` 章节未填的警报
- 章节 `characters` 列表里出现的知情者与 `answered` 状态是否一致

## YAML 示例

```yaml
---
title: "谁烧了米家账本"
status: open
introduced: chapter-02
characters:
  - mi-laotaiye
  - chen-da
  - xiao-shen
---
```

```yaml
---
title: "沈老头为何在北口隐居"
status: answered
introduced: chapter-05
characters:
  - shen-laotou
  - lin-ruo
---
# 备注：沈老头在 chapter-12 告诉林若真相；尚未对读者公开
```

## 文件结构

```markdown
## 问题（Question）

需要被回答的谜团或必须被维护的连续性事实。一两句话讲清楚。

## 已知线索（Evidence）

到目前为止已经知道的证据、约束、相互矛盾的说法。每条线索都要可被脚本或读者复核——日期、地点、目击者、物品、对话。

## 解答计划（Resolution Plan）

- **何时揭晓**（是否需要特定章节、特定场景触发？）
- **如何揭晓**（角色对话 / 文件被翻出 / 旁观者目击 / 反派坦白）
- **对其它情节的影响**（这个答案会让哪些承诺/伏笔产生变化？会改变哪些角色的动机？）
```

## 使用说明

- **一个问题一个文件**。哪怕是同一个谜团的多条支线，也建议拆开——除非它们**只能一起解**。
- **`open` 与 `answered` 的区别**：问题在被角色得知真相前后切换。如果答案要靠章节末的反转才让读者也看到，仍然可以是 `answered`——关键看剧情内部谁先知道。
- **`dropped` 要留下原因**：放弃追踪的问题也要写明放弃原因，便于后续修订时回溯。
- **章节的 `mentions` vs `characters`**：当某角色**仅因为这个问题**而被提及（如被怀疑、被追查），不要把他/她放进章节 `characters`，放进 `mentions`。
- **不要把问题藏在正文里**：每个 `open` / `answered` 问题都应有独立文件，否则 `story continuity .` 无法检测"忘记解答"。
