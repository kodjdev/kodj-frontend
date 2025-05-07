import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import themeColors from '@/tools/themeColors';

type CalendarProps = {
    currentMonth: Date;
    onChangeMonth: (date: Date) => void;
};

const CalendarContainer = styled.div`
    background-color: transparent;
    padding: 0 ${themeColors.spacing.sm};
`;

const CalendarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${themeColors.spacing.sm};
`;

const MonthTitle = styled.h3`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    font-weight: bold;
    margin: 0;
`;

const CalendarNavigation = styled.div`
    display: flex;
    gap: ${themeColors.spacing.xl};
`;

const NavButton = styled.button`
    background: none;
    border: none;
    color: ${themeColors.colors.gray.main};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${themeColors.spacing.xs};
    transition: color 0.2s ease;

    &:hover {
        color: ${themeColors.colors.primary.main};
    }
`;

const DaysGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 6px;
    max-height: 280px;
    padding-top: 10px;
    margin-left: -${themeColors.spacing.md};
    margin-right: -${themeColors.spacing.md};
    width: calc(100% + ${themeColors.spacing.md} * 2);
`;

const DayOfWeek = styled.div`
    color: ${themeColors.colors.gray.label};
    font-size: ${themeColors.typography.body.xsmall.fontSize}px;
    text-align: center;
    margin-bottom: 2px;
    font-weight: 500;
`;

const Day = styled.div<{ isCurrentMonth: boolean; isSelected: boolean; isToday: boolean }>`
    width: 100%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${themeColors.typography.body.xsmall.fontSize}px;
    border-radius: 4px;
    cursor: pointer;
    background-color: ${({ isSelected }) => (isSelected ? themeColors.colors.primary.main : 'transparent')};
    color: ${({ isCurrentMonth, isToday, isSelected }) => {
        if (isSelected) return themeColors.colors.neutral.white;
        if (!isCurrentMonth) return themeColors.colors.gray.dark;
        if (isToday) return themeColors.colors.primary.main;
        return themeColors.colors.gray.main;
    }};
    transition: background-color 0.2s ease;

    max-width: 36px;
    max-height: 36px;
    margin: 0 auto;

    &:hover {
        background-color: ${({ isSelected }) =>
            isSelected ? themeColors.colors.primary.light : themeColors.colors.gray.dark};
    }

    @media (max-width: 768px) {
        max-width: 32px;
        max-height: 32px;
    }
`;

export default function Calendar({ currentMonth, onChangeMonth }: CalendarProps) {
    const prevMonth = () => {
        const date = new Date(currentMonth);
        date.setMonth(date.getMonth() - 1);
        onChangeMonth(date);
    };

    const nextMonth = () => {
        const date = new Date(currentMonth);
        date.setMonth(date.getMonth() + 1);
        onChangeMonth(date);
    };

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const prevMonthDays = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate();
    const days = [];

    const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    for (let i = startDay - 1; i >= 0; i--) {
        days.push({
            day: prevMonthDays - i,
            isCurrentMonth: false,
            isSelected: false,
            isToday: false,
        });
    }

    const today = new Date();
    const isToday = (day: number) =>
        today.getDate() === day &&
        today.getMonth() === currentMonth.getMonth() &&
        today.getFullYear() === currentMonth.getFullYear();

    const selectedDay = today.getDate();

    for (let i = 1; i <= daysInMonth; i++) {
        days.push({
            day: i,
            isCurrentMonth: true,
            isSelected:
                i === selectedDay &&
                today.getMonth() === currentMonth.getMonth() &&
                today.getFullYear() === currentMonth.getFullYear(),
            isToday: isToday(i),
        });
    }

    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                day: i,
                isCurrentMonth: false,
                isSelected: false,
                isToday: false,
            });
        }
    }

    const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
    const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

    return (
        <CalendarContainer>
            <CalendarHeader>
                <MonthTitle>{monthName}</MonthTitle>
                <CalendarNavigation>
                    <NavButton onClick={prevMonth}>
                        <FaChevronLeft size={10} />
                    </NavButton>
                    <NavButton onClick={nextMonth}>
                        <FaChevronRight size={10} />
                    </NavButton>
                </CalendarNavigation>
            </CalendarHeader>

            <DaysGrid>
                {daysOfWeek.map((day) => (
                    <DayOfWeek key={day}>{day}</DayOfWeek>
                ))}

                {days.map((day, index) => (
                    <Day
                        key={index}
                        isCurrentMonth={day.isCurrentMonth}
                        isSelected={day.isSelected}
                        isToday={day.isToday}
                    >
                        {day.day}
                    </Day>
                ))}
            </DaysGrid>
        </CalendarContainer>
    );
}
