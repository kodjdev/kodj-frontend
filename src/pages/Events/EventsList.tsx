import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Event } from '@/types';
import { useRecoilValue } from 'recoil';
import { pastEventsAtom, upcomingEventsAtom } from '@/atoms/events';
import themeColors from '@/tools/themeColors';
import EventCard from '@/components/Card/EventCard';
import Button from '@/components/Button/Button';
import useApiService from '@/services';
import useFormatDate from '@/hooks/useFormatDate';
import { Spin } from 'antd';

enum EventFilter {
    ALL = 'all',
    UPCOMING = 'upcoming',
    PAST = 'past',
}

type EventFiltersProps = {
    onFilterChange?: (filter: EventFilter) => void;
    defaultFilter?: EventFilter;
};

const Container = styled.div`
    max-width: ${themeColors.breakpoints.desktop};
    margin: 0 auto;
`;

const SectionHeader = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: ${themeColors.spacing.sm};
    margin-bottom: ${themeColors.spacing.lg};
`;

const SectionTitle = styled.h2`
    color: ${themeColors.colors.neutral.white};
    font-weight: ${themeColors.typography.headings.desktop.h2.fontWeight};
    font-size: ${themeColors.typography.headings.desktop.h2.fontSize}px;
    line-height: ${themeColors.typography.headings.desktop.h2.lineHeight};
    margin: 0;
`;

const SectionTitleGray = styled.h2`
    color: ${themeColors.colors.gray.main};
    font-weight: ${themeColors.typography.headings.desktop.h2.fontWeight};
    font-size: ${themeColors.typography.headings.desktop.h2.fontSize}px;
    line-height: ${themeColors.typography.headings.desktop.h2.lineHeight};
    margin: 0 ${themeColors.spacing.sm};
`;

const EventsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: ${themeColors.spacing.xl};
    justify-content: center;
    padding-bottom: 80px;

    @media (min-width: ${themeColors.breakpoints.mobile}) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: ${themeColors.breakpoints.laptop}) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        justify-content: flex-start;
    }
`;

const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    background-color: ${themeColors.colors.neutral.black};
    color: ${themeColors.colors.primary.main};
`;

const EventFilterContainer = styled.div`
    display: flex;
    gap: ${themeColors.spacing.md};
    margin-bottom: ${themeColors.spacing.lg};
`;

const FilterButton = styled(Button)<{ isActive: boolean }>`
    background-color: ${(props) => (props.isActive ? themeColors.colors.primary.main : 'transparent')}!important;
    color: ${(props) => (props.isActive ? themeColors.colors.neutral.white : themeColors.colors.gray.main)} !important;
    border: 1px solid ${themeColors.cardBorder.color};
    border-radius: ${themeColors.radiusSizes.two_xl};
    padding: 6px 10px;
    height: auto;
    font-size: ${themeColors.typography.body.small.fontSize}px;
    font-weight: ${themeColors.font16.lineHeight};
    text-transform: none;
    outline: none !important;
    box-shadow: none !important;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.body.xsmall.fontSize}px;
        padding: 3px 6px !important;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const filterOptions = [
    { value: EventFilter.ALL, label: 'All' },
    { value: EventFilter.UPCOMING, label: 'Upcoming Events' },
    { value: EventFilter.PAST, label: 'Past Events' },
];

/**
 * EventsList - Page to display a list of events with filtering options.
 * @param {Function} onFilterChange - Callback function to handle filter changes.
 * @param {EventFilter} defaultFilter - Default filter to be applied on load.
 */
export default function EventsList({ onFilterChange, defaultFilter = EventFilter.ALL }: EventFiltersProps) {
    const eventFetchService = useApiService();

    const upcomingEvents = useRecoilValue(upcomingEventsAtom);
    const pastEvents = useRecoilValue(pastEventsAtom);
    // const setEventCache = useSetRecoilState(eventCacheAtom);

    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState<EventFilter>(defaultFilter);

    const { formatDate } = useFormatDate();

    const initializeData = useCallback(async () => {
        try {
            setLoading(true);

            console.log('Explicitly fetching upcoming events...');

            await eventFetchService.getEvents({
                type: 'upcoming',
                size: 50,
                page: 0,
            });

            console.log('Explicitly fetching past events...');

            await eventFetchService.getEvents({
                type: 'past',
                size: 50,
                page: 0,
            });
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    }, [eventFetchService]);

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            initializeData();
        }

        return () => {
            isMounted = false;
        };
    }, [initializeData]);

    const handleFilterChange = (filter: EventFilter) => {
        setActiveFilter(filter);
        if (onFilterChange) {
            onFilterChange(filter);
        }
    };

    const renderEventCard = (event: Event, isUpcoming: boolean) => (
        <StyledLink
            to={`/events/${isUpcoming ? 'upcoming' : 'past'}/details/${event.id}`}
            key={event.id}
            state={{ eventData: event, speakers: [], eventSchedule: [] }}
        >
            <EventCard
                isFreeEvent={true}
                title={event.title}
                description={event.description}
                date={formatDate(event.date)}
                author={event.author || "KO'DJ"}
                imageUrl={event.imageUrl || ''}
                registeredCount={event.registeredCount || 50}
                maxSeats={event.maxSeats || 60}
            />
        </StyledLink>
    );

    if (loading) {
        return (
            <LoadingContainer>
                <Spin tip="Wait a little bit" size="large" />
            </LoadingContainer>
        );
    }

    return (
        <Container>
            <EventFilterContainer>
                {filterOptions.map((option) => (
                    <FilterButton
                        variant={activeFilter === option.value ? 'primary' : 'text'}
                        size="sm"
                        key={option.value}
                        isActive={activeFilter === option.value}
                        onClick={() => handleFilterChange(option.value)}
                    >
                        {option.label}
                    </FilterButton>
                ))}
            </EventFilterContainer>
            <SectionHeader>
                <SectionTitle>{activeFilter === EventFilter.PAST ? 'Past' : 'Upcoming'}</SectionTitle>
                <SectionTitleGray>Events</SectionTitleGray>
            </SectionHeader>
            <EventsGrid>
                {activeFilter === EventFilter.ALL || activeFilter === EventFilter.UPCOMING ? (
                    upcomingEvents && upcomingEvents.length > 0 ? (
                        <>{upcomingEvents.map((event) => renderEventCard(event, true))}</>
                    ) : (
                        <EventCard isPlaceholder />
                    )
                ) : pastEvents && pastEvents.length > 0 ? (
                    pastEvents.map((event) => renderEventCard(event, false))
                ) : (
                    <EventCard isPlaceholder />
                )}
            </EventsGrid>
            {activeFilter === EventFilter.ALL && (
                <>
                    <SectionHeader>
                        <SectionTitle>Past</SectionTitle>
                        <SectionTitleGray>Events</SectionTitleGray>
                    </SectionHeader>
                    <EventsGrid>
                        {pastEvents && pastEvents.length > 0 ? (
                            pastEvents.map((event) => renderEventCard(event, false))
                        ) : (
                            <EventCard isPlaceholder />
                        )}
                    </EventsGrid>
                </>
            )}
        </Container>
    );
}
