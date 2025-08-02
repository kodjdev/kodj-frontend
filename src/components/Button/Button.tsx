import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';
import themeColors from '@/tools/themeColors';

type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'text'
    | 'light'
    | 'redText'
    | 'blueText'
    | 'outline'
    | 'navItem'
    | 'navItemActive'
    | 'signOut'
    | 'share';

type BaseButtonProps = {
    variant?: ButtonVariant;
    size?: 'sm' | 'md' | 'lg' | 'mini' | 'xs';
    fullWidth?: boolean;
    children?: React.ReactNode;
    disabled?: boolean;
    htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    active?: boolean;
    icon?: React.ReactElement;
    isDisabled?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

type LinkButtonProps = {
    asLink: true;
    to: LinkProps['to'];
    replace?: LinkProps['replace'];
    state?: LinkProps['state'];
};

// when we use it with a regular button case
type RegularButtonProps = {
    asLink?: false;
    to?: never;
    replace?: never;
    state?: never;
};

// discriminated union
type ButtonProps = BaseButtonProps & (LinkButtonProps | RegularButtonProps);

const StyledButton = styled('button')<{
    variant: ButtonVariant;
    size: 'sm' | 'md' | 'lg' | 'mini' | 'xs';
    fullWidth?: boolean;
    disabled?: boolean;
    as?: typeof Link;
    isDisabled?: boolean;
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
    width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
    text-decoration: none;
    box-sizing: border-box;

    ${(props) =>
        (props.disabled || props.isDisabled) &&
        css`
            cursor: not-allowed;
            opacity: 0.5;
            background-color: ${themeColors.colors.gray.main} !important;
            color: ${themeColors.colors.neutral.white} !important;
            pointer-events: none;

            &:hover {
                background-color: ${themeColors.colors.gray.main} !important;
                transform: none !important;
            }
        `}

    ${(props) => {
        switch (props.size) {
            case 'sm':
                return css`
                    height: 36px;
                    padding: 0 16px;
                    font-size: ${themeColors.typography.body.small.fontSize || 14}px;
                `;
            case 'lg':
                return css`
                    height: 52px;
                    padding: 0 24px;
                    font-size: ${themeColors.typography.body.large.fontSize || 16}px;
                `;
            case 'mini':
                return css`
                    height: 32px;
                    padding: 7px 20px;
                    font-size: ${themeColors.typography.body.xsmall.fontSize || 14}px;
                `;
            case 'xs':
                return css`
                    height: 36px;
                    padding: 4px 18px;
                    font-size: ${themeColors.typography.body.xsmall.fontSize || 14}px;
                `;
            default: // 'md'
                return css`
                    height: 44px;
                    padding: 0 16px;
                    font-size: ${themeColors.typography.body.medium.fontSize || 14}px;
                `;
        }
    }}

  ${(props) => {
        switch (props.variant) {
            case 'secondary':
                return css`
                    background-color: ${themeColors.colors.gray.main};
                    color: ${themeColors.colors.neutral.white};

                    &:hover:not(:disabled) {
                        background-color: ${themeColors.colors.gray.dark};
                    }
                `;
            case 'text':
                return css`
                    background-color: ${themeColors.colors.ui.transparent};
                    color: ${themeColors.colors.neutral.white || 'white'};
                    &:hover:not(:disabled) {
                        background-color: ${themeColors.colors.ui.overlay.whiteHover};
                    }
                `;
            case 'light': // for login
                return css`
                    background-color: ${themeColors.colors.neutral.white};
                    color: ${themeColors.colors.neutral.black};

                    &:hover:not(:disabled) {
                        background-color: ${themeColors.colors.gray.main};
                    }
                `;
            case 'outline':
                return css`
                    background-color: ${themeColors.colors.ui.transparent};
                    color: ${themeColors.colors.neutral.white};
                    border: 1px solid ${themeColors.cardBorder.color};
                    border-radius: ${themeColors.radiusSizes.lg};

                    &:hover:not(:disabled) {
                        background-color: ${themeColors.colors.neutral.white};
                        color: ${themeColors.colors.neutral.black};
                        border: 1px solid ${themeColors.cardBorder.color};
                        border-radius: ${themeColors.radiusSizes.lg};
                    }
                `;
            case 'redText':
                return css`
                    background-color: ${themeColors.colors.ui.transparent};
                    color: ${themeColors.colors.status.error.action};
                    &:hover:not(:disabled) {
                        background-color: ${themeColors.colors.ui.overlay.redHover};
                    }
                `;
            case 'blueText':
                return css`
                    background-color: ${themeColors.colors.ui.transparent};
                    color: ${themeColors.colors.status.info.action};
                    &:hover:not(:disabled) {
                        background-color: ${themeColors.colors.ui.overlay.blueHover};
                    }
                `;
            case 'navItem':
                return css`
                    background-color: ${themeColors.colors.ui.transparent};
                    color: ${themeColors.colors.neutral.white};
                    text-transform: none;
                    justify-content: flex-start;
                    border: none;
                    border-radius: 8px;

                    &:hover:not(:disabled) {
                        background-color: ${themeColors.colors.gray.light};
                        text-decoration: none;
                    }

                    svg {
                        color: ${themeColors.colors.neutral.white};
                        margin-right: ${themeColors.spacing.md};
                    }

                    &:hover:not(:disabled) svg {
                        color: ${themeColors.colors.ui.navItem.activeBg};
                    }
                `;
            case 'navItemActive':
                return css`
                    background-color: ${themeColors.colors.ui.navItem.hoverBg};
                    color: ${themeColors.colors.neutral.white};
                    text-transform: none;
                    justify-content: flex-start;
                    border: none;
                    border-radius: 8px;

                    svg {
                        color: ${themeColors.colors.neutral.white};
                        margin-right: ${themeColors.spacing.md};
                    }
                `;
            case 'signOut':
                return css`
                    background-color: ${themeColors.colors.ui.signOut.bg};
                    color: ${themeColors.colors.neutral.white};
                    text-transform: none;
                    justify-content: flex-start;
                    border: none;
                    border-radius: 8px;

                    &:hover:not(:disabled) {
                        background-color: ${themeColors.colors.ui.signOut.hoverBg};
                    }

                    svg {
                        color: ${themeColors.colors.status.error.text};
                        margin-right: ${themeColors.spacing.md};
                    }
                `;
            case 'share':
                return css`
                    background-color: ${themeColors.colors.ui.transparent};
                    color: ${themeColors.colors.neutral.white};
                    border: 1px solid ${themeColors.cardBorder.color};
                    border-radius: ${themeColors.radiusSizes.xl};
                    padding: 6px 12px;
                    transition: all 0.2s ease;

                    &:hover:not(:disabled) {
                        background-color: ${themeColors.colors.ui.transparent};
                        color: ${themeColors.colors.primary.main};
                        border: 1px solid ${themeColors.cardBorder.color};
                    }

                    &:active:not(:disabled) {
                        background-color: ${themeColors.colors.gray.dark};
                    }

                    svg {
                        stroke-width: 1.5px;
                    }

                    @media (max-width: ${themeColors.breakpoints.mobile}) {
                        background-color: ${themeColors.colors.neutral.white};
                        color: ${themeColors.colors.neutral.black};
                        border: 1px solid ${themeColors.colors.neutral.white};

                        &:hover:not(:disabled) {
                            background-color: ${themeColors.colors.gray.light};
                            color: ${themeColors.colors.neutral.black};
                            transform: translateY(-1px);
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        }

                        &:active:not(:disabled) {
                            transform: translateY(0);
                            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                        }
                    }
                `;
            default:
                return css`
                    background-color: ${themeColors.colors.primary.main};
                    color: ${themeColors.colors.neutral.white};

                    &:hover:not(:disabled) {
                        background-color: ${themeColors.colors.primary.dark};
                    }
                `;
        }
    }}
`;

/**
 * Button component - Atom Component
 * @param variant - Visual style variant ("primary" | "secondary" | "text" | "light")
 * @param size - Button size ("sm" | "md" | "lg" | "mini")
 * @param fullWidth - Whether button should expand to fill container width
 * @param children - Button content/label
 * @param asLink - Whether to render as a React Router Link
 * @param to - Target path when used as a Link (required if asLink=true)
 * @param replace - Whether to replace current history entry when used as Link
 * @param state - State to pass to the new location
 * @param htmlType - HTML button type attribute ("button" | "submit" | "reset")
 * @param disabled - Whether the button is disabled
 * @param rest - Additional HTML button or Link props
 * @returns A button or Link element with specified styles.
 */
export default function Button({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    children,
    asLink = false,
    to,
    replace,
    state,
    htmlType = 'button',
    disabled,
    isDisabled,
    ...rest
}: ButtonProps) {
    const commonStyledProps = {
        variant,
        size,
        fullWidth,
        disabled,
        isDisabled,
    };

    if (asLink) {
        return (
            <StyledButton as={Link} {...commonStyledProps} {...{ to, replace, state }} {...rest}>
                {children}
            </StyledButton>
        );
    }
    return (
        <StyledButton as="button" type={htmlType} {...commonStyledProps} {...rest}>
            {children}
        </StyledButton>
    );
}
