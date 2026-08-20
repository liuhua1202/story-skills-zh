# Skill Worked Examples

> 4 个工作流的真实示例。每个示例记录"用户说了什么 → agent 做了什么 → 落了什么档"。基于 `examples/yu-ye-zhi-mi/` 与 `examples/the-unraveled-thread/` 的真实场景改写。

---

## 示例 1：story-init 路径 A (CLI 模式)

**用户原话**："我想开一个新的奇幻悬疑，主角是个女侠客，叫《雨夜拾灯》。背景是虚构的北口镇，明代江湖。"

**agent 流程**：

1. 触发 `story-init` skill（识别 "开新故事"）
2. 走路径 A（CLI 模式）
3. 调 `story init "雨夜拾灯" --genre "奇幻悬疑" --sub-genre "武侠" --setting-era "明代江湖" --pov "third-person-limited" --tense "past" --synopsis "北口拾灯女林若，在父亲离奇死亡后接手令牌，卷入官府与江湖的角力。" --theme "复仇与放下"`
4. CLI 跑完，弹 5 行状态：
   ```
   Created story project: yu-ye-shi-deng
   Created story.md
   Created characters/_index.md
   Created worldbuilding/_index.md
   ...
   ```
5. agent 读 `references/mvp-skeleton.md` 检查 5 个必检项
6. 回到 `story.md` 补 `## Tone & Style` 节（user 没给，由 genre + themes 推："清冷克制，留白多于直叙，节奏慢张"）
7. 给下一步建议："添加第一个角色" / "开始搭建世界观" / "跑 `story next .`"

**落档**：`yu-ye-shi-deng/` 整个项目骨架（11 个 `_index.md` + `story.md`）。

---

## 示例 2：character-management 深度模式 (林若)

**用户原话**："加上主角林若。24 岁的拾灯女，背上斜挎北口令牌，短发，寡言但内里有火。父亲在她 18 岁那年夜里不明死去，她从此守灵在那间老宅。"

**agent 流程**（走深度模式，因为是 protagonist）：

1. 触发 `character-management` skill
2. 读 `story.md` 拿类型（奇幻悬疑）、主题（复仇与放下）、腔调
3. 读 `characters/_index.md` —— 空，确认无重名
4. 走深度访谈，但用户已经给了强线索（年龄 / 物理特征 / 职业 / 关键事件）。追问最少必要 3 项：
   - "她的说话方式？一两句示例台词？" → 用户给："短句居多。开口前会掂量。比如：'令牌在，命就在。' / '我爹是死，不是丢。'"
   - "外在想要 vs 内在需要？" → "外要北口令牌不落歹人手；内要把父亲的死放下——但目前还做不到。"
   - "她的人物弧终点？" → "从'复仇驱动'到'放下并传灯'，弧的中点是第 12 章与陈大对峙。"
5. 落档：`characters/lin-ruo.md`，frontmatter 含：

```yaml
name: "林若"
role: protagonist
age: 24
status: alive
aliases:
  - "拾灯人"
  - "北口孤女"
arc: jue-xin-zhi-lu
locations:
  - bei-kou-ya-zhan
  - lin-ruo-de-lao-zhai
tags:
  - magic-user
  - li-family
relationships:
  - character: chen-da
    type: antagonist
    note: "杀父之仇，但动机不只是私仇"
  - character: shen-laotou
    type: mentor
```

6. 更新 `characters/_index.md` 的 Registry + Relationship Map 节
7. **反向链接**：shen-laotou 还没创建，先放 TODO；chen-da 也未创建。但 `arc: jue-xin-zhi-lu` 这个 id 引用了未存在的弧 —— 标红提醒用户
8. CLI：`story reindex . && story links . && story validate .`

**失败检测**：步骤 7 里 `arc: jue-xin-zhi-lu` 在 `plot/arcs/` 不存在，`story links .` 报：

```
error: characters/lin-ruo.md references missing arc jue-xin-zhi-lu
```

agent 据此提示用户："要先去 `plot-structure` 创建这条弧，回来我再补双向引用。"

---

## 示例 3：chapter-writing 大纲落盘 + 起草

**用户原话**："开始写第一章。林若在老宅守灵的第七天夜里，来访者敲门。"

