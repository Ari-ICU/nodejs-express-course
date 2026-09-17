#!/usr/bin/env node
/**
 * generate-mdx.mjs
 * Reads all topics from curriculum.ts and writes them as individual MDX files
 * into src/content/<ModuleId>/<topicNum>.mdx
 *
 * Run once: node scripts/generate-mdx.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "src", "content");

// ── Inline curriculum data (extracted from curriculum.ts) ──────────────────
// We import the compiled data via a dynamic TS-compatible approach.
// Since Next.js already compiles TS, we use tsx to run this.

const { COURSE_MODULES } = await import("../src/data/curriculum.ts");

// ── Escape MDX-unsafe characters in prose ─────────────────────────────────
function escapeMdxProse(str) {
  if (!str) return "";
  // Escape lone < and > that aren't already in backticks
  return str
    .replace(/</g, "\\<")
    .replace(/>/g, "\\>")
    .replace(/\{/g, "\\{")
    .replace(/\}/g, "\\}");
}

// ── Generate one MDX file ──────────────────────────────────────────────────
function generateMdx(module, topic) {
  const lang = topic.codeLanguage || "javascript";
  const safeCode = topic.codeSnippet || "// No code snippet";
  const summary = topic.summary || "";
  const tip = topic.tip || "";
  const objective = topic.objective || "";
  const expectedOutcome = topic.expectedOutcome || "";

  return `export const meta = {
  id: "${topic.id}",
  number: "${topic.number}",
  title: "${topic.title.replace(/"/g, '\\"')}",
  khmerTitle: "${topic.khmerTitle.replace(/"/g, '\\"')}",
  type: "${topic.type}",
  codeLanguage: "${lang}",
  summary: ${JSON.stringify(summary)},
  codeSnippet: ${JSON.stringify(safeCode)},
  tip: ${JSON.stringify(tip)},
  objective: ${JSON.stringify(objective)},
  expectedOutcome: ${JSON.stringify(expectedOutcome)},
};

\`\`\`${lang}
${safeCode}
\`\`\`
`;
}


// ── Main ───────────────────────────────────────────────────────────────────
let totalFiles = 0;

for (const module of COURSE_MODULES) {
  const moduleDir = path.join(CONTENT_DIR, module.id);
  await fs.mkdir(moduleDir, { recursive: true });

  for (const topic of module.topics) {
    const filename = `${topic.number}.mdx`;
    const filepath = path.join(moduleDir, filename);
    const content = generateMdx(module, topic);
    await fs.writeFile(filepath, content, "utf-8");
    totalFiles++;
    console.log(`  ✓ ${module.id}/${filename}  — ${topic.title}`);
  }
}

console.log(`\n✅ Generated ${totalFiles} MDX files in src/content/`);
