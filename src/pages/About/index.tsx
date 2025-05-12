import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import Card from '@/components/Card/Card';
import { ChevronRight, Users, Presentation, Laptop, Handshake, LucideIcon } from 'lucide-react';
import rocketImage from '@/static/icons/rocket.jpg';
import behzodImage from '@/static/team/bekhzod.png';
import javokhirImage from '@/static/team/javokhir.jpg';
import oybekImage from '@/static/team/oybek.jpg';
import sardorImage from '@/static/team/sardor.png';

const Container = styled.div`
    max-width: ${themeColors.breakpoints.desktop};
    margin: 0 auto;
`;

const SectionHeader = styled.div`
    margin-bottom: ${themeColors.spacing.xl};
    text-align: left;
`;

const SectionTitle = styled.h2`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.headings.desktop.h2.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h2.fontWeight};
    margin-bottom: ${themeColors.spacing.md};
    display: flex;
    align-items: center;
    justify-content: center;
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
    text-align: center;
`;

const CardsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${themeColors.spacing.xl};
    margin-bottom: ${themeColors.spacing.xxl};

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        grid-template-columns: 1fr;
    }
`;

const MissionSection = styled.div`
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: ${themeColors.spacing.xl};
    margin-bottom: ${themeColors.spacing.xxl};

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        grid-template-columns: 1fr;
    }
`;

const MissionContent = styled.div`
    background-color: #292929;
    border-radius: 8px;
    padding: ${themeColors.spacing.xl};
`;

const MissionTitle = styled.h3`
    color: ${themeColors.colors.gray.main};
    font-size: ${themeColors.typography.headings.desktop.h3.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h3.fontWeight};
    margin-bottom: ${themeColors.spacing.md};
`;

const MissionText = styled.p`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    line-height: 1.6;
    margin-bottom: ${themeColors.spacing.lg};
`;

const MissionImage = styled.div`
    background-color: #292929;

    display: flex;
    align-items: center;
    justify-content: center;

    img {
        max-width: 100%;
        height: 100%;
    }
`;

const OrganizersSection = styled.div`
    margin-bottom: ${themeColors.spacing.xxl};
`;

const OrganizersTitle = styled.h2`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.headings.desktop.h2.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h2.fontWeight};
    margin-bottom: ${themeColors.spacing.xl};

    span {
        color: ${themeColors.colors.gray.main};
        margin-left: ${themeColors.spacing.sm};
    }
`;

const OrganizersGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${themeColors.spacing.xl};

    @media (max-width: ${themeColors.breakpoints.laptop}) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        grid-template-columns: 1fr;
    }
`;

const OrganizerCard = styled(Card)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const OrganizerAvatar = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: ${themeColors.spacing.md};

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const OrganizerName = styled.h4`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.headings.desktop.h4.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h4.fontWeight};
    margin: 0 0 ${themeColors.spacing.xs} 0;
`;

const OrganizerRole = styled.p`
    color: ${themeColors.colors.gray.main};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    margin: 0 0 ${themeColors.spacing.md} 0;
`;

const OrganizerTitle = styled.h5`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    font-weight: 600;
    margin: 0 0 ${themeColors.spacing.xs} 0;
`;

