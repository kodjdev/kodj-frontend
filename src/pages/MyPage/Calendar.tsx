import { useState } from 'react';
import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import { FaChevronLeft, FaChevronRight, FaCalendarAlt } from 'react-icons/fa';

type CalendarEvent = {
    id: string;
    title: string;
    date: Date;
    type: 'upcoming' | 'past';
};

const CalendarContainer = styled.div`
    background-color: ${themeColors.colors.gray.background};
    border-radius: ${themeColors.cardBorder.md};
    border: 1px solid ${themeColors.cardBorder.color};
    overflow: hidden;
`;

const CalendarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${themeColors.spacing.md};
    background-color: ${themeColors.colors.gray.dark};
    color: ${themeColors.colors.neutral.white};
`;

const MonthNavigation = styled.div`
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.md};
`;

const MonthTitle = styled.h3`
    margin: 0;
    font-size: ${themeColors.typography.body.large.fontSize}px;
    font-weight: 600;
`;

const NavButton = styled.button`
    background: none;
    border: none;
    color: ${themeColors.colors.neutral.white};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${themeColors.colors.gray.hover};
    }
`;

const CalendarGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
`;

const WeekdayHeader = styled.div`
    text-align: center;
    padding: ${themeColors.spacing.sm};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    color: ${themeColors.colors.gray.text};
    font-weight: 600;
`;

interface DayProps {
    isCurrentMonth: boolean;
    isToday: boolean;
    hasEvent: boolean;
    eventType?: 'upcoming' | 'past';
}

const Day = styled.div<DayProps>`
    position: relative;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ${(props) => (props.hasEvent ? 'pointer' : 'default')};
    color: ${(props) =>
        !props.isCurrentMonth
            ? themeColors.colors.gray.inputTag
            : props.isToday
              ? themeColors.colors.neutral.white
              : themeColors.colors.gray.text};
    font-weight: ${(props) => (props.isToday ? 600 : 400)};

    ${(props) =>
        props.isToday &&
        `
        &::after {
            content: '';
            position: absolute;
            bottom: 6px;
            width: 6px;
            height: 6px;
            background-color: ${themeColors.colors.primary.main};
            border-radius: 50%;
        }
    `}

    ${(props) =>
        props.hasEvent &&
        `
        &::before {
            content: '';
            position: absolute;
            top: 6px;
            width: 6px;
            height: 6px;
            background-color: ${
                props.eventType === 'upcoming' ? themeColors.colors.primary.main : themeColors.colors.gray.main
            };
            border-radius: 50%;
        }
    `}
    
    &:hover {
        background-color: ${(props) => (props.hasEvent ? themeColors.colors.gray.hover : 'transparent')};
    }
`;

const EventsListContainer = styled.div`
    padding: ${themeColors.spacing.md};
    border-top: 1px solid ${themeColors.cardBorder.color};
`;

const EventsTitle = styled.h4`
    margin: 0 0 ${themeColors.spacing.md} 0;
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    color: ${themeColors.colors.neutral.white};
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.sm};
`;

const NoEventsMessage = styled.p`
    color: ${themeColors.colors.gray.text};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    text-align: center;
    margin: ${themeColors.spacing.md} 0;
`;

const EventItem = styled.div<{ type: 'upcoming' | 'past' }>`
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.sm};
    padding: ${themeColors.spacing.sm};
    border-radius: ${themeColors.cardBorder.sm};
    margin-bottom: ${themeColors.spacing.sm};
    background-color: ${(props) => (props.type === 'upcoming' ? 'rgba(5, 124, 204, 0.1)' : 'rgba(133, 133, 133, 0.1)')};

    &:hover {
        background-color: ${(props) =>
            props.type === 'upcoming' ? 'rgba(5, 124, 204, 0.2)' : 'rgba(133, 133, 133, 0.2)'};
    }
`;

const EventDot = styled.div<{ type: 'upcoming' | 'past' }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${(props) =>
        props.type === 'upcoming' ? themeColors.colors.primary.main : themeColors.colors.gray.main};
`;

const EventInfo = styled.div`
    flex: 1;
`;

const EventTitle = styled.div`
    font-size: ${themeColors.typography.body.small.fontSize}px;
    color: ${themeColors.colors.neutral.white};
`;

const EventDate = styled.div`
    font-size: ${themeColors.typography.body.xsmall.fontSize}px;
    color: ${themeColors.colors.gray.text};
