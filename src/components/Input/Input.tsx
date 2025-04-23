import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import themeColor from '@/tools/themeColors';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    fullWidth?: boolean;
};

const InputContainer = styled.div<{ fullWidth?: boolean }>`
    display: flex;
    flex-direction: column;
    margin-bottom: ${themeColor.spacing.lg};
    width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
`;

const Label = styled.label`
    color: ${themeColor.colors.gray.text};
    font-size: ${themeColor.typography.body.small.fontSize}px;
    margin-bottom: ${themeColor.spacing.xs};
`;

const StyledInput = styled.input`
    background-color: ${themeColor.colors.gray.inputTag};
    color: ${themeColor.colors.neutral.white};
    border: none;
    border-radius: ${themeColor.cardBorder.md};
    padding: ${themeColor.spacing.md};
    font-size: ${themeColor.typography.body.medium.fontSize}px;
    height: 48px;
    width: 100%;
    box-shadow: ${themeColor.shadows.inset.input.gray};

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
`;

const ErrorMessage = styled.span`
    color: ${themeColor.colors.status.error.text};
    font-size: ${themeColor.typography.body.xsmall.fontSize}px;
    margin-top: ${themeColor.spacing.xs};
`;

/**
 * Input component - Atom Component
 * @param label Optional descriptive text label for the input
 * @param error Optional error message displayed when validation fails
 * @param fullWidth Whether the input should expand to fill its container width (Defaults to false).
 * @param rest Standard HTML input attributes (type, placeholder, onChange, etc.)
 */
export default function Input({ label, error, fullWidth = false, ...rest }: InputProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);

    return (
        <InputContainer fullWidth={fullWidth}>
            {label && <Label>{label}</Label>}
            <StyledInput ref={inputRef} {...rest} />
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </InputContainer>
    );
}
