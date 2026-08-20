// 重写 continuity.js：所有 push 点走 i18n
import path from "node:path";
import { t } from "./i18n.js";
import { td } from "./diagnostics.js";

const CHEKHOV_CHAPTER_GAP = 3;

export function checkContinuity(project, lang = "en") {
  const errors = [];
  const warnings = [];
  const context = {
    chapterNumbers: new Map(project.chapters.map((chapter) => [chapter.id, chapter.number])),
    characters: new Map(project.characters.map((character) => [character.id, character])),
    locations: new Set(project.locations.map((location) => location.id)),
    artifacts: new Map(project.artifacts.map((artifact) => [artifact.id, artifact])),
    factions: new Set(project.factions.map((faction) => faction.id)),
    latestChapter: project.chapters.reduce((max, chapter) => Math.max(max, chapter.number), 0)
  };

  checkCharacterDeaths(project, context, errors, warnings, lang);
  checkChapterCasts(project, warnings, lang);
  checkSceneCasts(project, warnings, lang);
  checkChapterSequence(project, warnings, lang);
  checkPromises(project, context, errors, warnings, lang);
  checkQuestions(project, context, errors, lang);
  checkStoryCompletion(project, errors, lang);
  checkContinuityState(project, context, errors, warnings, lang);

  return { ok: errors.length === 0, errors, warnings };
}

function checkCharacterDeaths(project, context, errors, warnings, lang) {
  for (const character of project.characters) {
    if (!character.diedIn) {
      continue;
    }

    const label = relativeToRoot(project, character.file);
    if (character.status !== "deceased") {
      errors.push(td(lang, "diagDeathStatusMismatch", label, character.diedIn, character.status || "unset"));
    }

    const deathNumber = context.chapterNumbers.get(character.diedIn);
    if (deathNumber === undefined) {
      errors.push(td(lang, "diagDiedInMissingChapter", label, character.diedIn));
      continue;
    }

    for (const chapter of project.chapters) {
      if (chapter.number > deathNumber && castIncludes(chapter, character.id)) {
        errors.push(td(lang, "diagPosthumousAppearance", relativeToRoot(project, chapter.file), character.id, character.diedIn));
      }
    }

    for (const scene of project.scenes) {
      const sceneChapterNumber = context.chapterNumbers.get(scene.chapter);
      if (sceneChapterNumber !== undefined && sceneChapterNumber > deathNumber && castIncludes(scene, character.id)) {
        errors.push(td(lang, "diagPosthumousAppearance", relativeToRoot(project, scene.file), character.id, character.diedIn));
      }
    }
  }
}

function checkChapterCasts(project, warnings, lang) {
  for (const chapter of project.chapters) {
    if (chapter.pov && !chapter.characters.includes(chapter.pov)) {
      warnings.push(td(lang, "diagPovNotInCharacters", relativeToRoot(project, chapter.file), chapter.pov));
    }
  }
}

function checkSceneCasts(project, warnings, lang) {
  const chapters = new Map(project.chapters.map((chapter) => [chapter.id, chapter]));

  for (const scene of project.scenes) {
    const label = relativeToRoot(project, scene.file);
    if (scene.pov && !scene.characters.includes(scene.pov)) {
      warnings.push(td(lang, "diagPovNotInCharacters", label, scene.pov));
    }

    const chapter = chapters.get(scene.chapter);
    if (!chapter) {
      continue;
    }

    for (const characterId of scene.characters) {
      if (!chapter.characters.includes(characterId) && !chapter.mentions.includes(characterId)) {
        warnings.push(td(lang, "diagSceneCharacterNotInChapter", label, label, characterId, relativeToRoot(project, chapter.file)));
      }
    }

    if (scene.location && chapter.locations.length > 0 && !chapter.locations.includes(scene.location)) {
      warnings.push(td(lang, "diagSceneLocationNotInChapter", label, label, scene.location, relativeToRoot(project, chapter.file)));
    }
  }
}

function checkChapterSequence(project, warnings, lang) {
  const numbers = project.chapters
    .map((chapter) => chapter.number)
    .filter((number) => Number.isInteger(number) && number > 0)
    .sort((left, right) => left - right);

  for (let index = 1; index < numbers.length; index += 1) {
    if (numbers[index] > numbers[index - 1] + 1) {
      warnings.push(td(lang, "diagChapterSkip", numbers[index - 1], numbers[index]));
    }
  }
}

function checkPromises(project, context, errors, warnings, lang) {
  for (const promise of project.promises) {
    const label = relativeToRoot(project, promise.file);
    const plantedNumber = context.chapterNumbers.get(promise.planted);
    const payoffNumber = context.chapterNumbers.get(promise.payoff);

    if (plantedNumber !== undefined && payoffNumber !== undefined && payoffNumber < plantedNumber) {
      errors.push(td(lang, "diagPromiseOrder", label, promise.payoff, promise.planted));
    }

    if (promise.status === "paid-off" && !promise.payoff) {
      errors.push(td(lang, "diagPromisePaidOffNoPayoff", label));
    }

    if (promise.status === "planted" && !promise.planted) {
      errors.push(td(lang, "diagPromisePlantedMissing", label));
    }

    if (promise.status === "planted" && promise.planted && context.latestChapter > 0) {
      const plantedNumberLocal = context.chapterNumbers.get(promise.planted);
      if (plantedNumberLocal !== undefined && context.latestChapter - plantedNumberLocal >= CHEKHOV_CHAPTER_GAP) {
        warnings.push(td(lang, "diagPromiseChekhov", label, promise.planted, context.latestChapter - plantedNumberLocal));
      }
    }
  }
}

