import React, { InputHTMLAttributes, useState } from 'react';
import styled from 'styled-components';
import themeColor from '@/tools/themeColors';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    customStyles?: React.CSSProperties;
    hideIconOnFocus?: boolean;
    transparent?: boolean;
};

const InputContainer = styled.div<{ fullWidth?: boolean }>`
    display: flex;
    flex-direction: column;
    margin-bottom: ${themeColor.spacing.lg};
    width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
    position: relative;
    max-width: ${(props) => (props.fullWidth ? '100%' : '350px')};
    margin: 0;
`;

const Label = styled.label`
    color: ${themeColor.colors.gray.text};
    font-size: ${themeColor.typography.body.small.fontSize}px;
    margin-bottom: ${themeColor.spacing.xs};
`;

const StyledInput = styled.input<{ transparent?: boolean }>`
    background-color: ${themeColor.colors.gray.inputTag};
    color: ${themeColor.colors.neutral.white};
    border: none;
    padding: 0 ${themeColor.spacing.sm};
    border-radius: ${themeColor.cardBorder.md};
    font-size: ${themeColor.typography.body.medium.fontSize}px;
    height: 50px;
    width: 100%;
    box-shadow: ${themeColor.shadows.inset.input.gray};
    background-color: ${(props) => (props.transparent ? 'transparent' : themeColor.colors.gray.inputTag)};
    border: ${(props) => (props.transparent ? `1px solid ${themeColor.cardBorder.color}` : `none`)};

    &:focus {
        outline: none;
        box-shadow: ${themeColor.shadows.inset.input.purple};
    }

    &::placeholder {
        color: ${themeColor.colors.gray.text};
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    ${themeColor.breakpoints.mobile} {
        font-size: ${themeColor.typography.body.xsmall.fontSize}px;
        padding: 0 ${themeColor.spacing.xs};
        height: 40px;
    }
    ${themeColor.breakpoints.tablet} {
        font-size: ${themeColor.typography.body.small.fontSize}px;
    }
    ${themeColor.breakpoints.laptop} {
        font-size: ${themeColor.typography.body.medium.fontSize}px;
    }
`;

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
`;

const IconWrapperLeft = styled.div`
    position: absolute;
    left: 10px;
    top: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-50%);
    color: ${themeColor.colors.gray.text};
    transition: opacity 0.2s ease;

    @media (min-width: ${themeColor.breakpoints.tablet}) {
        left: 16px;
    }
`;

const IconWrapperRight = styled.div`
    position: absolute;
    right: 16px;
    top: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-50%);
    color: ${themeColor.colors.gray.text};
    transition: opacity 0.2s ease;
`;

const ErrorMessage = styled.span`
    color: ${themeColor.colors.status.error.text};
    font-size: ${themeColor.typography.body.xsmall.fontSize}px;
    margin-top: ${themeColor.spacing.xs};
`;

/**
 * Input component - Atom Component
 * A Custom form input control with customizable icon positioning and focus behavior.
 * @param {string} label - The label for the input field.
 * @param {string} error - Error message to display below the input.
 * @param {boolean} fullWidth - If true, the input will take the full width of its container.
 * @param {React.ReactNode} icon - Icon to display inside the input.
 * @param {'left' | 'right'} iconPosition - Position of the icon ('left' or 'right').
 * @param {React.CSSProperties} customStyles - Custom styles to apply to the input.
 * @param {boolean} hideIconOnFocus - If true, the icon will be hidden when the input is focused.
 * @param {string} placeholder - Placeholder text for the input.
 * @param {InputHTMLAttributes<HTMLInputElement>} rest - Other input attributes.
 */
export default function Input({
    icon,
    label,
    error,
    fullWidth = false,
    iconPosition = 'left',
    customStyles,
    hideIconOnFocus = false,
    placeholder,
    ...rest
}: InputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(Boolean(rest.value));
    const inputRef = React.useRef<HTMLInputElement>(null);

    const getPadding = () => {
        if (!icon) return { paddingLeft: '14px', paddingRight: '14px' };

        const iconVisible = showIcon();

        if (iconPosition === 'left') {
            return {
                paddingLeft: iconVisible ? '45px' : '14px',
                paddingRight: '14px',
            };
        } else {
            return {
                paddingLeft: '14px',
                paddingRight: iconVisible ? '45px' : '14px',
            };
        }
    };

    const showIcon = () => {
        if (!icon) return false;
        if (!hideIconOnFocus) return true;
        return !(isFocused || hasValue);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        if (rest.onFocus) rest.onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        if (rest.onBlur) rest.onBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasValue(!!e.target.value);
        if (rest.onChange) rest.onChange(e);
    };

    return (
        <InputContainer fullWidth={fullWidth}>
            {label && <Label>{label}</Label>}
            <InputWrapper>
                {icon && iconPosition === 'left' && showIcon() && <IconWrapperLeft>{icon}</IconWrapperLeft>}

                <StyledInput
                    ref={inputRef}
                    placeholder={isFocused ? '' : placeholder}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    style={{
                        ...getPadding(),
                        ...customStyles,
                    }}
                    {...rest}
                />

                {icon && iconPosition === 'right' && showIcon() && <IconWrapperRight>{icon}</IconWrapperRight>}
            </InputWrapper>

            {error && <ErrorMessage>{error}</ErrorMessage>}
        </InputContainer>
    );
}
