import path from "node:path";
import { assertSafeProjectPathCli } from "./security.js";
import { getHelp, resolveLang, t } from "./i18n.js";
import { setLang } from "./i18n.js";
import { importManuscript } from "./import.js";
import {
  buildBook,
  checkProjectContinuity,
  computeWordCounts,
  createEntity,
  createStoryProject,
  exportManuscript,
  formatActionReport,
  formatDoctorReport,
  formatProjectReport,
  migrateProject,
  projectReport,
  projectActions,
  reindexProject,
  removeEntity,
  renameEntity,
  validateLinks,
  validateProject
} from "./story.js";



export function runCli(argv, io) {
  const parsed = parseArgs(argv);
  const lang = resolveLang(parsed.options, process.env);
  setLang(lang);
  const cwd = io.cwd ?? process.cwd();
  const command = parsed.positionals[0];

  try {
    if (!command || command === "help" || parsed.options.help) {
      io.stdout.write(getHelp(lang));
      return 0;
    }

    if (command === "init") {
      const title = parsed.positionals.slice(1).join(" ");
      const result = createStoryProject({
        title,
        cwd,
        dir: parsed.options.dir,
        genre: parsed.options.genre,
        subGenre: parsed.options["sub-genre"],
        settingEra: parsed.options["setting-era"],
        themes: collectThemes(parsed.options),
        pov: parsed.options.pov,
        tense: parsed.options.tense,
        synopsis: parsed.options.synopsis,
        force: Boolean(parsed.options.force)
      }, lang);
      io.stdout.write(t(lang, "projectCreated", result.root) + "\n");
      return 0;
    }

    if (command === "import") {
      const result = importManuscript({
        source: parsed.positionals[1],
        title: parsed.options.title,
        cwd,
        dir: parsed.options.dir,
        genre: parsed.options.genre,
        subGenre: parsed.options["sub-genre"],
        settingEra: parsed.options["setting-era"],
        themes: collectThemes(parsed.options),
        pov: parsed.options.pov,
        tense: parsed.options.tense,
        synopsis: parsed.options.synopsis,
        force: Boolean(parsed.options.force)
      }, lang);
      io.stdout.write(t(lang, "importedWithCount", result.chapters, result.words, result.root));
      if (result.candidates.length > 0) {
        io.stdout.write(t(lang, "candidatesHeader"));
        for (const candidate of result.candidates) {
          io.stdout.write(t(lang, "candidate", candidate.name, candidate.count));
        }
      }
      return 0;
    }

    const root = assertSafeProjectPathCli(path.resolve(cwd, parsed.positionals[1] ?? "."), cwd, lang);
    if (command === "validate") {
      return reportResult(io, validateProject(root, { lang }), lang, t(lang, "valid"), t(lang, "validFail"));
    }

    if (command === "links") {
      return reportResult(io, validateLinks(root, { lang }), lang, t(lang, "linksValid"), t(lang, "linksFail"));
    }

    if (command === "continuity") {
      return reportResult(io, checkProjectContinuity(root, { lang }), lang, t(lang, "continuityValid"), t(lang, "continuityFail"));
    }

    if (command === "report") {
      io.stdout.write(formatProjectReport(projectReport(root), { actionable: Boolean(parsed.options.actionable) }));
      return 0;
    }

    if (command === "next") {
      io.stdout.write(formatActionReport(projectActions(root)));
      return 0;
    }

    if (command === "doctor") {
      io.stdout.write(formatDoctorReport(projectActions(root)));
      return 0;
    }

    if (command === "migrate") {
      const result = migrateProject(root);
      io.stdout.write(result.changed.length === 0
        ? t(lang, "alreadyCurrent")
        : t(lang, "migrated", result.changed.length));
      return 0;
    }

    if (command === "add") {
      const result = createEntity(targetRoot(cwd, parsed), {
        ...parsed.options,
        kind: parsed.positionals[1],
        name: parsed.positionals.slice(2).join(" ")
      }, lang);
      io.stdout.write(t(lang, "created", result.kind, result.id, result.file));
      return 0;
    }

    if (command === "rename") {
      const result = renameEntity(targetRoot(cwd, parsed), {
        ...parsed.options,
        kind: parsed.positionals[1],
        id: parsed.positionals[2],
        name: parsed.positionals.slice(3).join(" ")
      }, lang);
      io.stdout.write(t(lang, "renamed", result.kind, result.oldId, result.id, result.file));
      return 0;
    }

    if (command === "remove") {
      const result = removeEntity(targetRoot(cwd, parsed), {
        ...parsed.options,
        kind: parsed.positionals[1],
        id: parsed.positionals[2]
      }, lang);
      io.stdout.write(t(lang, "removed", result.kind, result.id, result.file));
      return 0;
    }

    if (command === "reindex") {
      const result = reindexProject(root);
      io.stdout.write(result.changed.length === 0
        ? t(lang, "reindexCurrent")
        : t(lang, "reindexed", result.changed.length));
      return 0;
    }

    if (command === "wordcount") {
      const result = computeWordCounts(root, { write: Boolean(parsed.options.write) });
      for (const chapter of result.chapters) {
        io.stdout.write(t(lang, "chapterWords", chapter.file, chapter.wordCount) + "\n");
      }
      io.stdout.write(t(lang, "totalWords", result.total) + "\n");
      return 0;
    }

    if (command === "export") {
      const result = exportManuscript(root, { out: parsed.options.out }, lang);
      io.stdout.write(t(lang, "exported", result.chapters, result.outFile) + "\n");
      return 0;
    }

    if (command === "build") {
      const result = buildBook(root, {
        out: parsed.options.out,
        format: parsed.options.format
      }, lang);
      io.stdout.write(t(lang, "built", result.chapters, result.format, result.outFile) + "\n");
      return 0;
    }

    io.stderr.write(t(lang, "unknownCommand", command) + getHelp(lang));
    return 1;
  } catch (error) {
    io.stderr.write(`${error.message}\n`);
    return 1;
  }
}

