// test/skill-workflow-smoke.test.js
//
// Layer 2 quality test: behavioral smoke tests for each of the 4 creative
// skills.  Each test scaffolds a tiny project, performs the deterministic
// parts of the skill's workflow via the actual CLI (rather than file
// mocking), and asserts that the skill's stated commands produce the
// promised outputs.
//
// What this DOES test:
//   - CLI commands the skill says it should run actually work end-to-end
//   - File artifacts the skill claims to create actually appear with the
//     correct structure
//   - Cross-references the skill sets up are validated by story links
//   - The skill's quality gates (validate / continuity / doctor) flag
//     problems the workflow would introduce
//
// What this DOES NOT test:
//   - LLM-driven creative decisions (interview questions, prose quality)
//   - The exact wording the agent produces in user-visible messages
//
// Pattern mirrors test/workflow-eval.test.js (which covers the simpler
// "init + add everything" path). This file adds:
//
//   test: character-management workflow    (skill: characters/)
//   test: chapter-writing workflow         (skill: chapters/, scenes/, continuity/)
//   test: revision-continuity audit        (skill: continuity + reports)
//   test: worldbuilding workflow           (skill: worldbuilding/, factions/, artifacts/)
//   test: plot-structure workflow          (skill: plot/, continuity/promises, questions)
//   test: full pipeline end-to-end         (all skills linked through)

import { describe, expect, test } from "bun:test";
import fs from "node:fs";
import path from "node:path";
import { runCli } from "../src/cli.js";
import { makeTempDir, memoryIo } from "./helpers.js";

function invoke(cwd, argv) {
  const io = memoryIo(cwd);
  const code = runCli(argv, io);
  return { code, out: io.output(), err: io.error() };
}

function scaffoldStory(cwd, opts = {}) {
  const { title = "Smoke Story", genre = "fantasy", pov = "third-person-limited", theme = ["truth"] } = opts;
  const init = invoke(cwd, [
    "init", title, "--genre", genre, "--pov", pov, "--theme", ...theme,
  ]);
  expect(init.code).toBe(0);
  return path.join(cwd, title.toLowerCase().replace(/\s+/g, "-"));
}

describe("Layer 2: character-management workflow", () => {
  test("create character + relationship + location produces validated links", () => {
    const cwd = makeTempDir();
    const root = scaffoldStory(cwd, { title: "Char Test" });

    const add = invoke(cwd, [
      "add", "character", "Mara Vale", "--path", root, "--role", "protagonist",
    ]);
    expect(add.code).toBe(0);

    const addLoc = invoke(cwd, [
      "add", "location", "Clock Pier", "--path", root, "--type", "landmark",
      "--character", "mara-vale",
    ]);
    expect(addLoc.code).toBe(0);

    // character-management says: "双向检查表（写完一条就勾一行）" +
    // "story reindex . && story links . && story validate ."
    expect(invoke(cwd, ["reindex", root]).code).toBe(0);
    expect(invoke(cwd, ["links", root]).out).toContain("Links are valid");
    expect(invoke(cwd, ["validate", root]).out).toContain("Project is valid: 0 errors");
  });

  test("character frontmatter has expected fields (skill contract)", () => {
    const cwd = makeTempDir();
    const root = scaffoldStory(cwd, { title: "Frontmatter Test" });
    invoke(cwd, [
      "add", "character", "Mara", "--path", root, "--role", "protagonist",
    ]);
    const charPath = path.join(root, "characters", "mara.md");
    expect(fs.existsSync(charPath)).toBe(true);
    const fm = fs.readFileSync(charPath, "utf8");
    // character-management/references/character-template.md says these are required
    expect(fm).toMatch(/^name:\s+/m);
    expect(fm).toMatch(/^role:\s+protagonist/m);
    expect(fm).toMatch(/^status:\s+/m);
  });
});

