import { cva, type VariantProps } from "class-variance-authority";
import { useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";

const backButtonVariants = cva(
  "px-3 py-1 text-white bg-gray-700 hover:bg-gray-700/50 rounded-md transition-colors duration-200 flex items-center gap-2",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface BackButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof backButtonVariants> {
  size?: "sm" | "md" | "lg";
}

export function BackButton({
  size,
  onClick,
  ...rest
}: BackButtonProps) {
  const navigate = useNavigate();
  return (
    <button
      onClick={(e) => {
        onClick?.(e);
        navigate(-1);
      }}
      className={cn(backButtonVariants({ size }))}
      {...rest}
    >
      &#8592;
    </button>
  );
}
