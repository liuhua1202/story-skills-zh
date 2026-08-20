# 关系类型参考（Relationship Types）

用于 `characters/*.md` 的 frontmatter `relationships[].type` 字段。脚本校验的是**字符串本身**——所以务必从下面这张表里挑，**不要**自己造（造词会导致 `story validate .` 与 `story links .` 漏检）。

关系**默认双向**：在 A 的档案里写了一条关系，就要在 B 的档案里写一条反向关系。脚本会强制要求双向，反向映射见本文末尾的对照表。

---

## 一、血缘家族（Family）

| 类型 | 反向类型 | 说明 |
| --- | --- | --- |
| `parent` | `child` | 父母对子女 |
| `child` | `parent` | 子女对父母（与上同义，方向不同） |
| `grandparent` | `grandchild` | 祖辈对孙辈 |
| `grandchild` | `grandparent` | 孙辈对祖辈 |
| `sibling` | `sibling` | 兄弟姐妹（对称） |
| `uncle` / `aunt` | `nephew` / `niece` | 叔伯/姑姨对侄甥；具体哪个由 `note` 注明 |
| `nephew` / `niece` | `uncle` / `aunt` | 侄甥对叔伯/姑姨 |
| `cousin` | `cousin` | 表/堂兄弟姐妹（对称） |
| `spouse` | `spouse` | 法定配偶（对称） |
| `partner` | `partner` | 未婚伴侣（对称） |
| `in-law` | `in-law` | 姻亲；具体哪一侧由 `note` 说明 |

> 关于 `in-law`：枚举本身只有一个值。如果需要区分岳父母 vs 婆家人 vs 嫂子等，请用 `note: "陈氏，林若之嫂"` 这种**注释法**，不要扩枚举。

---

## 二、社会关系（Social）

| 类型 | 反向类型 | 说明 |
| --- | --- | --- |
| `friend` | `friend` | 朋友（对称） |
| `ally` | `ally` | 盟友，但未必有私交（对称） |
| `rival` | `rival` | 竞争者（对称） |
| `enemy` | `enemy` | 公开敌对（对称） |
| `colleague` | `colleague` | 同行、同僚、同门（对称） |
| `mentor` | `student` | 师傅/老师 |
| `student` | `mentor` | 学徒/学生 |
| `employer` | `subordinate` | 上司/雇主 |
| `subordinate` | `employer` | 下属/雇员 |
| `confidant` | `confidant` | 倾诉对象（对称） |

---

## 三、剧情功能（Story Role）

| 类型 | 反向类型 | 说明 |
| --- | --- | --- |
| `protagonist` | （**不存在**反向关系） | 主角。不要把它写进别人的档案——脚本会把 `role: protagonist` 单独判别；这里只用于描述"两位主角彼此视为镜像对手/同行者"这类罕见情况 |
| `antagonist` | （**不存在**反向关系） | 反派。规则同上 |
| `love-interest` | `love-interest` | 恋爱对象（对称） |
| `foil` | `foil` | 镜像/对照角色（对称）——用来凸显主角的另一面 |

> `protagonist` 与 `antagonist` 主要信息已经在 frontmatter 的 `role` 字段里登记。如果两位角色在剧情上**相互对应**（双主角、镜像对手），可以用 `note` 注释一下，但不需要"反向"再写一条 `protagonist`——脚本按 `role` 字段独立校验。

---

## 四、写法示例

```yaml
# 陈大 的档案（片段）
relationships:
  - character: lin-ruo
    type: antagonist
    note: "杀父之仇，但动机不只是私仇"
  - character: chen-da-de-xiong
    type: sibling
  - character: bei-kou-zong-bing
    type: employer
```

```yaml
# 林若 的档案（片段）
relationships:
  - character: chen-da
    type: antagonist
    note: "同上，关系双向镜像"
  - character: shen-laotou
    type: mentor
  - character: lin-ruo-de-jie-jie
    type: sibling
```

```yaml
# 沈老头 的档案（片段）
relationships:
  - character: lin-ruo
    type: student
    note: "沈老头是师，林若为徒"
```

---

## 五、双向维护速查表

| 在 A 的档案里写 | 必须在 B 的档案里写 |
| --- | --- |
| `parent` | `child` |
| `child` | `parent` |
| `grandparent` | `grandchild` |
| `grandchild` | `grandparent` |
| `uncle` / `aunt` | `nephew` / `niece`（选择对应的） |
| `nephew` / `niece` | `uncle` / `aunt` |
| `mentor` | `student` |
| `student` | `mentor` |
| `employer` | `subordinate` |
| `subordinate` | `employer` |
| `sibling` | `sibling` |
| `spouse` | `spouse` |
| `partner` | `partner` |
| `friend` / `ally` / `rival` / `enemy` / `colleague` / `confidant` / `love-interest` / `foil` / `cousin` | 同名（自身即反向） |
| `protagonist` / `antagonist` | 不需要反向，靠 `role` 字段校验 |
| `in-law` | `in-law` |

---

## 六、冲突时的优先级

当两个角色之间的关系不止一种时，按下面的顺序登记主关系，避免脚本误判：

1. **剧情功能**（`antagonist` / `love-interest` / `foil`）—— 决定整段弧线的张力
2. **血缘**（`parent` / `child` / `sibling` 等）—— 决定起点
3. **社会**（`mentor` / `employer` / `rival` 等）—— 决定日常互动
4. 其它关系进 `note` 自由描述

例如：陈大既是林若的杀父仇人（`antagonist`），又是林若父亲昔日的徒弟（`student` 之于林父）。在陈大的档案里写 `antagonist` 指向林若；师承关系进 `note: "林若父亲的旧徒"`，不另开一条。
