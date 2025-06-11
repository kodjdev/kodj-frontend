import styled from 'styled-components';
import KakaoMap from '@/components/KakaoMap';
import themeColors from '@/tools/themeColors';

type RightSideDetailsProps = {
    imageSource: string;
    title: string;
    formattedDate: string;
    organizer: string;
    eventLocation: string;
    eventRoom: string;
};

const Container = styled.div`
    width: 100%;
    background: rgba(0, 0, 0, 0.8);

    @media (min-width: ${themeColors.breakpoints.tablet}) {
        width: 50%;
    }
`;

const Card = styled.div`
    padding: ${themeColors.spacing.md} ${themeColors.spacing.md};

    background: linear-gradient(to right, ${themeColors.gray_dark}, ${themeColors.gray_background});
    border-radius: ${themeColors.radiusSizes.xl};
    box-shadow: ${themeColors.shadow_clicked};
    border: 1px solid ${themeColors.cardBorder.color};
    overflow: hidden;
    transition: all ${themeColors.duration};

    &:hover {
        box-shadow: ${themeColors.shadow_clicked};
    }

    @media (min-width: ${themeColors.breakpoints.laptop}) {
        padding: ${themeColors.spacing.xl};
    }
`;

const EventImage = styled.img`
    width: 100%;
    height: 10rem;
    object-fit: cover;
    border-radius: ${themeColors.radiusSizes.lg};

    @media (min-width: ${themeColors.breakpoints.mobile}) {
        height: 15rem;
    }
`;

const Title = styled.h2`
    font-size: ${themeColors.font20.fontSize}px;
    font-weight: ${themeColors.font20.fontWeight};
    color: ${themeColors.blue};
    margin-bottom: ${themeColors.spacing.lg};
`;

const DetailsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${themeColors.spacing.md};
    font-size: ${themeColors.font16.fontSize}px;
    color: ${themeColors.gray_text};

    @media (min-width: ${themeColors.breakpoints.mobile}) {
        grid-template-columns: 1fr 1fr;
        column-gap: ${themeColors.spacing.md};
        row-gap: ${themeColors.spacing.md};
    }
`;

const DetailItem = styled.div`
    display: flex;
    flex-direction: column;
`;

const DetailLabel = styled.strong`
    font-size: ${themeColors.font14.fontSize}px;
    color: ${themeColors.blue};
    margin-bottom: ${themeColors.spacing.xs};
`;

const DetailValue = styled.p`
    font-size: ${themeColors.font12.fontSize}px;
    color: ${themeColors.white};
    margin: 0;
`;

const MapSection = styled.div`
    margin-top: ${themeColors.spacing.md};
`;

const MapContainer = styled.div`
    width: 100%;
    height: 13rem;
    border-radius: ${themeColors.radiusSizes.md};
    overflow: hidden;
    margin-bottom: ${themeColors.spacing.md};
`;

const MapLink = styled.a`
    margin-right: ${themeColors.spacing.sm};
    margin-bottom: ${themeColors.spacing.sm};
    color: ${themeColors.blue};
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const LocationDetails = styled.div`
    display: flex;
    flex-direction: column;
`;

const LocationLabel = styled.strong`
    color: ${themeColors.blue};
    margin-bottom: ${themeColors.spacing.xs};
`;

const LocationName = styled.p`
    font-size: ${themeColors.font12.fontSize}px;
    color: ${themeColors.white_dark};
    font-weight: ${themeColors.font12_bold.fontWeight};
    margin: 0 0 ${themeColors.spacing.xs} 0;
`;

const LocationRoom = styled.p`
    font-size: ${themeColors.font12.fontSize}px;
    color: ${themeColors.gray_text};
    margin: 0;
`;

export default function RightSideDetails({
    imageSource,
    title,
    formattedDate,
    organizer,
    eventLocation,
    eventRoom,
}: RightSideDetailsProps) {
    return (
        <Container>
            <Card>
                <EventImage src={imageSource} alt={title} />
                <Title>{title}</Title>
                <DetailsGrid>
                    <DetailItem>
                        <DetailLabel>Date:</DetailLabel>
                        <DetailValue>{formattedDate}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                        <DetailLabel>Organizer:</DetailLabel>
                        <DetailValue>{organizer}</DetailValue>
                    </DetailItem>
                </DetailsGrid>
                <MapSection>
                    <MapContainer>
                        <KakaoMap address={eventLocation} eventRoom={eventRoom} />
                        <MapLink
                            href={`https://map.kakao.com/link/search/${encodeURIComponent(eventLocation)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View on Kakao Map
                        </MapLink>
                    </MapContainer>
                    <LocationDetails>
                        <LocationLabel>Location:</LocationLabel>
                        <LocationName>{eventLocation}</LocationName>
                        <LocationRoom>{eventRoom}</LocationRoom>
                    </LocationDetails>
                </MapSection>
            </Card>
        </Container>
    );
}