function checkQuestions(project, context, errors, lang) {
  for (const question of project.questions) {
    const label = relativeToRoot(project, question.file);
    const introducedNumber = context.chapterNumbers.get(question.introduced);
    const resolvedNumber = context.chapterNumbers.get(question.resolved);

    if (introducedNumber !== undefined && resolvedNumber !== undefined && resolvedNumber < introducedNumber) {
      errors.push(td(lang, "diagQuestionOrder", label, question.resolved, question.introduced));
    }

    if ((question.status === "answered" || question.status === "resolved") && !question.resolved) {
      errors.push(td(lang, "diagQuestionStatusMissingResolved", label, question.status));
    }

    if (question.status === "open" && question.resolved) {
      errors.push(td(lang, "diagQuestionStatusStillOpen", label, question.resolved));
    }
  }
}

function checkStoryCompletion(project, errors, lang) {
  if (project.story.data.status !== "complete") {
    return;
  }

  for (const promise of project.promises) {
    if (promise.status === "planned" || promise.status === "planted") {
      errors.push(td(lang, "diagStoryCompletePromiseStillOpen", relativeToRoot(project, promise.file), promise.status));
    }
  }

  for (const question of project.questions) {
    if (question.status === "open") {
      errors.push(td(lang, "diagStoryCompleteQuestionStillOpen", relativeToRoot(project, question.file)));
    }
  }
}

function checkContinuityState(project, context, errors, warnings, lang) {
  if (!project.continuity) {
    return;
  }

  const label = path.join("continuity", "state.md");
  const data = project.continuity.data;
  const currentChapter = data["current-chapter"];

  if (Number.isInteger(currentChapter)) {
    if (currentChapter > context.latestChapter) {
      errors.push(td(lang, "diagCurrentChapterAhead", label, currentChapter, context.latestChapter));
    } else if (currentChapter < context.latestChapter) {
      warnings.push(td(lang, "diagCurrentChapterBehind", label, currentChapter, context.latestChapter));
    }
  }

  for (const [index, entry] of stateEntries(data["character-state"]).entries()) {
    const entryLabel = `${label} character-state[${index}]`;
    if (!requireMapping(entry, entryLabel, errors, lang)) {
      continue;
    }
    if (!entry.character || !context.characters.has(entry.character)) {
      errors.push(td(lang, "diagMissingCharacter", entryLabel, entry.character || "(unset)"));
    }
    if (entry.location && !context.locations.has(entry.location)) {
      errors.push(td(lang, "diagMissingLocation", entryLabel, entry.location));
    }
  }

  for (const [index, entry] of stateEntries(data["knowledge-state"]).entries()) {
    const entryLabel = `${label} knowledge-state[${index}]`;
    if (!requireMapping(entry, entryLabel, errors, lang)) {
      continue;
    }
    if (!entry.character || !context.characters.has(entry.character)) {
      errors.push(td(lang, "diagMissingCharacter", entryLabel, entry.character || "(unset)"));
    }
    if (!entry.knows) {
      errors.push(td(lang, "diagMissingKnowledgeKnows", entryLabel));
    }
    if (entry["learned-in"] && !context.chapterNumbers.has(entry["learned-in"])) {
      errors.push(td(lang, "diagMissingChapter", entryLabel, entry["learned-in"]));
    }
  }

  for (const [index, entry] of stateEntries(data["object-state"]).entries()) {
    const entryLabel = `${label} object-state[${index}]`;
    if (!requireMapping(entry, entryLabel, errors, lang)) {
      continue;
    }
    const artifact = context.artifacts.get(entry.artifact);
    if (!entry.artifact || !artifact) {
      errors.push(td(lang, "diagMissingArtifact", entryLabel, entry.artifact || "(unset)"));
    }
    if (entry.owner && !context.characters.has(entry.owner) && !context.factions.has(entry.owner)) {
      errors.push(td(lang, "diagMissingOwner", entryLabel, entry.owner));
    }
    if (entry.location && !context.locations.has(entry.location)) {
      errors.push(td(lang, "diagMissingLocation", entryLabel, entry.location));
    }
    if (entry.status && artifact && artifact.status && entry.status !== artifact.status) {
      warnings.push(td(lang, "diagObjectStateStatusMismatch", entryLabel, entry.status, relativeToRoot(project, artifact.file)));
    }
  }
}

function castIncludes(record, characterId) {
  return record.pov === characterId || record.characters.includes(characterId);
}

function stateEntries(value) {
  return Array.isArray(value) ? value : [];
}

function requireMapping(entry, entryLabel, errors, lang) {
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
    errors.push(td(lang, "diagMustBeMapping", entryLabel));
    return false;
  }
  return true;
}

function relativeToRoot(project, file) {
  return path.relative(project.root, file);
}
