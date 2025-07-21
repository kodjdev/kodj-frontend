import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import Card from '@/components/Card/Card';
import { AirVentIcon, Brain, GitFork, Globe, GraduationCap, Laptop, UsersRound } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type EventCard = {
    id: number;
    title: string;
    description: string;
};

const SectionContainer = styled.section`
    width: 100%;
    padding: ${themeColors.spacing.xxxl} 0;
    max-width: ${themeColors.breakpoints.laptop || '1140px'};
    margin: 0 auto;
    padding-bottom: 80px;
`;

const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    margin-top: 30px;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
    }
`;

const Title = styled.h2`
    font-size: ${themeColors.typography.headings.desktop.h2.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h2.fontWeight};
    margin: 0;

    span {
        color: ${themeColors.colors.neutral.white};
    }

    span:last-child {
        color: ${themeColors.colors.gray.main};
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.headings.mobile.h2.fontSize}px;
    }
`;

const JoinLink = styled.a`
    border: 1px solid ${themeColors.cardBorder.color};
    border-radius: 8px;
    transition: all 0.3s ease;
    padding: 10px 18px;
    font-size: ${themeColors.typography.body.small.fontSize}px;
    color: ${themeColors.colors.neutral.white};
    text-decoration: none;
    display: inline-block;

    &:hover {
        background-color: ${themeColors.colors.primary.main};
        border-color: ${themeColors.colors.primary.main};
        color: ${themeColors.colors.neutral.white};
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }
`;

const CardsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const StyledCard = styled(Card)`
    cursor: pointer;
`;

/**
 * EventBenefits - Ui Component
 * @description This component displays a section with event cards showcasing AI and ML events.
 */
export default function EventBenefits() {
    const { t } = useTranslation('benefits');

    const eventCards: EventCard[] = [
        {
            id: 1,
            title: t('benefitsSection.benefits.benefit1.title'),
            description: t('benefitsSection.benefits.benefit1.description'),
        },
        {
            id: 2,
            title: t('benefitsSection.benefits.benefit2.title'),
            description: t('benefitsSection.benefits.benefit2.description'),
        },
        {
            id: 3,
            title: t('benefitsSection.benefits.benefit3.title'),
            description: t('benefitsSection.benefits.benefit3.description'),
        },
        {
            id: 4,
            title: t('benefitsSection.benefits.benefit4.title'),
            description: t('benefitsSection.benefits.benefit4.description'),
        },
        {
            id: 5,
            title: t('benefitsSection.benefits.benefit5.title'),
            description: t('benefitsSection.benefits.benefit5.description'),
        },
        {
            id: 6,
            title: t('benefitsSection.benefits.benefit6.title'),
            description: t('benefitsSection.benefits.benefit6.description'),
        },
    ];
    const getIconForCard = (cardId: number) => {
        switch (cardId) {
            case 1:
                return <Brain size={24} />;
            case 2:
                return <UsersRound size={24} />;
            case 3:
                return <Laptop size={24} />;
            case 4:
                return <GraduationCap size={24} />;
            case 5:
                return <GitFork size={24} />;
            case 6:
                return <Globe size={24} />;
            default:
                return <AirVentIcon />;
        }
    };
    return (
        <SectionContainer>
            <SectionHeader>
                <Title>
                    <span>{t('benefitsSection.heading.part1')} </span>
                    <span>{t('benefitsSection.heading.part2')}</span>
                </Title>
                <JoinLink
                    href="https://t.me/+_ERUg8xBsiVkNTJl"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram"
                >
                    {t('benefitsSection.joinCommunity')}
                </JoinLink>
            </SectionHeader>

            <CardsGrid>
                {eventCards.map((card: EventCard) => (
                    <StyledCard
                        key={card.id}
                        icon={getIconForCard(card.id)}
                        title={card.title}
                        description={card.description}
                        hoverEffect={true}
                    />
                ))}
            </CardsGrid>
        </SectionContainer>
    );
}
