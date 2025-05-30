import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import themeColors from '@/tools/themeColors';

type LoadingAnimationProps = {
    message?: string;
    size?: 'small' | 'default' | 'large';
    minHeight?: string;
    backgroundColor?: string;
    textColor?: string;
    fullHeight?: boolean;
    fullScreen?: boolean;
    className?: string;
    style?: React.CSSProperties;
};

type LoadingContainerProps = {
    minHeight: string;
    backgroundColor: string;
    textColor: string;
    fullHeight: boolean;
    fullScreen: boolean;
};

type LoadingProps = {
    message?: string;
};

const LoadingContainer = styled.div.withConfig({
    shouldForwardProp: (prop) =>
        !['minHeight', 'backgroundColor', 'textColor', 'fullHeight', 'fullScreen'].includes(prop),
})<LoadingContainerProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${themeColors.spacing.md};
    min-height: ${(props) => props.minHeight};
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.textColor};
    width: 100%;

    ${(props) =>
        props.fullHeight &&
        `
        height: 100%;
    `}

    ${(props) =>
        props.fullScreen &&
        `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        height: 100vh;
        width: 100vw;
    `}
`;

const LoadingMessage = styled.div`
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    font-weight: 400;
    text-align: center;
    opacity: 0.8;
`;

/**
 * LoadingAnimation - Atom Component
 * Which is reusable loading component with spinner and message.
 * @param message - Text to display below the spinner
 * @param size - Size of the spinner (small, default, large)
 * @param minHeight - Minimum height of the container (default: 50vh)
 * @param backgroundColor - Background color (default: theme black)
 * @param textColor - Text color (default: theme primary)
 * @param fullHeight - Whether to take full height of parent
 * @param fullScreen - Whether to take full screen (useful for modals/overlays)
 * @param className - Additional CSS classes
 * @param style - Custom inline styles
 */
export default function LoadingAnimation({
    message = 'Loading...',
    size = 'large',
    minHeight = '50vh',
    backgroundColor = themeColors.colors.neutral.black,
    textColor = themeColors.colors.primary.main,
    fullHeight = false,
    fullScreen = false,
    className,
    style,
}: LoadingAnimationProps) {
    return (
        <LoadingContainer
            minHeight={minHeight}
            backgroundColor={backgroundColor}
            textColor={textColor}
            fullHeight={fullHeight}
            fullScreen={fullScreen}
            className={className}
            style={style}
        >
            <Spin size={size} />
            {message && <LoadingMessage>{message}</LoadingMessage>}
        </LoadingContainer>
    );
}

export function PageLoading({ message = 'Loading page...' }: LoadingProps) {
    <LoadingAnimation message={message} minHeight="500px" size="large" />;
}

export function SectionLoading({ message = 'Loading...' }: LoadingProps) {
    <LoadingAnimation message={message} minHeight="200px" size="default" />;
}

export function ModalLoading({ message = 'Please wait...' }: LoadingProps) {
    <LoadingAnimation
        message={message}
        fullScreen
        backgroundColor="rgba(0, 0, 0, 0.7)"
        textColor={themeColors.colors.neutral.white}
        size="large"
    />;
}

export function InlineLoading({ message = 'Loading...' }: LoadingProps) {
    <LoadingAnimation message={message} minHeight="100px" size="small" backgroundColor="transparent" />;
}
