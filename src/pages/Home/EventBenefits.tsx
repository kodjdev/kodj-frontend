import React from "react";
import styled from "styled-components";
import themeColors from "@/tools/themeColors";
import Card from "@/components/Card/Card";
import Button from "@/components/Button/Button";

type EventCard = {
  id: number;
  title: string;
  description: string;
};

const AIIcon: React.FC = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="40" height="40" fill="#1A1A1A" />
    <path d="M12 11H25V25H12V11Z" stroke="white" strokeWidth="2" />
    <path d="M25 11L30 7" stroke="white" strokeWidth="2" />
    <path d="M25 25L30 29" stroke="white" strokeWidth="2" />
  </svg>
);

const SectionContainer = styled.section`
  max-width: ${themeColors.breakpoints.laptop || "1140px"};
  margin: 0 auto;
  padding-bottom: 80px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 30px;

  @media (max-width: ${themeColors.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

const Title = styled.h2`
  font-size: ${themeColors.typography.headings.desktop.h2.fontSize}px;
  font-weight: ${themeColors.typography.headings.desktop.h2.fontWeight};
  margin: 0;

  span {
    color: ${themeColors.colors.neutral.white};
  }

  span:last-child {
    color: ${themeColors.colors.gray.main};
  }

  @media (max-width: ${themeColors.breakpoints.mobile}) {
    font-size: ${themeColors.typography.headings.mobile.h2.fontSize}px;
  }
`;

const JoinButton = styled(Button)`
  border: 0.5px solid ${themeColors.colors.neutral.white};
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${themeColors.colors.gray.main};
    color: ${themeColors.colors.primary.light};
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StyledCard = styled(Card)`
  cursor: pointer;
`;

/**
 * EventsSection Component - Organism
 *
 * Displays a section with a heading and grid of event cards.
 */

export default function EventBenefits() {
  const eventCards: EventCard[] = [
    {
      id: 1,
      title: "AI & ML Events",
      description:
        "A platform for discovering and sharing AI and Machine Learning events in Uzbekistan and South Korea.",
    },
    {
      id: 2,
      title: "AI & ML Events",
      description:
        "A platform for discovering and sharing AI and Machine Learning events in Uzbekistan and South Korea.",
    },
    {
      id: 3,
      title: "AI & ML Events",
      description:
        "A platform for discovering and sharing AI and Machine Learning events in Uzbekistan and South Korea.",
    },
    {
      id: 4,
      title: "AI & ML Events",
      description:
        "A platform for discovering and sharing AI and Machine Learning events in Uzbekistan and South Korea.",
    },
    {
      id: 5,
      title: "AI & ML Events",
      description:
        "A platform for discovering and sharing AI and Machine Learning events in Uzbekistan and South Korea.",
    },
    {
      id: 6,
      title: "AI & ML Events",
      description:
        "A platform for discovering and sharing AI and Machine Learning events in Uzbekistan and South Korea.",
    },
  ];

  return (
    <SectionContainer>
      <SectionHeader>
        <Title>
          <span>Come and see </span>
          <span>what we have to offer</span>
        </Title>
        <JoinButton asLink to="/join" variant="text" size="md">
          JOIN THE COMMUNITY
        </JoinButton>
      </SectionHeader>

      <CardsGrid>
        {eventCards.map((card: EventCard) => (
          <StyledCard
            key={card.id}
            icon={<AIIcon />}
            title={card.title}
            description={card.description}
            hoverEffect={true}
          />
        ))}
      </CardsGrid>
    </SectionContainer>
  );
}
