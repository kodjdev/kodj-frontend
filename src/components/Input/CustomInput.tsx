import { cn } from "@/lib/utils";
import theme from "@/tools/theme";
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
            "w-full border border-gray-700 rounded-md py-2.5 px-4 ",
            "focus:outline-none focus:ring-2 focus:ring-blue-500",
            {
              "border-red-500": error,
              "border-gray-500": isValid && !error,
              "border": !error && !isValid
            },
            className
          )}
          style={{backgroundColor: theme.gray_inputTag_background}}
          {...props}
        />
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";