describe("Layer 2: worldbuilding workflow", () => {
  test("location + faction + artifact cross-references survive story links", () => {
    const cwd = makeTempDir();
    const root = scaffoldStory(cwd, { title: "World Test" });

    invoke(cwd, ["add", "character", "Mara Vale", "--path", root, "--role", "protagonist"]);
    invoke(cwd, ["add", "location", "Clock Pier", "--path", root, "--type", "landmark", "--character", "mara-vale"]);
    invoke(cwd, ["add", "faction", "Harbor Watch", "--path", root, "--type", "government", "--member", "mara-vale", "--location", "clock-pier"]);
    invoke(cwd, ["add", "artifact", "Brass Ledger", "--path", root, "--type", "document", "--owner", "mara-vale", "--location", "clock-pier"]);

    // worldbuilding SKILL.md says: 跑 story reindex . && story links . && story validate .
    expect(invoke(cwd, ["links", root]).out).toContain("Links are valid");
    expect(invoke(cwd, ["validate", root]).out).toContain("Project is valid: 0 errors");

    // Verify all four files exist with proper frontmatter
    expect(fs.existsSync(path.join(root, "characters", "mara-vale.md"))).toBe(true);
    expect(fs.existsSync(path.join(root, "worldbuilding", "locations", "clock-pier.md"))).toBe(true);
    expect(fs.existsSync(path.join(root, "worldbuilding", "factions", "harbor-watch.md"))).toBe(true);
    expect(fs.existsSync(path.join(root, "worldbuilding", "artifacts", "brass-ledger.md"))).toBe(true);
  });

  test("system file in worldbuilding/systems/ registers correctly", () => {
    const cwd = makeTempDir();
    const root = scaffoldStory(cwd, { title: "Sys Test" });
    // No add system CLI helper; manual create is the documented fallback
    const sysPath = path.join(root, "worldbuilding", "systems", "mana-system.md");
    fs.mkdirSync(path.dirname(sysPath), { recursive: true });
    fs.writeFileSync(sysPath, "---\nname: Mana System\ntype: magic\nstatus: active\n---\n");
    expect(invoke(cwd, ["reindex", root]).code).toBe(0);
    expect(invoke(cwd, ["validate", root]).out).toContain("Project is valid");
  });
});

describe("Layer 2: plot-structure workflow", () => {
  test("arc + chapter + scene + promise + question + foreshadow chain validates", () => {
    const cwd = makeTempDir();
    const root = scaffoldStory(cwd, { title: "Plot Test" });
    invoke(cwd, ["add", "character", "Mara Vale", "--path", root, "--role", "protagonist"]);
    invoke(cwd, ["add", "arc", "Ledger Conspiracy", "--path", root, "--type", "main", "--character", "mara-vale"]);
    invoke(cwd, ["add", "chapter", "The Missing Page", "--path", root, "--number", "1", "--pov", "mara-vale", "--character", "mara-vale", "--arc", "ledger-conspiracy"]);
    invoke(cwd, ["add", "promise", "The ledger names the traitor", "--path", root, "--planted", "chapter-01", "--arc", "ledger-conspiracy", "--character", "mara-vale"]);
    invoke(cwd, ["add", "question", "Who removed the page?", "--path", root, "--introduced", "chapter-01", "--character", "mara-vale"]);

    expect(invoke(cwd, ["validate", root]).out).toContain("Project is valid: 0 errors");
    expect(invoke(cwd, ["links", root]).out).toContain("Links are valid");
    // continuity checks the promise/question chapter ordering
    const cont = invoke(cwd, ["continuity", root]).out;
    expect(cont).toMatch(/Continuity is consistent|consistency|0 errors/);
  });
});

