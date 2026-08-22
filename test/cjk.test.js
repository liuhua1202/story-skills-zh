// CJK and Unicode coverage for the markdown utilities and the security
// helpers. These tests are deliberately separate from the English-only
// suites so failures point straight at the i18n gaps.

import { describe, expect, test } from "bun:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { chapterProse, kebabCase, titleCaseSlug, wordCount } from "../src/markdown.js";
import { extractNameCandidates } from "../src/import.js";
import {
  assertNoSymlinks,
  assertSafeProjectPath,
  atomicWriteFile,
  withTempDir
} from "../src/security.js";

describe("CJK and Unicode coverage", () => {
  describe("kebabCase", () => {
    test("transliterates common Han characters to pinyin initials", () => {
      expect(kebabCase("\u738b\u53cb")).toBe("wang-you");
      expect(kebabCase("\u6797\u82e5")).toBe("lin-ruo");
      expect(kebabCase("\u9648\u5927")).toBe("chen-da");
    });

    test("falls back to a hex suffix for unmapped characters", () => {
      const fallback = kebabCase("\u9f9f\u9f95\u9f9c");
      expect(fallback).toMatch(/^cjk-[0-9a-f]{8}$/);
      // Two unrelated Han strings produce different fallbacks.
      expect(kebabCase("\u9f9f\u9f95")).not.toBe(kebabCase("\u9f9c\u9f99"));
    });

    test("does not produce an empty id for Chinese titles", () => {
      expect(kebabCase("\u8c01\u5728\u8c01").length).toBeGreaterThan(0);
    });

    test("handles mixed Latin + Han input", () => {
      // Latin letters are kept verbatim; Han characters are transliterated.
      expect(kebabCase("Story of \u9648\u5927")).toMatch(/^story-of-chen-da$/);
    });

    test("strips diacritics before kebab-casing", () => {
      expect(kebabCase("M\u00e9ra")).toBe("mera");
    });
  });

  describe("wordCount", () => {
    test("counts Han characters as words", () => {
      expect(wordCount("\u4ed6\u8d70\u8fdb\u4e86\u9152\u9986")).toBe(6);
    });

    test("handles mixed Han + Latin prose", () => {
      expect(wordCount("Sera went to \u9152\u9986 yesterday.")).toBe(6);
    });

    test("still strips code blocks and markdown syntax", () => {
      expect(wordCount("```\n\u4ed6\u8d70\n```")).toBe(0);
    });
  });

  describe("titleCaseSlug", () => {
    test("title-cases ASCII slugs", () => {
      expect(titleCaseSlug("the-lost-ember")).toBe("The Lost Ember");
    });

    test("leaves pinyin slugs title-cased without double-casing", () => {
      // pinyin already arrives lower-case from kebabCase, so the existing
      // title-case behavior applies. Verify no surprise upper-casing.
      expect(titleCaseSlug("chen-da")).toBe("Chen Da");
    });
  });

  describe("extractNameCandidates with CJK", () => {
    test("picks up Han names as candidates", () => {
      const prose = [
        "\u9648\u5927\u8d70\u4e86\u3002",
        "\u9648\u5927\u6765\u4e86\u3002",
        "\u9648\u5927\u603b\u662f\u8fd9\u6837\u3002"
      ].join("\n");
      const candidates = extractNameCandidates(prose);
      expect(candidates).toContainEqual({ name: "\u9648\u5927", count: 3 });
    });

    test("still surfaces Latin candidates alongside CJK candidates", () => {
      const prose = "He met Vex Marrow. \u9648\u5927 joined Vex Marrow. Vex Marrow waved and they walked on together.";
      const candidates = extractNameCandidates(prose);
      expect(candidates.find((c) => c.name === "Vex Marrow")).toBeTruthy();
    });
  });

  describe("chapterProse with CJK", () => {
    test("extracts Chapter Text after Chinese outline heading", () => {
      const body = "# \u4e00\n\n## Outline\n\n1. \u4f60\n\n---\n\n\u4ed6\u8d70\u4e86";
      expect(chapterProse(body).trim()).toBe("\u4ed6\u8d70\u4e86");
    });
  });

  describe("security helpers", () => {
    test("assertSafeProjectPath accepts paths inside the root", () => {
      withTempDir("security-", (root) => {
        const target = path.join(root, "characters", "ada.md");
        expect(() => assertSafeProjectPath(target, root)).not.toThrow();
      });
    });

    test("assertSafeProjectPath rejects paths that escape the root", () => {
      withTempDir("security-", (root) => {
        expect(() => assertSafeProjectPath(path.join(root, "..", "etc", "passwd"), root))
          .toThrow(/Refusing path traversal/);
      });
    });

    test("assertNoSymlinks walks subdirectories and refuses links", () => {
      withTempDir("security-", (root) => {
        fs.mkdirSync(path.join(root, "characters"));
        const target = path.join(root, "characters", "_index.md");
        fs.writeFileSync(target, "# Characters\n", "utf8");
        const link = path.join(root, "characters", "link.md");
        try {
          fs.symlinkSync(target, link);
        } catch {
          // Symlink creation may fail on some Windows filesystems; skip.
          return;
        }
        expect(() => assertNoSymlinks(root)).toThrow(/symbolic link/);
      });
    });

    test("atomicWriteFile produces a file with the expected contents", () => {
      withTempDir("security-", (root) => {
        const file = path.join(root, "out.md");
        atomicWriteFile(file, "hello\n");
        expect(fs.readFileSync(file, "utf8")).toBe("hello\n");
      });
    });

    test("atomicWriteFile replaces existing files", () => {
      withTempDir("security-", (root) => {
        const file = path.join(root, "out.md");
        atomicWriteFile(file, "v1");
        atomicWriteFile(file, "v2");
        expect(fs.readFileSync(file, "utf8")).toBe("v2");
      });
    });
  });
});
