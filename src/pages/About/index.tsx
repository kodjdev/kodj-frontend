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
        padding: 0;
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
        margin-top: 0;
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
    padding: ${themeColors.spacing.lg};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: ${themeColors.spacing.md};
        padding-top: 0;
    }
`;

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
        text-align: left;
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
    flex-direction: row;
    align-items: center;
    text-align: left;
    padding: ${themeColors.spacing.md};
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
    gap: ${themeColors.spacing.md};

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: ${themeColors.spacing.md};
        gap: ${themeColors.spacing.sm};
    }
`;

const MemberAvatar = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 0;
    border: 2px solid ${themeColors.colors.primary.main};
    flex-shrink: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        width: 40px;
        height: 40px;
        border: 1px solid ${themeColors.colors.primary.main};
    }
`;

const MemberInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    gap: ${themeColors.spacing.xs};
    flex: 1;
    min-width: 0;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        text-align: center;
        gap: ${themeColors.spacing.sm};
        min-width: 0;
    }
`;

const MemberName = styled.h4`
    color: ${themeColors.colors.neutral.white};
    font-size: 16px;
    font-weight: ${themeColors.typography.headings.desktop.h4.fontWeight};
    margin: 0;
    line-height: 1.2;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: 14px;
    }
`;

const MemberRole = styled.p`
    color: ${themeColors.colors.gray.main};
    font-size: 12px;
    margin: 0;
    line-height: 1.2;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: 11px;
    }
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
    padding: ${themeColors.spacing.md};
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

const ForwardLink = styled.a`
    text-decoration: none;
    color: inherit;
    display: block;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-1px);
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
                        <ForwardLink href={member.linkedinUrl} key={member.id}>
                            <TeamMemberCard key={member.id} backgroundColor="#161616">
                                <MemberAvatar>
                                    <img src={member.image} alt={member.name} />
                                </MemberAvatar>
                                <MemberInfo>
                                    <MemberName>{member.name}</MemberName>
                                    <MemberRole>{member.role}</MemberRole>
                                </MemberInfo>
                            </TeamMemberCard>
                        </ForwardLink>
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
