# The Unraveled Thread

> **This example is intentionally broken.** It is the showcase for the
> `story continuity` command. It passes `story validate` and `story links`
> cleanly because every file is well-formed markdown with valid
> frontmatter, but the story itself does not hold together. Run
> `story continuity` against it to see the deterministic findings.

## Why this example exists

Long-range consistency is the thing language models are worst at, and
ordinary prompts cannot fix it. Story Skills makes it deterministic by
encoding character deaths, promise/payoff chapter ordering, open
questions, scene casts, and durable knowledge/object state in frontmatter,
then running a checker that treats contradictions like a compiler treats
type errors.

A project that *only* validates file format would prove the validator is
shallow. `the-unraveled-thread` exercises the deeper checks so you can:

1. See every class of finding the continuity engine reports in one place.
2. Use the expected output as a regression target (`scripts/check-examples.js`
   asserts these findings on every CI run).
3. Compare your own project's findings against a known-bad baseline.

## What breaks on purpose

The project deliberately violates each of the following rules. The
detection function that catches it is listed alongside.

### Errors (must fix)

| Finding | Caught by |
| --- | --- |
| `chapters/chapter-04.md lists edran-vale, who died in chapter-02; move posthumous appearances to mentions` | `checkCharacterDeaths` in `src/continuity.js` |
| `continuity/promises/the-broken-compass.md pays off in chapter-02 before it is planted in chapter-03` | `checkPromises` in `src/continuity.js` |
| `continuity/questions/who-burned-the-mill.md resolves in chapter-02 before it is introduced in chapter-03` | `checkQuestions` in `src/continuity.js` |
| `continuity/state.md knowledge-state[0] references missing chapter chapter-05` | `checkContinuityState` in `src/continuity.js` |

### Warnings (advisories)

| Finding | Caught by |
| --- | --- |
| `chapters/chapter-03.md POV character nessa-thorn is not listed in characters` | `checkChapterCasts` in `src/continuity.js` |
| `continuity/promises/the-sealed-letter.md was planted in chapter-01, 3 chapters ago, and has no payoff yet` | `checkPromises` (Chekhov gap) |
| `continuity/state.md object-state[0] status active conflicts with worldbuilding/artifacts/vales-compass.md status destroyed` | `checkContinuityState` (status reconciliation) |

## How to inspect the findings

From the repository root:

```shell
story continuity examples/the-unraveled-thread
```

You should see the same four errors and three warnings listed above, in
the order shown. The CI script `scripts/check-examples.js` compares the
output against this exact list and fails the build if any finding is
added, removed, or rephrased.

To make the project clean (the chapter reordering shown below is one of
several valid fixes):

1. Move `edran-vale` from chapter-04's `characters` field to its
   `mentions` field.
2. Reorder the promise so `the-broken-compass` is planted in chapter-02
   and paid off in chapter-03 (or rewrite both references).
3. Reorder the question the same way, or rewrite it so the mystery is
   introduced in chapter-02 and resolved in chapter-03.
4. Either create `chapter-05.md` or change `knowledge-state[0].learned-in`
   to point at an existing chapter id.

After the four errors are gone, the warnings become informational:

- The POV-not-listed warning can be cleared by adding `nessa-thorn` to
  `chapter-03.md`'s `characters` list.
- The Chekhov gap warning clears once `the-sealed-letter` is paid off.
- The object-state conflict warning clears once `object-state[0].status`
  matches the artifact's actual status.

## What this example is NOT

- It is not a tutorial for writing prose. For that, look at
  `examples/the-last-ember/` and `examples/harbor-of-second-light/`.
- It is not a stress test of `story validate` or `story links`. Those
  commands should pass cleanly here; the breakage is intentional only at
  the continuity layer.
- It is not a benchmark for performance. The project is tiny by design.

## When to add a new finding

If you change the continuity engine and `scripts/check-examples.js`
fails, the breakage is in one of two places:

1. **The engine changed** and you need to update both this example and
   the expected finding strings in `scripts/check-examples.js`. Make
   sure the change is intentional and document it in `CHANGELOG.md`.
2. **You accidentally fixed the example.** Verify the file still
   contains the deliberate violation, then update
   `scripts/check-examples.js` accordingly.

Either way, run `bun run test:examples` locally before pushing.