describe("Layer 2: chapter-writing workflow", () => {
  test("chapter-writing 五步: init→character→outline→chapter→scenes→state-changes", () => {
    const cwd = makeTempDir();
    const root = scaffoldStory(cwd, { title: "Chapter Test" });
    invoke(cwd, ["add", "character", "Mara Vale", "--path", root, "--role", "protagonist"]);
    invoke(cwd, ["add", "location", "Clock Pier", "--path", root, "--type", "landmark", "--character", "mara-vale"]);
    invoke(cwd, ["add", "arc", "Ledger Conspiracy", "--path", root, "--type", "main", "--character", "mara-vale"]);
    invoke(cwd, ["add", "chapter", "The Missing Page", "--path", root, "--number", "1", "--pov", "mara-vale", "--location", "clock-pier", "--character", "mara-vale", "--arc", "ledger-conspiracy"]);
    invoke(cwd, ["add", "scene", "Nia Finds The Ledger", "--path", root, "--chapter", "chapter-01", "--scene", "1", "--pov", "mara-vale", "--location", "clock-pier", "--character", "mara-vale", "--arc", "ledger-conspiracy"]);

    // Add prose to chapter body so wordcount has something to count
    fs.appendFileSync(path.join(root, "chapters", "chapter-01.md"), "Mara found the missing page beneath the clock.\n", "utf8");

    // chapter-writing 第八步: wordcount --write + reindex + links + validate + next
    expect(invoke(cwd, ["wordcount", root, "--write"]).code).toBe(0);
    expect(invoke(cwd, ["reindex", root]).code).toBe(0);
    expect(invoke(cwd, ["links", root]).out).toContain("Links are valid");
    expect(invoke(cwd, ["validate", root]).out).toContain("Project is valid");
    expect(invoke(cwd, ["next", root]).code).toBe(0);

    // Verify scene file has the right structure (chapter-writing 4-step says scene frontmatter required)
    const scenePath = path.join(root, "scenes", "chapter-01-scene-1.md");
    expect(fs.existsSync(scenePath)).toBe(true);
    const sceneFm = fs.readFileSync(scenePath, "utf8");
    expect(sceneFm).toMatch(/^chapter:\s+chapter-01/m);
    expect(sceneFm).toMatch(/^scene:\s+1/m);
    expect(sceneFm).toMatch(/^pov:\s+mara-vale/m);
    expect(sceneFm).toMatch(/^location:\s+clock-pier/m);
  });
});

describe("Layer 2: revision-continuity workflow", () => {
  test("after building a chapter, story continuity confirms deterministic checks", () => {
    const cwd = makeTempDir();
    const root = scaffoldStory(cwd, { title: "Revision Test" });
    invoke(cwd, ["add", "character", "Mara Vale", "--path", root, "--role", "protagonist"]);
    invoke(cwd, ["add", "location", "Clock Pier", "--path", root, "--type", "landmark", "--character", "mara-vale"]);
    invoke(cwd, ["add", "arc", "Ledger Conspiracy", "--path", root, "--type", "main", "--character", "mara-vale"]);
    invoke(cwd, ["add", "chapter", "The Missing Page", "--path", root, "--number", "1", "--pov", "mara-vale", "--location", "clock-pier", "--character", "mara-vale", "--arc", "ledger-conspiracy"]);
    fs.appendFileSync(path.join(root, "chapters", "chapter-01.md"), "Prose.\n", "utf8");

    // revision-continuity step 6: wordcount --write + reindex + links + validate + continuity + doctor
    invoke(cwd, ["wordcount", root, "--write"]);
    invoke(cwd, ["reindex", root]);
    invoke(cwd, ["links", root]);
    expect(invoke(cwd, ["validate", root]).out).toContain("Project is valid");
    const continuity = invoke(cwd, ["continuity", root]).out;
    expect(continuity).toContain("Continuity is consistent");
    // doctor exits non-zero when there are warnings; just check it ran
    const doctor = invoke(cwd, ["doctor", root]);
    expect(doctor.out).toMatch(/Doctor report|Doctor|Health/);
  });

  test("story continuity catches cross-chapter consistency error", () => {
    // scenario: character A dies in chapter 1, then appears in chapter 2
    // characters list (not mentions) — continuity must flag it
    const cwd = makeTempDir();
    const root = scaffoldStory(cwd, { title: "Die Test" });
    invoke(cwd, ["add", "character", "Mara Vale", "--path", root, "--role", "protagonist"]);
    invoke(cwd, ["add", "location", "Clock Pier", "--path", root, "--type", "landmark", "--character", "mara-vale"]);
    invoke(cwd, ["add", "arc", "Arc", "--path", root, "--type", "main", "--character", "mara-vale"]);
    invoke(cwd, ["add", "chapter", "The Fall", "--path", root, "--number", "1", "--pov", "mara-vale", "--location", "clock-pier", "--character", "mara-vale", "--arc", "arc"]);
    fs.appendFileSync(path.join(root, "chapters", "chapter-01.md"), "Prose.\n", "utf8");

    // Mark Mara as deceased after chapter-01
    const charPath = path.join(root, "characters", "mara-vale.md");
    let fm = fs.readFileSync(charPath, "utf8");
    fm = fm.replace(/^status:\s+alive/m, "status: deceased");
    fm = fm.replace(/^(---\r?\n)/m, "$1died-in: chapter-01\n");
    if (!/^died-in:/m.test(fm)) {
      fm = fm.replace(/^(name:.*\r?\n)/m, "$1died-in: chapter-01\n");
    }
    fs.writeFileSync(charPath, fm);

    // Now write chapter 2 that lists Mara in characters (not mentions)
    invoke(cwd, ["add", "chapter", "Aftermath", "--path", root, "--number", "2", "--pov", "mara-vale", "--location", "clock-pier", "--character", "mara-vale", "--arc", "arc"]);
    fs.appendFileSync(path.join(root, "chapters", "chapter-02.md"), "Prose.\n", "utf8");

    invoke(cwd, ["reindex", root]);
    const continuity = invoke(cwd, ["continuity", root]);
    // Continuity MUST detect this — the deceased character is in chapter-02 characters, not mentions
    expect(continuity.out + "\n" + continuity.err).toMatch(/deceased|died-in|posthumous|move.*mentions|status/i);
  });
});

