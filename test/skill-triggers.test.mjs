// test/skill-triggers.test.mjs
//
// Layer 1 quality test: verify that each skill's `description:` frontmatter
// contains the trigger phrases listed in the canonical corpus below.
//
// This does NOT test the actual LLM-based triggering — that's a black-box
// behavior we can't reliably test. What it DOES test is that the
// description field of every skill contains the trigger phrases we claim
// to listen for. If someone deletes a trigger phrase from a description
// (or adds a new skill without updating the corpus), this test will fire.

import { describe, expect, test } from "bun:test";
import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "..");
const SKILLS_DIR = path.join(REPO_ROOT, "skills");

// Canonical trigger corpus: for each skill, the phrases that MUST appear
// somewhere in its `description:` frontmatter (case-insensitive substring).
// Edit this file when adding a new skill or a new synonym to its triggers.
const CORPUS = {
  "story-init": {
    zh: ["开新故事", "初始化故事", "新书", "开始写小说"],
    en: ["start a new story", "initialize a story", "create a novel", "set up a story"],
  },
  "character-management": {
    zh: ["创建角色", "角色关系", "人物弧", "人物档案"],
    en: ["create a character", "add protagonist", "character profile", "character arc"],
  },
  "worldbuilding": {
    zh: ["创建地点", "魔法体系", "政治体系", "构建世界", "世界历史"],
    en: ["create a location", "magic system", "build the world", "worldbuilding"],
  },
  "plot-structure": {
    zh: ["情节弧", "故事结构", "情节点", "追踪伏笔", "故事时间线"],
    en: ["plot arc", "story structure", "beat sheet", "foreshadowing"],
  },
  "chapter-writing": {
    zh: ["写一章", "下一章", "章节大纲", "起草章节", "写一个场景"],
    en: ["write a chapter", "next chapter", "chapter outline", "draft the chapter"],
  },
  "revision-continuity": {
    zh: ["修订一章", "编辑正文", "连续性检查", "找矛盾", "打磨草稿"],
    en: ["revise a chapter", "edit prose", "continuity check", "find contradictions"],
  },
  "story-maintenance": {
    zh: ["验证", "重建索引", "字数统计", "检查链接", "总结"],
    en: ["validate the project", "reindex registries", "wordcount", "story report"],
  },
};

function readDescription(skillName) {
  const skillPath = path.join(SKILLS_DIR, skillName, "SKILL.md");
  const text = fs.readFileSync(skillPath, "utf8");
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!m) throw new Error(`No frontmatter in ${skillPath}`);
  const yaml = m[1];
  // Handle description: | (block scalar) by collecting indented lines.
  const blockMatch = /^description:\s*\|\s*\r?\n((?:\s{2,}[^\r\n]*\r?\n?)+)/m.exec(yaml);
  if (blockMatch) {
    return blockMatch[1]
      .split(/\r?\n/)
      .map((l) => l.replace(/^\s{2,}/, ""))
      .join(" ")
      .trim();
  }
  const inlineMatch = /^description:\s*(.+?)\s*$/m.exec(yaml);
  return inlineMatch ? inlineMatch[1].trim() : "";
}

describe("Layer 1: skill trigger corpus coverage", () => {
  for (const [skillName, expected] of Object.entries(CORPUS)) {
    test(`${skillName}: zh trigger phrases present`, () => {
      const desc = readDescription(skillName);
      for (const phrase of expected.zh) {
        expect(desc).toContain(phrase);
      }
    });
    test(`${skillName}: en trigger phrases present`, () => {
      const desc = readDescription(skillName);
      // English triggers are checked case-insensitively because LLM agents
      // typically match case-insensitively when scanning.
      const descLower = desc.toLowerCase();
      for (const phrase of expected.en) {
        expect(descLower).toContain(phrase.toLowerCase());
      }
    });
  }
});

describe("Layer 1: corpus skills match skills/ directory", () => {
  test("every corpus entry maps to an existing skill directory", () => {
    const realSkills = fs
      .readdirSync(SKILLS_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory() && d.name !== "common")
      .map((d) => d.name);
    for (const corpusSkill of Object.keys(CORPUS)) {
      expect(realSkills).toContain(corpusSkill);
    }
  });

  test("every real skill is in the corpus", () => {
    const realSkills = fs
      .readdirSync(SKILLS_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory() && d.name !== "common")
      .map((d) => d.name)
      .sort();
    const corpusSkills = Object.keys(CORPUS).sort();
    expect(realSkills).toEqual(corpusSkills);
  });
});