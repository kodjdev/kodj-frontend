import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

import theme from "@/tools/theme";
import useHover from "@/hooks/theme/useHover";

export interface ButtonColorConfig {
  backgroundColor: string;
  hoverBackgroundColor: string;
  disabledBackgroundColor: string;
  defaultTextColor: string;
  boxShadow?: string;
  hoverBoxShadow?: string;
  clickedBoxShadow?: string;
}

type CustomColor = "blue" | "purple_inset" | "gray" | "white" | "red" | "link";
type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "two_xl"
  | "three_xl"
  | "full";

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
      radius: {
        none: theme.radiusSizes.none,
        sm: theme.radiusSizes.sm,
        md: theme.radiusSizes.md,
        lg: theme.radiusSizes.lg,
        xl: theme.radiusSizes.xl,
        two_xl: theme.radiusSizes.two_xl,
        three_xl: theme.radiusSizes.three_xl,
        full: theme.radiusSizes.full,
      },
      defaultVariants: {
        size: "default",
        fullWidth: false,
        radius: "md",
        variants: "solid",
      },
    },
  }
);

const buttonColorConfigs: Record<CustomColor, ButtonColorConfig> = {
  blue: {
    backgroundColor: theme.blue,
    hoverBackgroundColor: theme.blue_dark,
    disabledBackgroundColor: theme.blue_disabled,
    defaultTextColor: theme.white,
    boxShadow: theme.shadow,
    clickedBoxShadow: theme.shadow_clicked,
  },
  purple_inset: {
    backgroundColor: theme.purple,
    hoverBackgroundColor: theme.purple_dark,
    disabledBackgroundColor: theme.purple_disabled,
    defaultTextColor: theme.white,
    boxShadow: theme.shadow_purple_button_inset,
  },
  gray: {
    backgroundColor: theme.gray_dark,
    hoverBackgroundColor: theme.gray_dark,
    disabledBackgroundColor: theme.gray,
    defaultTextColor: theme.gray,
    boxShadow: theme.shadow_gray_button_inset,
  },
  white: {
    backgroundColor: theme.white,
    hoverBackgroundColor: theme.white_dark,
    disabledBackgroundColor: theme.white,
    defaultTextColor: theme.purple,
    boxShadow: theme.shadow,
    clickedBoxShadow: theme.shadow_clicked,
  },
  red: {
    backgroundColor: theme.red_button,
    hoverBackgroundColor: theme.red_button,
    disabledBackgroundColor: theme.red_background,
    defaultTextColor: theme.red_text,
  },
  link: {
    backgroundColor: "transparent",
    hoverBackgroundColor: "transparent",
    disabledBackgroundColor: "transparent",
    defaultTextColor: theme.blue_text,
  },
};

// extended props type bilan  HTML props + CVA variant + theme-lens ni merge qilamniz
export interface AtomicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof baseButtonVariants> {
  asChild?: boolean;
  fullWidth?: boolean;
  color?: CustomColor;
  textColor?: string;
  radius?: BorderRadius;
  disabled?: boolean;
  varint?: "solid" | "outline" | "red" | "ghost_gray";
}

export const Button = React.forwardRef<HTMLButtonElement, AtomicButtonProps>(
  (
    {
      className,
      size,
      fullWidth,
      asChild = false,
      color = "blue",
      textColor,
      // radius = "md",
      // variant = "solid",
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
      const colorConfig = buttonColorConfigs[color];
      const isDisabled = Boolean(disabled);

      return {
        backgroundColor: isDisabled
          ? colorConfig.disabledBackgroundColor
          : isHover
          ? colorConfig.hoverBackgroundColor
          : colorConfig.backgroundColor,
        color: textColor || colorConfig.defaultTextColor,
        boxShadow:
          isClicked && !isDisabled && colorConfig.clickedBoxShadow
            ? colorConfig.clickedBoxShadow
            : colorConfig.boxShadow || "none",
        fontWeight: color === "gray" && isHover ? 500 : undefined,
      };
    }, [color, disabled, isHover, isClicked, textColor]);

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
