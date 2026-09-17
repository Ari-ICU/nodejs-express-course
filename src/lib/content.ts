/**
 * src/lib/content.ts
 * Server-side content loader for MDX lesson files.
 *
 * Each MDX file exports:
 *   - `meta`  — typed TopicMeta object (id, title, khmerTitle, etc.)
 *   - default — the compiled React component (summary prose + code block)
 *
 * The functions here are async and should only be called from Server Components
 * or at module build time.
 */

import type { JSX } from "react";
import { MODULES, type ModuleMeta } from "@/content/_modules";

// ── Types ────────────────────────────────────────────────────────────────────

export type TopicType = "concept" | "lab" | "architecture";

export interface TopicMeta {
  id: string;           // e.g. "M03-01"
  number: string;       // e.g. "01"
  title: string;
  khmerTitle: string;
  type: TopicType;
  codeLanguage: string;
  summary: string;      // prose description (also rendered as MDX body)
  codeSnippet?: string;
  tip?: string;
  objective?: string;
  expectedOutcome?: string;
}

export interface LoadedTopic {
  meta: TopicMeta;
  /** The compiled MDX component — renders summary + code block */
  Content: () => JSX.Element;
}

export interface LoadedModule extends ModuleMeta {
  topics: LoadedTopic[];
}

// ── MDX loader ───────────────────────────────────────────────────────────────

/**
 * Load a single topic MDX file dynamically.
 * Returns the `meta` export and the default component.
 */
export async function loadTopic(
  moduleId: string,
  topicNumber: string
): Promise<LoadedTopic> {
  // Dynamic import of the MDX file — Next.js compiles these at build/request time
  const mod = await import(`@/content/${moduleId}/${topicNumber}.mdx`) as {
    meta: TopicMeta;
    default: () => JSX.Element;
  };

  return {
    meta: mod.meta,
    Content: mod.default,
  };
}

/**
 * Load all topics for a given module in order.
 */
export async function loadModule(moduleId: string): Promise<LoadedModule> {
  const moduleMeta = MODULES.find((m) => m.id === moduleId);
  if (!moduleMeta) throw new Error(`Module not found: ${moduleId}`);

  const topics: LoadedTopic[] = [];
  for (let i = 1; i <= moduleMeta.topicCount; i++) {
    const num = String(i).padStart(2, "0");
    const topic = await loadTopic(moduleId, num);
    topics.push(topic);
  }

  return { ...moduleMeta, topics };
}

// ── Convenience re-exports ───────────────────────────────────────────────────

export { MODULES };
export type { ModuleMeta };
