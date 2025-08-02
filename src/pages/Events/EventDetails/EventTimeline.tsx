import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import { KeynoteSession } from '@/types/api';
import { FaUser } from 'react-icons/fa';
import { Coffee } from 'lucide-react';
import defaultImage from '@/static/team/bekhzod.png';
import questionsIcon from '@/static/icons/qa.png';
import networkingIcon from '@/static/icons/networking.png';
import openingIcon from '@/static/icons/open.png';

type EventTimelineProps = {
    schedule?: KeynoteSession[];
};

const TimelineContainer = styled.div`
    margin-bottom: ${themeColors.spacing.xxl};
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid ${themeColors.cardBorder.color};
    background-color: #161616;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        display: none;
    }
`;

const TimelineHeader = styled.div`
    display: grid;
    grid-template-columns: 2fr 180px 1.6fr;
    padding: ${themeColors.spacing.md} ${themeColors.spacing.lg};
    background-color: #1a1a1a;
    border-bottom: 0.5px solid ${themeColors.cardBorder.color};
`;

const HeaderCell = styled.div`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    font-weight: 500;
`;

const TimelineItem = styled.div`
    display: grid;
    grid-template-columns: 2fr 180px 1.6fr;
    padding: ${themeColors.spacing.lg};
    background-color: ${themeColors.black};
    align-items: center;

    &:nth-child(odd) {
        background-color: ${themeColors.black};
    }

    &:last-child {
        border-bottom: none;
    }
`;

const MobileTimelineContainer = styled.div`
    margin-bottom: ${themeColors.spacing.xxl};
    display: none;
    gap: 10px;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
`;

const MobileTimelineItem = styled.div`
    background-color: #161616;
    border: 1px solid ${themeColors.cardBorder.color};
    border-radius: 12px;
    padding: ${themeColors.spacing.lg};
    margin-bottom: 10px;
    position: relative;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: ${themeColors.spacing.md};
        margin-bottom: 10px;
        gap: ${themeColors.spacing.sm};
    }
`;

const MobileTimeSlot = styled.div`
    position: absolute;
    top: ${themeColors.spacing.lg};
    right: ${themeColors.spacing.lg};
    color: #3b82f6;
    font-size: ${themeColors.typography.body.small.fontSize}px;
    font-weight: 500;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        top: ${themeColors.spacing.md};
        right: ${themeColors.spacing.md};
        font-size: ${themeColors.typography.body.xsmall.fontSize}px;
    }
`;

const MobileSpeakerInfo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: ${themeColors.spacing.md};
    padding-right: 120px;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding-right: 120px;
        margin-bottom: ${themeColors.spacing.sm};
    }
`;

const MobileTopicTitle = styled.div`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    line-height: 1.4;
    margin-top: ${themeColors.spacing.sm};
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

const SpeakerInfo = styled.div`
    display: flex;
    align-items: center;
`;

const SpeakerAvatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: ${themeColors.spacing.sm};

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const SpeakerName = styled.div`
    color: #aaaaaa;
    font-size: ${themeColors.typography.body.medium.fontSize}px;
`;

const TimeSlot = styled.div`
    color: #3b82f6;
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    font-weight: 500;
    text-align: flex-start;
    padding-right: 0;
`;

const TopicTitle = styled.div`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    margin-bottom: ${themeColors.spacing.xs};
    line-height: 1.4;
`;

const NoEventsMessage = styled.div`
    color: ${themeColors.colors.gray.main};
    text-align: center;
    padding: ${themeColors.spacing.xl};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
`;

const SpecialEventIcon = styled.div<{ isSpecial: boolean }>`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #2a2a2a;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${themeColors.spacing.sm};

    svg {
        font-size: 18px;
        color: ${(props) => (props.isSpecial ? '#F2A024' : '#666')};
    }

    img {
        width: 20px;
        height: 20px;
        color: ${(props) => (props.isSpecial ? '#F2A024' : '#666')};
        object-fit: contain;
        filter: ${(props) => (props.isSpecial ? 'invert(1)' : 'none')};
        transition: filter 0.3s ease;

        &:hover {
            filter: ${(props) => (props.isSpecial ? 'none' : 'invert(1)')};
        }

        @media (max-width: ${themeColors.breakpoints.mobile}) {
            width: 16px;
            height: 16px;
            margin-right: ${themeColors.spacing.xs};
        }
    }
`;

const SpecialEventName = styled.div<{ isSpecial: boolean }>`
    color: ${(props) => (props.isSpecial ? '#F2A024' : '#aaaaaa')};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    font-weight: ${(props) => (props.isSpecial ? 600 : 400)};
    flex: 1;
    word-wrap: break-word;
    line-height: 1.4;
    margin-left: ${themeColors.spacing.sm};
    ellipsis: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
    white-space: nowrap;
    text-align: left;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.body.small.fontSize}px;
        margin-left: ${themeColors.spacing.xs};
    }
`;

