import React from "react";
import { cn } from "@/lib/utils";

type HeaderButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean;
};

export function HeaderButton({
  className,
  isActive,
  children,
  ...props
}: HeaderButtonProps) {
  return (
    <button
      className={cn(
        "relative rounded-lg px-3 py-1.5 text-sm font-medium transition focus:outline-none",
        "text-white",
        isActive ? "bg-gray-700" : "bg-transparent",
        className
      )}
      style={{ WebkitTapHighlightColor: "transparent" }}
      {...props}
    >
      {children}
    </button>
  );
}
