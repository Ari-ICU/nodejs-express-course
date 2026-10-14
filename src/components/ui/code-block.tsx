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
          "http",
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

  const lineCount = code.trim().split("\n").length;

  return (
    <div className="relative group rounded-3xl border border-slate-800/90 bg-[#0d1117] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.12)] hover:border-slate-700 transition-all duration-200">
      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-[#13171f] border-b border-slate-800/90 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          {/* macOS traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-xs shadow-rose-500/20" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-xs shadow-amber-500/20" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-xs shadow-emerald-500/20" />
          </div>

          {filename ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-slate-200 font-semibold tracking-tight">
                {filename}
              </span>
            </div>
          ) : (
            <span className="flex items-center gap-1.5 font-mono text-slate-300 ml-1">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-white font-medium">{language}</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
            {lineCount} lines
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800/90 hover:bg-slate-700/90 text-white border border-slate-700/80 transition-all cursor-pointer shadow-2xs active:scale-95"
            title="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Code Body with Max Height & Custom Scrollbar ── */}
      {highlightedHtml ? (
        <div
          className="shiki-wrapper overflow-x-auto text-xs sm:text-[13.5px] leading-relaxed select-text max-h-[calc(100vh-230px)] overflow-y-auto pb-4"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      ) : (
        /* Loading skeleton / plain fallback */
        <div className="p-5 overflow-x-auto text-xs sm:text-[13.5px] font-mono leading-relaxed bg-[#0d1117] select-text max-h-[calc(100vh-230px)] overflow-y-auto pb-4">
          <pre className="text-white font-mono whitespace-pre">
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
    http: "http",
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
