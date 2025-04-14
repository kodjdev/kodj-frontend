import React from "react";
import styled from "styled-components";
import Header from "@/components/Header";
import Footer from "@/components/Footer/Footer";
import themeColors from "@/tools/themeColors";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${themeColors.colors.neutral.black};
  color: ${themeColors.colors.neutral.white};
`;

/**
 * flex: 1 0 auto - sababi
 * bu contentni flex and shrink qilganda
 * overflow bo'lmasligi uchun
 */

const MainContent = styled.main`
  flex: 1 0 auto;
  width: 100%;
`;

const ContentWrapper = styled.div`
  max-width: ${themeColors.breakpoints.laptop || "1140px"};
  margin: 0 auto; // Centers the content
  padding: ${themeColors.spacing.xl || "60px"}
    ${themeColors.spacing.lg || "40px"};
  width: 100%;
`;

/**
 *
 * @description  Main layout of the application.
 * It is used to wrap the main content of the application.
 *
 */

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutContainer>
      <Header />
      <MainContent>
        <ContentWrapper>{children}</ContentWrapper>
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
}
