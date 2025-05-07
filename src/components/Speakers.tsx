import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import { FaLinkedin, FaGithub, FaTwitter, FaGlobe } from 'react-icons/fa';
import { Speaker } from '@/types/speakers';
import EventCard from '@/components/Card/EventCard';

type SpeakersProps = {
    speakers?: Speaker[];
};

const SpeakersContainer = styled.div`
    margin-bottom: ${themeColors.spacing.xxl};
`;

const SpeakersGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: ${themeColors.spacing.md};

    @media (min-width: ${themeColors.breakpoints.mobile}) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: ${themeColors.breakpoints.laptop}) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const CustomEventCard = styled(EventCard)`
    height: 100%;
    display: flex;
    flex-direction: column;

    img {
        border-radius: 8px 8px 0 0 !important;
        height: 180px !important;
        object-fit: cover;
    }

    & > div {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: space-between;
    }

    // Make title and description more compact
    h3 {
        margin-bottom: 4px;
    }

    p {
        margin-bottom: 8px;
        flex-grow: 0;
    }
`;

const SectionTitle = styled.h2`
    font-size: ${themeColors.typography.headings.desktop.h2.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h2.fontWeight};
    margin: ${themeColors.spacing.xxl} 0 ${themeColors.spacing.lg} 0;
    color: ${themeColors.colors.neutral.white};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.headings.mobile.h2.fontSize}px;
    }
`;

const SocialLinks = styled.div`
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.md};
    margin-top: auto;
    padding-top: ${themeColors.spacing.md};
    border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const SocialLink = styled.a`
    color: ${themeColors.colors.gray.main};
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;

    &:hover {
        color: ${themeColors.colors.primary.main};
    }
`;

export default function Speakers({ speakers = [] }: SpeakersProps) {
    if (!speakers || speakers.length === 0) {
        return (
            <SpeakersContainer>
                <SectionTitle>Speakers</SectionTitle>
                <p>No speakers information available yet.</p>
            </SpeakersContainer>
        );
    }

    const renderSocialIcons = (speaker: Speaker) => (
        <SocialLinks>
            {speaker.linkedinUrl && (
                <SocialLink href={speaker.linkedinUrl} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                    <FaLinkedin />
                </SocialLink>
            )}
            <SocialLink href="#" aria-label="GitHub" title="GitHub">
                <FaGithub />
            </SocialLink>
            <SocialLink href="#" aria-label="Twitter" title="Twitter">
                <FaTwitter />
            </SocialLink>
            <SocialLink href="#" aria-label="Website" title="Personal Website">
                <FaGlobe />
            </SocialLink>
        </SocialLinks>
    );

    return (
        <SpeakersContainer>
            <SectionTitle>Speakers</SectionTitle>
            <SpeakersGrid>
                {speakers.map((speaker) => {
                    const speakerBio = speaker.bio || speaker.topic || '';
                    // const description =
                    //     speakerBio.length > 80 ? `${speakerBio.substring(0, 80).trim()}...` : speakerBio;

                    return (
                        <CustomEventCard
                            key={speaker.id}
                            title={speaker.firstName}
                            description={speakerBio}
                            imageUrl={speaker.imageURL || '/placeholder-avatar.png'}
                        >
                            {renderSocialIcons(speaker)}
                        </CustomEventCard>
                    );
                })}
            </SpeakersGrid>
        </SpeakersContainer>
    );
}
