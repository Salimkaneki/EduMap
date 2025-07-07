import React, { forwardRef, useId } from "react";
import { cn } from "@/utils/utils";


interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'modern' | 'shadow';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  width?: string;
  required?: boolean;
}

const inputVariants = {
  modern:
    "border-2 border-slate-200 bg-white focus:border-blue-500 focus:ring-blue-100 rounded-md transition-all duration-300 hover:border-slate-300",
  shadow:
    "border border-gray-100 bg-white focus:border-gray-300 focus:ring-0 rounded-md shadow-xl hover:shadow-2xl transition-shadow duration-300"
};

const inputSizes = {
  sm: "px-3 text-sm h-8",
  md: "px-4 text-base h-10",
  lg: "px-5 text-lg h-12"
};

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  variant = "modern",
  size = "md",
  leftIcon,
  rightIcon,
  width = "w-full",
  required = false,
  className = "",
  disabled,
  id,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const hasError = Boolean(error);

  return (
    <div className={cn("space-y-1", width)}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          ref={ref}
          disabled={disabled}
          {...props}
          className={cn(
            "w-full transition-all duration-200 focus:outline-none",
            inputSizes[size],
            inputVariants[variant],
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            hasError && "border-red-500 focus:border-red-500 focus:ring-red-200",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>

      {(helperText || error) && (
        <p className={cn(
          "text-sm",
          hasError ? "text-red-600" : "text-gray-500"
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
