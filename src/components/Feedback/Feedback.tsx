import styled from 'styled-components';
import { motion } from 'framer-motion';
import themeColors from '@/tools/themeColors';
import Card from '@/components/Card/Card';
import { FaQuoteLeft } from 'react-icons/fa';

export type FeedbackData = {
    id: string;
    name: string;
    role: string;
    feedback: string;
    avatar?: string;
};

type FeedbackCardProps = {
    feedback: FeedbackData;
    className?: string;
};

const FeedbackCardContainer = styled(motion.div)`
    min-width: 350px;
    max-width: 400px;
    height: 280px;
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    padding-bottom: 20px;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        min-width: 300px;
        max-width: 350px;
        height: 250px;
    }
`;

const StyledCard = styled(Card)`
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    border: 1px solid ${themeColors.cardBorder.color};
    position: relative;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: ${themeColors.spacing.lg} !important;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(5, 124, 204, 0.05) 0%, rgba(110, 54, 120, 0.05) 100%);
        pointer-events: none;
    }
`;

const FeedbackText = styled.p`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    line-height: 1.4;
    margin: 0 0 10px 0;
    flex-grow: 1;
    position: relative;
    z-index: 1;

    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        font-size: ${themeColors.typography.body.small.fontSize}px;
        -webkit-line-clamp: 5;
    }
`;

const AuthorSection = styled.div`
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.sm};
    position: relative;
    z-index: 1;
    margin-top: auto;
`;

const Avatar = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${themeColors.colors.primary.main}, ${themeColors.colors.secondary.main});
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${themeColors.colors.neutral.white};
    font-weight: 600;
    font-size: 1.2rem;
    border: 2px solid rgba(255, 255, 255, 0.1);
    flex-shrink: 0;
`;

const AvatarImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
`;

const AuthorInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const AuthorName = styled.h4`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    font-weight: 600;
    margin: 0;
`;

const AuthorRole = styled.p`
    color: ${themeColors.colors.gray.text};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    margin: 0;
    margin-top: ${themeColors.spacing.xs};
`;

export default function Feedback({ feedback, className }: FeedbackCardProps) {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((word) => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <FeedbackCardContainer className={className} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
            <StyledCard
                icon={
                    <FaQuoteLeft
                        style={{
                            color: themeColors.colors.primary.main,
                            fontSize: '14px',
                            opacity: 0.7,
                        }}
                    />
                }
                padding="0"
                hoverEffect={true}
                height="100%"
                iconSpacingBottom="10px"
            >
                <FeedbackText>{feedback.feedback}</FeedbackText>

                <AuthorSection>
                    <Avatar>
                        {feedback.avatar ? (
                            <AvatarImage src={feedback.avatar} alt={feedback.name} />
                        ) : (
                            getInitials(feedback.name)
                        )}
                    </Avatar>
                    <AuthorInfo>
                        <AuthorName>{feedback.name}</AuthorName>
                        <AuthorRole>{feedback.role}</AuthorRole>
                    </AuthorInfo>
                </AuthorSection>
            </StyledCard>
        </FeedbackCardContainer>
    );
}
