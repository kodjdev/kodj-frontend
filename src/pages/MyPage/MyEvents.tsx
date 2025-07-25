import { useState } from 'react';
import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import EventCard, { EventCardProps } from '@/components/Card/EventCard';
import EmptyState from '@/components/EmptyState';
import { useTranslation } from 'react-i18next';

type MyEventsProps = {
    registeredEvents: EventCardProps[];
    loading: boolean;
    onCancelEvent: (eventId: number) => void;
};

enum TabOption {
    PAST = 'past',
    UPCOMING = 'upcoming',
}

const TabsContainer = styled.div`
    margin-bottom: ${themeColors.spacing.md};
`;

const TabsHeader = styled.div`
    display: flex;
    margin-bottom: ${themeColors.spacing.lg};
`;

const Tab = styled.button<{ active: boolean }>`
    background-color: transparent;
    border: none;
    outline: none;
    color: ${(props) => (props.active ? themeColors.colors.neutral.white : themeColors.colors.gray.text)};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    font-weight: ${(props) => (props.active ? 600 : 400)};
    padding: ${themeColors.spacing.sm} ${themeColors.spacing.md};
    cursor: pointer;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: ${(props) => (props.active ? themeColors.colors.primary.main : 'transparent')};
    }

    &:focus {
        outline: none;
    }
`;

const EventsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: ${themeColors.spacing.lg};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        grid-template-columns: 1fr;
    }
`;

/**
 * EventTabs Component - Sub Organism Component
 * Tabbed interface displaying user's past and upcoming events
 */
export default function MyEvents({ registeredEvents, loading, onCancelEvent }: MyEventsProps) {
    const { t } = useTranslation('mypage');
    const [activeTab, setActiveTab] = useState<TabOption>(TabOption.UPCOMING);

    const now = new Date();
    const pastEvents = registeredEvents.filter((event) => new Date(event.date || '') < now);
    const upcomingEvents = registeredEvents.filter((event) => new Date(event.date || '') >= now);

    const events = activeTab === TabOption.PAST ? pastEvents : upcomingEvents;

    const renderEmptyState = () => (
        <EmptyState
            title={t('events.noEventsTitle')}
            description={
                activeTab === TabOption.PAST ? t('events.noPastDescription') : t('events.noUpcomingDescription')
            }
            buttonText={t('events.browseEventsButton')}
            buttonAsLink={true}
            buttonTo="/events"
            showLogo={true}
        />
    );

    return (
        <>
            <TabsContainer>
                <TabsHeader>
                    <Tab active={activeTab === TabOption.UPCOMING} onClick={() => setActiveTab(TabOption.UPCOMING)}>
                        {t('events.upcomingEvents')}
                    </Tab>
                    <Tab active={activeTab === TabOption.PAST} onClick={() => setActiveTab(TabOption.PAST)}>
                        {t('events.pastEvents')}
                    </Tab>
                </TabsHeader>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>Loading events...</div>
                ) : events.length > 0 ? (
                    <EventsGrid>
                        {events.map((event) => (
                            <EventCard
                                key={event.id}
                                title={event.title}
                                imageUrl={event.imageUrl}
                                registeredCount={event.registeredCount}
                                maxSeats={event.maxSeats}
                                cancelled={event.cancelled}
                                canCancel={event.canCancel}
                                onCancel={() => onCancelEvent(event.id)}
                                id={event.id}
                            />
                        ))}
                    </EventsGrid>
                ) : (
                    renderEmptyState()
                )}
            </TabsContainer>
        </>
    );
}
