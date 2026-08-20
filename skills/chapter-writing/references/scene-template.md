# 场景模板（Scene Template）

机读化的场景文件路径约定：`scenes/chapter-{NN}-scene-{MM}.md`。一个场景对应章节里一次 POV、一次地点、一段连续时间的连续叙事——也就是章节内被 `---` 分隔的最小散文块。

> 章节文件是给读者读的散文，场景文件是给脚本读的状态契约。两者互为镜像，但不要互相复制正文。

## frontmatter 字段表

| 字段 | 必填 | 类型 / 允许值 | 说明 |
| --- | --- | --- | --- |
| `title` | 否 | 字符串 | 场景的小标题，方便索引；可省略 |
| `chapter` | 是 | `chapter-{NN}` | 所属章节 id，与文件名、章节 frontmatter 对齐 |
| `scene` | 是 | 整数（章节内递增） | 场景序号，从 `1` 起，跳号要补 `0` 占位 |
| `pov` | 是 | kebab-case 角色 id | 视角人物；必须与所属章节的 `pov` 一致 |
| `location` | 是 | kebab-case 地点 id | 主要发生地点；若跨多个地点，挑**核心地点**填入，其它地点在正文说明 |
| `characters` | 是 | kebab-case 角色 id 列表 | 本场景**在场**的角色，剔除 `chapter.mentions` |
| `arcs-advanced` | 否 | arc kebab id 列表 | 本场景推进的弧线节拍，比章节粒度更细 |
| `status` | 是 | `outline` \| `draft` \| `revised` \| `final` \| `complete` | 场景级状态。`complete` 表示场景状态已写入 `continuity/state.md`，可关闭 |
| `state-changes` | 是 | 对象数组 | 本场景造成的状态变更（详见下表） |

### `state-changes[]` 子字段

| 字段 | 必填 | 类型 | 说明 |
| --- | --- | --- | --- |
| `target` | 是 | kebab-case | 受影响实体的 id——角色、道具、地点都可 |
| `change` | 是 | 字符串 | 状态变化的简述；要可机读、可校验、可被后续章节引用 |

## YAML 示例

```yaml
---
title: "北口令牌"
chapter: chapter-07
scene: 1
pov: lin-ruo
location: bei-kou-ya-zhan
characters:
  - lin-ruo
  - shen-laotou
arcs-advanced:
  - jue-xin-zhi-lu
status: complete
state-changes:
  - target: lin-ruo
    change: "获得北口令牌；左肩被马刀划伤（轻伤）"
  - target: bei-kou-ling-pai
    change: "所有者由沈老头变为林若；位置转移至林若身上"
  - target: shen-laotou
    change: "对林若态度从戒备转为有限信任；失去一枚令牌"
---
```

## 文件结构

```markdown
## 目的（Purpose）

{这一场戏**改变了什么**——人物关系、读者认知、世界状态、节奏张力。一两句话即可。}

## 连续性备注（Continuity Notes）

按下面五类分点记录，方便后续章节接住：

- **角色状态**：受伤、情绪、临时获得/失去的物品、知识更新
- **物品状态**：位置转移、外观变化、激活/失效
- **信息状态**：谁现在知道了什么、谁仍然不知道
- **时间与地点**：明确钟点、天气、季节、出场顺序，避免后续章节"上一秒在室内，下一秒在野外"
- **未兑现承诺**：本场戏埋下的伏笔、抛出的疑问，需要登记到 `continuity/promises/` 或 `continuity/questions/`
```

## 使用说明

- **章节、场景双写**：每个 `chapter-{NN}.md` 都应有对应的若干 `chapter-{NN}-scene-{MM}.md`。章节负责散文交付，场景负责状态契约。
- **场景序号**：在章节内从 `1` 递增；重排章节时同步调整场景文件名前缀。脚本（`story validate .`）会校验场景序号连续。
- **状态变更的可校验性**：`state-changes[].change` 写"谁做了什么、获得了什么、失去了什么"，避免"心情复杂"这种不可机读的描述。
- **status 流转**：`outline` → `draft`（动笔）→ `revised`（自校）→ `final`（确认）→ `complete`（已写入 `continuity/state.md` 且已被下一章引用/确认）。
