import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  isValid?: boolean;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ error, isValid, className, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            "w-full px-3 py-2 rounded-md border focus:outline-none",
            "bg-gray-800 text-white",
            {
              "border-red-500": error,
              "border-green-500": isValid && !error,
              "border-gray-400": !error && !isValid
            },
            className
          )}
          {...props}
        />
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";