const createIconContainer = (Icon: LucideIcon) => {
    return (
        <div
            style={{
                backgroundColor: '#161616',
                borderRadius: '4px',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Icon size={18} color="#057CCC" strokeWidth={2} />
        </div>
    );
};

export default function AboutUs() {
    return (
        <Container>
            <SectionHeader>
                <SectionTitle>
                    <BlueDot>
                        <ChevronRight size={24} color="#057CCC" />
                    </BlueDot>{' '}
                    About us
                </SectionTitle>
                <SectionSubtitle>
                    At KO'DJ, we are passionate about <strong>creating</strong> a thriving developer community in
                    Uzbekistan. Our events are designed to empower developers, inspire creativity, and foster
                    collaboration.
                </SectionSubtitle>
            </SectionHeader>

            <MissionSection>
                <MissionContent>
                    <MissionTitle>KO'DJ Mission</MissionTitle>
                    <MissionText>
                        At KO'DJ, we believe in the power of collaboration and innovation. Our events are more than just
                        meetups; they are platforms for transformative learning, meaningful connections, and
                        groundbreaking ideas.
                    </MissionText>
                    <MissionText>
                        By participating in KO'DJ events, you're not just attending an event—you're becoming part of a
                        movement to elevate Uzbekistan's tech community to new heights. Let's create, learn, and grow
                        together.
                    </MissionText>
                </MissionContent>
                <MissionImage>
                    <img src={rocketImage} alt="KO'DJ Mission" />
                </MissionImage>
            </MissionSection>

            <SectionHeader>
                <OrganizersTitle>
                    What are the <span> Benefits </span> of joining KO'DJ?
                </OrganizersTitle>
            </SectionHeader>

            <CardsGrid>
                <Card
                    icon={createIconContainer(Users)}
                    title="Networking Opportunities"
                    description="Expand your professional network by connecting with like-minded individuals, industry experts, and potential collaborators."
                    backgroundColor="#161616"
                    hoverEffect={true}
                />
                <Card
                    icon={createIconContainer(Presentation)}
                    title="Expert Talks"
                    description="Learn directly from tech leaders and innovators as they share insights, practical knowledge and experience in the field."
                    backgroundColor="#161616"
                    hoverEffect={true}
                />
                <Card
                    icon={createIconContainer(Laptop)}
                    title="Hands on Workshop"
                    description="A platform for discovering and sharing AI and Machine Learning events in Uzbekistan and South Korea."
                    backgroundColor="#161616"
                    hoverEffect={true}
                />
                <Card
                    icon={createIconContainer(Handshake)}
                    title="Collaboration Opportunities"
                    description="A platform for discovering and sharing AI and Machine Learning events in Uzbekistan and South Korea."
                    backgroundColor="#161616"
                    hoverEffect={true}
                />
            </CardsGrid>

            <OrganizersSection>
                <OrganizersTitle>
                    Event <span>Organizers</span>
                </OrganizersTitle>

                <OrganizersGrid>
                    <OrganizerCard backgroundColor="#161616">
                        <OrganizerAvatar>
                            <img src={behzodImage} alt="Behzod Halil" />
                        </OrganizerAvatar>
                        <OrganizerName>Behzod Halil</OrganizerName>
                        <OrganizerRole>Android developer</OrganizerRole>
                        <OrganizerTitle>Founder & Organiser</OrganizerTitle>
                        <Card.Description>
                            Dedicated to fostering a welcoming and inclusive environment for all attendees, speakers,
                            and sponsors. Building a community of learners and creators.
                        </Card.Description>
                    </OrganizerCard>

                    <OrganizerCard backgroundColor="#161616">
                        <OrganizerAvatar>
                            <img src={sardorImage} alt="Sardor Madaminov" />
                        </OrganizerAvatar>
                        <OrganizerName>Sardor Madaminov</OrganizerName>
                        <OrganizerRole>Software Developer</OrganizerRole>
                        <OrganizerTitle>Co-Founder & Organiser</OrganizerTitle>
                        <Card.Description>
                            Dedicated to fostering a welcoming and inclusive environment for all attendees, speakers,
                            and sponsors. Building a community of learners and creators.
                        </Card.Description>
                    </OrganizerCard>

                    <OrganizerCard backgroundColor="#161616">
                        <OrganizerAvatar>
                            <img src={javokhirImage} alt="Javokhir" />
                        </OrganizerAvatar>
                        <OrganizerName>Javokhirbek Khakimjonov</OrganizerName>
                        <OrganizerRole>Software Developer</OrganizerRole>
                        <OrganizerTitle>Event Moderator & Software Developer</OrganizerTitle>
                        <Card.Description>
                            Dedicated to fostering a welcoming and inclusive environment for all attendees, speakers,
                            and sponsors. Building a community of learners and creators.
                        </Card.Description>
                    </OrganizerCard>

                    <OrganizerCard backgroundColor="#161616">
                        <OrganizerAvatar>
                            <img src={oybekImage} alt="Oybek Kholikov" />
                        </OrganizerAvatar>
                        <OrganizerName>Oybek Kholikov</OrganizerName>
                        <OrganizerRole>Product Designer</OrganizerRole>
                        <OrganizerTitle>UI/UX Designer & Organiser</OrganizerTitle>
                        <Card.Description>
                            Dedicated to fostering a welcoming and inclusive environment for all attendees, speakers,
                            and sponsors. Building a community of learners and creators.
                        </Card.Description>
                    </OrganizerCard>
                </OrganizersGrid>
            </OrganizersSection>
        </Container>
    );
}
