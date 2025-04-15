/**
 * Theme configuration for atomic design architecture
 * This file defines design tokens for the entire application
 */

export type Font = {
  fontSize: number;
  letterSpacing?: number;
  fontWeight?: number;
  lineHeight?: string;
};

export type PixelValue = string;
export type CSS = Record<string, string | number | undefined>;

/**
 * Color system
 * Base colors and their variations
 */
const colors = {
  primary: {
    main: "#057CCC", // Blue primary color
    dark: "#2542EB",
    light: "#576ADE",
    disabled: "#2C6EA8",
    hover: "#1A8CD9",
  },

  secondary: {
    main: "#6E3678", // Purple
    dark: "#572A5E",
    light: "#FAF6FB",
    disabled: "#B89DBD",
    hover: "#F4EAF6",
    background: "#FAF8FB",
  },

  neutral: {
    black: "#000000",
    white: "#FFFFFF",
    white_dark: "#E0E0E0",
  },

  gray: {
    main: "#858585", // Text gray
    dark: "#141414", // Dark gray
    text: "#888888",
    line: "#C8C8C8",
    background: "#292929",
    inputTag: "#5B5B5B",
    label: "#969696",
    hover: "#6B6B6B",
  },

  // Status colors
  status: {
    error: {
      text: "#DD616E",
      button: "#91313B",
      background: "#F9E8E7",
      light: "#EC7063",
    },
    success: {
      button: "#23913C",
      background: "#A4C2A5",
    },
    warning: {
      main: "#F2A024", // Yellow
    },
  },

  // Utility colors
  utility: {
    overlay: "rgba(0, 0, 0, 0.065)",
    black_40: "rgba(0, 0, 0, 0.4)",
    black_60: "rgba(0, 0, 0, 0.6)",
  },
};

/**
 * Typography system
 * Defines text styles for different screen sizes and purposes
 */
const typography = {
  // Heading styles
  headings: {
    desktop: {
      h1: {
        fontSize: 57,
        fontWeight: 700,
        lineHeight: "120%",
        letterSpacing: 0.25,
      },
      h2: {
        fontSize: 40,
        fontWeight: 600,
        lineHeight: "130%",
        letterSpacing: 0.25,
      },
      h3: {
        fontSize: 32,
        fontWeight: 600,
        lineHeight: "130%",
        letterSpacing: 0.25,
      },
      h4: {
        fontSize: 24,
        fontWeight: 500,
        lineHeight: "130%",
        letterSpacing: 0.25,
      },
    },
    tablet: {
      h1: {
        fontSize: 48,
        fontWeight: 700,
        lineHeight: "120%",
        letterSpacing: 0.25,
      },
      h2: {
        fontSize: 40,
        fontWeight: 600,
        lineHeight: "130%",
        letterSpacing: 0.25,
      },
      h3: {
        fontSize: 32,
        fontWeight: 600,
        lineHeight: "130%",
        letterSpacing: 0.25,
      },
      h4: {
        fontSize: 24,
        fontWeight: 500,
        lineHeight: "130%",
        letterSpacing: 0.25,
      },
    },
    mobile: {
      h1: {
        fontSize: 40,
        fontWeight: 700,
        lineHeight: "120%",
        letterSpacing: 0.25,
      },
      h2: {
        fontSize: 32,
        fontWeight: 600,
        lineHeight: "130%",
        letterSpacing: 0.25,
      },
      h3: {
        fontSize: 24,
        fontWeight: 600,
        lineHeight: "130%",
        letterSpacing: 0.25,
      },
      h4: {
        fontSize: 20,
        fontWeight: 500,
        lineHeight: "130%",
        letterSpacing: 0.25,
      },
    },
  },

  // Body text styles
  body: {
    large: { fontSize: 18, lineHeight: "140%", letterSpacing: 0 },
    medium: { fontSize: 16, lineHeight: "140%", letterSpacing: -0.4 },
    small: { fontSize: 14, lineHeight: "140%", letterSpacing: 0 },
    xsmall: { fontSize: 12, lineHeight: "140%", letterSpacing: 0.4 },
  },

  // Menu text
  menu: {
    fontSize: 14,
    lineHeight: "150%",
    letterSpacing: 0.1,
  },

  // Preset styles (from original theme)
  presets: {
    font8: { fontSize: 8, letterSpacing: -0.2, lineHeight: "9px" },
    font8_medium: {
      fontSize: 8,
      letterSpacing: -0.2,
      fontWeight: 500,
      lineHeight: "9px",
    },
    font10: { fontSize: 10, fontWeight: 300, lineHeight: "12px" },
    font10_bold: { fontSize: 10, fontWeight: 700, lineHeight: "12px" },
    font12: { fontSize: 12, letterSpacing: 0.4, lineHeight: "14px" },
    font12_bold: { fontSize: 12, fontWeight: 700, lineHeight: "14px" },
    font14: { fontSize: 14, lineHeight: "16px" },
    font14_bold: { fontSize: 14, fontWeight: 700, lineHeight: "16px" },
    font16: { fontSize: 16, letterSpacing: -0.4, lineHeight: "19px" },
    font16_bold: {
      fontSize: 16,
      letterSpacing: -0.4,
      fontWeight: 700,
      lineHeight: "19px",
    },
    font18: {
      fontSize: 18,
      letterSpacing: -0.6,
      fontWeight: 700,
      lineHeight: "21px",
    },
    font20: {
      fontSize: 20,
      letterSpacing: -0.75,
      fontWeight: 700,
      lineHeight: "23px",
    },
    font28: {
      fontSize: 28,
      letterSpacing: -1,
      fontWeight: 700,
      lineHeight: "33px",
    },
  },
};

