import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import Card from '@/components/Card/Card';
import { Calendar, Clock, MapPin, Coffee, Box, Play } from 'lucide-react';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { EventTimeline } from '@/pages/Events/EventDetails/EventTimeline';
import { EventLocation } from '@/pages/Events/EventDetails/EventLocation';
import ComponentLoading from '@/components/ComponentLoading';
import Button from '@/components/Button/Button';
import { MeetupRegistrationStatus } from '@/types/enums';
import Speakers from '@/components/Speakers';
import { Event, EventDetailsResponse } from '@/types/event';
import { ApiResponse } from '@/types/fetch';
import useApiService from '@/services';
import useFormatDate from '@/hooks/useFormatDate';

type ApiEventDetailsResponse = {
    message?: string;
    data: EventDetailsResponse;
    statusCode?: number;
};

const PageContainer = styled.div`
    background-color: ${themeColors.colors.neutral.black};
    color: ${themeColors.colors.neutral.white};

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        padding: ${themeColors.spacing.md};
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    gap: ${themeColors.spacing.lg};
    margin-bottom: ${themeColors.spacing.xxl};

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        flex-direction: column;
    }
`;

const LeftPanel = styled.div`
    flex: 1;
`;

const RightPanel = styled.div`
    width: 350px;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        width: 100%;
    }
`;

const EventBanner = styled.div`
    width: 100%;
    margin-bottom: ${themeColors.spacing.lg};
    border-radius: ${themeColors.cardBorder.lg};
    overflow: hidden;

    img {
        width: 100%;
        height: 410px;
        object-fit: cover;
        display: block;
    }
`;

const EventInfoContainer = styled.div`
    margin-bottom: ${themeColors.spacing.lg};
`;

const EventDescription = styled.div`
    margin-bottom: ${themeColors.spacing.xxl};

    h1 {
        font-size: ${themeColors.typography.headings.desktop.h2.fontSize}px;
        font-weight: ${themeColors.typography.headings.desktop.h2.fontWeight};
        margin-bottom: ${themeColors.spacing.md};
        color: ${themeColors.colors.neutral.white};
    }

    p {
        font-size: ${themeColors.typography.body.medium.fontSize}px;
        line-height: ${themeColors.typography.body.medium.lineHeight};
        color: ${themeColors.colors.gray.main};
        margin-bottom: ${themeColors.spacing.md};
    }
`;

const TabContainer = styled.div`
    display: flex;
    margin-bottom: ${themeColors.spacing.lg};
    border-bottom: 1px solid ${themeColors.cardBorder.color};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        flex-wrap: wrap;
    }

    &::-webkit-scrollbar {
        height: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: ${themeColors.colors.gray.main};
        border-radius: 4px;
    }
`;

const Tab = styled.button<{ active: boolean }>`
    background: none;
    border: none;
    padding: ${themeColors.spacing.md} ${themeColors.spacing.lg};
    color: ${(props) => (props.active ? themeColors.colors.neutral.white : themeColors.colors.gray.main)};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    font-weight: ${(props) => (props.active ? 600 : 400)};
    cursor: pointer;
    position: relative;
    flex: 0 0 auto;

    &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: ${(props) => (props.active ? themeColors.colors.primary.main : 'transparent')};
    }

    &:hover {
        color: ${themeColors.colors.neutral.white};
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        flex: 1 0 50%;
        text-align: center;
    }
`;

