# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
## [Unreleased] - Chinese-Localized Fork Hardening


The Chinese-localized fork in `story-skills-zh/` ships a hardening patch
on top of upstream v0.3.1. None of these change the public CLI surface
or the file-format contract; they only repair bugs and inconsistencies
discovered while auditing the mirror.

- **`test/cjk.test.js` import mismatch (upstream bug)**: the test file
  imports `assertSafeProjectPath`, but `src/security.js` only exported
  `assertSafeProjectPathCli`. Added a back-compat alias so both names
  resolve to the same function; the two previously-failing cjk tests
  now pass.

- **Eight `ReferenceError: lang is not defined` paths**: seven helpers
  in `src/story.js` (`normalizeBuildFormat`, `entityConfig`,
  `manuscriptParts`, `buildEntity` scene branch, `ensureFile`,
  `ensureDirectory`, `assertSafeProjectDirectory`) plus one in
  `src/import.js` (`readSourceDocuments`) referenced a bare `lang`
  identifier that was never in scope. Replaced each with
  `currentLang()` and added the missing `currentLang` import to
  `import.js`. Errors like `--format pdf` or `add ghost ...` now print
  friendly bilingual messages instead of stack traces.

- **`STORY_SKILLS_LANG` env var never read**: `cli.js` called
  `resolveLang(parsed.options)` without passing `process.env`, even
  though the HELP text documented the variable. Now
  `resolveLang(parsed.options, process.env)` is used and the env var
  actually overrides the default language.

- **`kebabCase` joined adjacent Han pinyin without separators**:
  `王友` produced `wangyou` instead of `wang-you` because the
  post-processing regex only collapsed non-alphanumeric runs. Each
  Han pinyin now contributes a leading `-`, the collapse regex is
  `/-+/g`, and the trim step strips edges. All cjk.test.js
  expectations pass.

- **`build-diag.js` was missing 4 diagnostic entries**: running the
  user's codegen at the repo root would silently delete
  `diagMustBeInteger`, `diagFieldRelationshipsMustBeList`,
  `diagFieldRelationshipsMustBeObjects`, and `diagMustBeMapping`
  from `src/diagnostics.js`. Added the 4 missing entries; the
  regenerated file now matches upstream modulo whitespace.

- **`package.json` declared a `schemas/` directory that did not
  exist**: created `schemas/.gitkeep` so the `files` declaration
  becomes accurate.

### Known issues still in this fork

- `examples/yu-ye-zhi-mi/` has a hex hash story id (`cjk-45f1a965`)
  because the title `雨夜之谜` has no character in the pinyin map.
  Functional but ugly.
- `.agents/plugins/marketplace.json` references a `./plugins/story-skills`
  symlink that does not exist in the working tree; the README says
  this is intentional and expects the symlink to be created at
  publish time.

## [Unreleased] - Hardening Pass

### Added

- **`src/security.js`** — new module with three utilities used across the
  CLI and library code:
  - `assertNoSymlinks(root)` walks the project tree and rejects any
    symbolic link inside the project root, closing a class of read-anywhere
    issues when an untrusted markdown file references paths outside the
    story root.
  - `assertSafeProjectPath(target, root)` resolves `target` and throws if
    it escapes `root`. Wired into `cli.js` so `--path` and `--dir` flags
    cannot point outside the current working directory.
  - `atomicWriteFile(filePath, contents)` writes to a temporary file in
    the same directory and `rename`s it into place; on Windows it falls
    back to `copyFile` + `unlink` when the rename collides with an
    existing file. `reindexProject` now uses this so a crashed run cannot
    leave a half-written `_index.md` behind.
  - `withTempDir(prefix, fn)` is a small helper used by tests.

- **`test/cjk.test.js`** — new test file dedicated to CJK and Unicode
  coverage for `kebabCase`, `wordCount`, `chapterProse`,
  `extractNameCandidates`, and the new security helpers.

- **CI matrix** — `.github/workflows/ci.yml` now runs across
  `ubuntu-latest`, `macos-latest`, `windows-latest` and Node 18 / 20 / 22
  to surface cross-platform and version regressions. A separate `lint`
  job runs ESLint and Prettier on every push and pull request.

- **Tooling config** — `.eslintrc.json`, `.prettierrc`, `.editorconfig`
  added so contributors share a single formatting style. The CI `lint`
  job gates on `eslint --max-warnings=0` and `prettier --check`.

- **`examples/the-unraveled-thread/README.md`** — companion doc explaining
  that this example is deliberately broken to exercise every class of
  finding reported by `story continuity`. Maps each expected error and
  warning to the detection function that emits it.

- **`docs/schema-v2.md`** — adds an "Allowed Enum Values" appendix
  listing the values accepted by every enum field. Mirrors the constants
  in `src/story.js` so documentation cannot drift out of sync silently.

### Changed

- **`wordCount` in `src/markdown.js`** — the regex now uses Unicode
  property escapes (`\p{L}\p{N}`) so Chinese, Japanese, Korean, Arabic,
  Cyrillic, and Greek prose all count toward chapter word counts. ASCII
  behavior and contraction handling are preserved.

- **`kebabCase` in `src/markdown.js`** — Han characters are now mapped
  to their pinyin initials through a built-in lookup table for the most
  common surnames, given-name characters, and worldbuilding vocabulary.
  Characters outside the map fall back to a stable hex id (`cjk-XXXXXXXX`)
  so the user always gets a non-empty, deterministic id and can rename
  later via `story rename`. Mixed Latin + Han input is supported.

- **`extractNameCandidates` in `src/import.js`** — adds a third pass
  that surfaces 2-4 character Han strings as entity candidates during
  manuscript import. Latin and CJK candidates are reported together.

