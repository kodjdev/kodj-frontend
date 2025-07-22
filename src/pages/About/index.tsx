import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import Card from '@/components/Card/Card';
import { ChevronRight } from 'lucide-react';
import rocketImage from '@/static/icons/rocket.jpg';
import { contributors, organizers } from '@/pages/About/contributors';
import { FiGithub } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
    max-width: ${themeColors.breakpoints.desktop};
    margin: 0 auto;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        padding: 0 ${themeColors.spacing.md};
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: 0 ${themeColors.spacing.sm};
    }
`;

const SectionHeader = styled.div`
    margin-bottom: ${themeColors.spacing.xl};
    text-align: center;
`;

const SectionTitle = styled.h2`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.headings.desktop.h2.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h2.fontWeight};
    margin-bottom: ${themeColors.spacing.md};
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: 28px;
        flex-direction: row;
        text-align: center;
    }
`;

const BlueDot = styled.span`
    color: ${themeColors.colors.primary.main};
    margin-right: ${themeColors.spacing.sm};
`;

const SectionSubtitle = styled.p`
    color: ${themeColors.colors.gray.main};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    line-height: ${themeColors.typography.body.medium.lineHeight};
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
    text-align: center;
    padding: 0 ${themeColors.spacing.md};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: 14px;
        padding: 0 ${themeColors.spacing.sm};
        max-width: 100%;
    }
`;

const MissionSection = styled.div`
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: ${themeColors.spacing.xl};
    margin-bottom: ${themeColors.spacing.xxl};

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        grid-template-columns: 1fr;
        gap: ${themeColors.spacing.lg};
    }
`;

const MissionContent = styled.div`
    background-color: #292929;
    border-radius: 12px;
    padding: ${themeColors.spacing.xl};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: ${themeColors.spacing.lg};
    }
`;

// const MissionTitle = styled.h3`
//     color: ${themeColors.colors.neutral.white};
//     font-size: ${themeColors.typography.headings.desktop.h3.fontSize}px;
//     font-weight: ${themeColors.typography.headings.desktop.h3.fontWeight};
//     margin-bottom: ${themeColors.spacing.md};

//     span {
//         color: ${themeColors.colors.gray.main};
//     }
// `;

const MissionText = styled.p`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    line-height: 1.6;
    margin-bottom: ${themeColors.spacing.lg};

    &:last-child {
        margin-bottom: 0;
    }
`;

const MissionImage = styled.div`
    background-color: #292929;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const TeamSection = styled.div`
    margin-bottom: ${themeColors.spacing.xxl};
`;

const TeamTitle = styled.h2`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.headings.desktop.h2.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h2.fontWeight};
    margin-bottom: ${themeColors.spacing.xl};
    text-align: left;

    span {
        color: ${themeColors.colors.gray.main};
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: 24px;
        text-align: center;
        margin-bottom: ${themeColors.spacing.lg};
    }
`;

const TeamGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: ${themeColors.spacing.lg};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        grid-template-columns: 1fr;
        gap: ${themeColors.spacing.md};
    }
`;

const TeamMemberCard = styled(Card)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    padding: ${themeColors.spacing.lg};
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: ${themeColors.spacing.lg};
    }
`;

const MemberAvatar = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: ${themeColors.spacing.md};
    border: 3px solid ${themeColors.colors.primary.main};

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const MemberInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    gap: ${themeColors.spacing.xs};
`;

const MemberName = styled.h4`
    color: ${themeColors.colors.neutral.white};
    font-size: 18px;
    font-weight: ${themeColors.typography.headings.desktop.h4.fontWeight};
    margin: 0;
`;

const MemberRole = styled.p`
    color: ${themeColors.colors.gray.main};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    margin: 0;
`;

const ContributorsSection = styled.div`
    margin-bottom: ${themeColors.spacing.xxl};
`;

const ContributorsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: ${themeColors.spacing.md};
    max-height: none;
    opacity: 1;
    overflow: hidden;
    transition: all 0.3s ease;
    padding-top: ${themeColors.spacing.xs};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        grid-template-columns: 1fr;
        gap: ${themeColors.spacing.md};
        padding-top: ${themeColors.spacing.xs};
    }
`;

const ContributorCard = styled.div`
    background-color: ${themeColors.colors.gray.light};
    border: 1px solid #333;
    border-radius: 8px;
    padding: ${themeColors.spacing.lg};
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.md};
    transition: all 0.2s ease;
    position: relative;
    z-index: 1;

    &:hover {
        background-color: ${themeColors.colors.gray.dark};
        border-color: ${themeColors.colors.primary.main};
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
`;

const ContributorInfo = styled.div`
    flex: 1;
`;

const ContributorName = styled.h4`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    font-weight: 600;
    margin: 0 0 ${themeColors.spacing.xs} 0;
`;

const ContributorRole = styled.p`
    color: ${themeColors.colors.gray.main};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    margin: 0;
`;

const GitHubLink = styled.a`
    color: ${themeColors.colors.primary.main};
    transition: all 0.2s ease;

    &:hover {
        color: ${themeColors.colors.primary.light};
        transform: scale(1.1);
    }
`;

/**
 * About Us page component
 * Displays information about the team, mission, and contributors
 * @returns {JSX.Element} The About-Us page component
 */
export default function AboutUs() {
    const { t } = useTranslation('about');

    return (
        <Container>
            <SectionHeader>
                <SectionTitle>
                    <BlueDot>
                        <ChevronRight size={30} color="#057CCC" />
                    </BlueDot>
                    {t('aboutUs.title')}
                </SectionTitle>
                <SectionSubtitle>{t('aboutUs.subtitle')}</SectionSubtitle>
            </SectionHeader>

            <TeamTitle>
                {t('aboutUs.mission.title')} <span>{t('aboutUs.mission.subSubtitle')}</span>
            </TeamTitle>
            <MissionSection>
                <MissionContent>
                    <MissionText>{t('aboutUs.mission.paragraph1')}</MissionText>
                    <MissionText>{t('aboutUs.mission.paragraph2')}</MissionText>
                </MissionContent>
                <MissionImage>
                    <img src={rocketImage} alt={t('aboutUs.mission.title')} />
                </MissionImage>
            </MissionSection>

            <TeamSection>
                <TeamTitle>
                    {t('aboutUs.organizers.title')} <span>{t('aboutUs.organizers.titleSpan')}</span>
                </TeamTitle>

                <TeamGrid>
                    {organizers.map((member) => (
                        <TeamMemberCard key={member.id} backgroundColor="#161616">
                            <MemberAvatar>
                                <img src={member.image} alt={member.name} />
                            </MemberAvatar>
                            <MemberInfo>
                                <MemberName>{member.name}</MemberName>
                                <MemberRole>{member.role}</MemberRole>
                            </MemberInfo>
                        </TeamMemberCard>
                    ))}
                </TeamGrid>
            </TeamSection>

            <ContributorsSection>
                <TeamTitle>
                    {t('aboutUs.contributors.title')} <span>{t('aboutUs.contributors.titleSpan')}</span>
                </TeamTitle>

                <ContributorsGrid>
                    {contributors.map((contributor) => (
                        <ContributorCard key={contributor.id}>
                            <ContributorInfo>
                                <ContributorName>{contributor.name}</ContributorName>
                                <ContributorRole>{contributor.contributions}</ContributorRole>
                            </ContributorInfo>
                            <GitHubLink
                                href={`https://github.com/${contributor.githubUsername}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${contributor.name}'s GitHub profile`}
                            >
                                <FiGithub size={20} />
                            </GitHubLink>
                        </ContributorCard>
                    ))}
                </ContributorsGrid>
            </ContributorsSection>
        </Container>
    );
}
