import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import themeColors from '@/tools/themeColors';

type CalendarProps = {
    currentMonth: Date;
    onChangeMonth: (date: Date) => void;
};

const CalendarContainer = styled.div`
    background-color: ${themeColors.gray_dark};
    border-radius: 8px;
    padding: 16px;
`;

const CalendarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

const MonthTitle = styled.h3`
    color: ${themeColors.white};
    font-size: 18px;
    margin: 0;
`;

const CalendarNavigation = styled.div`
    display: flex;
    gap: 12px;
`;

const NavButton = styled.button`
    background: none;
    border: none;
    color: ${themeColors.gray};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;

    &:hover {
        color: ${themeColors.white};
    }
`;

const DaysGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
`;

const DayOfWeek = styled.div`
    color: ${themeColors.gray};
    font-size: 12px;
    text-align: center;
    margin-bottom: 8px;
`;

const Day = styled.div<{ isCurrentMonth: boolean; isSelected: boolean; isToday: boolean }>`
    width: 100%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    border-radius: 50%;
    cursor: pointer;
    background-color: ${({ isSelected }) => (isSelected ? themeColors.colors.primary.main : 'transparent')};
    color: ${({ isCurrentMonth, isToday, isSelected }) => {
        if (isSelected) return themeColors.white;
        if (!isCurrentMonth) return themeColors.gray_dark;
        if (isToday) return themeColors.blue;
        return themeColors.gray;
    }};

    &:hover {
        background-color: ${({ isSelected }) => (isSelected ? themeColors.blue : themeColors.black_40)};
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

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
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

    const selectedDay = 14;

    for (let i = 1; i <= daysInMonth; i++) {
        days.push({
            day: i,
            isCurrentMonth: true,
            isSelected: i === selectedDay,
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
                        <FaChevronLeft size={14} />
                    </NavButton>
                    <NavButton onClick={nextMonth}>
                        <FaChevronRight size={14} />
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
