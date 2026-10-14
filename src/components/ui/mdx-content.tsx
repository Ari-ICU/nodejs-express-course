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
          p: ({ children }) => (
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-3 last:mb-0 font-sans">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-900">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-slate-600">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="list-none space-y-2 mb-3 pl-0">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 mb-3 pl-1 text-slate-700 text-base sm:text-lg">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="flex items-start gap-2 text-base sm:text-lg text-slate-700 leading-relaxed">
              <span className="mt-2 w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
              <span>{children}</span>
            </li>
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
            return (
              <code className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-mono text-[0.84em] border border-emerald-200/60 font-medium">
                {children}
              </code>
            );
          },
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-emerald-700 underline underline-offset-2 hover:text-emerald-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-emerald-500 pl-4 py-1 my-3 text-slate-600 text-sm italic bg-emerald-50/50 rounded-r-lg">
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