- **`scanProject` in `src/story.js`** — calls `assertNoSymlinks` at
  entry so any symbolic link inside the project root fails fast with a
  descriptive error.

- **`reindexProject` in `src/story.js`** — `_index.md` rewrites now go
  through `atomicWriteFile` so a process crash mid-write cannot leave a
  truncated registry file behind.

- **`cli.js`** — `--path` and `--dir` flags are validated against the
  current working directory by `assertSafeProjectPath`. A path that
  resolves outside `cwd` now fails with a clear message instead of
  silently writing elsewhere.

### Fixed

- **`story import` no longer drops CJK names** — previously the candidate
  extractor only matched Latin-capitalized spans, so a manuscript with
  Chinese-only character names produced an empty candidate list.

- **`story add character "<CJK name>"`** now produces a real id instead
  of collapsing to an empty string. Unknown Han characters fall back to
  a stable hex id; the user can rename via `story rename` if desired.

- **`story wordcount . --write`** now writes the correct number for
  CJK prose. Previously every Han character was silently dropped by the
  ASCII-only regex, so `word-count` in frontmatter was always 0 for
  Chinese chapters.

- **`reindexProject` no longer risks a partial write** — the rewrite
  path is now atomic; readers either see the old registry or the new
  one, never a half-written one.

- **`--path ../../etc`** and similar are now refused with a clear error
  instead of being silently resolved by `path.resolve`.



## [Unreleased] - Complete Chinese (Sinicization) Pass

### Added

- **`src/i18n.js`** — bilingual message dictionary (en + zh) with
  50+ top-level CLI keys (`init`, `add`, `rename`, `remove`,
  `import`, `export`, `build`, `report`, `next`, `doctor`,
  `migrate`, `unknownCommand`, etc.) and the help text. Exports
  `t(lang, key, ...args)`, `getHelp(lang)`, `resolveLang(options)`,
  `setLang(lang)`, and `getLang()`.

- **`src/diagnostics.js`** — bilingual diagnostic dictionary (en + zh)
  with 70+ validation/continuity keys (`diagMissingRequiredPath`,
  `diagChapterMissingCharacter`, `diagPromiseMissingChapter`, ...).
  Exports `td(lang, key, ...args)`.

- **`--lang <en|zh>` CLI flag** and **`STORY_SKILLS_LANG` env var**
  to switch the output language without changing the data.

- **Bilingual README, AGAG, schema docs, CLI docs, and yaml-fields docs**
  in `README.z.md`, `AGENTS.zh.md`, `docs/yaml-fields-zh.md`,
  `docs/cli-commands-zh.md`, `docs/first-20-minutes.zh.md`, etc.

- **CJK smoke test (`scripts/smoke-cjk.js`)**: 18 end-to-end checks
  covering Chinese `init`, kebab-id fallback, `add`, `validate`,
  `links`, `continuity`, security, `import`, candidate extraction,
  i18n wiring, and duplicate detection.

- **Chinese example project (`examples/yu-ye-zhi-mi/`)** with a 974-char
  chapter that validates cleanly to 0 errors / 0 warnings.

- **CJK character handling in `markdown.js`**: pinyin map for ~150
  common Han characters; CJK-aware `wordCount`; stable `cjk-XXXXXXXX`
  hex fallback for unmapped characters (reversible via `story rename`).

### Fixed

- **`warning: undefined` in validate output** — diagnostic messages
  were looked up via `t()` (which only knows top-level CLI messages)
  instead of `td()` (which knows the 70+ diagnostic keys). Threaded
  `td` through both `story.js` and `continuity.js`; rebuilt the
  bundled fallback.

- **`HELP is not defined` in unknown-command error path** — the
  catch-block in `cli.js` referenced an undefined constant instead of
  `getHelp(lang)`.

- **`lang is not defined` in deep helpers** — `readMarkdown`,
  `writeFile`, `safeRead`, and friends had no access to the
  user's chosen language. Added a module-level `currentLang` in
  `i18n.js` (set by `cli.js` via `setLang()` before each
  command) so deep helpers can produce localized errors.

### Changed

- **`story.js`** — threaded `lang` through 14 validator entry points
  and 6 helper functions (`validateStringArray`, `validateObjectArray`,
  `validateRelationships`, `validateEnum`, `requireFields`,
  `requireInteger`). All 50+ `errors.push`/`warnings.push` sites
  now route through `td(lang, ...)`. All 16+ `throw new Error(...)`
  sites now route through `t(lang, ...)`.

- **`continuity.js`** — same threading applied to all check functions;
  29 `errors.push`/`warnings.push` sites now route through `td()`.

- **`security.js`** — `assertNoSymlinks` and `assertSafeProjectPathCli`
  accept `lang` and emit Chinese errors via `t()`.

- **`import.js`** — `importManuscript` accepts `lang`; all four
  `throw new Error(...)` sites now route through `t()`.

- **`frontmatter.js`** — YAML parse errors now route through `t()`
  using `currentLang`.

- **CLI message paths** — `init`, `add`, `rename`, `remove`,
  `import`, `export`, `build`, `validate`, `links`,
  `continuity`, `wordcount`, `reindex`, `migrate`, `report`,
  `next`, `doctor`, `help`, and the catch-all error path all
  emit Chinese when `--lang zh` is set.


### Notes

- No public API was renamed. Existing scripts that import from
  `src/story.js` continue to work.
- The `package.json` `engines.node` constraint (`>=18`) is now exercised
  by the CI matrix.
- The bundled fallback `skills/story-maintenance/scripts/story.js`
  continues to be regenerated by `bun run build:fallback`. Run
  `bun run build:fallback` after pulling these changes to refresh it.
