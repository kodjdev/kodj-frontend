import { ReactNode } from 'react';
import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import Button from '@/components/Button/Button';
import kodjWhiteLogo from '@/static/icons/logo.png';

type EmptyStateProps = {
    title: string;
    description: string;
    buttonText?: string;
    buttonVariant?: 'primary' | 'secondary' | 'outline' | 'text';
    buttonSize?: 'sm' | 'md' | 'lg' | 'mini';
    onButtonClick?: () => void;
    buttonAsLink?: boolean;
    buttonTo?: string;
    icon?: ReactNode;
    showLogo?: boolean;
    style?: React.CSSProperties;
    showIcon?: boolean;
};

const Container = styled.div`
    text-align: center;
    padding: ${themeColors.spacing.fourXl} 0;
    color: ${themeColors.colors.gray.text};
`;

const LogoContainer = styled.div`
    margin-bottom: ${themeColors.spacing.lg};
`;

const Logo = styled.img`
    width: 100px;
    border-radius: 10%;
`;

const Title = styled.h3`
    font-size: ${themeColors.typography.body.large.fontSize}px;
    margin-bottom: ${themeColors.spacing.md};
    color: ${themeColors.colors.neutral.white};
`;

const Description = styled.p`
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    margin-bottom: ${themeColors.spacing.lg};
`;

const IconContainer = styled.div`
    margin-bottom: ${themeColors.spacing.lg};
    font-size: 48px;
    color: ${themeColors.colors.gray.text};
`;

/**
 * EmptyState Component - Organism Component
 * @param {string} props.title - Title of the empty state
 * @param {string} props.description - Description of the empty state
 * @param {string} [props.buttonText] - Text for the action button
 * @param {string} [props.buttonVariant='outline'] - Variant of the button
 * @param {string} [props.buttonSize='mini'] - Size of the button
 * @param {Function} [props.onButtonClick] - Click handler for the button
 * @param {boolean} [props.buttonAsLink=false] - Whether the button acts as a link
 * @param {string} [props.buttonTo='/'] - URL to navigate to if button acts as a link
 * @param {ReactNode} [props.icon] - Custom icon to display
 * @param {boolean} [props.showLogo=true] - Whether to show the logo
 */
export default function EmptyState({
    title,
    description,
    buttonText,
    buttonVariant = 'outline',
    buttonSize = 'mini',
    onButtonClick,
    buttonAsLink = false,
    buttonTo,
    icon,
    showLogo = false,
    showIcon = true,
    ...rest
}: EmptyStateProps) {
    return (
        <Container {...rest}>
            {showLogo && (
                <LogoContainer>
                    <Logo src={kodjWhiteLogo} alt="KO'DJ Logo" />
                </LogoContainer>
            )}

            {showIcon && icon && <IconContainer>{icon}</IconContainer>}

            <Title>{title}</Title>
            <Description>{description}</Description>

            {buttonText && (
                <>
                    {buttonAsLink ? (
                        <Button variant={buttonVariant} size={buttonSize} asLink to={buttonTo || '/'}>
                            {buttonText}
                        </Button>
                    ) : (
                        <Button variant={buttonVariant} size={buttonSize} onClick={onButtonClick}>
                            {buttonText}
                        </Button>
                    )}
                </>
            )}
        </Container>
    );
}
