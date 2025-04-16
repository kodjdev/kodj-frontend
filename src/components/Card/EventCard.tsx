import styled from "styled-components";
import themeColors from "@/tools/themeColors";
import Card from "./Card";

export interface EventCardProps {
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
}

const CardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 16px;
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

const AuthorText = styled.div`
  color: ${themeColors.colors.gray.main};
  font-size: ${themeColors.typography.body.small.fontSize}px;
  margin-top: 8px;
  font-style: italic;
`;

const DateText = styled.div`
  color: ${themeColors.colors.primary.main};
  font-size: ${themeColors.typography.body.small.fontSize}px;
  margin-top: 12px;
  font-weight: 500;
`;

const RegistrationInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  border-top: 1px solid ${themeColors.colors.gray.dark};
  padding-top: 12px;
`;

const InfoItem = styled.div`
  color: ${themeColors.colors.gray.main};
  font-size: ${themeColors.typography.body.small.fontSize}px;
`;

const Badge = styled.span<{ isUpcoming?: boolean }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 12px;
  background-color: ${(props) =>
    props.isUpcoming
      ? themeColors.colors.primary.main
      : themeColors.colors.gray.dark};
  color: ${themeColors.colors.neutral.white};
`;

/**
 * EventCard Molecule Component
 *
 * A specialized card component for displaying event information.
 * Wraps the base Card atom component with event-specific styling and layout.
 */
export default function EventCard({
  isPlaceholder,
  title,
  description,
  author,
  imageUrl,
  date,
  isUpcoming,
  registeredCount,
  maxSeats,
  className,
  ...props
}: EventCardProps) {
  if (isPlaceholder) {
    return (
      <Card
        backgroundColor="#161616"
        hoverEffect={false}
        className={className}
        {...props}
      >
        <PlaceholderContent>More events coming soon...</PlaceholderContent>
      </Card>
    );
  }

  return (
    <Card
      backgroundColor="#161616"
      hoverEffect={true}
      className={className}
      {...props}
    >
      {isUpcoming !== undefined && (
        <Badge isUpcoming={isUpcoming}>
          {isUpcoming ? "Upcoming" : "Past Event"}
        </Badge>
      )}

      {imageUrl && <CardImage src={imageUrl} alt={title || "Event"} />}

      {date && <DateText>{date}</DateText>}

      {author && <AuthorText>by {author}</AuthorText>}

      {(registeredCount !== undefined || maxSeats) && (
        <RegistrationInfo>
          {registeredCount !== undefined && (
            <InfoItem>Registered: {registeredCount}</InfoItem>
          )}
          {maxSeats && <InfoItem>Max seats: {maxSeats}</InfoItem>}
        </RegistrationInfo>
      )}
    </Card>
  );
}
