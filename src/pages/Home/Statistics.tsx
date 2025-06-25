import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import themeColors from '@/tools/themeColors';
import useApiService from '@/services';
import { useEffect, useState } from 'react';
import { StatsOverview } from '@/services/api/fetchStatsService';

const StatisticsSection = styled.section`
    width: 100%;
    padding: ${themeColors.spacing.xxxl} 0;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background:
            radial-gradient(circle at 30% 20%, rgba(5, 124, 204, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(110, 54, 120, 0.1) 0%, transparent 50%);
        pointer-events: none;
    }
`;

const StatsContainer = styled(motion.div)`
    border-radius: 8px 8px 8px 8px;
    border: 0.5px solid ${themeColors.cardBorder.color};
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${themeColors.spacing.xl};
    padding: ${themeColors.spacing.xl} ${themeColors.spacing.lg};

    @media (max-width: ${themeColors.breakpoints.laptop}) {
        grid-template-columns: repeat(2, 1fr);
        gap: ${themeColors.spacing.lg};
    }

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        grid-template-columns: 1fr;
        gap: ${themeColors.spacing.xl};
        padding: 1rem;
    }
`;

const StatCard = styled(motion.div)`
    background: linear-gradient(
        135deg,
        ${themeColors.colors.gray.dark} 0%,
        ${themeColors.colors.black.background} 100%
    );
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: ${themeColors.spacing.lg};
    border: 1px solid rgba(255, 255, 255, 0.08);
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    min-height: 300px;
    display: flex;
    flex-direction: column;

    &:hover {
        transform: translateY(-8px);
        border-color: rgba(5, 124, 204, 0.3);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, ${themeColors.colors.primary.main}, ${themeColors.colors.secondary.main});
    }

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        padding: ${themeColors.spacing.lg};
        min-height: 250px;
    }
`;

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${themeColors.spacing.lg};
`;

const IconWrapper = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 12px;
    background: linear-gradient(135deg, ${themeColors.colors.primary.main}20, ${themeColors.colors.secondary.main}20);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Badge = styled.span`
    color: ${themeColors.colors.neutral.white};
    padding: ${themeColors.spacing.xs} ${themeColors.spacing.md};
    border-radius: 20px;
    font-size: ${themeColors.typography.body.small.fontSize}px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);

    &.active {
        background: linear-gradient(135deg, rgba(5, 124, 204, 0.3), rgba(37, 66, 235, 0.4));
        box-shadow: 0 4px 12px rgba(5, 124, 204, 0.2);
    }

    &.growing {
        background: linear-gradient(135deg, rgba(35, 145, 60, 0.3), rgba(242, 160, 36, 0.4));
        box-shadow: 0 4px 12px rgba(35, 145, 60, 0.2);
    }

    &.expanding {
        background: linear-gradient(135deg, rgba(110, 54, 120, 0.3), rgba(87, 42, 94, 0.4));
        box-shadow: 0 4px 12px rgba(110, 54, 120, 0.2);
    }
`;

const CardContent = styled.div`
    margin-bottom: ${themeColors.spacing.lg};
    flex-grow: 1;
`;

const StatTitle = styled.h3`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.headings.desktop.h4.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h4.fontWeight};
    margin: 0 0 ${themeColors.spacing.md} 0;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        font-size: ${themeColors.typography.headings.mobile.h4.fontSize}px;
    }
`;

const StatNumber = styled(motion.div)`
    font-size: 3.5rem;
    font-weight: 900;
    color: ${themeColors.colors.neutral.white};
    line-height: 1;
    margin-bottom: ${themeColors.spacing.md};
    display: flex;
    align-items: baseline;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        font-size: 2.8rem;
    }
`;

const NumberSuffix = styled.span`
    font-size: 1.8rem;
    color: ${themeColors.colors.primary.main};
    margin-left: ${themeColors.spacing.xs};
`;

const StatDescription = styled.p`
    color: ${themeColors.colors.gray.text};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    line-height: ${themeColors.typography.body.small.lineHeight};
    margin: 0;
`;

const ProgressWrapper = styled.div`
    margin: ${themeColors.spacing.xl} 0 0 0;
`;

const ProgressBar = styled.div`
    width: 100%;
    height: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
    height: 100%;
    background: linear-gradient(90deg, ${themeColors.colors.primary.main}, ${themeColors.colors.secondary.main});
    border-radius: 4px;
