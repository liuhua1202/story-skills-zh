---
name: story-maintenance
description: 当用户要验证、重建索引、修注册表、检查链接、检查连续性、字数统计、总结故事项目、导入已有稿件、导出稿件、跑 story CLI,或对 Story Skills markdown 项目做任意确定性维护时,使用本 skill。
---

# 故事维护

## 这个 skill 做什么

跑 Story Skills 项目的确定性维护。用 CLI 做结构验证、注册表重建、字数统计、链接检查、连续性检查、项目报告、next-action 报告、schema 迁移、实体 helper、稿件导入、稿件导出。创意性的事还是创作 skill 管;本 skill 只管机械的一致性。

## CLI 调用方式

按优先级选第一种可用的:

1. `story <command>` —— 安装了 bin 的话
2. `bun run story -- <command>` —— 在本仓库跑的时候
3. `node scripts/story.js <command>` —— bundled 后备,`scripts/story.js` 路径相对本 skill 目录解析

全都没有,就照 `story-init` 里的约定手工做。

直接调用装好的或 bundled 的 CLI,不要把 `scripts/story.js` 复制进用户的故事项目,也不要写项目本地的构建 / 生成 / 批量写脚本来产出故事内容。故事项目还是 markdown-first,加上用户明确要求的导出(比如 `manuscript.md`)就行。

## 命令

在故事项目根目录跑,或者显式把路径传进去。

```shell
story validate .
story reindex .
story wordcount . --write
story links .
story continuity .
story import draft.md --title "Title"
story report .
story report . --actionable
story next .
story doctor .
story migrate .
story add character "Name"
story rename character old-id "New Name"
story remove promise old-promise
story export . --out manuscript.md
story build . --format markdown
story build . --format epub
story build . --format docx
```

用法:

- `validate` —— 初始化之后、任何多文件编辑的末尾跑
- `reindex` —— 新增 / 删除 / 重命名角色、地点、系统、弧、章节之后
- `wordcount --write` —— 写或修订章节之后
- `links` —— 改角色关系、notable locations、弧参与者、章节引用之后
- `continuity` —— 起草或修订章节之后;用户问矛盾、死角色出现、未兑现 setup、过时状态时也跑。它确定性检查:`died-in` 顺序、promise/question 章节顺序、契诃夫缺口、POV/cast 一致性、`continuity/state.md` 引用
- `import` —— 用户有现成稿件或章节草稿、想围绕它建 Story Skills 项目时;跑完根据打印出的实体候选清单把角色和地点文件补上
- `report` —— 用户问项目状态、清单、进度、或者想要个快速健康总览时
- `next` —— 起草前看 CLI 给的确定性下一步
- `doctor` —— 用户问「什么 stale / 坏了 / 不一致」时
- `migrate` —— 项目是旧 schema 或缺 v2 路径时
- `add`、`rename`、`remove` —— 适用于请求变更的、确定性的实体文件操作
- `export` —— 用户明确要合并稿件到某个具体路径时
- `build` —— 用户要构建书稿产物时;支持 markdown、EPUB、DOCX,落到 `dist/`

## 失败处理

- CLI 错误当可操作的维护发现对待。
- 修掉损坏的引用、缺失的必需文件、过时的注册表、不对的字数 —— 只要请求的动作隐含要这么做。
- 不要为了过机械检查就覆盖掉创作正文或故事内容。
- 验证警告如果是用户故意保留的数据,报告出来,不要静默改。
