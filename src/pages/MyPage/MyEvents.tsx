import { useState } from 'react';
import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import Button from '@/components/Button/Button';
import EventCard from '@/components/Card/EventCard';
import { EventCardProps } from '@/types';
import kodjWhiteLogo from '@/static/icons/logo.png';

enum TabOption {
    PAST = 'past',
    UPCOMING = 'upcoming',
}

const TabsContainer = styled.div`
    margin-bottom: ${themeColors.spacing.md};
`;

const TabsHeader = styled.div`
    display: flex;
    border-bottom: 1px solid ${themeColors.cardBorder.color};
    margin-bottom: ${themeColors.spacing.lg};
`;

const Tab = styled.button<{ active: boolean }>`
    background-color: transparent;
    border: none;
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
`;

const EventsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: ${themeColors.spacing.lg};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        grid-template-columns: 1fr;
    }
`;

const EmptyState = styled.div`
    text-align: center;
    padding: ${themeColors.spacing.fourXl} 0;
    color: ${themeColors.colors.gray.text};
`;

const EmptyStateTitle = styled.h3`
    font-size: ${themeColors.typography.body.large.fontSize}px;
    margin-bottom: ${themeColors.spacing.md};
    color: ${themeColors.colors.neutral.white};
`;

const EmptyStateText = styled.p`
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    margin-bottom: ${themeColors.spacing.lg};
`;

/**
 * EventTabs Component - Sub Organism Component
 * Tabbed interface displaying user's past and upcoming events
 */
export default function MyEvents() {
    const [activeTab, setActiveTab] = useState<TabOption>(TabOption.UPCOMING);

    // here i will implement the my registered events api service later
    const pastEvents: EventCardProps[] = [];
    const upcomingEvents: EventCardProps[] = [];

    const events = activeTab === TabOption.PAST ? pastEvents : upcomingEvents;

    const renderEmptyState = () => (
        <EmptyState>
            <div style={{ marginBottom: themeColors.spacing.lg }}>
                <img src={kodjWhiteLogo} alt="KO'DJ Logo" style={{ width: '100px', borderRadius: '10%' }} />
            </div>
            <EmptyStateTitle>No events found</EmptyStateTitle>
            <EmptyStateText>
                {activeTab === TabOption.PAST
                    ? "You haven't attended any events yet."
                    : "You don't have any upcoming events."}
            </EmptyStateText>
            <Button variant="light" size="mini" asLink to="/events" style={{ marginTop: themeColors.spacing.md }}>
                Browse Events
            </Button>
        </EmptyState>
    );

    return (
        <div>
            <TabsContainer>
                <TabsHeader>
                    <Tab active={activeTab === TabOption.UPCOMING} onClick={() => setActiveTab(TabOption.UPCOMING)}>
                        Upcoming Events
                    </Tab>
                    <Tab active={activeTab === TabOption.PAST} onClick={() => setActiveTab(TabOption.PAST)}>
                        Past Events
                    </Tab>
                </TabsHeader>

                {events.length > 0 ? (
                    <EventsGrid>
                        {events.map((event) => (
                            <EventCard
                                key={event.id}
                                title={event.title}
                                imageUrl={event.imageUrl}
                                registeredCount={event.registeredCount}
                                maxSeats={event.maxSeats}
                                // isFreeEvent={event.isFreeEvent}
                            />
                        ))}
                    </EventsGrid>
                ) : (
                    renderEmptyState()
                )}
            </TabsContainer>
        </div>
    );
}
