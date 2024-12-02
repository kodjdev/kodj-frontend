import { EventForServer } from '../types';
import React from 'react';
import { BsArrowUpRightCircle } from "react-icons/bs";

interface AddToCalendarButtonProps {
    event: EventForServer;
}

const AddToCalendarButton: React.FC<AddToCalendarButtonProps> = ({ event }) => {
    const handleAddToCalendar = () => {
        const { title, date, location, description } = event;

        // Ensure 'date' is a valid date string
        if (!(date instanceof FirebaseFirestore.Timestamp)) {
            console.error('Invalid date format:', date);
            alert('Invalid event date.');
            return;
        }
        const eventDate = date.toDate();

        // Adjust end time as needed, e.g., +1 hour
        const endDate = new Date(eventDate.getTime() + 60 * 60 * 1000);

        // Format dates to YYYYMMDDTHHmmssZ
        const formatDate = (dateObj: Date) =>
            dateObj.toISOString().replace(/[-:]/g, '').split('.')[0];

        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
            title
        )}&dates=${formatDate(eventDate)}/${formatDate(endDate)}&details=${encodeURIComponent(
            description
        )}&location=${encodeURIComponent(location)}`;

        window.open(googleCalendarUrl, '_blank');
    };

    return (
        <button
            onClick={handleAddToCalendar}
            className="inline-block ml-2 mb-1 text-lg text-blue-600 hover:text-blue-200"
            aria-label="Add to Calendar"
        >
            <BsArrowUpRightCircle />
        </button>
    );
};

export default AddToCalendarButton;
