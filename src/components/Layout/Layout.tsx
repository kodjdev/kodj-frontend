import React from 'react';
import styled from 'styled-components';
import Footer from '@/components/Footer/Footer';
import themeColors from '@/tools/themeColors';
import Header from '@/components/Header/index';

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
    max-width: ${themeColors.breakpoints.laptop || '1140px'};
    margin: 0 auto; // Centers the content
    padding: ${themeColors.spacing.xl || '60px'} ${themeColors.spacing.lg || '40px'};
    width: 100%;
    box-sizing: border-box;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding-left: ${themeColors.spacing.lg || '16px'};
        padding-right: ${themeColors.spacing.lg || '16px'};
    }
    @media (min-width: ${themeColors.breakpoints.tablet}) {
        padding: ${themeColors.spacing.xl || '60px'} ${themeColors.spacing.lg || '40px'};
    }
`;

/**
 * Layout - Organism Component
 * Main layout wrapper for the application. Provides consistent structure with:
 *
 * - Header
 * - Main content area with proper spacing
 * - Footer
 *
 * Handles responsive padding and content width across different screen sizes.
 * @param children - Content to be rendered within the layout
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
