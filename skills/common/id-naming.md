<!--
Shared canonical reference / 标识命名规则
Source of truth for: 所有 SKILL.md 中提到 kebab-case / 中文化名 / 文件 id 的段落
-->

# 标识命名规则

> 本文件是所有 skill 共用的"实体标识符怎么命名"权威版本。
> 引用方式：用一句 "id 命名见 `../common/id-naming.md`" 替代过去直接写的同内容段落。

---

## 一、kebab-case

- **强制小写 ASCII**:`lin-ruo`、`bei-kou-ya-zhan`、`yan-huo-xun-zong`。
- **分隔符只能是一个连字符 `-`**:禁止 `_`、空格、`--`、中文连字符、`/`、`.` 等。
- **开首与结尾不能是连字符**。
- **避免保留字**:不要用 `index`、`new`、`default`、`test` 这类会被文件系统和 markdown 工具误判的 id。

## 二、CJK 音译

中文实体名 → kebab-case 时,优先用 `pinyin-pro` 风格的完整拼音(字母全小写,音节间连字符分隔):

| 中文 | 推荐 id |
| --- | --- |
| 林若 | `lin-ruo` |
| 沈老头 | `shen-laotou` |
| 北口 | `bei-kou` |
| 北口牙栈 | `bei-kou-ya-zhan` |
| 阎王寨 | `yan-wang-zhai` |
| 雨夜之谜 | `yu-ye-zhi-mi` |

**音译规则**:

- 每个汉字一个音节,音节之间用 `-` 分隔。
- 同音字靠字符在词里的常见读音判断(林若 = "ruo",不读 "nao");实在无法判断就用 `pinyin-pro` 的高频读音。
- 叠字、儿化、轻声都按普通话标准读音转写。

## 三、CJK fallback

如果标题里含 unicode 罕用字、不在常用字表的字,或者你拿不准的多音字,`src/markdown.js` 会落到 `cjk-<hash>` 兜底:

```
cjk-0013f034    ← 不在映射表的罕用字
cjk-45f1a965    ← 太长 / 太多多音字 / 拼音映射不出结果
```

**临时绕过**:直接把 `story: your-kebab-id` 写在 `story.md` 的 frontmatter 里,跳过自动音译。

**永久修法**:在 `src/markdown.js` 的 `CJK_PINYIN_INITIALS` 字典里补这个字,让它下次落到正确拼音。

## 四、id 一旦生成,不要轻易改名

- 一旦某个 id 被多个文件引用(地点、阵营、弧线、章节),**改它等于把所有交叉引用打断**。
- 要改名:**先用 `story rename <kind> <old-id> "<new-name>"`**,再跑 `story reindex .` + `story links .` + `story validate .` 验证。

## 五、文件路径约定

| 实体 | 路径 |
| --- | --- |
| 故事根 | `<项目根>/` |
| 角色 | `<项目根>/characters/<id>.md` |
| 地点 | `<项目根>/worldbuilding/locations/<id>.md` |
| 系统 | `<项目根>/worldbuilding/systems/<id>.md` |
| 阵营 | `<项目根>/worldbuilding/factions/<id>.md` |
| 器物 | `<项目根>/worldbuilding/artifacts/<id>.md` |
| 弧线 | `<项目根>/plot/arcs/<id>.md` |
| 章节 | `<项目根>/chapters/chapter-{NN}.md` |
| 场景 | `<项目根>/scenes/chapter-{NN}-scene-{MM}.md` |
| 承诺 | `<项目根>/continuity/promises/<id>.md` |
| 悬念 | `<项目根>/continuity/questions/<id>.md` |
| 术语 | `<项目根>/glossary/terms/<id>.md` |
| 注册表 | `<领域>/_index.md` |
| 故事圣经 | `<项目根>/story.md` |

> 任何 skill 在文档里说"存在 `<领域>/_index.md`"都指上表的相对项目根路径。