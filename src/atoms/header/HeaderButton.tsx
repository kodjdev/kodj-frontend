import React from "react"
import { cn } from "@/lib/utils"

type HeaderButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean
}

export function HeaderButton({
  className,
  isActive,
  children,
  ...props
}: HeaderButtonProps) {
  return (
    <button
      className={cn(
        "relative rounded-full px-3 py-1.5 text-sm font-medium transition focus:outline-none",
        isActive ? "text-black" : "text-white",
        className
      )}
      style={{ WebkitTapHighlightColor: "transparent" }}
      {...props}
    >
      {children}
    </button>
  )
}