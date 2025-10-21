import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import Card from '@/components/Card/Card';
import { Calendar, Clock, MapPin, Coffee, Box, Play, ArrowLeft } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { EventTimeline } from '@/pages/Events/EventDetails/EventTimeline';
import { EventLocation } from '@/pages/Events/EventDetails/EventLocation';
import Button from '@/components/Button/Button';
import { MeetupRegistrationStatus } from '@/types/enums';
import Speakers from '@/components/Speakers';
import { Event, EventDetailsResponse } from '@/types/event';
import { ApiResponse } from '@/types/fetch';
import useApiService from '@/services';
import useFormatDate from '@/hooks/useFormatDate';
import PageLoading from '@/components/Loading/LoadingAnimation';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/atoms/user';
import { useAuthState } from '@/hooks/useAuthState';

const PageContainer = styled.div`
    background-color: ${themeColors.colors.neutral.black};
    color: ${themeColors.colors.neutral.white};

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        padding: 0;
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
    position: sticky;
    top: 100px;
    height: fit-content;
    align-self: flex-start;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        display: none;
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        display: none;
    }
`;

const MobileRightPanel = styled.div`
    display: none;
    margin-bottom: ${themeColors.spacing.lg};

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        display: block;
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
        color: ${themeColors.colors.neutral.white};
        font-size: ${themeColors.typography.body.medium.fontSize}px;
        line-height: ${themeColors.typography.body.medium.lineHeight};
        margin-bottom: ${themeColors.spacing.md};
    }
`;

const TabContainer = styled.div`
    display: flex;
    margin-bottom: ${themeColors.spacing.lg};
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        flex-wrap: nowrap;
    }
`;

