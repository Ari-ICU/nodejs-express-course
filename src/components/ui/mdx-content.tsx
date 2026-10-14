"use client";

/**
 * MdxContent — renders a Markdown string as rich HTML using react-markdown.
 *
 * Used to render slide `summary`, `tip`, and `objective` fields which are
 * plain prose strings stored in curriculum.ts (they may contain bold, lists,
 * and inline code but never JSX components).
 */

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MdxContentProps {
  content: string;
  className?: string;
}

export const MdxContent: React.FC<MdxContentProps> = ({
  content,
  className = "",
}) => {
  return (
    <div className={`mdx-prose ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-5 mb-2.5 tracking-tight border-b border-slate-100 pb-1.5 font-sans">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-4 mb-2 tracking-tight font-sans">
              {children}
            </h3>
          ),
          h3: ({ children }) => (
            <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-3.5 mb-1.5 flex items-center gap-2 font-sans">
              <span className="w-1.5 h-3.5 bg-emerald-500 rounded-full inline-block flex-shrink-0" />
              <span>{children}</span>
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-3.5 last:mb-0 font-sans">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-slate-900">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-slate-600 font-sans">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="list-none space-y-2 mb-3.5 pl-0">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 mb-3.5 pl-1 text-slate-700 text-sm sm:text-base">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700 leading-relaxed">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
              <span className="flex-1">{children}</span>
            </li>
          ),
          table: ({ children }) => (
            <div className="my-4 w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs sm:text-sm font-sans">
                  {children}
                </table>
              </div>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="border-b border-slate-200 bg-slate-50/90 text-[11px] sm:text-xs font-bold text-slate-700 font-mono">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-slate-100 bg-white font-sans">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="transition-colors hover:bg-emerald-50/30">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 font-bold text-slate-800 whitespace-nowrap">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-slate-700 align-middle text-xs sm:text-sm leading-relaxed whitespace-nowrap">
              {children}
            </td>
          ),
          pre: ({ children }) => (
            <div className="my-3 overflow-hidden rounded-xl border border-slate-800 bg-[#0d1117] shadow-sm">
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-800/80 bg-[#161b22]">
                <div className="w-2 h-2 rounded-full bg-rose-500/70" />
                <div className="w-2 h-2 rounded-full bg-amber-400/70" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/70" />
              </div>
              <pre className="p-3.5 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed">
                {children}
              </pre>
            </div>
          ),
          code: ({ className, children, ...props }: any) => {
            const isCodeBlock = className || (typeof children === "string" && children.includes("\n"));
            if (isCodeBlock) {
              return (
                <code className="font-mono text-xs sm:text-sm text-emerald-300">
                  {children}
                </code>
              );
            }
            const text = typeof children === "string" ? children.trim() : "";
            // Special styling for HTTP verbs
            if (text === "GET") {
              return <span className="inline-flex items-center px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-sky-50 text-sky-700 border border-sky-200 shadow-2xs">GET</span>;
            }
            if (text === "POST") {
              return <span className="inline-flex items-center px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">POST</span>;
            }
            if (text === "PUT") {
              return <span className="inline-flex items-center px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs">PUT</span>;
            }
            if (text === "PATCH") {
              return <span className="inline-flex items-center px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-purple-50 text-purple-700 border border-purple-200 shadow-2xs">PATCH</span>;
            }
            if (text === "DELETE") {
              return <span className="inline-flex items-center px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">DELETE</span>;
            }
            // If it's a URL path or route
            if (text.startsWith("/") || text.includes("/:")) {
              return (
                <code className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-mono text-[11.5px] border border-slate-200/90 font-medium whitespace-nowrap">
                  {children}
                </code>
              );
            }
            return (
              <code className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-mono text-[0.85em] border border-emerald-200/60 font-medium">
                {children}
              </code>
            );
          },
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-emerald-700 underline underline-offset-2 hover:text-emerald-600 transition-colors font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-3 border-emerald-500 pl-4 py-2 my-3 text-slate-700 text-sm bg-emerald-50/40 rounded-r-xl">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
