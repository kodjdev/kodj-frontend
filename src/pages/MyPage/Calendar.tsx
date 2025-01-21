import React, { useState } from "react";
import { Event } from "@/atoms/events";
import { Timestamp } from "firebase/firestore";

export interface CalendarProps {
  upcomingEvents: Event[];
  pastEvents: Event[];
}

const monthNames: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calendar: React.FC<CalendarProps> = ({ upcomingEvents, pastEvents }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredEvent, setHoveredEvent] = useState<Event | null>(null);

  // past va future eventlarni bir arrayda joylashtiramiz
  const allEvents = [...upcomingEvents, ...pastEvents];

  const eventMap = allEvents.reduce((acc, event) => {
    // we parse the event date string back to Date object when it's a Timestamp
    let date: Date;
    if (event.date instanceof Timestamp) {
      date = event.date.toDate();
    } else {
      date = event.date ? new Date(event.date) : new Date();
    }
    const dateKey = date.toDateString();

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  // helper methodlar
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // month uchun navigatsiya
  const changeMonth = (offset: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset)
    );
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalDays = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    // we add an empty cells for the days before the first day of the month
    // yani 1-iyul shanba kuni boshlanadi, shu kundan oldinlarini empty
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12" />);
    }

    // we add a cell for each day of the month
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const dateString = date.toDateString();
      const events = eventMap[dateString] || [];
      const hasEvents = events.length > 0;

      days.push(
        <div
          key={dateString}
          className="relative h-12 text-center"
          onMouseEnter={() => hasEvents && setHoveredEvent(events[0])}
          onMouseLeave={() => setHoveredEvent(null)}
        >
          <div
            className={`
              relative inline-flex items-center justify-center w-8 h-8 rounded-full
              ${hasEvents ? "bg-red-600 text-white" : "text-gray-300"}
            `}
          >
            {day}
          </div>

          {/* // event uchun tooltip */}
          {hoveredEvent && dateString === hoveredEvent.date && (
            <div className="absolute z-50 w-48 p-2 text-sm bg-gray-700 rounded-md shadow-lg -translate-x-1/2 left-1/2 mt-1">
              <div className="font-semibold text-white">
                {hoveredEvent.title}
              </div>
              <div className="text-gray-300">{hoveredEvent.location}</div>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className="p-1 text-gray-300 hover:text-white bg-transparent px-3 py-1"
        >
          ←
        </button>
        <h2 className="text-lg font-semibold text-white">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="p-1 text-gray-300 hover:text-white bg-transparent px-3 py-1"
        >
          →
        </button>
      </div>
      {/* // week days */}
      <div className="grid grid-cols-7 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-sm font-medium text-gray-400 text-center"
          >
            {day}
          </div>
        ))}
      </div>

      {/* calendar uchun grid */}
      <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
    </div>
  );
};

export default Calendar;