const Tab = styled.button<{ active: boolean }>`
    background: none;
    border: none;
    outline: none;
    padding: ${themeColors.spacing.md} ${themeColors.spacing.lg};
    color: ${(props) => (props.active ? themeColors.colors.neutral.white : themeColors.colors.gray.main)};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    font-weight: ${(props) => (props.active ? 600 : 400)};
    cursor: pointer;
    position: relative;
    flex: 0 0 auto;
    transition: color 0.2s ease;
    -webkit-tap-highlight-color: transparent;
    white-space: nowrap;
    min-width: fit-content;

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
        flex: 0 0 auto;
        text-align: center;
        min-width: 120px;
    }
    &:focus {
        outline: none;
    }

    &:active {
        outline: none;
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

const BackLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    color: ${themeColors.colors.gray.main};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    text-decoration: none;
    margin-bottom: ${themeColors.spacing.lg};
    transition: color 0.2s ease;

    &:hover {
        color: ${themeColors.colors.primary.main};
    }

    svg {
        margin-right: ${themeColors.spacing.xs};
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
    const userAtomData = useRecoilValue(userAtom);
    const { userId } = useAuthState();

    const detailsRef = useRef<HTMLDivElement>(null);
    const scheduleRef = useRef<HTMLDivElement>(null);
    const speakersRef = useRef<HTMLDivElement>(null);
    const locationRef = useRef<HTMLDivElement>(null);
    const hasFetched = useRef(false);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [eventDetails, setEventDetails] = useState<ApiResponse<EventDetailsResponse> | null>(null);
    const [eventData, setEventData] = useState<Event>({
        id: '',
        title: 'Loading...',
        description: ['Loading event details...'],
        date: null,
        startTime: undefined,
        location: 'Loading...',
        imageUrl: undefined,
    });
    const [activeTab, setActiveTab] = useState<'details' | 'schedule' | 'speakers' | 'location'>('details');

    const { formatDate, formatTime } = useFormatDate();
    const eventFetchService = useApiService();

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchEventDetails = async () => {
            if (!eventId) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                const response = await eventFetchService.getEventDetails(eventId);

                if (response?.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
                    setEventDetails(response);
                    const mappedEvent = mapApiResponseToEvent(eventId, response.data);
                    setEventData(mappedEvent);
                } else {
                    throw new Error(response.message || 'Failed to fetch event details');
                }
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An unknown error occurred'));
                console.error('Error fetching event details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    useEffect(() => {
        if (userAtomData?.id) {
            localStorage.setItem('lastUserId', userAtomData.id);
        }
    }, [userAtomData?.id]);

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, [location.pathname]);

    /**
     * Method to map from EventDetailsResponse to Event
     * This method has to be reviewed once the backend logic adds the data.details part
     */
    const mapApiResponseToEvent = (eventId: string, apiResponse: EventDetailsResponse): Event => {
        const event: Event = {
            id: eventId,
            title: apiResponse.title || 'Meetup Event',
            description: apiResponse.description ? [apiResponse.description] : ['No description available.'],
            date: apiResponse.meetupDate || null,
            location: apiResponse.location || 'Location not specified',
            speakers: apiResponse.speakers || [],
            eventSchedule: apiResponse.keynoteSessions || [],
            provided: apiResponse.provided || 'Not specified',
            startTime: apiResponse.startTime || undefined,
            endTime: apiResponse.endTime || undefined,
            imageUrl: apiResponse.imageURL || undefined,
        };

        if (apiResponse.meetupRegistrations) {
            const acceptedRegistrations = apiResponse.meetupRegistrations.filter(
                (reg) => reg.status === MeetupRegistrationStatus.ACCEPTED,
            );
            event.registeredCount = acceptedRegistrations.length;
            event.maxSeats = apiResponse.maxSeats || 60;
            event.availableSeats = apiResponse.availableSeats;
        }

        event.isFreeEvent = true;

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

    const isUserRegistered = () => {
        if (!userId || !eventDetails?.data?.meetupRegistrations) {
            return false;
        }

        return eventDetails.data.meetupRegistrations.some((registration) => String(registration.id) === String(userId));
    };
    const isPastEvent = eventData.date
        ? (typeof eventData.date === 'string' ? new Date(eventData.date) : new Date(eventData.date.seconds * 1000)) <
          new Date()
        : false;

    const descriptionParagraphs = Array.isArray(eventData.description)
        ? eventData.description
        : typeof eventData.description === 'string'
          ? [eventData.description]
          : ['No description available.'];

    if (loading) {
        return <PageLoading message="Loading Event Details ..." />;
    }

    if (error) {
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
            <BackLink to="/events">
                <ArrowLeft size={16} /> Back to Events
            </BackLink>
            <ContentWrapper>
                <LeftPanel>
                    <EventBanner>
                        {eventData.imageUrl && <img src={eventData.imageUrl} alt={eventData.title} />}
                    </EventBanner>

                    {/* Mobile Right Panel - Shows after image on mobile */}
                    <MobileRightPanel>
                        <Card
                            backgroundColor="#1a1a1a;"
                            padding={themeColors.spacing.md}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                zIndex: 1,
                            }}
                        >
                            <Card.Title>{eventData.title}</Card.Title>
                            <EventInfoContainer>
                                <EventInfoItem>
                                    <Calendar size={16} />
                                    <span>{eventData.date ? formatDate(eventData.date) : 'Date not specified'}</span>
                                </EventInfoItem>
                                <EventInfoItem>
                                    <Clock size={16} />
                                    <span>
                                        {eventData.startTime ? formatTime(eventData.startTime) : 'Time not specified'}
                                    </span>
                                </EventInfoItem>
                                <EventInfoItem>
                                    <MapPin size={16} />
                                    <span>{eventData.location}</span>
                                </EventInfoItem>
                                <EventInfoItem>
                                    <Coffee size={16} />
                                    <span>{eventDetails?.data?.provided || 'Not specified'}</span>
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
                            {isPastEvent ? (
                                <Button fullWidth={true} size="md" disabled={true} variant="secondary">
                                    Event has passed
                                </Button>
                            ) : isUserRegistered() ? (
                                <Button fullWidth={true} size="md" disabled={true} variant="secondary">
                                    Already registered
                                </Button>
                            ) : (
                                <Button
                                    asLink={true}
                                    to={`/events/upcoming/register/${eventId}`}
                                    state={{
                                        title: eventData.title,
                                        date: eventData.date,
                                        location: eventData.location,
                                        imageUrl: eventData.imageUrl,
                                        author: eventData.author,
                                        eventRoom: eventData.eventRoom,
                                        registeredCount: eventData.registeredCount,
                                        maxSeats: eventData.maxSeats,
                                    }}
                                    fullWidth={true}
                                    size="md"
                                    variant="primary"
                                >
                                    Register for Event
                                </Button>
                            )}
                        </Card>
                    </MobileRightPanel>

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

                {/* Desktop Right Panel - Hidden on mobile */}
                <RightPanel>
                    <Card
                        backgroundColor="#1a1a1a;"
                        padding={themeColors.spacing.lg}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            zIndex: 1,
                        }}
                    >
                        <Card.Title>{eventData.title}</Card.Title>
                        <EventInfoContainer>
                            <EventInfoItem>
                                <Calendar size={16} />
                                <span>{formatDate(eventData.date)}</span>
                            </EventInfoItem>
                            <EventInfoItem>
                                <Clock size={16} />
                                <span>
                                    {eventData.startTime ? formatTime(eventData.startTime) : 'Time not specified'}
                                </span>
                            </EventInfoItem>
                            <EventInfoItem>
                                <MapPin size={16} />
                                <span>{eventData.location}</span>
                            </EventInfoItem>
                            <EventInfoItem>
                                <Coffee size={16} />
                                <span>{eventDetails?.data?.provided || 'Not specified'}</span>
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
                        {isPastEvent ? (
                            <Button fullWidth={true} size="md" disabled={true} variant="secondary">
                                Event has passed
                            </Button>
                        ) : isUserRegistered() ? (
                            <Button fullWidth={true} size="md" disabled={true} variant="secondary">
                                Already registered
                            </Button>
                        ) : (
                            <Button
                                asLink={true}
                                to={`/events/upcoming/register/${eventId}`}
                                state={{
                                    title: eventData.title,
                                    date: eventData.date,
                                    location: eventData.location,
                                    imageUrl: eventData.imageUrl,
                                    author: eventData.author,
                                    eventRoom: eventData.eventRoom,
                                    registeredCount: eventData.registeredCount,
                                    maxSeats: eventData.maxSeats,
                                }}
                                fullWidth={true}
                                size="md"
                                variant="primary"
                            >
                                Register for Event
                            </Button>
                        )}
                    </Card>
                </RightPanel>
            </ContentWrapper>
        </PageContainer>
    );
}
