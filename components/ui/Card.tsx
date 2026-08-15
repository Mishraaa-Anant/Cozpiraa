import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "hover" | "interactive" | "bordered";
  children: React.ReactNode;
}

export function Card({
  children,
  className,
  variant = "default",
  ...props
}: CardProps) {
  const baseStyles =
    "bg-white rounded-2xl p-6 transition-all duration-300 relative border border-ivory-200/80 shadow-card";

  const variants = {
    default: "",
    hover: "hover:-translate-y-1 hover:shadow-elevation hover:border-sage-300",
    interactive:
      "cursor-pointer hover:-translate-y-1 hover:shadow-elevation hover:border-sage-400 active:scale-[0.99]",
    bordered: "border-2 border-sage-600/20 shadow-none",
  };

  return (
    <div
      className={twMerge(clsx(baseStyles, variants[variant], className))}
      {...props}
    >
      {children}
    </div>
  );
}
