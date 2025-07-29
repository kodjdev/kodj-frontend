import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import KakaoMap from '@/components/KakaoMap';

type EventLocationProps = {
    location?: string;
};

const LocationContainer = styled.div`
    margin-bottom: ${themeColors.spacing.xxl};
`;

const MapContainer = styled.div`
    width: 100%;
    height: 400px;
    border-radius: ${themeColors.cardBorder.md};
    overflow: hidden;
    margin-bottom: ${themeColors.spacing.lg};
`;

const LocationTitle = styled.h3`
    font-size: ${themeColors.typography.headings.desktop.h3.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h3.fontWeight};
    margin: ${themeColors.spacing.lg} 0 ${themeColors.spacing.sm} 0;
    color: ${themeColors.colors.neutral.white};
`;

const LocationAddress = styled.p`
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    color: ${themeColors.colors.gray.main};
    margin-bottom: ${themeColors.spacing.md};
`;

const LocationDirections = styled.p`
    font-size: ${themeColors.typography.body.small.fontSize}px;
    color: ${themeColors.colors.gray.text};
`;

const SectionTitle = styled.h2`
    font-size: ${themeColors.typography.headings.desktop.h2.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h2.fontWeight};
    margin: ${themeColors.spacing.xxl} 0 ${themeColors.spacing.lg} 0;
    color: ${themeColors.colors.neutral.white};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.headings.mobile.h2.fontSize}px;
    }
`;

/**
 * EventLocation Component - Organism Component
 * @param location - Location data for the event or null if not available
 * @description Displays the location information for an event including a map.
 * Shows the venue name, address, and directions to help attendees find the event.
 */
export function EventLocation({ location }: EventLocationProps) {
    const locationData = location
        ? {
              title: location,
              address: location,
              directions: `For directions, please use a map service like Kakao Maps.`,
          }
        : {
              title: 'Location not specified',
              address: 'TBA',
              directions: '',
          };

    return (
        <LocationContainer>
            <SectionTitle>Location</SectionTitle>
            <MapContainer>
                <KakaoMap address={locationData.address} eventRoom={locationData.title} />
            </MapContainer>
            <LocationTitle>📍 {locationData.address}</LocationTitle>
            <LocationAddress>{locationData.title}</LocationAddress>
            <LocationDirections>{locationData.directions}</LocationDirections>
        </LocationContainer>
    );
}