`;

const ProgressText = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: ${themeColors.spacing.sm};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    color: ${themeColors.colors.gray.text};
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

/**
 * Statistics - A page component
 * @description This component displays various statistics related to users and meetups.
 */
export default function Statistics() {
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState<StatsOverview | null>(null);
    const { t } = useTranslation('home');
    const statsService = useApiService();

    useEffect(() => {
        setIsVisible(true);

        const fetchStats = async () => {
            try {
                setLoading(true);
                const response = await statsService.getStatisticsOverview();

                if (response.statusCode === 200 && response.data) {
                    setStats(response.data);
                } else {
                    setError(response.message || 'Failed to fetch statistics');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statsData = [
        {
            id: 'speakers',
            title: t('statisticsPage.statisticsBody.users.title'),
            value: stats?.data.totalSpeakers || 0,
            suffix: '+',
            description: t('statisticsPage.statisticsBody.users.description'),
            icon: '👨‍💼',
            badge: t('statisticsPage.statisticsBody.badges.active'),
            badgeClass: 'active',
            progress: { current: stats?.data.totalSpeakers ?? 0, target: 50 },
        },
        {
            id: 'events',
            title: t('statisticsPage.statisticsBody.meetups.title'),
            value: stats?.data.totalEvents,
            suffix: '+',
            description: t('statisticsPage.statisticsBody.meetups.description'),
            icon: '🎪',
            badge: t('statisticsPage.statisticsBody.badges.growing'),
            badgeClass: 'growing',
            progress: { current: stats?.data.totalEvents, target: 20 },
        },
        {
            id: 'members',
            title: t('statisticsPage.statisticsBody.registeredUsers.title'),
            value: stats?.data.totalUsers || 60,
            suffix: '+',
            description: t('statisticsPage.statisticsBody.registeredUsers.description'),
            icon: '👥',
            badge: t('statisticsPage.statisticsBody.badges.expanding'),
            badgeClass: 'expanding',
            progress: { current: stats?.data.totalUsers, target: 300 },
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 1, staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };

    const numberVariants = {
        hidden: { scale: 0 },
        visible: {
            scale: 1,
            transition: { duration: 0.8, delay: 0.3, ease: 'easeOut' },
        },
    };

    if (loading) {
        return (
            <StatisticsSection>
                <SectionHeader>
                    <Title>Loading Statistics...</Title>
                </SectionHeader>
            </StatisticsSection>
        );
    }

    if (error) {
        return (
            <StatisticsSection>
                <SectionHeader>
                    <Title>
                        <span style={{ color: '#ff6b6b' }}>Error: {error}</span>
                    </Title>
                </SectionHeader>
            </StatisticsSection>
        );
    }

    return (
        <StatisticsSection>
            <SectionHeader>
                <Title>
                    <span>Our Statistics </span>
                    <span>so far: </span>
                </Title>
            </SectionHeader>
            <StatsContainer initial="hidden" animate={isVisible ? 'visible' : 'hidden'} variants={containerVariants}>
                {' '}
                {statsData.map((stat) => (
                    <StatCard key={stat.id} variants={itemVariants}>
                        <CardHeader>
                            <IconWrapper>{stat.icon}</IconWrapper>
                            <Badge className={stat.badgeClass}>{stat.badge}</Badge>
                        </CardHeader>

                        <CardContent>
                            <StatTitle>{stat.title}</StatTitle>
                            <StatNumber variants={numberVariants}>
                                {String(stat.value || 0)}
                                <NumberSuffix>{stat.suffix}</NumberSuffix>
                            </StatNumber>
                            <StatDescription>{stat.description}</StatDescription>
                        </CardContent>

                        {stat.progress && (
                            <ProgressWrapper>
                                <ProgressBar>
                                    <ProgressFill
                                        initial={{ width: 0 }}
                                        animate={{
                                            width: `${((stat.progress.current ?? 0) / stat.progress.target) * 100}%`,
                                        }}
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                    />
                                </ProgressBar>
                                <ProgressText>
                                    <span>
                                        {t('statisticsPage.progress.current')}: {stat.progress.current}
                                    </span>
                                    <span>
                                        {t('statisticsPage.progress.target')}: {stat.progress.target}
                                    </span>
                                </ProgressText>
                            </ProgressWrapper>
                        )}
                    </StatCard>
                ))}
            </StatsContainer>
        </StatisticsSection>
    );
}
