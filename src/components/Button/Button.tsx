import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';
import themeColor from '@/tools/themeColors';

type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'text'
    | 'light'
    | 'redText'
    | 'blueText'
    | 'navItem'
    | 'navItemActive'
    | 'signOut';

type BaseButtonProps = {
    variant?: ButtonVariant;
    size?: 'sm' | 'md' | 'lg' | 'mini';
    fullWidth?: boolean;
    children?: React.ReactNode;
    disabled?: boolean;
    htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    active?: boolean;
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
    size: 'sm' | 'md' | 'lg' | 'mini';
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
    width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
    text-transform: uppercase;
    text-decoration: none;
    box-sizing: border-box;

    ${(props) =>
        props.disabled &&
        css`
            cursor: not-allowed;
            opacity: 0.6;
            pointer-events: none;
        `}

    ${(props) => {
        switch (props.size) {
            case 'sm':
                return css`
                    height: 36px;
                    padding: 0 16px;
                    font-size: ${themeColor.typography.body.small.fontSize || 14}px;
                `;
            case 'lg':
                return css`
                    height: 52px;
                    padding: 0 24px;
                    font-size: ${themeColor.typography.body.large.fontSize || 16}px;
                `;
            case 'mini':
                return css`
                    height: 32px;
                    padding: 7px 20px;
                    font-size: ${themeColor.typography.body.xsmall.fontSize || 14}px;
                `;
            default: // 'md'
                return css`
                    height: 44px;
                    padding: 0 16px;
                    font-size: ${themeColor.typography.body.medium.fontSize || 14}px;
                `;
        }
    }}

  ${(props) => {
        switch (props.variant) {
            case 'secondary':
                return css`
                    background-color: ${themeColor.colors.gray.main};
                    color: ${themeColor.colors.neutral.white};

                    &:hover:not(:disabled) {
                        background-color: ${themeColor.colors.gray.dark};
                    }
                `;
            case 'text':
                return css`
                    background-color: ${themeColor.colors.ui.transparent};
                    color: ${themeColor.colors.neutral.white || 'white'};
                    &:hover:not(:disabled) {
                        background-color: ${themeColor.colors.ui.overlay.whiteHover};
                    }
                `;
            case 'light': // for login
                return css`
                    background-color: ${themeColor.colors.neutral.white};
                    color: ${themeColor.colors.neutral.black};

                    &:hover:not(:disabled) {
                        background-color: ${themeColor.colors.gray.main};
                    }
                `;
            case 'redText':
                return css`
                    background-color: ${themeColor.colors.ui.transparent};
                    color: ${themeColor.colors.status.error.action};
                    &:hover:not(:disabled) {
                        background-color: ${themeColor.colors.ui.overlay.redHover};
                    }
                `;
            case 'blueText':
                return css`
                    background-color: ${themeColor.colors.ui.transparent};
                    color: ${themeColor.colors.status.info.action};
                    &:hover:not(:disabled) {
                        background-color: ${themeColor.colors.ui.overlay.blueHover};
                    }
                `;
            case 'navItem':
                return css`
                    background-color: ${themeColor.colors.ui.transparent};
                    color: ${themeColor.colors.neutral.white};
                    text-transform: none;
                    justify-content: flex-start;
                    border: none;
                    border-radius: 8px;

                    &:hover:not(:disabled) {
                        background-color: ${themeColor.colors.ui.navItem.hoverBg};
                    }

                    svg {
                        color: ${themeColor.colors.gray.text};
                        margin-right: ${themeColor.spacing.md};
                    }
                `;
            case 'navItemActive':
                return css`
                    background-color: ${themeColor.colors.ui.navItem.activeBg};
                    color: ${themeColor.colors.ui.navItem.activeText};
                    text-transform: none;
                    justify-content: flex-start;
                    border: none;
                    border-radius: 8px;

                    &:hover:not(:disabled) {
                        background-color: ${themeColor.colors.ui.navItem.activeBg};
                        color: ${themeColor.colors.ui.navItem.activeText};
                    }

                    svg {
                        color: ${themeColor.colors.ui.navItem.activeText};
                        margin-right: ${themeColor.spacing.md};
                    }
                `;
            case 'signOut':
                return css`
                    background-color: ${themeColor.colors.ui.signOut.bg};
                    color: ${themeColor.colors.neutral.white};
                    text-transform: none;
                    justify-content: flex-start;
                    border: none;
                    border-radius: 8px;

                    &:hover:not(:disabled) {
                        background-color: ${themeColor.colors.ui.signOut.hoverBg};
                    }

                    svg {
                        color: ${themeColor.colors.status.error.text};
                        margin-right: ${themeColor.spacing.md};
                    }
                `;
                return css`
                    background-color: #161616;
                    color: ${themeColor.colors.neutral.white};
                    text-transform: none;
                    justify-content: flex-start;
                    border: none;
                    border-radius: 8px;

                    &:hover:not(:disabled) {
                        background-color: #272727;
                    }

                    svg {
                        color: ${themeColor.colors.status.error.text};
                        margin-right: ${themeColor.spacing.md};
                    }
                `;
            default:
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
    ...rest
}: ButtonProps) {
    const commonStyledProps = {
        variant,
        size,
        fullWidth,
        disabled,
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
