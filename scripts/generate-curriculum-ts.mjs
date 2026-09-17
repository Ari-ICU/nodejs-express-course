#!/usr/bin/env node
/**
 * generate-curriculum-ts.mjs
 * Regenerates src/data/curriculum.ts and updates topicCount in src/content/_modules.ts
 * directly from the single source of truth in scripts/curriculum-data/
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const { MODULES_01_05 } = await import("./curriculum-data/modules-01-05.mjs");
const { MODULES_06_10 } = await import("./curriculum-data/modules-06-10.mjs");
const { MODULES_11_15 } = await import("./curriculum-data/modules-11-15.mjs");
const { MODULES_16_29 } = await import("./curriculum-data/modules-16-29.mjs");

const ALL_MODULES = {
  ...MODULES_01_05,
  ...MODULES_06_10,
  ...MODULES_11_15,
  ...MODULES_16_29,
};

// 1. Build MODULE_TOPICS for curriculum.ts
const moduleTopicsLines = [];
for (const [modId, topics] of Object.entries(ALL_MODULES)) {
  moduleTopicsLines.push(`  ${modId}: [`);
  for (const t of topics) {
    const item = {
      id: t.id,
      number: t.number,
      title: t.title,
      khmerTitle: t.khmerTitle,
      type: t.type,
      codeLanguage: t.codeLanguage || "javascript",
    };
    moduleTopicsLines.push(`    ${JSON.stringify(item)},`);
  }
  moduleTopicsLines.push(`  ],`);
}

const curriculumTsContent = `/**
 * curriculum.ts
 *
 * Complete syllabus and navigation metadata for all 29 modules (382 topics).
 * In-depth lesson prose, interactive code snippets, tips, and objectives
 * live in individual MDX files under src/content/<ModuleId>/<TopicNumber>.mdx
 */

import { MODULES, type ModuleCategory } from "@/content/_modules";

export type { ModuleCategory };

export interface LessonTopic {
  id: string;        // e.g. "M01-01"
  number: string;    // e.g. "01"
  title: string;
  khmerTitle: string;
  type: "concept" | "lab" | "architecture";
  codeLanguage?: string;
  summary?: string;
  codeSnippet?: string;
  tip?: string;
  objective?: string;
  expectedOutcome?: string;
}

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  khmerTitle: string;
  category: ModuleCategory;
  accentColor: string;
  description: string;
  duration: string;
  topics: LessonTopic[];
}

const MODULE_TOPICS: Record<string, LessonTopic[]> = {
${moduleTopicsLines.join("\n")}
};

export const COURSE_MODULES: CourseModule[] = MODULES.map((mod) => ({
  id: mod.id,
  number: mod.number,
  title: mod.title,
  khmerTitle: mod.khmerTitle,
  category: mod.category,
  accentColor: mod.accentColor,
  duration: mod.duration,
  description: mod.description,
  topics: MODULE_TOPICS[mod.id] ?? [],
}));
`;

const curriculumTsPath = path.join(ROOT, "src", "data", "curriculum.ts");
await fs.writeFile(curriculumTsPath, curriculumTsContent, "utf-8");
console.log(`✓ Updated: ${curriculumTsPath}`);

// 2. Update topicCount in src/content/_modules.ts
const modulesTsPath = path.join(ROOT, "src", "content", "_modules.ts");
let modulesTs = await fs.readFile(modulesTsPath, "utf-8");

for (const [modId, topics] of Object.entries(ALL_MODULES)) {
  // Regex matches: id: "M16", ... topicCount: \d+,
  const pattern = new RegExp(`(id:\\s*"${modId}"[\\s\\S]*?topicCount:\\s*)\\d+`, "m");
  if (pattern.test(modulesTs)) {
    modulesTs = modulesTs.replace(pattern, `$1${topics.length}`);
  }
}

await fs.writeFile(modulesTsPath, modulesTs, "utf-8");
console.log(`✓ Updated topic counts in: ${modulesTsPath}`);
