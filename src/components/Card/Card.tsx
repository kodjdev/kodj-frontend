import React from 'react';
import styled from 'styled-components';
import themeColors from '@/tools/themeColors';

type CardContainerProps = {
    backgroundColor?: string;
    padding?: string;
    hoverEffect?: boolean;
    height?: string;
};

type CardDescriptionProps = {
    color?: string;
};

type CardIconProps = {
    spacingBottom?: string;
};

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
    icon?: React.ReactNode;
    title?: string;
    description?: string;
    children?: React.ReactNode;
    backgroundColor?: string;
    padding?: string;
    hoverEffect?: boolean;
    height?: string;
    iconSpacingBottom?: string;
    descriptionColor?: string;
    className?: string;
};

const CardContainer = styled.div<CardContainerProps>`
    background-color: ${(props) => props.backgroundColor || '#161616'};
    border-radius: 8px;
    border: 1px solid ${themeColors.cardBorder.color};
    padding: ${(props) => props.padding || '24px'};
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
    height: ${(props) => props.height || 'auto'};

    &:hover {
        transform: ${(props) => (props.hoverEffect ? 'translateY(-5px)' : 'none')};
        box-shadow: ${(props) => (props.hoverEffect ? '0 10px 20px rgba(0, 0, 0, 0.2)' : 'none')};
    }
`;

const CardIcon = styled.div<CardIconProps>`
    margin-bottom: ${(props) => props.spacingBottom || '16px'};
`;

const CardTitle = styled.h3`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.headings.desktop.h4.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h4.fontWeight};
    margin: 0 0 12px 0;
`;

const CardDescription = styled.p<CardDescriptionProps>`
  color: ${(props) => props.color || themeColors.colors.gray.main};
  font-size: ${themeColors.typography.body.small.fontSize}px;
  line-height: 1.5;
  margin: 0;
  whiteSpace: "normal",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%",
  wordBreak: "break-word"
`;

/**
 * Card Component - Atom Component
 * @param icon - Optional React node to display as card icon
 * @param title - Optional card header text
 * @param description - Optional card description text
 * @param children - Optional child elements to render inside card
 * @param backgroundColor - Custom background color
 * @param padding - Custom padding value (defaults to 24px)
 * @param hoverEffect - Enable hover animation (defaults to false)
 * @param height - Custom height value (defaults to auto)
 * @param iconSpacingBottom - Custom bottom margin for icon (defaults to 16px)
 * @param descriptionColor - Custom color for description text
 * @param className - Additional CSS classes
 */
export default function Card({
    icon,
    title,
    description,
    children,
    backgroundColor,
    padding,
    hoverEffect = false,
    height,
    iconSpacingBottom,
    descriptionColor,
    className,
    ...props
}: CardProps) {
    return (
        <CardContainer
            backgroundColor={backgroundColor}
            padding={padding}
            hoverEffect={hoverEffect}
            height={height}
            className={className}
            {...props}
        >
            {icon && <CardIcon spacingBottom={iconSpacingBottom}>{icon}</CardIcon>}
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription color={descriptionColor}>{description}</CardDescription>}
            {children}
        </CardContainer>
    );
}

Card.Title = CardTitle;
Card.Description = CardDescription;
