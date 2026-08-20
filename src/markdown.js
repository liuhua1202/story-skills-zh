export function kebabCase(value) {
  const cleaned = String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u2018\u2019]/g, "");

  if (/[\u3400-\u9fff\uf900-\ufaff]/.test(cleaned)) {
    let allMapped = true;
    const transliterated = cleaned
      .split("")
      .map((char) => {
        if (/[A-Za-z0-9]/.test(char)) {
          return char.toLowerCase();
        }
        if (/[\u3400-\u9fff\uf900-\ufaff]/.test(char)) {
          const pinyin = cjkToPinyin(char);
          if (pinyin) {
            return pinyin;
          }
          allMapped = false;
        }
        return "";
      })
      .join("");
    if (allMapped) {
      const ascii = transliterated.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      if (ascii) {
        return ascii;
      }
    }
    return cjkFallback(cleaned);
  }

  return cleaned
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const CJK_PINYIN_INITIALS = {
  "\u738b": "wang", "\u674e": "li", "\u5f20": "zhang", "\u5218": "liu",
  "\u9648": "chen", "\u6768": "yang", "\u9ec4": "huang", "\u8d75": "zhao",
  "\u5434": "wu", "\u5468": "zhou", "\u5d2e": "xi", "\u6d2e": "kun",
  "\u6c64": "tang", "\u5e7f": "guang", "\u4f55": "he", "\u5b5d": "xiao",
  "\u6797": "lin", "\u66fe": "zeng", "\u4ec0": "shi", "\u4e07": "wan",
  "\u82cf": "su", "\u6731": "zhu", "\u9093": "deng", "\u8c46": "dou",
  "\u51af": "feng", "\u66f9": "cao", "\u5236": "zhi", "\u8d3a": "he",
  "\u5b9d": "bao", "\u91d1": "jin", "\u77f3": "shi", "\u7389": "yu",
  "\u83b9": "qi", "\u7ae0": "zhang", "\u4e91": "yun", "\u96e8": "yu",
  "\u98ce": "feng", "\u706b": "huo", "\u6c34": "shui", "\u6708": "yue",
  "\u661f": "xing", "\u6d77": "hai", "\u5c71": "shan", "\u6cb3": "he",
  "\u6e56": "hu", "\u6f6e": "chao", "\u6c5f": "jiang", "\u53bf": "xian",
  "\u9547": "zhen", "\u6751": "cun", "\u57ce": "cheng", "\u5e02": "shi",
  "\u5b66": "xue", "\u53cb": "you", "\u7236": "fu", "\u6bcd": "mu",
  "\u5144": "xiong", "\u5f1f": "di", "\u59d1": "gu", "\u59e8": "yi",
  "\u7237": "ye", "\u5974": "nu", "\u5a07": "jiao", "\u6028": "yuan",
  "\u751f": "sheng", "\u8001": "lao", "\u5e74": "nian",
  "\u65f6": "shi", "\u591c": "ye", "\u68a6": "meng", "\u9b42": "hun",
  "\u5fc3": "xin", "\u7075": "ling", "\u6c14": "qi", "\u529b": "li",
  "\u6f5c": "qian", "\u8857": "jie", "\u9053": "dao", "\u8def": "lu",
  "\u95e8": "men", "\u623f": "fang", "\u4f4f": "zhu", "\u5e9c": "fu",
  "\u5b9e": "shi", "\u865a": "xu", "\u9690": "yin", "\u9ed1": "hei",
  "\u767d": "bai", "\u7ea2": "hong", "\u84dd": "lan", "\u7eff": "lv",
  "\u9521": "xi", "\u94f6": "yin", "\u94dc": "tong",
  "\u94c1": "tie", "\u6728": "mu", "\u690d": "zhi", "\u82b1": "hua",
  "\u8349": "cao", "\u6811": "shu", "\u679c": "guo", "\u83b2": "lian",
  "\u67ab": "feng", "\u96ea": "xue", "\u971c": "shuang",
  "\u5929": "tian", "\u5730": "di", "\u5b87": "yu", "\u5b99": "zhou",
  "\u65e7": "jiu", "\u65b0": "xin", "\u53e4": "gu", "\u4eca": "jin",
  "\u672a": "wei", "\u5df2": "yi", "\u4e0a": "shang",
  "\u4e0b": "xia", "\u5de6": "zuo", "\u53f3": "you", "\u524d": "qian",
  "\u540e": "hou", "\u91cc": "li", "\u5916": "wai", "\u5185": "nei",
  "\u4e2d": "zhong", "\u5927": "da", "\u5c0f": "xiao", "\u591a": "duo",
  "\u5c11": "shao", "\u597d": "hao", "\u6076": "e", "\u7f8e": "mei",
  "\u4e11": "chou", "\u7231": "ai", "\u6068": "hen", "\u601d": "si",
  "\u5fd8": "wang", "\u8bb0": "ji", "\u540d": "ming", "\u5b57": "zi",
  "\u8a00": "yan", "\u8bed": "yu", "\u8bf4": "shuo", "\u8b66": "jing",
  "\u6d88": "xiao", "\u606f": "xi", "\u4f20": "chuan", "\u95f4": "jian",
  "\u82e5": "ruo"
};

