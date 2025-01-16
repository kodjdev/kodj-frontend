import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface CustomRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const CustomRadio = forwardRef<HTMLInputElement, CustomRadioProps>(
  ({ type, label, className, ...props }, ref) => {
    return (
      <div className="flex items-center space-x-2">
        <input
          ref={ref}
          type={type}
          className={cn(
            "w-4 h-4 bg-gray-800 border-2 border-gray-400 text-blue-500 rounded-full",
            "checked:bg-white checked:border-white",
            className
          )}
          {...props}
        />
        {label && (
          <label htmlFor={props.id} className="text-gray-200">
            {label}
          </label>
        )}
      </div>
    );
  }
);

CustomRadio.displayName = "CustomRadio";