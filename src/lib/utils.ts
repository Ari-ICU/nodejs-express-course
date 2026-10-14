import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function getAssetUrl(path?: string): string {
  if (!path) return "";
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (basePath && path.startsWith("/") && !path.startsWith(basePath)) {
    return `${basePath}${path}`;
  }
  return path;
}

/**
 * Resolves a clean, realistic filename for displaying code blocks.
 *
 * 1. Returns explicitFilename if supplied.
 * 2. Scans leading comment lines for real file paths (e.g. `// src/server.js`,
 *    `# .env`, `// Dockerfile`, `// Service Layer (src/services/course.service.js)`).
 * 3. Falls back to a clean, semantic slug derived from the topic title and language
 *    (e.g. `dynamic-query-filtering.js`), ensuring no generic `mXX-topic-YY.js` placeholders.
 */
export function resolveCodeFilename(
  code?: string,
  explicitFilename?: string,
  title?: string,
  language?: string,
  moduleId?: string,
  topicNumber?: string
): string {
  if (explicitFilename && explicitFilename.trim()) {
    return explicitFilename.trim();
  }

  if (code && typeof code === "string") {
    const lines = code.trim().split("\n").slice(0, 6);
    for (const rawLine of lines) {
      const line = rawLine.trim();

      if (/^(?:\/\/|#|\/\*+|\*+|--)/.test(line)) {
        const uncommented = line
          .replace(/^(?:\/\/+|#+|\/\*+|\*+|\s*--+)\s*/, "")
          .trim();

        // 1. Bracketed/parenthesized path: "(src/services/course.service.js)" or "[src/routes.js]"
        const parenMatch = uncommented.match(
          /[\(\[]\s*([a-zA-Z0-9_\-.\/]+\.[a-zA-Z0-9]+|Dockerfile(?:\.[a-zA-Z0-9_\-]+)?|\.env(?:\.[a-zA-Z0-9_\-]+)?)\s*[\)\]]/i
        );
        if (parenMatch && !isIgnoredTech(parenMatch[1])) {
          return cleanPath(parenMatch[1]);
        }

        // 2. Explicit label: "File: src/server.js", "Path: config/db.js"
        const prefixMatch = uncommented.match(
          /(?:File|Path|Filename)\s*:\s*([a-zA-Z0-9_\-.\/]+)/i
        );
        if (prefixMatch && !isIgnoredTech(prefixMatch[1])) {
          return cleanPath(prefixMatch[1]);
        }

        // 3. Standalone file path at start of comment: e.g. "src/server.js", ".env", "Dockerfile"
        const startPathMatch = uncommented.match(
          /^([a-zA-Z0-9_\-.\/]+\.(?:js|mjs|cjs|ts|tsx|jsx|json|ya?ml|env|sh|bash|sql|http|html|css|txt|conf)|Dockerfile(?:\.[a-zA-Z0-9_\-]+)?|\.env(?:\.[a-zA-Z0-9_\-]+)?)\b/i
        );
        if (startPathMatch && !isIgnoredTech(startPathMatch[1])) {
          return cleanPath(startPathMatch[1]);
        }

        // 4. Any relative/nested path in comment: e.g. "src/routes/course.routes.js"
        const anyPathMatch = uncommented.match(
          /\b([a-zA-Z0-9_\-]+\/[a-zA-Z0-9_\-.\/]+\.(?:js|mjs|cjs|ts|tsx|jsx|json|ya?ml|env|sh|bash|sql|http|html|css))\b/i
        );
        if (anyPathMatch && !isIgnoredTech(anyPathMatch[1])) {
          return cleanPath(anyPathMatch[1]);
        }
      }
    }
  }

  // Fallback: Clean semantic slug based on topic title & language
  const ext =
    language === "bash" || language === "shell"
      ? "sh"
      : language === "http"
      ? "http"
      : language === "json"
      ? "json"
      : language === "yaml" || language === "yml"
      ? "yml"
      : language === "sql"
      ? "sql"
      : language === "typescript"
      ? "ts"
      : language === "html"
      ? "html"
      : language === "css"
      ? "css"
      : "js";

  if (title && title.trim()) {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    if (slug) {
      return `${slug}.${ext}`;
    }
  }

  const modStr = moduleId ? moduleId.toLowerCase() : "code";
  const numStr = topicNumber ? String(topicNumber).padStart(2, "0") : "01";
  return `${modStr}-topic-${numStr}.${ext}`;
}

function isIgnoredTech(str: string): boolean {
  const s = str.toLowerCase();
  return (
    s === "node.js" ||
    s === "express.js" ||
    s === "react.js" ||
    s === "next.js" ||
    s === "vue.js" ||
    s === "nest.js" ||
    s === "deno.js" ||
    s === "bun.js"
  );
}

function cleanPath(p: string): string {
  return p
    .replace(/^\.\//, "")
    .replace(/[),;:.]+$/, "")
    .trim();
}

