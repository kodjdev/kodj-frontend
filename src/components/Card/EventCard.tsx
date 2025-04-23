import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import Card from '@/components/Card/Card';
import { FaCalendarAlt, FaUsers } from 'react-icons/fa';

export type EventCardProps = {
    isFreeEvent?: boolean;
    isPlaceholder?: boolean;
    title?: string;
    description?: string;
    author?: string;
    imageUrl?: string;
    date?: string;
    isUpcoming?: boolean;
    registeredCount?: number;
    maxSeats?: number;
    className?: string;
};

const CardImage = styled.img`
    width: 100%;
    height: 200px;
    display: block;
    margin: 0;
    object-fit: cover;
    border-radius: 4px 4px 0 0;
    margin-bottom: 0;
`;

const PlaceholderContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    color: ${themeColors.colors.gray.main};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    font-weight: 500;
`;

const CardContent = styled.div`
    border-radius: 0 0 4px 4px;
    padding: 16px;
`;

const DateText = styled.p`
    color: ${themeColors.colors.gray.main};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
    margin-bottom: 0;
`;

const InfoItem = styled.div`
    color: ${themeColors.colors.gray.main};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    display: flex;
    align-items: center;
    gap: 4px;
`;

const RegistrationInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: space-between;
    border-top: none;
    padding-top: 0;
`;

const IsPaidEvent = styled.div`
    background-color: #1a3365;
    color: #4f9bf8;
    padding: 4px 8px;
    border-radius: 6px;
    font-weight: ${themeColors.typography.headings.desktop.h4.fontWeight};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    display: flex;
    align-items: center;
`;

/**
 * EventCard - Molecule Component
 * @param isPlaceholder - Whether to show placeholder content instead of event details
 * @param title - Event title
 * @param description - Event description
 * @param imageUrl - URL for event cover image
 * @param date - Event date
 * @param isFreeEvent - Whether event is free or paid
 * @param registeredCount - Number of registered attendees
 * @param maxSeats - Maximum number of available seats
 * @param className - Additional CSS classes
 */
export default function EventCard({
    isPlaceholder,
    title,
    description,
    imageUrl,
    date,
    isFreeEvent,
    registeredCount,
    maxSeats,
    className,
    ...props
}: EventCardProps) {
    if (isPlaceholder) {
        return (
            <Card backgroundColor="#161616" hoverEffect={false} className={className} {...props}>
                <PlaceholderContent>More events coming soon...</PlaceholderContent>
            </Card>
        );
    }

    return (
        <Card padding="0" backgroundColor="transparent" hoverEffect={true} className={className} {...props}>
            {imageUrl && <CardImage src={imageUrl} alt={title || 'Event'} />}

            <CardContent>
                {title && <Card.Title>{title}</Card.Title>}

                {description && (
                    <Card.Description color={themeColors.colors.gray.text}>
                        {description.length > 150 ? `${description.substring(0, 150).trim()}...` : description}
                    </Card.Description>
                )}

                {date && (
                    <DateText>
                        <FaCalendarAlt />
                        {date}
                    </DateText>
                )}

                {(registeredCount !== undefined || maxSeats) && (
                    <RegistrationInfo>
                        {registeredCount !== undefined && maxSeats && (
                            <InfoItem>
                                <FaUsers style={{ marginRight: '4px' }} />
                                Registered: {registeredCount}/{maxSeats}
                            </InfoItem>
                        )}
                        {isFreeEvent && (
                            <IsPaidEvent>
                                <span style={{ marginRight: '6px' }}>#</span>
                                Free
                            </IsPaidEvent>
                        )}
                    </RegistrationInfo>
                )}
            </CardContent>
        </Card>
    );
}
