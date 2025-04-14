import React from "react";
import { cn } from "@/lib/utils";
import theme from "@/tools/themeColors";

type FormLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  id: string;
  htmlFor: string;
  labelText: string;
  theme?: {
    gray_label_tag_color?: string;
  };
}

export default function FormLabel(
  { id, htmlFor, labelText, className, ...props }: FormLabelProps
) {
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
}
