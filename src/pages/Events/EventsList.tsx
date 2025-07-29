import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { eventsCacheStatusAtom, pastEventsAtom, upcomingEventsAtom } from '@/atoms/events';
import themeColors from '@/tools/themeColors';
import EventCard from '@/components/Card/EventCard';
import Button from '@/components/Button/Button';
import useApiService from '@/services';
import useFormatDate from '@/hooks/useFormatDate';
import { message } from 'antd';
import PageLoading from '@/components/Loading/LoadingAnimation';
import { Event } from '@/types/event';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

enum EventFilter {
    ALL = 'all',
    UPCOMING = 'upcoming',
    PAST = 'past',
}

enum SortOrder {
    DESC = 'desc',
    ASC = 'asc',
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
    align-items: center;
    gap: ${themeColors.spacing.sm};
    margin-bottom: ${themeColors.spacing.lg};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        gap: ${themeColors.spacing.xs};
        flex-direction: column;
        align-items: stretch;
    }
`;

const SectionTitle = styled.h2`
    color: ${themeColors.colors.neutral.white};
    font-weight: ${themeColors.typography.headings.desktop.h2.fontWeight};
    font-size: ${themeColors.typography.headings.desktop.h2.fontSize}px;
    line-height: ${themeColors.typography.headings.desktop.h2.lineHeight};
    margin: 0;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.headings.mobile.h2.fontSize}px;
    }
`;

const SectionTitleGray = styled.h2`
    color: ${themeColors.colors.gray.main};
    font-weight: ${themeColors.typography.headings.desktop.h2.fontWeight};
    font-size: ${themeColors.typography.headings.desktop.h2.fontSize}px;
    line-height: ${themeColors.typography.headings.desktop.h2.lineHeight};
    margin: 0;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.headings.mobile.h2.fontSize}px;
    }
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

const EventFilterContainer = styled.div`
    display: flex;
    gap: ${themeColors.spacing.md};
    margin-bottom: ${themeColors.spacing.lg};
`;

const FilterButton = styled(Button)<{ isActive: boolean }>`
    background-color: ${(props) => (props.isActive ? themeColors.white : 'transparent')}!important;
    color: ${(props) => (props.isActive ? themeColors.colors.neutral.black : themeColors.colors.gray.main)} !important;
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
        padding: 6px 10px !important;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const SortContainer = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.sm};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        width: 100%;
        margin-left: 0;
        margin-top: 0;
        justify-content: stretch;
    }
`;

const SortDropdown = styled.div`
    position: relative;
    min-width: 150px;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        min-width: unset;
        width: 100%;
    }
`;

const SortButtonWrapper = styled.div`
    button {
        width: 100%;
        justify-content: space-between;
        padding: 8px 16px !important;

        @media (max-width: ${themeColors.breakpoints.mobile}) {
            padding: 6px 12px !important;
            height: 32px !important;
            font-size: ${themeColors.typography.body.xsmall.fontSize}px !important;
        }

        svg {
            margin-left: 8px;
            width: 16px;
            height: 16px;
            transition: transform 0.2s ease;

            @media (max-width: ${themeColors.breakpoints.mobile}) {
                width: 14px;
                height: 14px;
                margin-left: 4px;
            }
        }

        &.open svg {
            transform: rotate(180deg);
        }
    }
`;

const SortDropdownMenu = styled.div`
    position: absolute;
    top: calc(100% + 4px);
    right: 0;
    left: auto;
    min-width: 140px;
    background-color: ${themeColors.colors.neutral.black};
    border: 1px solid ${themeColors.cardBorder.color};
    border-radius: ${themeColors.radiusSizes.lg};
    overflow: hidden;
    z-index: 10;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        min-width: 100%;
        top: calc(100% + 2px);
    }
`;

const SortLabel = styled.span`
    color: ${themeColors.colors.gray.main};
    font-size: ${themeColors.typography.body.small.fontSize}px;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        display: none;
    }
`;

