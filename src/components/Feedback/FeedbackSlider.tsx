import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import themeColors from '@/tools/themeColors';
import Feedback, { FeedbackData } from '@/components/Feedback/Feedback';

type FeedbackSliderProps = {
    feedbacks: FeedbackData[];
    title?: string;
    autoPlay?: boolean;
    speed?: number;
};

const slideAnimation = keyframes`
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
`;

const SliderSection = styled.section`
    width: 100%;
    padding: 0;
    background: transparent;
    overflow: hidden;
`;

const Container = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    padding: 0;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        padding: 0 ${themeColors.spacing.md};
    }
`;

const SectionHeader = styled.div`
    text-align: center;
    margin-bottom: ${themeColors.spacing.md};

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        margin-bottom: ${themeColors.spacing.xxl};
    }
`;

const SectionTitle = styled(motion.h2)`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.headings.desktop.h2.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h2.fontWeight};
    justify-content: flex-start;
    display: flex;
    margin: 0;
    padding-bottom: 0;
    flex-wrap: wrap;
    text-align: left;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        font-size: ${themeColors.typography.headings.mobile.h3.fontSize}px;
        text-align: center;
        line-height: 1.2;
        flex-direction: column;
        gap: ${themeColors.spacing.xs};
    }
`;

const GrayText = styled.span`
    color: ${themeColors.colors.gray.text};
`;

const SliderContainer = styled.div`
    position: relative;
    overflow: hidden;
    margin: 0 -${themeColors.spacing.xl};

    &::before,
    &::after {
        content: '';
        position: absolute;
        top: 0;
        width: 150px;
        height: 100%;
        z-index: 2;
        pointer-events: none;

        @media (max-width: ${themeColors.breakpoints.tablet}) {
            width: 60px;
        }
    }

    &::before {
        left: 0;
        background: linear-gradient(
            to right,
            ${themeColors.colors.black.main} 0%,
            ${themeColors.colors.black.main} 40%,

            transparent 100%
        );
    }

    &::after {
        right: 0;
        background: linear-gradient(
            to left,
            ${themeColors.colors.black.main} 0%,
            ${themeColors.colors.black.main} 40%,
            transparent 100%
        );
    }
`;

const SliderTrack = styled.div<{ speed: number }>`
    display: flex;
    animation: ${slideAnimation} ${(props) => props.speed}s linear infinite;
    width: 200%;
    gap: ${themeColors.spacing.lg};
    padding: 0 ${themeColors.spacing.xl};

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        padding: 0 ${themeColors.spacing.md};
    }

    &:hover {
        animation-play-state: paused;
    }
`;

const SliderGroup = styled.div`
    display: flex;
    gap: ${themeColors.spacing.lg};
    width: 50%;
    min-width: 50%;
    flex-shrink: 0;
`;

export default function FeedbackSlider({ feedbacks, speed = 30 }: FeedbackSliderProps) {
    const renderFeedbackCard = (feedback: FeedbackData) => <Feedback key={feedback.id} feedback={feedback} />;

    return (
        <div style={{ marginBottom: '100px' }}>
            <SliderSection>
                <Container>
                    <SectionHeader>
                        <SectionTitle
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <GrayText>Participant's</GrayText>&nbsp;Feedback
                            <GrayText>&nbsp;about the Meetups</GrayText>
                        </SectionTitle>
                    </SectionHeader>

                    <SliderContainer>
                        <SliderTrack speed={speed}>
                            <SliderGroup>{feedbacks.map(renderFeedbackCard)}</SliderGroup>
                        </SliderTrack>
                    </SliderContainer>
                </Container>
            </SliderSection>
        </div>
    );
}
