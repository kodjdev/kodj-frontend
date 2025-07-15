import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from '@/components/Footer/Footer';
import themeColors from '@/tools/themeColors';
import Header from '@/components/Header/index';
import EventNotificationBanner from '@/components/EventNotificationBanner';
import { useLocation } from 'react-router-dom';

const LayoutContainer = styled.div<{ hasBanner: boolean }>`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: ${themeColors.colors.neutral.black};
    color: ${themeColors.colors.neutral.white};
    padding-top: ${(props) => (props.hasBanner ? '40px' : '0')};
    transition: padding-top 0.3s ease;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding-top: ${(props) => (props.hasBanner ? '50px' : '0')};
    }
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
    padding: ${themeColors.spacing.xxxl || '60px'} ${themeColors.spacing.lg || '40px'};
    width: 100%;
    box-sizing: border-box;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding-left: ${themeColors.spacing.lg || '16px'};
        padding-right: ${themeColors.spacing.lg || '16px'};
    }
`;

/**
 * Layout - Organism Component
 * Main layout wrapper for the application. Provides consistent structure with:
 * - Header
 * - Main content area with proper spacing
 * - Footer
 * Handles responsive padding and content width across different screen sizes.
 * Automatically adjusts layout when banner is visible/hidden.
 * @param children - Content to be rendered within the layout
 */
export default function Layout({ children }: { children: React.ReactNode }) {
    const [showBanner, setShowBanner] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleCloseBanner = () => {
        setShowBanner(false);
    };

    const shouldShowBanner = showBanner && location.pathname === '/' && !isScrolled;

    return (
        <LayoutContainer hasBanner={shouldShowBanner}>
            {' '}
            {shouldShowBanner && (
                <EventNotificationBanner
                    onClose={handleCloseBanner}
                    eventTitle="KO'DJ ning navbatdagi uchrashuviga ro'yhatdan o'tishga shoshiling!"
                    autoHide={false}
                />
            )}
            <Header />
            <MainContent>
                <ContentWrapper>{children}</ContentWrapper>
            </MainContent>
            <Footer />
        </LayoutContainer>
    );
}