**agent 流程**：

1. 触发 `chapter-writing` skill
2. **L1 必读**：`story.md` / `chapters/_index.md`（空）/ `continuity/state.md`（空）
3. **L2 条件读**：第一章不用读上一章；`plot/_index.md` 还没设，跳过；`continuity/state.md` 是空但有 `current-chapter: 0`，OK
4. **L3 按需读**：`characters/lin-ruo.md`（只取"声音与口癖"+"人物弧"），无地点档案，跳过
5. **写作前自检 5 项**：5/5 通过（第一章，没历史上下文）
6. 拍 3 拍：

   - 拍 1：林若 / 老宅内 / 检查门口的来访者：身份不明
   - 拍 2：林若 / 门口 / 见到沈老头（mentor），交令牌
   - 拍 3：林若 / 老宅内 / 决定北上追查

7. **大纲落盘** 到 `chapters/chapter-01-outline.md`（`status: outline`）
8. 用户审批："拍 2 OK。但沈老头不该这么早出手，改成他只是来探她状态。"
9. 改大纲 → 用户审批通过
10. 写正文到 `chapters/chapter-01.md`（`status: draft`）
11. 同时创建 `scenes/chapter-01-scene-1.md`（拍 1）+ `scenes/chapter-01-scene-2.md`（拍 2）+ `scenes/chapter-01-scene-3.md`（拍 3），frontmatter 标 `status: complete` + `state-changes` 写明令牌归属变化
12. 落档后跑：

```shell
story wordcount . --write
story reindex .
story links .
story validate .
story next .
```

13. 总结改动给用户："第 1 章 ~4800 字。落档 4 个文件（章 + 大纲 + 3 场景）。维护全过。下一拍建议：第 2 章林若收拾行囊北上。"

**关键决策**：

- 大纲落盘（不是直接写正文）让用户改了 1 次没浪费
- 3 个场景文件先并行创建，避免落档后再补
- `state-changes` 里**写明令牌归属变化**："bei-kou-ling-pai: owner 由 nobody → lin-ruo" —— 这是 `continuity/state.md` 第 2 章要回放的起点

---

## 示例 4：revision-continuity 审计模式

**用户原话**："我想知道目前项目里有没有连续性错误。先别改，给我列表。"

**agent 流程**：

1. 触发 `revision-continuity` skill
2. 选 `连续性审计` 类型（用户明确说"找矛盾 / 审计"）
3. 写计划：

```markdown
## 修订计划

- 改什么：跑 story continuity . 收集错误，列严重度。
- 必须保留：用户明示"故意保留"的数据（暂无）。
- 顺带改的文件：暂不预测，跑结果后再决定。
- 完工验证：story continuity . && story validate . && story links .
```

4. 跑 `story continuity .`：返回

```
error: characters/chen-da.md status deceased but referenced in chapters/chapter-12.md characters list (not mentions)
warning: continuity/promises/ling-pai-payoff.md status planted for 7 chapters, plan payoff window approaching
warning: continuity/questions/shen-laotou-reason.md last referenced in chapter-04
```

5. 按 4 类分类汇报：

| 严重度 | 项 | 文件 | 建议改法 |
| --- | --- | --- | --- |
| **critical** | chen-da 死后还在 chapter-12 出现 | `chapters/chapter-12.md` | 把 chen-da 从 `characters` 列表移到 `mentions` |
| **major** | ling-pai payoff 推后过久 | `continuity/promises/ling-pai-payoff.md` | 评估 chapter-08 是合适的 payoff 窗口，更新文件 + 改 arc 情节点 |
| **minor** | shen-laotou 7 章未提 | `continuity/questions/shen-laotou-reason.md` | 在 chapter-09 加一条 mentions 或主动 close question |

6. 报告："**3 项发现**（1 critical / 1 major / 1 minor）。**未做任何修改**——按你要求审计优先。要我接着动手吗？"

---

# 这些示例怎么用

- 用户第一次跑某个 skill 不熟，看本文件第一段。
- Agent 跑 skill 时不记得具体步骤，翻本文件模仿。
- 新增 worked examples：直接 PR append；`scripts/check-skill-consistency.mjs` 不会扫本文件所以很安全。