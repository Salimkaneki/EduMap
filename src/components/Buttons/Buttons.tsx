'use client';
import React from "react";
import { cn } from "@/utils/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  width?: string;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

const buttonVariants = {
  primary: "bg-black text-white border-black hover:bg-black/90",
  secondary: "bg-gray-100 text-gray-900 border-gray-200 hover:bg-gray-200",
  outline: "bg-transparent text-black border-black/60 hover:bg-black hover:text-white",
  ghost: "bg-transparent text-black border-transparent hover:bg-gray-100",
  destructive: "bg-red-600 text-white border-red-600 hover:bg-red-700"
};

const buttonSizes = {
  sm: "px-3 text-sm h-10",
  md: "px-4 text-base h-10",
  lg: "px-6 text-lg h-10"
};

export default function CustomButton({
  label,
  variant = "outline",
  size = "md",
  width = "w-full",
  loading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={cn(
        // Base styles
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/20",
        // Size
        buttonSizes[size],
        // Width
        width,
        // Variant
        buttonVariants[variant],
        // Disabled state
        isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
        // Loading state
        loading && "cursor-wait",
        className
      )}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
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
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && leftIcon && leftIcon}
      <span>{label}</span>
      {!loading && rightIcon && rightIcon}
    </button>
  );
}