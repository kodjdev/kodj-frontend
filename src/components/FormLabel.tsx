import React from "react";
import { cn } from "@/lib/utils";
import theme from "@/tools/theme";

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  id: string;
  htmlFor: string;
  labelText: string;
  theme?: {
    gray_label_tag_color?: string;
  };
}

export const FormLabel: React.FC<FormLabelProps> = ({
  id,
  htmlFor,
  labelText,
  className,
  ...props
}) => {
  return (
    <label
      id={id}
      htmlFor={htmlFor}
      className={cn("block text-sm font-medium", className)}
      style={{ color: theme.gray_label_tag_color }}
      {...props}
    >
      {labelText}
    </label>
  );
};
