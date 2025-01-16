import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import theme from "@/tools/theme";

const inputVariants = cva(
  `
    block
    rounded-md
    border
    border-input
    bg-background
    px-3
    py-2
    text-sm
    placeholder:text-muted-foreground
    shadow-sm
    focus-visible:outline-none
    focus-visible:ring-1
    focus-visible:ring-ring
    disabled:cursor-not-allowed
    disabled:opacity-50
    transition-colors
  `,
  {
    variants: {
      size: {
        default: theme.variantSizes.default,
        sm: theme.variantSizes.sm,
        md: theme.variantSizes.md,
        lg: theme.variantSizes.lg,
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      size: "md",
      fullWidth: true,
    },
  }
);

export interface AtomicInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  size?: "sm" | "md" | "lg";
}

const Input = React.forwardRef<HTMLInputElement, AtomicInputProps>(
  ({ className, size, fullWidth, disabled, ...props }, ref) => {
    return (
      <input
        ref={ref}
        disabled={disabled}
        // we merget the  CVA-constructed classesany classname
        className={cn(inputVariants({ size, fullWidth, className }))}
        {...props}
      />
    );
  }
);

Input.displayName = "AtomicInput";

export { Input, inputVariants };
