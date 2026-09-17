import React from "react";

interface FormattedTextProps {
  content: string;
  className?: string;
}

export const FormattedText: React.FC<FormattedTextProps> = ({
  content,
  className = "",
}) => {
  // Split by inline code delimiters `code`
  const parts = content.split(/(`[^`]+`)/g);

  return (
    <span className={`leading-relaxed text-slate-800 ${className}`}>
      {parts.map((part, index) => {
        if (part.startsWith("`") && part.endsWith("`")) {
          const codeSnippet = part.slice(1, -1);
          return (
            <code
              key={index}
              className="px-1.5 py-0.5 mx-0.5 font-mono text-xs md:text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md shadow-2xs"
            >
              {codeSnippet}
            </code>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};
