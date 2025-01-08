import React from "react";
import { cn } from "@/lib/utils";

// keyinchalik ozgartirishimiz mumkin extend with props or change (sticky, background )
type HeaderContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function HeaderContainer({
  className,
  children,
  ...props
}: HeaderContainerProps) {
  return (
    <header
      className={cn(
        "max-w-[1440px] mx-auto w-full flex items-center justify-between",
        "pl-8 pr-8 sticky top-0 z-0 transition-colors duration-100",
        className
      )}
      {...props}
    >
      {children}
    </header>
  );
}
