import { useState, useEffect } from 'react';
import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import { Event } from '@/types/event';
import { useEventService } from '@/services/api/eventService';
import EventCard from '@/components/Card/EventCard';

const TabsContainer = styled.div`
    margin-bottom: ${themeColors.spacing.lg};
`;

const TabsHeader = styled.div`
    display: flex;
    border-bottom: 1px solid ${themeColors.cardBorder.color};
    margin-bottom: ${themeColors.spacing.lg};
`;

const Tab = styled.div<{ active: boolean }>`
    padding: ${themeColors.spacing.sm} ${themeColors.spacing.md};
    cursor: pointer;
    color: ${(props) => (props.active ? themeColors.colors.primary.main : themeColors.colors.gray.main)};
    font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
    border-bottom: 2px solid ${(props) => (props.active ? themeColors.colors.primary.main : 'transparent')};
    transition: all 0.2s ease-in-out;

    &:hover {
        color: ${themeColors.colors.primary.main};
    }
`;

const TabContent = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: ${themeColors.spacing.lg};
`;

const NoEventsMessage = styled.div`
    text-align: center;
    padding: ${themeColors.spacing.xl};
    color: ${themeColors.colors.gray.main};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
`;

// Helper function to format the date
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export default function EventTabs() {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
    const [events, setEvents] = useState<{ upcomingEvents: Event[]; pastEvents: Event[] }>({
        upcomingEvents: [],
        pastEvents: [],
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const eventService = useEventService();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setIsLoading(true);

                const token = localStorage.getItem('access_token');

                if (!token) {
                    throw new Error('No access token found');
                }

                const response = await eventService.getUserRegisteredEvents(token);
                if (response.statusCode === 200 && response.data) {
                    setEvents({
                        upcomingEvents: response.data.upcomingEvents || [],
                        pastEvents: response.data.pastEvents || [],
                    });
                }
            } catch (error) {
                console.error('Failed to fetch user events:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const displayedEvents = activeTab === 'upcoming' ? events.upcomingEvents : events.pastEvents;

    if (isLoading) {
        return <NoEventsMessage>Loading events...</NoEventsMessage>;
    }

    return (
        <TabsContainer>
            <TabsHeader>
                <Tab active={activeTab === 'upcoming'} onClick={() => setActiveTab('upcoming')}>
                    Upcoming Events ({events.upcomingEvents.length})
                </Tab>
                <Tab active={activeTab === 'past'} onClick={() => setActiveTab('past')}>
                    Past Events ({events.pastEvents.length})
                </Tab>
            </TabsHeader>

            {displayedEvents.length === 0 ? (
                <NoEventsMessage>No {activeTab} events found.</NoEventsMessage>
            ) : (
                <TabContent>
                    {displayedEvents.map((event) => (
                        <EventCard
                            key={event.id}
                            isFreeEvent={event.isFreeEvent || true}
                            title={event.title}
                            date={
                                typeof event.date === 'string'
                                    ? formatDate(event.date)
                                    : formatDate(new Date().toISOString())
                            }
                            author={event.author || "KO'DJ"}
                            imageUrl={event.imageUrl || ''}
                            registeredCount={event.registeredCount || 50}
                            maxSeats={event.maxSeats || 60}
                        />
                    ))}
                </TabContent>
            )}
        </TabsContainer>
    );
}
