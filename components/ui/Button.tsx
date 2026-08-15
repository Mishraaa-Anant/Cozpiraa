import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none rounded-xl";

  const variants = {
    primary:
      "bg-sage-600 hover:bg-sage-700 text-white shadow-clinical hover:shadow-elevation active:scale-[0.98]",
    secondary:
      "bg-terracotta-500 hover:bg-terracotta-600 text-white shadow-clinical active:scale-[0.98]",
    outline:
      "border border-sage-600/30 text-sage-800 hover:border-sage-600 hover:bg-sage-50/50 active:scale-[0.98]",
    ghost:
      "text-charcoal-700 hover:bg-ivory-200/60 hover:text-sage-800 active:scale-[0.98]",
  };

  const sizes = {
    sm: "text-xs px-3.5 py-2 space-x-1.5",
    md: "text-sm px-5 py-2.5 space-x-2",
    lg: "text-base px-7 py-3.5 space-x-2.5 font-semibold",
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && (
        <span className="inline-flex shrink-0">{rightIcon}</span>
      )}
    </button>
  );
}