/**
 * Spacing system
 * Provides consistent spacing options throughout the application
 */
const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "48px",
  xxxl: "64px",
};

// border: 1px solid #FFF;

/**
 * Border radius system
 */
const cardBorder = {
  none: "0",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  xxl: "24px",
  pill: "9999px",

  color: "#FFF",
};

/**
 * Shadow system
 * Different elevation levels and special shadow effects
 */
const shadows = {
  // Elevation shadows
  elevation: {
    low: "0px 1.5px 1px -0.5px rgba(110, 54, 120, 0.05), 0px 2.5px 1px -0.5px rgba(110, 54, 120, 0.03)",
    medium:
      "0px 3px 4px -2px rgba(110, 54, 120, 0.04), 0px 3px 3px -2px rgba(110, 54, 120, 0.02), 0px 3px 8px -2px rgba(110, 54, 120, 0.1)",
    high: "0px 2px 4px rgba(110, 54, 120, 0.2), 0px 1px 18px rgba(110, 54, 120, 0.12), 0px 6px 10px rgba(110, 54, 120, 0.14)",
  },

  // Direction-specific shadows
  directional: {
    up: "0px -3px 4px -2px rgba(110, 54, 120, 0.04), 0px -3px 3px -2px rgba(110, 54, 120, 0.02), 0px -3px 8px -2px rgba(110, 54, 120, 0.1)",
  },

  // Inset shadows for interactive elements
  inset: {
    purple: "inset 2px 2px 5px -2px rgba(0, 0, 0, 0.15)",
    gray: "inset 2px 2px 5px -2px rgba(0, 0, 0, 0.075)",
    input: {
      purple: "inset 1px 1px 2.5px -1px rgba(110, 54, 120, 0.1)",
      gray: " inset 1px 1px 2.5px -1px rgba(0, 0, 0, 0.075)",
    },
  },

  // Special case shadows
  special: {
    colorButton: "1px 1.5px 2.5px -1px rgba(110, 54, 120, 0.15)",
  },
};

/**
 * Size system for components
 */
const sizes = {
  modal: {
    alert: "315px" as PixelValue,
    default: "335px" as PixelValue,
    large: "755px" as PixelValue,
  },

  button: {
    default: {
      height: "48px",
      padding: "0 16px",
    },
    sm: {
      height: "32px",
      padding: "0 12px",
    },
    md: {
      height: "48px",
      padding: "0 32px",
    },
    lg: {
      height: "56px",
      padding: "0 32px",
    },
  },

  // Original variant sizes (for backward compatibility)
  variants: {
    default: "h-6 px-4 py-2 text-sm font-medium",
    sm: "h-8 px-3 rounded-md text-xs",
    md: "h-12 px-8 rounded-md text-md",
    lg: "h-10 px-8 rounded-md text-base",
  },

  // Original radius sizes (for backward compatibility)
  radiusSizes: {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    two_xl: "rounded-2xl",
    three_xl: "rounded-3xl",
    full: "rounded-full",
  },
};

/**
 * Animation and transition settings
 */
