import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import theme from "@/tools/theme";

export interface ButtonMainProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  
  text?: string;
  icon?: ReactNode;
  background?: string;
  hoverBackground?: string;
  fontSize?: string;
  textColor?: string;
  hoverTextColor?: string;

  // Optional props
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  customSize?: {
    height?: string;
    padding?: string;
  };
  fullWidth?: boolean;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  children?: ReactNode;
}

const ButtonMain = ({
  text,
  icon,
  background = theme.purple,
  hoverBackground,
  textColor,
  hoverTextColor,
  fontSize,
  customSize,
  variant = "solid",
  size = "md",
  fullWidth = false,
  iconPosition = "left",
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonMainProps) => {

  const sizeClasses = {
    sm: "h-8 px-3 text-sm",
    md: "h-11 px-4",
    lg: "h-14 px-6 text-lg",
    custom: `h-[${customSize?.height || "auto"}] px-[${
      customSize?.padding || "1rem"
    }]`,
  };

  
  const baseClasses = `
    relative
    flex
    items-center
    justify-center
    rounded-md
    font-medium
    transition-all
    duration-200
    disabled:cursor-not-allowed
    disabled:opacity-50
    ${fullWidth ? "w-full" : "w-auto"}
  `;

  const iconContainerClasses = `
    flex
    items-center
    justify-center
    ${text || children ? (iconPosition === "left" ? "mr-2" : "ml-2") : ""}
  `;

  // we get variant styles
  const getVariantStyles = () => {
    return {
      backgroundColor: variant === "solid" ? background : "transparent",
      color:
        variant === "solid"
          ? textColor || theme.white
          : textColor || background,
      border: variant === "outline" ? `2px solid ${background}` : "none",
      fontSize: fontSize || "inherit",
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        backgroundColor:
          hoverBackground ||
          (variant === "solid" ? background : `${background}1a`),
        color:
          hoverTextColor || (variant === "solid" ? theme.white : background),
        filter: "brightness(110%)",
      },
      "&:active": {
        transform: "translateY(1px)",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
      },
    };
  };

  const variantStyles = getVariantStyles();

  return (
    <button
      className={twMerge(baseClasses, sizeClasses[size], className)}
      disabled={disabled || isLoading}
      style={{
        ...variantStyles,
        boxShadow: theme.shadow_purple_button_inset,
        ...theme.cursor(disabled),
      }}
      {...props}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className={iconContainerClasses}>{icon}</span>
          )}
          {text || children}
          {icon && iconPosition === "right" && (
            <span className={iconContainerClasses}>{icon}</span>
          )}
        </>
      )}
    </button>
  );
};

// Spinner loading animation
const LoadingSpinner = () => (
  <svg
    className="animate-spin h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

export default ButtonMain;
