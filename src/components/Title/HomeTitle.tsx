import styled from "styled-components";
import themeColors from "@/tools/themeColors";

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0 24px;
  position: relative;
  z-index: ${themeColors.zIndex.nav}; // Pre-defined your z-index system
`;

const MainTitle = styled.h1`
  color: ${themeColors.colors.neutral.white};
  font-size: ${themeColors.typography.headings.tablet.h1.fontSize}px;
  font-weight: ${themeColors.typography.headings.desktop.h1.fontWeight};
  line-height: ${themeColors.typography.headings.desktop.h1.lineHeight};
  letter-spacing: ${themeColors.typography.headings.desktop.h1.letterSpacing}px;
  text-align: center;
  margin: 0;
  padding: 0 10px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: ${themeColors.breakpoints.tablet}) {
    font-size: ${themeColors.typography.headings.tablet.h1.fontSize}px;
    white-space: normal;
  }

  @media (max-width: ${themeColors.breakpoints.mobile}) {
    font-size: ${themeColors.typography.headings.mobile.h1.fontSize}px;
    white-space: normal;
  }
`;

const StaticTitle = styled.span`
  color: ${themeColors.colors.neutral.white};
  display: inline-block;

  @media (max-width: ${themeColors.breakpoints.mobile}) {
    hyphens: auto;
    word-break: break-word;
  }
`;

const HighlightWord = styled.span`
  color: ${themeColors.colors.primary.main};
  display: inline-block;

  @media (max-width: ${themeColors.breakpoints.mobile}) {
    margin-top: 5px;
  }
`;

/**
 *
 * HomeTitle Component - Part of the Home page
 * This component displays the main title of the home page.
 *
 */

export default function HomeTitle() {
  return (
    <TitleContainer>
      <MainTitle>
        <StaticTitle>Koreya O'zbek Dasturchilar</StaticTitle>{" "}
        <HighlightWord>Jamiyati.</HighlightWord>
      </MainTitle>
    </TitleContainer>
  );
}
