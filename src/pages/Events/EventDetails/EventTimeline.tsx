import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import { KeynoteSession } from '@/types/api';

type EventTimelineProps = {
    schedule?: KeynoteSession[];
};

const TimelineContainer = styled.div`
    margin-bottom: ${themeColors.spacing.xxl};
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid ${themeColors.cardBorder.color};
    background-color: #161616;
`;

const TimelineHeader = styled.div`
    display: grid;
    grid-template-columns: 200px 150px 1fr;
    padding: ${themeColors.spacing.md} ${themeColors.spacing.lg};
    background-color: #1a1a1a;
    border-bottom: 0.5px solid ${themeColors.cardBorder.color};
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

const HeaderCell = styled.div`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    font-weight: 500;
`;

const TimelineItem = styled.div`
    display: grid;
    grid-template-columns: 200px 150px 1fr;
    padding: ${themeColors.spacing.lg};
    background-color: ${themeColors.black};

    &:nth-child(odd) {
        background-color: ${themeColors.black};
    }

    &:last-child {
        border-bottom: none;
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

/**
 * EventTimeline Component - Organism Component
 * @param schedule - Array of event schedule items with speakers, times, and topics
 * @description Displays the timeline/schedule for an event in a tabular format.
 * Shows each session with the speaker, time slot, and topic details.
 */
export function EventTimeline({ schedule = [] }: EventTimelineProps) {
    return (
        <div>
            <SectionTitle>Timeline</SectionTitle>

            <TimelineContainer>
                <TimelineHeader>
                    <HeaderCell>Speaker</HeaderCell>
                    <HeaderCell>Time</HeaderCell>
                    <HeaderCell>Topic</HeaderCell>
                </TimelineHeader>
                {schedule.length > 0 ? (
                    schedule.map((session) => {
                        const startTime = new Date(session.startTime);
                        const endTime = new Date(session.endTime);
                        const timeString = `${startTime.getHours()}:${String(startTime.getMinutes()).padStart(2, '0')} ~ ${endTime.getHours()}:${String(endTime.getMinutes()).padStart(2, '0')}`;

                        return (
                            <TimelineItem key={session.id}>
                                <SpeakerInfo>
                                    {session.speaker && (
                                        <>
                                            <SpeakerAvatar>
                                                <img
                                                    src={session.speaker.imageURL || '/placeholder-avatar.png'}
                                                    alt={`${session.speaker.firstName} ${session.speaker.lastName}`}
                                                />
                                            </SpeakerAvatar>
                                            <SpeakerName>{session.speaker.firstName}</SpeakerName>
                                        </>
                                    )}
                                </SpeakerInfo>
                                <TimeSlot>{timeString}</TimeSlot>
                                <div>
                                    <TopicTitle>{session.subject}</TopicTitle>
                                </div>
                            </TimelineItem>
                        );
                    })
                ) : (
                    <NoEventsMessage>No timeline information available yet.</NoEventsMessage>
                )}
            </TimelineContainer>
        </div>
    );
}
