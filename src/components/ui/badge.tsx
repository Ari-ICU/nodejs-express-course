import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  className,
  ...props
}) => {
  const variantStyles = {
    default: "bg-emerald-50 text-emerald-700 border-emerald-200",
    secondary: "bg-slate-100 text-slate-700 border-slate-200",
    success: "bg-green-50 text-green-700 border-green-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    danger: "bg-rose-50 text-rose-700 border-rose-200",
    outline: "bg-transparent text-slate-600 border-slate-300",
  };

  const sizeStyles = {
    sm: "text-[10px] px-1.5 py-0.5 rounded",
    md: "text-xs px-2.5 py-1 rounded-md",
    lg: "text-sm px-3 py-1.5 rounded-lg",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium border font-mono tracking-tight transition-colors shadow-2xs",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
