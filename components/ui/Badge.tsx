import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "sage" | "terracotta" | "neutral" | "outline";
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Badge({
  children,
  className,
  variant = "sage",
  icon,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full tracking-wide";

  const variants = {
    sage: "bg-sage-100 text-sage-800 border border-sage-200",
    terracotta: "bg-terracotta-100 text-terracotta-800 border border-terracotta-200",
    neutral: "bg-ivory-200 text-charcoal-700 border border-ivory-300",
    outline: "border border-sage-600/30 text-sage-800 bg-transparent",
  };

  return (
    <span
      className={twMerge(clsx(baseStyles, variants[variant], className))}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
