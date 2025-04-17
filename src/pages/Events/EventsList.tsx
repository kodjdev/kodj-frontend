import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Spin } from "antd";
import { Event } from "@/types";
import { useRecoilValue } from "recoil";
import { pastEventsAtom, upcomingEventsAtom } from "@/atoms/events";
import themeColors from "@/tools/themeColors";
import useFetchEvent from "@/hooks/event/useFetchEvent";
import EventCard from "@/components/Card/EventCard";

const Container = styled.div`
  max-width: ${themeColors.breakpoints.desktop};
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: ${themeColors.spacing.sm};
  margin-bottom: ${themeColors.spacing.xl};
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

const SectionSubtitle = styled.h4`
  font-weight: ${themeColors.typography.headings.desktop.h4.fontWeight};
  color: ${themeColors.colors.neutral.white};
  margin-top: ${themeColors.spacing.lg};
  margin-bottom: ${themeColors.spacing.lg};
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: ${themeColors.spacing.xxl};
  justify-content: center;
  padding-bottom: 10rem;

  @media (min-width: ${themeColors.breakpoints.mobile}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${themeColors.breakpoints.laptop}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    justify-content: flex-start;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  background-color: ${themeColors.black_40};
  color: ${themeColors.colors.primary.main};
`;

const EventFilterContainer = styled.div`
  display: flex;
  gap: ${themeColors.spacing.md};
  margin-bottom: ${themeColors.spacing.lg};
`;

const FilterButton = styled.button<{ isActive: boolean }>`
  background-color: ${(props) =>
    props.isActive ? themeColors.colors.primary.main : "transparent"};
  color: ${(props) =>
    props.isActive
      ? themeColors.colors.neutral.white
      : themeColors.colors.gray.main};
  border: 1px solid
    ${(props) =>
      props.isActive
        ? themeColors.colors.primary.main
        : themeColors.colors.gray.line};
  border-radius: ${themeColors.radiusSizes.two_xl};
  padding: ${themeColors.spacing.xs} ${themeColors.spacing.sm};
  font-size: ${themeColors.typography.body.small.fontSize}px;
  font-weight: ${themeColors.font14.fontWeight};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.isActive
        ? themeColors.colors.primary.dark
        : themeColors.colors.utility.overlay};
  }
`;

enum EventFilter {
  ALL = "all",
  UPCOMING = "upcoming",
  PAST = "past",
}
/**
 * EventsList Component
 * Displays a list of upcoming and past events fetched from the server
 */
export default function EventsList() {
  const { fetchAllEvents } = useFetchEvent();

  const upcomingEvents = useRecoilValue(upcomingEventsAtom);
  const pastEvents = useRecoilValue(pastEventsAtom);
  // const setEventCache = useSetRecoilState(eventCacheAtom);

  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<EventFilter>(
    EventFilter.ALL
  );
  useEffect(() => {
    let isMounted = true;

    const initializeData = async () => {
      try {
        await fetchAllEvents();
      } catch (error) {
        console.log("Error initializing data: ", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeData();

    return () => {
      isMounted = false;
    };
  }, [fetchAllEvents]);

  // method to render event cards
  const renderEventCard = (event: Event, isUpcoming: boolean) => (
    <Link
      to={`/events/${isUpcoming ? "upcoming" : "past"}/details/${event.id}`}
      key={event.id}
      state={{ eventData: event, speakers: [], eventSchedule: [] }}
    >
      <EventCard
        title={event.title}
        description={event.description}
        date={
          typeof event.date === "string"
            ? event.date
            : event.date
            ? new Date(event.date.seconds * 1000).toDateString()
            : "Date not available"
        }
        author={event.author}
        imageUrl={event.imageUrl || ""}
        isUpcoming={isUpcoming}
        registeredCount={event.registeredCount}
        maxSeats={event.maxSeats}
      />
    </Link>
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
        <FilterButton
          isActive={activeFilter === EventFilter.ALL}
          onClick={() => setActiveFilter(EventFilter.ALL)}
        >
          All
        </FilterButton>
        <FilterButton
          isActive={activeFilter === EventFilter.UPCOMING}
          onClick={() => setActiveFilter(EventFilter.UPCOMING)}
        >
          Upcoming Events
        </FilterButton>
        <FilterButton
          isActive={activeFilter === EventFilter.PAST}
          onClick={() => setActiveFilter(EventFilter.PAST)}
        >
          Past Events
        </FilterButton>
      </EventFilterContainer>

      {(activeFilter === EventFilter.ALL ||
        activeFilter === EventFilter.UPCOMING) && (
        <>
          <SectionHeader>
            <SectionTitle>Upcoming</SectionTitle>
            <SectionTitleGray>Events</SectionTitleGray>
          </SectionHeader>
          <SectionSubtitle>
            Check out our upcoming events below:
          </SectionSubtitle>
          <EventsGrid>
            {upcomingEvents && upcomingEvents.length > 0 ? (
              <>
                {upcomingEvents.map((event) => renderEventCard(event, true))}
                <EventCard isPlaceholder />
              </>
            ) : (
              <EventCard isPlaceholder />
            )}
          </EventsGrid>
        </>
      )}

      {(activeFilter === EventFilter.ALL ||
        activeFilter === EventFilter.PAST) && (
        <>
          <SectionHeader>
            <SectionTitle>Past</SectionTitle>
            <SectionTitleGray>Events</SectionTitleGray>
          </SectionHeader>
          <SectionSubtitle>Check out our past events below:</SectionSubtitle>
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
