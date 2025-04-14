import React, { ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { Link, LinkProps } from "react-router-dom"; // Import Link and LinkProps
import themeColor from "@/tools/themeColors";

type ButtonVariant = "primary" | "secondary" | "text" | "light";

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  asLink?: boolean;
  to?: LinkProps["to"];
  replace?: LinkProps["replace"];
  state?: LinkProps["state"];
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  children?: React.ReactNode;
};

const StyledButton = styled("button")<{
  variant: ButtonVariant;
  size: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  as?: typeof Link;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 150ms,
    opacity 150ms;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  text-transform: uppercase;
  text-decoration: none;

  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.6;
      pointer-events: none;
    `}

  ${(props) => {
    switch (props.size) {
      case "sm":
        return css`
          height: 36px;
          padding: 0 16px;
          font-size: ${themeColor.typography.body.small.fontSize || 14}px;
        `;
      case "lg":
        return css`
          height: 52px;
          padding: 0 24px;
          font-size: ${themeColor.typography.body.large.fontSize || 16}px;
        `;
      default: // 'md'
        return css`
          height: 44px;
          padding: 0 24px;
          font-size: ${themeColor.typography.body.medium.fontSize || 14}px;
        `;
    }
  }}

  ${(props) => {
    switch (props.variant) {
      case "secondary":
        return css`
          background-color: ${themeColor.colors.gray.main};
          color: ${themeColor.colors.neutral.white};

          &:hover:not(:disabled) {
            background-color: ${themeColor.colors.gray.dark};
          }
        `;
      case "text":
        return css`
          background-color: transparent;
          color: ${themeColor.colors.neutral.white ||
          "white"}; // Ensure white text for header

          &:hover:not(:disabled) {
            background-color: rgba(255, 255, 255, 0.1); // Subtle white hover
          }
        `;
      case "light": // for login or light-themed buttons
        return css`
          background-color: ${themeColor.colors.neutral.white};
          color: ${themeColor.colors.neutral.black};

          &:hover:not(:disabled) {
            background-color: ${themeColor.colors.gray.main};
          }
        `;
      default: // 'primary'
        return css`
          background-color: ${themeColor.colors.primary.main};
          color: ${themeColor.colors.neutral.white};

          &:hover:not(:disabled) {
            background-color: ${themeColor.colors.primary.dark};
          }
        `;
    }
  }}
`;

/**
 * Button component - Atom Component
 * Renders a standard HTML button or a react-router-dom Link styled as a button,
 * based on the 'asLink' prop.
 *
 * @returns A button or Link element with specified styles.
 */

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  asLink = false, // Default to rendering as a button
  to, // 'to' is only used if asLink is true
  replace,
  state,
  htmlType = "button",
  disabled,
  ...rest
}: ButtonProps) {
  const commonStyledProps = {
    variant,
    size,
    fullWidth,
    disabled,
  };

  if (asLink) {
    if (to === undefined) {
      console.warn("Button: 'to' prop is required when 'asLink' is true.");
      // Fallback or render null/error? For now, render Link with default '/'
      to = "/";
    }
    // Props specific to Link component
    const linkProps = { to, replace, state };

    return (
      <StyledButton
        as={Link}
        {...commonStyledProps}
        {...linkProps} // ink-specific props pass qilamiz
        {...rest} //  Remaining compatible props larni pass qilamiz
      >
        {children}
      </StyledButton>
    );
  }

  // standard button uchun
  return (
    <StyledButton
      as="button"
      type={htmlType} // we use htmlType for the button's type attribute
      {...commonStyledProps}
      {...rest} // qolgan compatible props larni pass qilamiz
    >
      {children}
    </StyledButton>
  );
}
