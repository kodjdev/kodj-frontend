import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

import theme from "@/tools/theme";
import useHover from "@/hooks/theme/useHover";

type CustomColor = "blue" | "purple_inset" | "gray" | "white";

// CVA factory for “base” stylelarni yaratamiz
const baseButtonVariants = cva(
  // basic tailwind classlarni define qilamiz
  ` inline-flex items-center justify-center gap-2 
    whitespace-nowrap rounded-md transition-colors 
    focus-visible:outline-none focus-visible:ring-1 
    disabled:pointer-events-none disabled:opacity-50
  `,
  {
    variants: {
      size: {
        default: theme.variantSizes.default,
        sm: theme.variantSizes.sm,
        md: theme.variantSizes.md,
        lg: theme.variantSizes.lg,
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      size: "default",
      fullWidth: false,
    },
  }
);

// extended props type bilan  HTML props + CVA variant + theme-lens ni merge qilamniz
export interface AtomicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof baseButtonVariants> {
  asChild?: boolean;
  fullWidth?: boolean;
  color?: CustomColor;
}

export const Button = React.forwardRef<HTMLButtonElement, AtomicButtonProps>(
  (
    {
      className,
      size,
      fullWidth,
      asChild = false,
      color = "blue",
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // useHover hook use
    const [hoverProps, isHover, isClicked] = useHover();

    // style object orqali themeni ishlatish:
    const getStyleFromTheme = React.useMemo(() => {
      const isDisabled = Boolean(disabled);
      switch (color) {
        case "blue":
          return {
            backgroundColor: isDisabled
              ? theme.blue_disabled
              : isHover
              ? theme.blue_dark
              : theme.blue,
            color: theme.white,
            boxShadow:
              isClicked && !isDisabled ? theme.shadow_clicked : theme.shadow,
          };
        case "purple_inset":
          return {
            backgroundColor: isDisabled
              ? theme.purple_disabled
              : isHover
              ? theme.purple_dark
              : theme.purple,
            color: theme.white,
            boxShadow: theme.shadow_purple_button_inset,
          };
        case "gray":
          return {
            backgroundColor: isDisabled
              ? theme.gray
              : isHover
              ? theme.gray_dark
              : theme.gray_dark,
            // backgroundColor: isHover ? theme.gray_line : theme.gray_background,
            color: isHover ? theme.white: theme.gray,
            boxShadow: theme.shadow_gray_button_inset,
            fontWeight: isHover ? 500 : undefined,
          };
        case "white":
          return {
            backgroundColor: isHover ? theme.white_dark : theme.white,
            color: theme.purple,
            boxShadow:
              isClicked && !isDisabled ? theme.shadow_clicked : theme.shadow,
          };
        default:
          return {};
      }
    }, [color, disabled, isHover, isClicked]);

    // CVA va boshqa classlarni qo'shamiz
    const classes = cn(baseButtonVariants({ size, className, fullWidth }));

    return (
      <Comp
        ref={ref}
        className={classes}
        onClick={disabled ? undefined : onClick}
        style={{
          transitionDuration: theme.duration,
          textAlign: "center",
          cursor: disabled ? "not-allowed" : "pointer",
          ...getStyleFromTheme,
        }}
        disabled={disabled}
        {...hoverProps}
        {...props}
      />
    );
  }
);

Button.displayName = "MainButton";
