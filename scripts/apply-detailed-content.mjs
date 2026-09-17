#!/usr/bin/env node
/**
 * apply-detailed-content.mjs
 * Reads all detailed curriculum data files and writes/overwrites every
 * MDX file in src/content/ with rich, detailed lesson content.
 *
 * Run: node scripts/apply-detailed-content.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "src", "content");

// Import all data files
const { MODULES_01_05 } = await import("./curriculum-data/modules-01-05.mjs");
const { MODULES_06_10 } = await import("./curriculum-data/modules-06-10.mjs");
const { MODULES_11_15 } = await import("./curriculum-data/modules-11-15.mjs");
const { MODULES_16_29 } = await import("./curriculum-data/modules-16-29.mjs");

// Merge all modules
const ALL_MODULES = {
  ...MODULES_01_05,
  ...MODULES_06_10,
  ...MODULES_11_15,
  ...MODULES_16_29,
};

// Generate MDX file content for a topic
function generateMdx(topic) {
  const lang = topic.codeLanguage || "javascript";
  const code = topic.codeSnippet || "// No code snippet";
  const summary = topic.summary || "";
  const tip = topic.tip || "";
  const objective = topic.objective || "";
  const expectedOutcome = topic.expectedOutcome || "";

  return `export const meta = {
  id: ${JSON.stringify(topic.id)},
  number: ${JSON.stringify(topic.number)},
  title: ${JSON.stringify(topic.title)},
  khmerTitle: ${JSON.stringify(topic.khmerTitle)},
  type: ${JSON.stringify(topic.type)},
  codeLanguage: ${JSON.stringify(lang)},
  summary: ${JSON.stringify(summary)},
  tip: ${JSON.stringify(tip)},
  objective: ${JSON.stringify(objective)},
  expectedOutcome: ${JSON.stringify(expectedOutcome)},
  codeSnippet: ${JSON.stringify(code)},
};

\`\`\`${lang}
${code}
\`\`\`
`;
}

let written = 0;
let skipped = 0;

for (const [moduleId, topics] of Object.entries(ALL_MODULES)) {
  const moduleDir = path.join(CONTENT_DIR, moduleId);
  await fs.mkdir(moduleDir, { recursive: true });

  for (const topic of topics) {
    const filename = `${topic.number}.mdx`;
    const filepath = path.join(moduleDir, filename);
    const content = generateMdx(topic);
    await fs.writeFile(filepath, content, "utf-8");
    written++;
    console.log(`  ✓ ${moduleId}/${filename} — ${topic.title}`);
  }
}

console.log(`\n✅ Written ${written} MDX files | Skipped ${skipped}`);
