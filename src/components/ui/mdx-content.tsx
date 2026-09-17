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
          code: ({ children }) => (
            <code className="px-1.5 py-0.5 rounded-md bg-slate-100 text-emerald-700 font-mono text-[0.82em] border border-slate-200">
              {children}
            </code>
          ),
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
