import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const variantStyles = {
      primary:
        "bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-xs hover:shadow active:scale-[0.98]",
      secondary:
        "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 active:scale-[0.98]",
      outline:
        "border border-slate-300 hover:border-slate-400 bg-white text-slate-700 hover:text-slate-900 active:scale-[0.98] shadow-2xs",
      ghost:
        "bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900",
      danger:
        "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200",
    };

    const sizeStyles = {
      sm: "text-xs px-2.5 py-1.5 rounded-lg gap-1.5",
      md: "text-sm px-4 py-2 rounded-xl gap-2",
      lg: "text-base px-5 py-2.5 rounded-xl gap-2.5",
      icon: "w-10 h-10 rounded-xl p-0 justify-center items-center",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium cursor-pointer transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none select-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