function cjkToPinyin(char) {
  if (Object.prototype.hasOwnProperty.call(CJK_PINYIN_INITIALS, char)) {
    return CJK_PINYIN_INITIALS[char];
  }
  return "";
}

function cjkFallback(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return `cjk-${hash.toString(16).padStart(8, "0")}`;
}

export function titleCaseSlug(slug) {
  return String(slug)
    .split("-")
    .filter(Boolean)
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

export function wordCount(markdown) {
  const normalized = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/\[[^\]]+\]\([^)]+\)/g, " ")
    .replace(/[#>*_~|:-]/g, " ");

  // CJK languages do not have word boundaries. Insert spaces around each
  // Han, Hiragana, Katakana, and Hangul character so the whitespace-split
  // tokenization below treats each character as its own word. Latin words
  // are split on whitespace as before.
  const split = normalized.replace(
    /[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/g,
    " $& "
  );
  const tokens = split.split(/\s+/).filter((t) => /[\p{L}\p{N}]/u.test(t));
  return tokens.length;
}

export function chapterProse(markdownBody) {
  const chapterTextMatch = /^## Chapter Text\s*$/im.exec(markdownBody);
  if (chapterTextMatch) {
    return markdownBody.slice(chapterTextMatch.index + chapterTextMatch[0].length);
  }

  const outlineMatch = /^## Outline\s*$/im.exec(markdownBody);
  if (!outlineMatch) {
    return stripLeadingH1(markdownBody);
  }

  const afterOutline = markdownBody.slice(outlineMatch.index + outlineMatch[0].length);
  const dividerMatch = /^\s*---\s*$/m.exec(afterOutline);
  return dividerMatch ? afterOutline.slice(dividerMatch.index + dividerMatch[0].length) : afterOutline;
}

export function extractSection(markdown, heading) {
  const escaped = escapeRegExp(heading);
  const pattern = new RegExp(`^## ${escaped}\\s*$`, "im");
  const match = pattern.exec(markdown);
  if (!match) {
    return "";
  }

  const start = match.index + match[0].length;
  const rest = markdown.slice(start);
  const next = /^##\s+/m.exec(rest);
  return (next ? rest.slice(0, next.index) : rest).trim();
}

export function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripLeadingH1(markdownBody) {
  const match = /^(?:[ \t]*\r?\n)*[ \t]{0,3}#(?!#)[ \t]+[^\r\n]*(?:\r?\n|$)/.exec(markdownBody);
  return match ? markdownBody.slice(match[0].length) : markdownBody;
}
