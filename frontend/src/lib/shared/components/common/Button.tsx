import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@lib/utils";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  isDisabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const buttonVariants = cva(
  "relative inline-flex items-center justify-center px-8 py-3.5 overflow-hidden font-mono tracking-tighter text-white bg-gray-300 rounded-lg group inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:shadow-lg focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95 transition-transform duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline:
          "bg-transparent hover:bg-gray-100 text-gray-700 border border-gray-300",
        subtle:
          "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-gray-700 dark:text-gray-100",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
        link: "bg-transparent hover:bg-transparent text-indigo-600",
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
      },
      size: {
        default: "px-4 py-2",
        sm: "px-3 py-1.5 text-sm",
        lg: "px-6 py-3 text-lg",
        full: "w-full py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      isDisabled = false,
      iconLeft,
      iconRight,
      children,
      ...props
    },
    ref
  ) => {
    // console.log("className: ", className);

    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, className }),
          isLoading && "opacity-70 cursor-wait"
        )}
        disabled={isDisabled || isLoading}
        {...props}
      >
         <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-blue-900 rounded-full group-hover:w-96 group-hover:h-96"></span>
        <span className="flex items-center gap-2 relative text-text group-hover:text-white">
          {iconLeft && !isLoading && <span>{iconLeft}</span>}
          {isLoading ? (
            <svg
              className="animate-spin h-4 w-4 text-current"
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
                d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"
              ></path>
            </svg>
          ) : (
            children
          )}
          {iconRight && !isLoading && <span>{iconRight}</span>}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