const EventInfoItem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: ${themeColors.spacing.md};

    svg {
        margin-right: ${themeColors.spacing.sm};
        color: ${themeColors.colors.primary.main};
    }

    span {
        font-size: ${themeColors.typography.body.medium.fontSize}px;
        color: ${themeColors.colors.neutral.white};
    }
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
`;

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    text-align: center;
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

/**
 * EventDetails Component - Page Component
 * @description Displays comprehensive details about a specific event.
 * Fetches event data by ID or uses data passed via location state.
 * Includes tabbed navigation for different sections: details, schedule, speakers, and location.
 */
export default function EventDetails() {
    const { eventId } = useParams();
    const location = useLocation();
    const { eventData: locationEventData } = location.state || {};

    const detailsRef = useRef<HTMLDivElement>(null);
    const scheduleRef = useRef<HTMLDivElement>(null);
    const speakersRef = useRef<HTMLDivElement>(null);
    const locationRef = useRef<HTMLDivElement>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [eventDetails, setEventDetails] = useState<ApiResponse<EventDetailsResponse> | null>(null);
    const [eventData, setEventData] = useState<Event>(
        locationEventData || {
            id: '',
            title: 'Event Not Found',
            description: ['No description available.'],
            date: null,
        },
    );
    const [activeTab, setActiveTab] = useState<'details' | 'schedule' | 'speakers' | 'location'>('details');

    const { formatDate } = useFormatDate();
    const eventFetchService = useApiService();

    useEffect(() => {
        if (!eventId) {
            setLoading(true);
            return;
        }

        if (locationEventData) {
            setEventData(locationEventData);
        }

        let isMounted = true;

        const fetchEventDetails = async () => {
            if (!isMounted) return;

            try {
                setLoading(true);
                const response = await eventFetchService.getEventDetails(eventId);
                if (response?.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
                    setEventDetails(response.data as unknown as ApiEventDetailsResponse);

                    if (!locationEventData) {
                        const mappedEvent = mapApiResponseToEvent(eventId, response.data);
                        setEventData(mappedEvent);
                    }
                } else {
                    throw new Error(response.message || 'Failed to fetch event details');
                }
            } catch (err) {
                if (!isMounted) return;

                setError(err instanceof Error ? err : new Error('An unknown error occurred'));
                console.error('Error fetching event details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();

        return () => {
            isMounted = false;
        };
    }, [eventId]);

    /**
     * Method to map from EventDetailsResponse to Event
     * This method has to be reviewed once the backend logic adds the data.details part
     */
    const mapApiResponseToEvent = (eventId: string, apiResponse: EventDetailsResponse): Event => {
        const event: Event = {
            id: eventId,
            title: 'Meetup Event',
            description: ['No description available.'],
            date: null,
            location: 'Location not specified',
            speakers: apiResponse.speakers || [],
            eventSchedule: apiResponse.keynoteSessions || [],
        };

        if (apiResponse.keynoteSessions && apiResponse.keynoteSessions.length > 0) {
            const firstSession = apiResponse.keynoteSessions[0];

            event.title = firstSession.subject || event.title;

            if (firstSession.startTime && firstSession.endTime) {
                const startDate = new Date(firstSession.startTime);
                const endDate = new Date(firstSession.endTime);

                event.date = firstSession.startTime;
                event.time = `${startDate.toLocaleTimeString()} - ${endDate.toLocaleTimeString()}`;
            }
        }

        if (apiResponse.notes && apiResponse.notes.length > 0) {
            const descriptions = apiResponse.notes
                .filter((note) => note.status === 'ACTIVE')
                .map((note) => note.description);

            if (descriptions.length > 0) {
                event.description = descriptions;
            }
        }

        if (apiResponse.meetupRegistrations) {
            const acceptedRegistrations = apiResponse.meetupRegistrations.filter(
                (reg) => reg.status === MeetupRegistrationStatus.ACCEPTED && !reg.cancelled,
            );
            event.registeredCount = acceptedRegistrations.length;
            event.maxSeats = 60;
        }

        event.isFreeEvent = true;

        if (apiResponse.keynoteSessions?.[0]?.imageURL) {
            event.imageUrl = apiResponse.keynoteSessions[0].imageURL;
        }

        return event;
    };

    const handleTabClicks = (tab: 'details' | 'schedule' | 'speakers' | 'location') => {
        setActiveTab(tab);

        const scrollOptions = { behavior: 'smooth' as ScrollBehavior, block: 'start' as ScrollLogicalPosition };
        switch (tab) {
            case 'details':
                detailsRef.current?.scrollIntoView(scrollOptions);
                break;
            case 'schedule':
                scheduleRef.current?.scrollIntoView(scrollOptions);
                break;
            case 'speakers':
                speakersRef.current?.scrollIntoView(scrollOptions);
                break;
            case 'location':
                locationRef.current?.scrollIntoView(scrollOptions);
                break;
        }
    };

    const descriptionParagraphs = Array.isArray(eventData.description)
        ? eventData.description
        : typeof eventData.description === 'string'
          ? [eventData.description]
          : ['No description available.'];

    if (loading && !locationEventData) {
        return (
            <PageContainer>
                <LoadingContainer>
                    <ComponentLoading />
                </LoadingContainer>
            </PageContainer>
        );
    }

    if (error && !locationEventData) {
        return (
            <PageContainer>
                <ErrorContainer>
                    <h2>Error Loading Event</h2>
                    <p>{error.message}</p>
                </ErrorContainer>
            </PageContainer>
        );
    }
    return (
        <PageContainer>
            <ContentWrapper>
                <LeftPanel>
                    <EventBanner>
                        {eventData.imageUrl && <img src={eventData.imageUrl} alt={eventData.title} />}
                    </EventBanner>
                    <TabContainer>
                        <Tab active={activeTab === 'details'} onClick={() => handleTabClicks('details')}>
                            Event Details
                        </Tab>
                        <Tab active={activeTab === 'schedule'} onClick={() => handleTabClicks('schedule')}>
                            Timeline
                        </Tab>
                        <Tab active={activeTab === 'speakers'} onClick={() => handleTabClicks('speakers')}>
                            Speakers
                        </Tab>
                        <Tab active={activeTab === 'location'} onClick={() => handleTabClicks('location')}>
                            Location
                        </Tab>
                    </TabContainer>
                    <div ref={detailsRef} id="details-ref">
                        <SectionTitle>Event Details</SectionTitle>
                        <EventDescription>
                            {descriptionParagraphs.map((paragraph: string, index: number) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </EventDescription>
                    </div>
                    <div ref={scheduleRef} id="schedule-section">
                        <EventTimeline schedule={eventDetails?.data?.keynoteSessions} />
                    </div>
                    <div ref={speakersRef} id="speakers-section">
                        <Speakers speakers={eventDetails?.data?.speakers} />
                    </div>
                    <div ref={locationRef} id="location-section">
                        <EventLocation location={eventData.location} />
                    </div>
                </LeftPanel>

                <RightPanel>
                    <Card
                        backgroundColor={themeColors.colors.gray.background}
                        padding={themeColors.spacing.lg}
                        style={{ display: 'flex', flexDirection: 'column' }}
                    >
                        <Card.Title>{eventData.title}</Card.Title>
                        <EventInfoContainer>
                            <EventInfoItem>
                                <Calendar size={16} />
                                <span>{formatDate(eventData.date)}</span>
                            </EventInfoItem>
                            <EventInfoItem>
                                <Clock size={16} />
                                <span>{eventData.time || 'Time not specified'}</span>
                            </EventInfoItem>
                            <EventInfoItem>
                                <MapPin size={16} />
                                <span>{eventData.location}</span>
                            </EventInfoItem>
                            <EventInfoItem>
                                <Coffee size={16} />
                                <span>Free coffee</span>
                            </EventInfoItem>
                            <EventInfoItem>
                                <Box size={16} />
                                <span>
                                    {eventData.registeredCount !== undefined && eventData.maxSeats !== undefined
                                        ? `${eventData.registeredCount}/${eventData.maxSeats} Registered`
                                        : eventDetails?.data.availableSeats !== undefined
                                          ? `${eventDetails.data.availableSeats} seats available`
                                          : 'Available'}
                                </span>
                            </EventInfoItem>
                            <EventInfoItem>
                                <Play size={16} />
                                <span>{eventData.isFreeEvent ? 'Free' : 'Paid'}</span>
                            </EventInfoItem>
                        </EventInfoContainer>
                        <Button asLink={true} to={`/events/register/${eventId}`} fullWidth={true} size="md">
                            Register for Event
                        </Button>
                    </Card>
                </RightPanel>
            </ContentWrapper>
        </PageContainer>
    );
}
