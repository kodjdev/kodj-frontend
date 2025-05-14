import { useState } from 'react';
import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import AccountDetails from '@/pages/MyPage/AccountDetails';
import MyEvents from '@/pages/MyPage/MyEvents';
import BlogEditor from '@/pages/MyPage/BlogEditor';
import Sidebar from '@/pages/MyPage/SideBar';
import Calendar from './Calendar';

const PageContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    color: ${themeColors.colors.neutral.white};
`;

const ContentLayout = styled.div`
    display: flex;
    gap: ${themeColors.spacing.xxl};

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        flex-direction: column;
        gap: ${themeColors.spacing.md};
    }
`;

const LeftColumn = styled.div`
    flex: 2;
    max-width: 300px;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        max-width: 100%;
        margin-bottom: ${themeColors.spacing.md};
    }
`;

const RightColumn = styled.div`
    flex: 5;
    min-height: 600px;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        margin-bottom: ${themeColors.spacing.md};
    }
`;

const SectionContainer = styled.div`
    background-color: ${themeColors.colors.gray.background};
    border-radius: ${themeColors.cardBorder.md};
    border: 1px solid ${themeColors.cardBorder.color};
    padding: ${themeColors.spacing.lg};
    margin-bottom: ${themeColors.spacing.lg};
    overflow: hidden;
    min-height: 500px;
`;

const SectionTitle = styled.h2`
    font-size: ${themeColors.typography.headings.desktop.h3.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h3.fontWeight};
    color: ${themeColors.colors.neutral.white};
    margin: 0 0 ${themeColors.spacing.md} 0;
    border-bottom: 1px solid ${themeColors.cardBorder.color};
    padding-bottom: ${themeColors.spacing.sm};
`;

const CalendarContainer = styled.div`
    margin-top: ${themeColors.spacing.fourXl};
`;

enum PageSection {
    EVENTS = 'events',
    BLOGS = 'blogs',
    ACCOUNT = 'account',
}

/**
 * MyPage Component - Root Page Component
 * Main component for user's personal page where they can view their events,
 * manage blogs, and update account details.
 */
export default function MyPage() {
    const [activeSection, setActiveSection] = useState<PageSection>(PageSection.EVENTS);

    const getSectionTitle = () => {
        switch (activeSection) {
            case PageSection.EVENTS:
                return 'My Events';
            case PageSection.BLOGS:
                return 'Blogs';
            case PageSection.ACCOUNT:
                return 'Personal Info';
            default:
                return 'My Events';
        }
    };

    // render the content based on active section
    const renderContent = () => {
        switch (activeSection) {
            case PageSection.EVENTS:
                return <MyEvents />;
            case PageSection.BLOGS:
                return <BlogEditor />;
            case PageSection.ACCOUNT:
                return <AccountDetails />;
            default:
                return <MyEvents />;
        }
    };

    return (
        <PageContainer>
            <ContentLayout>
                <LeftColumn>
                    <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
                    <CalendarContainer>
                        <Calendar />
                    </CalendarContainer>
                </LeftColumn>

                <RightColumn>
                    <SectionContainer>
                        <SectionTitle>{getSectionTitle()}</SectionTitle>
                        {renderContent()}
                    </SectionContainer>
                </RightColumn>
            </ContentLayout>
        </PageContainer>
    );
}