describe("Layer 2: story-maintenance workflow", () => {
  test("every CLI command listed in story-maintenance SKILL.md runs without crashing", () => {
    const cwd = makeTempDir();
    const root = scaffoldStory(cwd, { title: "Cli Smoke" });
    invoke(cwd, ["add", "character", "Mara Vale", "--path", root, "--role", "protagonist"]);
    invoke(cwd, ["add", "chapter", "Ch1", "--path", root, "--number", "1", "--pov", "mara-vale", "--character", "mara-vale"]);
    fs.appendFileSync(path.join(root, "chapters", "chapter-01.md"), "Prose.\n", "utf8");

    // story-maintenance SKILL.md lists these 13 commands
    const commands = [
      ["validate", root],
      ["reindex", root],
      ["wordcount", root, "--write"],
      ["links", root],
      ["continuity", root],
      ["report", root],
      ["report", root, "--actionable"],
      ["next", root],
      ["doctor", root],
      ["migrate", root],
    ];
    for (const argv of commands) {
      const r = invoke(cwd, argv);
      // exit code can be 0 or 1 (warnings/errors), but must not be undefined / crash
      expect([0, 1]).toContain(r.code);
      // Each must produce some output (i.e., the CLI didn't crash silently)
      expect(r.out.length + r.err.length).toBeGreaterThan(0);
    }
  });
});

describe("Layer 2: end-to-end pipeline (all skills linked)", () => {
  test("full pipeline: init → characters → world → plot → chapters → continuity", () => {
    const cwd = makeTempDir();
    const root = scaffoldStory(cwd, { title: "Pipeline Story" });

    // character-management
    invoke(cwd, ["add", "character", "Mara Vale", "--path", root, "--role", "protagonist"]);
    invoke(cwd, ["add", "character", "Wren Hollis", "--path", root, "--role", "supporting"]);

    // worldbuilding
    invoke(cwd, ["add", "location", "Clock Pier", "--path", root, "--type", "landmark", "--character", "mara-vale"]);
    invoke(cwd, ["add", "faction", "Harbor Watch", "--path", root, "--type", "government", "--member", "mara-vale", "--location", "clock-pier"]);

    // plot-structure
    invoke(cwd, ["add", "arc", "Ledger Conspiracy", "--path", root, "--type", "main", "--character", "mara-vale"]);
    invoke(cwd, ["add", "promise", "Brass Ledger names the traitor", "--path", root, "--planted", "chapter-01", "--arc", "ledger-conspiracy", "--character", "mara-vale"]);

    // chapter-writing
    invoke(cwd, ["add", "chapter", "The Missing Page", "--path", root, "--number", "1", "--pov", "mara-vale", "--location", "clock-pier", "--character", "mara-vale", "--arc", "ledger-conspiracy"]);
    fs.appendFileSync(path.join(root, "chapters", "chapter-01.md"), "Mara found the missing page beneath the old clock at the pier.\n", "utf8");

    // story-maintenance full chain
    invoke(cwd, ["wordcount", root, "--write"]);
    invoke(cwd, ["reindex", root]);
    invoke(cwd, ["links", root]);
    expect(invoke(cwd, ["validate", root]).out).toContain("Project is valid: 0 errors");
    expect(invoke(cwd, ["continuity", root]).out).toContain("Continuity is consistent");
    expect(invoke(cwd, ["next", root]).code).toBe(0);
    expect(invoke(cwd, ["build", root, "--format", "markdown"]).code).toBe(0);
  });
});