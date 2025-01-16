import { cn } from "@/lib/utils";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
}

export const CustomButton = ({
  variant = "primary",
  icon,
  children,
  className,
  ...props
}: CustomButtonProps) => {
  return (
    <button
      className={cn(
        "font-medium py-1.5 px-3.5 rounded-full flex items-center transition-colors duration-300",
        {
          "text-white bg-blue-700 border border-blue-700 hover:bg-white hover:text-blue-700":
            variant === "primary",
          "text-neutral-400 hover:text-neutral-700": variant === "secondary",
        },
        className
      )}
      {...props}
    >
      {icon && <span className="flex-none mr-3 ml-1">{icon}</span>}
      {children}
    </button>
  );
};