const SortOption = styled.div`
    button {
        width: 100%;
        border-radius: 0 !important;
        justify-content: flex-start !important;
        font-size: ${themeColors.typography.body.small.fontSize}px !important;

        @media (max-width: ${themeColors.breakpoints.mobile}) {
            font-size: ${themeColors.typography.body.xsmall.fontSize}px !important;
            padding: 8px 12px !important;
            height: auto !important;
            white-space: nowrap;
        }

        &:not(:last-child) {
            border-bottom: 1px solid ${themeColors.cardBorder.color};
        }
    }
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: baseline;
    gap: ${themeColors.spacing.sm};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        width: 100%;
    }
`;

/**
 * EventsList - Page to display a list of events with filtering options.
 * @param {Function} onFilterChange - Callback function to handle filter changes.
 * @param {EventFilter} defaultFilter - Default filter to be applied on load.
 */
export default function EventsList({ onFilterChange, defaultFilter = EventFilter.ALL }: EventFiltersProps) {
    const eventFetchService = useApiService();

    const upcomingEvents = useRecoilValue(upcomingEventsAtom);
    const pastEvents = useRecoilValue(pastEventsAtom);
    const cacheStatus = useRecoilValue(eventsCacheStatusAtom);

    const [messageApi, contextHolder] = message.useMessage();

    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState<EventFilter>(defaultFilter);
    const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const hasFetched = useRef(false);

    const { t } = useTranslation('events');

    const { formatDate } = useFormatDate();

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchData = async () => {
            const needsUpcomingData = !cacheStatus.upcoming.loaded;
            const needsPastData = !cacheStatus.past.loaded;

            if (!needsUpcomingData && !needsPastData) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                const promises = [];

                if (needsUpcomingData) {
                    promises.push(
                        eventFetchService.getEvents({
                            type: 'upcoming',
                            size: 50,
                            page: 0,
                        }),
                    );
                }

                if (needsPastData) {
                    promises.push(
                        eventFetchService.getEvents({
                            type: 'past',
                            size: 50,
                            page: 0,
                        }),
                    );
                }
                await Promise.all(promises);
            } catch (error) {
                messageApi.error(
                    error instanceof Error ? error.message : 'An unexpected error occurred while fetching events.',
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.sort-dropdown-container')) {
                setShowSortDropdown(false);
            }
        };

        if (showSortDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSortDropdown]);

    const filterOptions = [
        { value: EventFilter.ALL, label: t('events.filters.all') },
        { value: EventFilter.UPCOMING, label: t('events.filters.upcoming') },
        { value: EventFilter.PAST, label: t('events.filters.past') },
    ];

    const handleFilterChange = (filter: EventFilter) => {
        setActiveFilter(filter);
        if (onFilterChange) {
            onFilterChange(filter);
        }
    };

    const sortEvents = (events: Event[]) => {
        return [...events].sort((a, b) => {
            const getTimestamp = (date: string | { seconds: number } | null): number => {
                if (!date) return 0;
                if (typeof date === 'string') {
                    return new Date(date).getTime();
                }
                if (date.seconds) {
                    return date.seconds * 1000;
                }
                return 0;
            };

            const dateA = getTimestamp(a.date);
            const dateB = getTimestamp(b.date);

            return sortOrder === SortOrder.DESC ? dateB - dateA : dateA - dateB;
        });
    };

    const renderEventCard = (event: Event, isUpcoming: boolean) => (
        <StyledLink
            to={`/events/${isUpcoming ? 'upcoming' : 'past'}/details/${event.id}`}
            key={event.id}
            state={{ eventData: event, speakers: [], eventSchedule: [] }}
        >
            <EventCard
                id={Number(event.id)}
                isFreeEvent={true}
                title={event.title}
                description={Array.isArray(event.description) ? event.description.join(' ') : event.description}
                date={formatDate(event.date)}
                author={event.author || "KO'DJ"}
                imageUrl={event.imageUrl || ''}
                registeredCount={event.registeredCount}
                maxSeats={event.maxSeats || 50}
                availableSeats={event.availableSeats}
            />
        </StyledLink>
    );

    if (loading) {
        return <PageLoading message="Loading Events ..." />;
    }

    return (
        <Container>
            {contextHolder}
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
                <TitleWrapper>
                    <SectionTitle>
                        {activeFilter === EventFilter.PAST ? t('events.sections.past') : t('events.sections.upcoming')}
                    </SectionTitle>
                    <SectionTitleGray>{t('events.sections.events')}</SectionTitleGray>
                </TitleWrapper>
                {activeFilter === EventFilter.PAST && (
                    <SortContainer>
                        <SortLabel>{t('events.sections.sortBy')}</SortLabel>
                        <SortDropdown className="sort-dropdown-container">
                            <SortButtonWrapper>
                                <Button
                                    variant="outline"
                                    size="md"
                                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                                    className={showSortDropdown ? 'open' : ''}
                                >
                                    {sortOrder === SortOrder.DESC ? 'Newest First' : 'Oldest First'}
                                    <ChevronDown size={13} />
                                </Button>
                            </SortButtonWrapper>
                            {showSortDropdown && (
                                <SortDropdownMenu>
                                    <SortOption>
                                        <Button
                                            variant="text"
                                            size="sm"
                                            fullWidth
                                            onClick={() => {
                                                setSortOrder(SortOrder.DESC);
                                                setShowSortDropdown(false);
                                            }}
                                        >
                                            {t('events.sections.sortOptions.dateDesc')}
                                        </Button>
                                    </SortOption>
                                    <SortOption>
                                        <Button
                                            variant="text"
                                            size="sm"
                                            fullWidth
                                            onClick={() => {
                                                setSortOrder(SortOrder.ASC);
                                                setShowSortDropdown(false);
                                            }}
                                        >
                                            {t('events.sections.sortOptions.dateAsc')}
                                        </Button>
                                    </SortOption>
                                </SortDropdownMenu>
                            )}
                        </SortDropdown>
                    </SortContainer>
                )}
            </SectionHeader>
            <EventsGrid>
                {activeFilter === EventFilter.ALL || activeFilter === EventFilter.UPCOMING ? (
                    upcomingEvents && upcomingEvents.length > 0 ? (
                        <>{sortEvents(upcomingEvents).map((event) => renderEventCard(event, true))}</>
                    ) : (
                        <EventCard id={0} isPlaceholder />
                    )
                ) : pastEvents && pastEvents.length > 0 ? (
                    sortEvents(pastEvents).map((event) => renderEventCard(event, false))
                ) : (
                    <EventCard id={1} isPlaceholder />
                )}
            </EventsGrid>
            {activeFilter === EventFilter.ALL && (
                <>
                    <SectionHeader>
                        <TitleWrapper>
                            <SectionTitle>{t('events.sections.past')}</SectionTitle>
                            <SectionTitleGray>{t('events.sections.events')}</SectionTitleGray>
                        </TitleWrapper>
                        <SortContainer>
                            <SortLabel>{t('events.sections.sortBy')}</SortLabel>
                            <SortDropdown className="sort-dropdown-container">
                                <SortButtonWrapper>
                                    <Button
                                        variant="outline"
                                        size="mini"
                                        onClick={() => setShowSortDropdown(!showSortDropdown)}
                                        className={showSortDropdown ? 'open' : ''}
                                    >
                                        <span>{sortOrder === SortOrder.DESC ? 'Newest First' : 'Oldest First'}</span>
                                        <ChevronDown size={13} />
                                    </Button>
                                </SortButtonWrapper>
                                {showSortDropdown && (
                                    <SortDropdownMenu>
                                        <SortOption>
                                            <Button
                                                variant="text"
                                                size="sm"
                                                fullWidth
                                                onClick={() => {
                                                    setSortOrder(SortOrder.DESC);
                                                    setShowSortDropdown(false);
                                                }}
                                            >
                                                {t('events.sections.sortOptions.dateDesc')}
                                            </Button>
                                        </SortOption>
                                        <SortOption>
                                            <Button
                                                variant="text"
                                                size="sm"
                                                fullWidth
                                                onClick={() => {
                                                    setSortOrder(SortOrder.ASC);
                                                    setShowSortDropdown(false);
                                                }}
                                            >
                                                {t('events.sections.sortOptions.dateAsc')}
                                            </Button>
                                        </SortOption>
                                    </SortDropdownMenu>
                                )}
                            </SortDropdown>
                        </SortContainer>
                    </SectionHeader>
                    <EventsGrid>
                        {pastEvents && pastEvents.length > 0 ? (
                            sortEvents(pastEvents).map((event) => renderEventCard(event, false))
                        ) : (
                            <EventCard id={2} isPlaceholder />
                        )}
                    </EventsGrid>
                </>
            )}
        </Container>
    );
}
