import { Suspense } from "react";
import styled from "styled-components";
import themeColors from "@/tools/themeColors";
import { Spin } from "antd";
import EventsList from "./EventsList";

const PageContainer = styled.div`
  background-color: ${themeColors.colors.neutral.black};
  min-height: 100vh;
  padding: 1rem 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${themeColors.colors.neutral.black};
  color: ${themeColors.colors.primary.main};
  font-size: 1rem;
`;

// const TitleContainer = styled.div`
//   text-align: center;
//   margin-bottom: 3rem;
// `;

// const MainTitle = styled.h1`
//   font-size: 3rem;
//   font-weight: 700;
//   color: ${themeColors.colors.neutral.white};
//   margin-top: 0;
//   margin-bottom: 1rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.5rem;
// `;

// const BlueArrow = styled.span`
//   color: ${themeColors.colors.primary.main};
//   font-weight: bold;
// `;

// const Subtitle = styled.p`
//   font-size: 1.25rem;
//   color: ${themeColors.colors.gray.main};
//   margin: 0;
// `;

// const HighlightedText = styled.span`
//   color: ${themeColors.colors.primary.main};
//   font-weight: 600;
// `;

// const GrayText = styled.span`
//   color: ${themeColors.colors.gray.main};
// `;

/**
 * Main Events Page Root Component
 *
 * This component serves as the container for the events page,
 * displaying the main title and the events list.
 */

export default function EventsPage() {
  return (
    <PageContainer>
      {/* <TitleContainer>
        <MainTitle>
          <BlueArrow>&gt;</BlueArrow> Events
        </MainTitle>
        <Subtitle>
          Check out our <HighlightedText>upcoming</HighlightedText> and{" "}
          <GrayText>past events</GrayText>
        </Subtitle>
      </TitleContainer> */}

      <Suspense
        fallback={
          <LoadingContainer>
            <Spin tip="Loading events..." size="large" />
          </LoadingContainer>
        }
      >
        <EventsList />
      </Suspense>
    </PageContainer>
  );
}