const animation = {
  duration: {
    fast: "150ms",
    medium: "300ms",
    slow: "500ms",
  },
  duration_num: 150,
  easing: {
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    accelerate: "cubic-bezier(0.4, 0, 1, 1)",
    decelerate: "cubic-bezier(0, 0, 0.2, 1)",
  },
};

/**
 * Z-index system for layering
 */
const zIndex = {
  nav: 10,
  background: 20,
  headerBar: 40,
  modal: 50,
  alert: 60,
  tooltip: 70,
};

/**
 * Utility functions
 */
const utils = {
  cursor: (disabled?: boolean): CSS => {
    return { cursor: disabled ? "not-allowed" : "pointer" };
  },

  overlay: (activated: boolean): CSS => ({
    background:
      "linear-gradient(to left, transparent 50%, rgba(0,0,0,0.065) 50%) right",
    backgroundSize: "200%",
    transition: ".25s ease-out",
    pointerEvents: "none",
    backgroundPosition: activated ? "left" : "right",
  }),

  ellipsis: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  } as CSS,
};

/**
 * Breakpoints for responsive design
 */
const breakpoints = {
  mobileMin: "480px",
  mobile: "640px",
  tablet: "768px",
  laptop: "1140px",
  desktop: "1280px",
  largeDesktop: "1440px",
};

/**
 * Main theme object
 * Exports all design tokens organized for atomic design system
 */
const themeColors = {
  colors,
  typography,
  spacing,
  cardBorder,
  shadows,
  sizes,
  animation,
  zIndex,
  utils,
  breakpoints,

  modal_width_alert: sizes.modal.alert,
  modal_width: sizes.modal.default,
  modal_width_large: sizes.modal.large,

  black: colors.neutral.black,
  black_40: colors.utility.black_40,
  black_60: colors.utility.black_60,

  blue: colors.primary.main,
  blue_dark: colors.primary.dark,
  blue_disabled: colors.primary.disabled,
  blue_text: colors.primary.light,

  white: colors.neutral.white,
  white_dark: colors.neutral.white_dark,

  purple: colors.secondary.main,
  purple_disabled: colors.secondary.disabled,
  purple_dark: colors.secondary.dark,
  purple_light: colors.secondary.light,
  purple_background: colors.secondary.background,
  purple_hover: colors.secondary.hover,

  gray: colors.gray.main,
  gray_dark: colors.gray.dark,
  gray_text: colors.gray.text,
  gray_line: colors.gray.line,
  gray_background: colors.gray.background,
  gray_inputTag_background: colors.gray.inputTag,
  gray_label_tag_color: colors.gray.label,

  red_text: colors.status.error.text,
  red_button: colors.status.error.button,
  red_background: colors.status.error.background,
  red_background_light: colors.status.error.light,

  blue_dark_background: colors.primary.main,

  green_button: colors.status.success.button,
  green_background: colors.status.success.background,

  yellow: colors.status.warning.main,

  variantSizes: sizes.variants,
  radiusSizes: sizes.radiusSizes,

  font8: typography.presets.font8,
  font8_medium: typography.presets.font8_medium,
  font10: typography.presets.font10,
  font10_bold: typography.presets.font10_bold,
  font12: typography.presets.font12,
  font12_bold: typography.presets.font12_bold,
  font14: typography.presets.font14,
  font14_bold: typography.presets.font14_bold,
  font16: typography.presets.font16,
  font16_bold: typography.presets.font16_bold,
  font18: typography.presets.font18,
  font20: typography.presets.font20,
  font28: typography.presets.font28,

  shadow: shadows.elevation.low,
  shadow_3: shadows.elevation.medium,
  shadow_3_up: shadows.directional.up,
  shadow_purple_button_inset: shadows.inset.purple,
  shadow_gray_button_inset: shadows.inset.gray,
  shadow_purple_input_inset: shadows.inset.input.purple,
  shadow_gray_input_inset: shadows.inset.input.gray,
  shadow_clicked: shadows.elevation.high,
  shadow_color_button: shadows.special.colorButton,

  duration: animation.duration.fast,
  duration_num: animation.duration_num,

  zIndex_nav: zIndex.nav,
  zIndex_background: zIndex.background,
  zIndex_headerBar: zIndex.headerBar,
  zIndex_modal: zIndex.modal,
  zIndex_alert: zIndex.alert,

  cursor: utils.cursor,
  overlay: utils.overlay,
  ellipsis: utils.ellipsis,
};

export default themeColors;
