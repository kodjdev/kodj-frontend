import { InputHTMLAttributes } from 'react';
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
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`;

const Label = styled.label`
  color: ${themeColor.colors.neutral.white};
  font-size: ${themeColor.typography.body.small.fontSize}px;
  margin-bottom: ${themeColor.spacing.xs};
`;

const StyledInput = styled.input`
  background-color: ${themeColor.colors.gray.inputTag};
  color: ${themeColor.colors.neutral.white};
  border: none;
  border-radius: ${themeColor.borderRadius.md};
  padding: ${themeColor.spacing.md};
  font-size: ${themeColor.typography.body.medium.fontSize}px;
  height: 48px;
  width: 100%;
  box-shadow: ${themeColor.shadows.inset.input.gray};
  
  &:focus {
    outline: none;
    border: 1px solid ${themeColor.colors.primary.main};
    box-shadow: 0 0 0 2px rgba(5, 124, 204, 0.2);
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
 * Input component - Molecule
 * 
 * A form input component that combines multiple atoms (label, input field, error message)
 * into a cohesive, functional unit. 
 * 
 * @param label - Optional text label that describes the input
 * @param error - Optional error message to display when validation fails
 * @param fullWidth - Whether the input should take up the full width of its container
 * @param rest - All standard HTML input attributes are supported
 * @returns {JSX.Element} A styled input component with optional label and error message
 */

export default function Input({ 
  label, 
  error, 
  fullWidth = false, 
  ...rest 
}: InputProps): JSX.Element {
  return (
    <InputContainer fullWidth={fullWidth}>
      {label && <Label>{label}</Label>}
      <StyledInput {...rest} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
}