export function parseArgs(argv) {
  const positionals = [];
  const options = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "-h" || arg === "--help") {
      options.help = true;
      continue;
    }

    if (!arg.startsWith("--")) {
      positionals.push(arg);
      continue;
    }

    const equalIndex = arg.indexOf("=");
    const key = arg.slice(2, equalIndex === -1 ? undefined : equalIndex);
    const inlineValue = equalIndex === -1 ? undefined : arg.slice(equalIndex + 1);
    const nextValue = argv[index + 1];
    const hasSeparateValue = inlineValue === undefined && nextValue !== undefined && !nextValue.startsWith("-");
    const value = inlineValue ?? (hasSeparateValue ? nextValue : true);

    if (hasSeparateValue) {
      index += 1;
    }

    if (options[key] === undefined) {
      options[key] = value;
    } else {
      options[key] = Array.isArray(options[key]) ? options[key].concat(value) : [options[key], value];
    }
  }

  return { positionals, options };
}

function collectThemes(options) {
  return []
    .concat(options.theme ?? [])
    .concat(options.themes ?? [])
    .filter((value) => value !== undefined && value !== true);
}

function targetRoot(cwd, parsed) {
  return path.resolve(cwd, parsed.options.path ?? ".");
}

function reportResult(io, result, lang, successMessage, failureMessage) {
  const output = result.ok ? io.stdout : io.stderr;
  output.write(`${result.ok ? successMessage : failureMessage}` + t(lang, "summary", result.errors.length, result.warnings.length));

  for (const error of result.errors) {
    io.stderr.write(`error: ${error}\n`);
  }

  for (const warning of result.warnings) {
    output.write(`warning: ${warning}\n`);
  }

  return result.ok ? 0 : 1;
}
