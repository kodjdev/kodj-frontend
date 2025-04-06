import styled from "styled-components";

const Card = styled.div`
  background-color: #000;
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  color: white;
`;

const Header = styled.div`
  padding: 16px;
  border-bottom: 1px solid #333;
`;

const MeetupTag = styled.div`
  display: inline-block;
  background-color: #333;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-bottom: 12px;
`;

const EventTitle = styled.div`
  font-size: 14px;
  color: white;
  margin-bottom: 8px;
`;

const EventDate = styled.div`
  font-size: 12px;
  color: #999;
`;

const Speakers = styled.div`
  padding: 16px;
`;

const Speaker = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const SpeakerAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #333;
  margin-right: 12px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SpeakerInfo = styled.div`
  flex: 1;
`;

const SpeakerName = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const SpeakerPosition = styled.div`
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
`;

const TalkTitle = styled.div`
  font-size: 12px;
  font-weight: 500;
`;

const Footer = styled.div`
  padding: 16px;
  border-top: 1px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  gap: 12px;

  img {
    height: 24px;
  }
`;

/**
 * EventCard component - Organism
 *
 * Displays information about a meetup event including:
 * - Event details (title, location, date)
 * - Speaker information with avatars and talk titles
 * - Sponsoring organization logos
 *
 * @returns {JSX.Element} A styled event card component
 */

export default function EventCard(): JSX.Element {
  return (
    <Card>
      <Header>
        <MeetupTag>Meetup #4</MeetupTag>
        <EventTitle>Embassy of Uzbekistan, 대한민국 서울 용산구</EventTitle>
        <EventDate>December 19, 13:00pm</EventDate>
      </Header>

      <Speakers>
        <Speaker>
          <SpeakerAvatar>
            <div
              style={{ width: "100%", height: "100%", backgroundColor: "#666" }}
            ></div>
          </SpeakerAvatar>
          <SpeakerInfo>
            <SpeakerName>Sean Batalov</SpeakerName>
            <SpeakerPosition>Community Manager</SpeakerPosition>
            <TalkTitle>Authorization at scale.</TalkTitle>
          </SpeakerInfo>
        </Speaker>

        <Speaker>
          <SpeakerAvatar>
            <div
              style={{ width: "100%", height: "100%", backgroundColor: "#666" }}
            ></div>
          </SpeakerAvatar>
          <SpeakerInfo>
            <SpeakerName>Someone</SpeakerName>
            <SpeakerPosition>Software Engineer</SpeakerPosition>
            <TalkTitle>
              Leveraging state-of-the-art open source solutions
            </TalkTitle>
          </SpeakerInfo>
        </Speaker>
      </Speakers>

      <Footer>
        <LogoContainer>
          <div
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "#666",
              borderRadius: "50%",
            }}
          ></div>
          <div
            style={{
              width: "60px",
              height: "20px",
              backgroundColor: "#666",
              borderRadius: "4px",
            }}
          ></div>
          <div
            style={{
              width: "70px",
              height: "20px",
              backgroundColor: "#666",
              borderRadius: "4px",
            }}
          ></div>
        </LogoContainer>
      </Footer>
    </Card>
  );
}
