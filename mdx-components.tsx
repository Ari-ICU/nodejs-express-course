import type { MDXComponents } from "mdx/types";

// This file is required by @next/mdx when using the App Router.
// It maps MDX HTML elements to custom styled components globally.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings
    h1: ({ children }) => (
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-bold text-slate-900 mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">
        {children}
      </h3>
    ),

    // Prose
    p: ({ children }) => (
      <p className="text-slate-700 text-sm leading-relaxed mb-3">{children}</p>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-slate-900">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-slate-700">{children}</em>
    ),

    // Lists
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm mb-3 pl-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-1 text-slate-700 text-sm mb-3 pl-2">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,

    // Inline code
    code: ({ children, ...props }) => {
      // Block code (inside <pre>) is handled by rehype-pretty-code – skip styling here
      return (
        <code className="px-1.5 py-0.5 rounded-md bg-slate-100 text-emerald-700 font-mono text-[0.8em] border border-slate-200">
          {children}
        </code>
      );
    },

    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-emerald-500 pl-4 py-1 my-3 text-slate-600 text-sm italic bg-emerald-50/50 rounded-r-lg">
        {children}
      </blockquote>
    ),

    // Horizontal rule
    hr: () => <hr className="border-slate-200 my-6" />,

    ...components,
  };
}