`;

/**
 * Calendar Component - Sub Organism Component
 * Displays a calendar with event indicators and a list of events for the selected date
 */
export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // mock sample data as of now
    const events: CalendarEvent[] = [
        {
            id: '1',
            title: 'Meet Up N4',
            date: new Date(2024, 9, 19),
            type: 'upcoming',
        },
        {
            id: '2',
            title: 'Tech Conference',
            date: new Date(2024, 9, 25),
            type: 'upcoming',
        },
        {
            id: '3',
            title: 'Coding Workshop',
            date: new Date(2024, 8, 15),
            type: 'past',
        },
    ];

    const getEventsForDate = (date: Date) => {
        return events.filter(
            (event) =>
                event.date.getDate() === date.getDate() &&
                event.date.getMonth() === date.getMonth() &&
                event.date.getFullYear() === date.getFullYear(),
        );
    };

    const hasEvents = (date: Date) => {
        return getEventsForDate(date).length > 0;
    };

    const getEventType = (date: Date) => {
        const dateEvents = getEventsForDate(date);
        if (dateEvents.length === 0) return undefined;
        return dateEvents[0].type;
    };

    const getMonthName = (date: Date) => {
        return date.toLocaleString('default', { month: 'long' });
    };

    const prevMonth = () => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() - 1);
            return newDate;
        });
        setSelectedDate(null);
    };

    const nextMonth = () => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + 1);
            return newDate;
        });
        setSelectedDate(null);
    };

    const generateCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const firstDayOfWeek = firstDay.getDay();

        const days = [];

        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            const prevMonthDay = new Date(year, month, -i);
            days.push({
                date: prevMonthDay,
                isCurrentMonth: false,
                isToday: isSameDay(prevMonthDay, new Date()),
                hasEvent: hasEvents(prevMonthDay),
                eventType: getEventType(prevMonthDay),
            });
        }

        for (let i = 1; i <= lastDay.getDate(); i++) {
            const currentMonthDay = new Date(year, month, i);
            days.push({
                date: currentMonthDay,
                isCurrentMonth: true,
                isToday: isSameDay(currentMonthDay, new Date()),
                hasEvent: hasEvents(currentMonthDay),
                eventType: getEventType(currentMonthDay),
            });
        }

        // we first add days from next month to complete grid
        // 6 rows x 7 columns = 42 cells
        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            const nextMonthDay = new Date(year, month + 1, i);
            days.push({
                date: nextMonthDay,
                isCurrentMonth: false,
                isToday: isSameDay(nextMonthDay, new Date()),
                hasEvent: hasEvents(nextMonthDay),
                eventType: getEventType(nextMonthDay),
            });
        }

        return days;
    };

    const isSameDay = (date1: Date, date2: Date) => {
        return (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    };

    const handleDateClick = (date: Date, hasEvent: boolean) => {
        if (hasEvent) {
            setSelectedDate(date);
        }
    };

    const formatEventDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const calendarDays = generateCalendarDays();
    const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

    return (
        <CalendarContainer>
            <CalendarHeader>
                <MonthNavigation>
                    <NavButton onClick={prevMonth}>
                        <FaChevronLeft />
                    </NavButton>
                    <MonthTitle>{`${getMonthName(currentDate)} ${currentDate.getFullYear()}`}</MonthTitle>
                    <NavButton onClick={nextMonth}>
                        <FaChevronRight />
                    </NavButton>
                </MonthNavigation>
            </CalendarHeader>

            <CalendarGrid>
                {weekdays.map((day) => (
                    <WeekdayHeader key={day}>{day}</WeekdayHeader>
                ))}

                {calendarDays.map((day, index) => (
                    <Day
                        key={index}
                        isCurrentMonth={day.isCurrentMonth}
                        isToday={day.isToday}
                        hasEvent={day.hasEvent}
                        eventType={day.eventType}
                        onClick={() => handleDateClick(day.date, day.hasEvent)}
                    >
                        {day.date.getDate()}
                    </Day>
                ))}
            </CalendarGrid>

            {selectedDate && (
                <EventsListContainer>
                    <EventsTitle>
                        <FaCalendarAlt />
                        Events on {formatEventDate(selectedDate)}
                    </EventsTitle>

                    {selectedDateEvents.length > 0 ? (
                        selectedDateEvents.map((event) => (
                            <EventItem key={event.id} type={event.type}>
                                <EventDot type={event.type} />
                                <EventInfo>
                                    <EventTitle>{event.title}</EventTitle>
                                    <EventDate>{formatEventDate(event.date)}</EventDate>
                                </EventInfo>
                            </EventItem>
                        ))
                    ) : (
                        <NoEventsMessage>No events for this date</NoEventsMessage>
                    )}
                </EventsListContainer>
            )}
        </CalendarContainer>
    );
}
