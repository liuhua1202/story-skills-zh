# 修订计划模板（Revision Plan Template）

> 修订前先写一份简短计划，避免改到一半发现不可逆。

```markdown
## 修订计划

- 改什么：
  {改哪一章 / 哪几段 / 哪几个档案。具体到 frontmatter 字段或段落范围。}

- 为了连续性必须保留什么：
  - {已兑现的伏笔（具体 promise-id）}
  - {不可改的角色状态（角色 id + 状态）}
  - {已映射的时间线章节（chapter-id + 事件）}
  - {已登记的 scene state-changes（scene-id + change 文本）}

- 顺带动哪些文件：
  - {反向引用文件 1}
  - {反向引用文件 2}
  - {新设的 promise / question 文件}

- 完工验证命令：
  ```shell
  story continuity . && story doctor . && story validate .
  ```

## 改动日志（写完后填）

| # | 文件 | 改了什么 | 影响范围 |
| --- | --- | --- | --- |
| 1 | chapters/chapter-NN.md | {一句话} | {影响谁} |
| 2 | characters/{id}.md | {一句话} | {影响谁} |
| ... |  |  |  |
```

## 三类典型计划示例

### 示例 1：连续性审计型（用户问"找矛盾"）

```markdown
## 修订计划

- 改什么：
  跑 story continuity . 收集错误，按 critical / major / minor 列。

- 为了连续性必须保留什么：
  用户已确认保留的"故意保留的数据"（如闪回 / 死者录音）。

- 顺带动哪些文件：
  - continuity/state.md（如有 entity 当前状态错位）
  - 错的角色档案（died-in 缺失、status 漂移）
  - 错的章节 frontmatter（mentions / characters 错放）

- 完工验证命令：
  story continuity . && story validate . && story links .
```

### 示例 2：发展性修订型（用户说"打磨草稿"）

```markdown
## 修订计划

- 改什么：
  chapters/chapter-12.md 中段"沈老头授剑"那场戏——节奏拖沓。

- 为了连续性必须保留什么：
  - 北口令牌由沈老头 → 林若 的状态变化不可逆
  - chapter-12 scene-2 的 state-changes 不能动

- 顺带动哪些文件：
  - plot/arcs/jue-xin-zhi-lu.md —— 情节点章节引用保持对齐
  - characters/shen-laotou.md —— 若新增对话示例台词

- 完工验证命令：
  story validate . && story continuity . && story wordcount . --write
```

### 示例 3：行编辑型（用户说"改一段"）

```markdown
## 修订计划

- 改什么：
  chapters/chapter-07.md 第二段"林若接过令牌"4 句话——加 1 句感官细节 + 把一句未消化的动作明示写成具体动作。

- 为了连续性必须保留什么：
  - 本章 status 仍为 draft（不动）
  - 该段动作时不增减、对白不动
  - scene state-changes 完全不变

- 顺带动哪些文件：
  无（行编辑不触发反向引用联动）。

- 完工验证命令：
  story validate .（只需确认 frontmatter 没破坏）
```