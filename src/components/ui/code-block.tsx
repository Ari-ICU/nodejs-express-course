"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import type { Highlighter, ShikiTransformer } from "shiki";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

// ─── Shiki highlighter singleton ──────────────────────────────────────────────
// We create one shared highlighter instance and reuse it across all CodeBlock
// mounts to avoid re-initialising Shiki on every render.
let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = import("shiki").then(({ createHighlighter }) =>
      createHighlighter({
        themes: ["github-dark"],
        langs: [
          "javascript",
          "typescript",
          "jsx",
          "tsx",
          "json",
          "bash",
          "shell",
          "yaml",
          "html",
          "css",
          "sql",
          "text",
        ],
      })
    );
  }
  return highlighterPromise;
}

// ─── CodeBlock Component ───────────────────────────────────────────────────────
export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "javascript",
  filename,
  showLineNumbers = true,
}) => {
  const [copied, setCopied] = useState(false);
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null);

  const highlight = useCallback(async () => {
    try {
      const hl = await getHighlighter();
      const normalizedLang = normalizeLang(language);
      const html = hl.codeToHtml(code.trim(), {
        lang: normalizedLang,
        theme: "github-dark",
        transformers: showLineNumbers
          ? [lineNumberTransformer()]
          : [],
      });
      setHighlightedHtml(html);
    } catch {
      // Fallback: plain preformatted text
      setHighlightedHtml(null);
    }
  }, [code, language, showLineNumbers]);

  useEffect(() => {
    highlight();
  }, [highlight]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  return (
    <div className="relative group rounded-2xl border border-slate-700/60 bg-[#0d1117] overflow-hidden shadow-lg hover:border-slate-600/80 transition-all duration-200">
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-slate-700/60 text-xs text-slate-400">
        <div className="flex items-center gap-2.5">
          {/* macOS traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>

          {filename ? (
            <span className="font-mono text-slate-300 font-medium ml-1">
              {filename}
            </span>
          ) : (
            <span className="flex items-center gap-1.5 font-mono text-slate-400 ml-1">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-300">{language}</span>
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-700/60 hover:bg-slate-600/80 text-slate-300 hover:text-white border border-slate-600/60 transition-all cursor-pointer"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* ── Code body ── */}
      {highlightedHtml ? (
        <div
          className="shiki-wrapper overflow-x-auto text-sm leading-relaxed select-text"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      ) : (
        /* Loading skeleton / plain fallback */
        <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed bg-[#0d1117] select-text">
          <pre className="text-slate-300 font-mono whitespace-pre">
            {code.trim()}
          </pre>
        </div>
      )}
    </div>
  );
};

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Normalise codeLanguage strings used in curriculum.ts to valid Shiki lang ids */
function normalizeLang(lang: string): string {
  const map: Record<string, string> = {
    js: "javascript",
    ts: "typescript",
    sh: "bash",
    shell: "bash",
    zsh: "bash",
  };
  return map[lang.toLowerCase()] ?? lang.toLowerCase();
}

/** Shiki transformer that injects line-number spans */
function lineNumberTransformer(): ShikiTransformer {
  return {
    name: "line-numbers",
    line(node, line) {
      node.children = [
        {
          type: "element",
          tagName: "span",
          properties: { class: "line-number" },
          children: [{ type: "text", value: String(line) }],
        },
        ...node.children,
      ];
    },
  };
}
