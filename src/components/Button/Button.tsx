import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import themeColor from '@/tools/themeColors';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
};

const StyledButton = styled.button<{
  variant: 'primary' | 'secondary' | 'text';
  size: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 150ms;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  text-transform: uppercase;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  ${props => {
    switch (props.size) {
      case 'sm':
        return `
          height: 36px;
          padding: 0 16px;
          font-size: 14px;
        `;
      case 'lg':
        return `
          height: 52px;
          padding: 0 24px;
          font-size: 16px;
        `;
      default: // 'md'
        return `
          height: 44px;
          padding: 0 24px;
          font-size: 14px;
        `;
    }
  }}
  
  /* Variant styles */
  ${props => {
    switch (props.variant) {
      case 'secondary':
        return `
          background-color: ${themeColor.colors.gray.main};
          color: ${themeColor.colors.neutral.white};
          
          &:hover:not(:disabled) {
            background-color: ${themeColor.colors.gray.dark};
          }
        `;
      case 'text':
        return `
          background-color: transparent;
          color: ${themeColor.colors.primary.main};
          
          &:hover:not(:disabled) {
            background-color: rgba(5, 124, 204, 0.1);
          }
        `;
      default: // 'primary'
        return `
          background-color: ${themeColor.colors.primary.main};
          color: ${themeColor.colors.neutral.white};
          
          &:hover:not(:disabled) {
            background-color: ${themeColor.colors.primary.dark};
          }
        `;
    }
  }}
`;

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}