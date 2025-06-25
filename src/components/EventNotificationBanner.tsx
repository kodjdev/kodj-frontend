import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import themeColors from '@/tools/themeColors';
import { ChevronRight, X } from 'lucide-react';

type EventNotificationBannerProps = {
    eventTitle?: string;
    autoHide?: boolean;
    autoHideDelay?: number;
    onClose?: () => void;
};

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const arrowFlip = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const BannerContainer = styled.div<{ isVisible: boolean; isClosing: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    background: linear-gradient(135deg, ${themeColors.colors.status.warning.main} 0%, #ff8e53 50%, #ffb347 100%);
    padding: ${themeColors.spacing.xs} 0;
    box-shadow: ${themeColors.shadows.elevation.low};
    padding: ${themeColors.spacing.xs} 0;
    height: 40px;

    ${(props) =>
        props.isClosing
            ? css`
                  animation: ${slideUp} 0.3s ease-in-out forwards;
              `
            : props.isVisible
              ? css`
                    animation: ${slideDown} 0.4s ease-out;
                `
              : ''}
    display: ${(props) => (props.isVisible ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    height: 40px;

    &:hover {
        background: linear-gradient(135deg, #ff5722 0%, #ff7043 50%, #ff8a65 100%);
        box-shadow: ${themeColors.shadows.elevation.medium};
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        height: 50px;
        padding: ${themeColors.spacing.sm} 0;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.sm};
    max-width: ${themeColors.breakpoints.laptop || '1140px'};
    width: 100%;
    justify-content: space-between;
    margin: 0 auto;
    position: relative;
    padding: 0 ${themeColors.spacing.lg || '40px'};
    box-sizing: border-box;
    height: 100%;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        flex-wrap: nowrap;
    }
`;

const LeftContent = styled.div`
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.md};
    flex: 1;
    min-width: 0;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        gap: ${themeColors.spacing.sm};
    }
`;

const FireIcon = styled.span`
    font-size: 20px;
    ${css`
        animation: ${pulse} 2s infinite;
    `}

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: 16px;
    }
`;

const BannerText = styled.span`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    font-weight: ${themeColors.typography.body.medium.letterSpacing};
    text-align: center;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.body.small.fontSize}px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: calc(100vw - 120px);
    }
`;

const ArrowButton = styled.div<{ isHovered: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${themeColors.spacing.lg};
    height: ${themeColors.spacing.lg};
    border-radius: ${themeColors.cardBorder.pill};
    transition: all ${themeColors.animation.duration.medium} ${themeColors.animation.easing.standard};
    transition: all 0.3s ease;
    ${(props) =>
        props.isHovered
            ? css`
                  animation: ${arrowFlip} 0.6s ease-in-out;
              `
            : ''}

    &:hover {
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(1.1);
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        width: 20px;
        height: 20px;
    }
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: ${themeColors.colors.neutral.white};
    cursor: pointer;
    padding: ${themeColors.spacing.xs};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    opacity: 0.8;

    &:hover {
        opacity: 1;
        background-color: rgba(255, 255, 255, 0.2);
        transform: scale(1.1);
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: ${themeColors.spacing.xs};
    }
`;

const EventHighlight = styled.span`
    font-weight: bold;
    color: ${themeColors.colors.neutral.white};
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

/**
 * EventNotificationBanner - Atom Component for displaying event notifications
 * Displays with slide-down animation and navigates to event details on click
 * @param eventTitle - Title of the upcoming event
 * @param eventId - ID of the event for navigation
 * @param eventType - Type of event (upcoming/past)
 * @param autoHide - Whether to auto-hide the banner
 * @param autoHideDelay - Delay before auto-hiding (in ms)
 * @param onClose - Callback when banner is closed
 */
export default function EventNotificationBanner({
    eventTitle = '',
    autoHide = false,
    autoHideDelay = 10000,
    onClose,
}: EventNotificationBannerProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [isClosing, setIsClosing] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (autoHide && autoHideDelay > 0) {
            const timer = setTimeout(() => {
                handleClose();
            }, autoHideDelay);

            return () => clearTimeout(timer);
        }
    }, [autoHide, autoHideDelay]);

    const handleClose = (e?: React.MouseEvent) => {
        if (e) {
            e.stopPropagation();
        }

        setIsClosing(true);

        setTimeout(() => {
            setIsVisible(false);
            onClose?.();
        }, 300);
    };

    const handleBannerClick = () => {
        navigate('/events');
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        setTimeout(() => setIsHovered(false), 600);
    };

    if (!isVisible) return null;

    return (
        <BannerContainer
            isVisible={isVisible}
            isClosing={isClosing}
            onClick={handleBannerClick}
            onMouseEnter={handleMouseEnter}
        >
            <ContentWrapper>
                <LeftContent>
                    <FireIcon>🔥</FireIcon>
                    <BannerText>
                        <EventHighlight>{eventTitle}</EventHighlight>
                    </BannerText>
                    <ArrowButton isHovered={isHovered}>
                        <ChevronRight size={18} color={themeColors.colors.neutral.white} />
                    </ArrowButton>
                </LeftContent>

                <CloseButton onClick={handleClose} aria-label="Close notification">
                    <X size={16} />
                </CloseButton>
            </ContentWrapper>
        </BannerContainer>
    );
}