/**
 * EventTimeline Component - Organism Component
 * @param schedule - Array of event schedule items with speakers, times, and topics
 * @description Displays the timeline/schedule for an event in both desktop table format and mobile card format.
 * Special events (Kirish, Savol-Javob, Networking) are highlighted with yellow styling.
 */
export function EventTimeline({ schedule = [] }: EventTimelineProps) {
    const isValidImageUrl = (url: string): boolean => {
        try {
            const validUrl = new URL(url);
            return validUrl.protocol === 'http:' || validUrl.protocol === 'https:';
        } catch {
            return false;
        }
    };

    const getSpecialEventInfo = (subject: string) => {
        const lowerSubject = subject.toLowerCase();

        if (lowerSubject.includes('kirish') || lowerSubject.includes('intro')) {
            return {
                isSpecial: true,
                icon: <img src={openingIcon} alt="Opening" />,
                displayName: 'Kirish',
            };
        }

        if (
            lowerSubject.includes('savol') ||
            lowerSubject.includes('javob') ||
            lowerSubject.includes('q&a') ||
            lowerSubject.includes('question')
        ) {
            return {
                isSpecial: true,
                icon: <img src={questionsIcon} alt="Q&A" />,
                displayName: 'Savol - Javob (Q & A)',
            };
        }

        if (lowerSubject.includes('networking') || lowerSubject.includes('coffee') || lowerSubject.includes('break')) {
            return {
                isSpecial: true,
                icon: lowerSubject.includes('coffee') ? (
                    <Coffee size={20} color="#000" />
                ) : (
                    <img src={networkingIcon} alt="Networking" />
                ),
                displayName: lowerSubject.includes('coffee') ? 'Coffee time' : 'Networking va Dam Olish',
            };
        }

        return { isSpecial: false, icon: <FaUser />, displayName: null };
    };

    const renderSpeakerInfo = (session: KeynoteSession, isMobile: boolean = false) => {
        const specialInfo = getSpecialEventInfo(session.subject);

        if (isMobile && specialInfo.isSpecial) {
            return (
                <>
                    <SpecialEventIcon isSpecial={true}>{specialInfo.icon}</SpecialEventIcon>
                    <SpecialEventName isSpecial={true}>{specialInfo.displayName}</SpecialEventName>
                </>
            );
        }

        if (session.speaker) {
            return (
                <>
                    <SpeakerAvatar>
                        <img
                            src={
                                session.speaker.imageURL && isValidImageUrl(session.speaker.imageURL)
                                    ? session.speaker.imageURL
                                    : defaultImage
                            }
                            alt={`${session.speaker.firstName || 'Speaker'} ${session.speaker.lastName || ''}`}
                            onError={(e) => {
                                e.currentTarget.src = defaultImage;
                            }}
                        />
                    </SpeakerAvatar>
                    <SpeakerName>{session.speaker.firstName || 'Not given'}</SpeakerName>
                </>
            );
        }

        return (
            <>
                <SpecialEventIcon isSpecial={false}>
                    <FaUser />
                </SpecialEventIcon>
                <SpeakerName>Not given</SpeakerName>
            </>
        );
    };
    const formatTimeString = (session: KeynoteSession) => {
        const startTime = new Date(session.startTime);
        const endTime = new Date(session.endTime);
        return `${startTime.getHours()}:${String(startTime.getMinutes()).padStart(2, '0')} ~ ${endTime.getHours()}:${String(endTime.getMinutes()).padStart(2, '0')}`;
    };

    return (
        <div>
            <SectionTitle>Timeline</SectionTitle>

            {/* desktop timeline */}
            <TimelineContainer>
                <TimelineHeader>
                    <HeaderCell>Speaker</HeaderCell>
                    <HeaderCell>Timeline</HeaderCell>
                    <HeaderCell>Topic</HeaderCell>
                </TimelineHeader>
                {schedule.length > 0 ? (
                    schedule.map((session) => (
                        <TimelineItem key={session.id}>
                            <SpeakerInfo>{renderSpeakerInfo(session)}</SpeakerInfo>
                            <TimeSlot>{formatTimeString(session)}</TimeSlot>
                            <div>
                                <TopicTitle>{session.subject}</TopicTitle>
                            </div>
                        </TimelineItem>
                    ))
                ) : (
                    <NoEventsMessage>No timeline information available yet.</NoEventsMessage>
                )}
            </TimelineContainer>

            {/* mobile timeline */}
            <MobileTimelineContainer>
                {schedule.length > 0 ? (
                    schedule.map((session) => (
                        <MobileTimelineItem key={`mobile-${session.id}`}>
                            <MobileTimeSlot>{formatTimeString(session)}</MobileTimeSlot>
                            <MobileSpeakerInfo>{renderSpeakerInfo(session, true)}</MobileSpeakerInfo>
                            <MobileTopicTitle>{session.subject}</MobileTopicTitle>
                        </MobileTimelineItem>
                    ))
                ) : (
                    <NoEventsMessage>No timeline information available yet.</NoEventsMessage>
                )}
            </MobileTimelineContainer>
        </div>
    );
}
