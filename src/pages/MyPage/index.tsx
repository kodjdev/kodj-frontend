import { useState } from 'react';
import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import AccountDetails from '@/pages/MyPage/AccountDetails';
import Calendar from '@/pages/MyPage/Calendar';
import EventTabs from '@/pages/MyPage/EventsTabs';

const PageContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const PageTitle = styled.h1`
    font-size: ${themeColors.typography.headings.desktop.h1.fontSize}px;
    color: ${themeColors.colors.neutral.white};
    margin-bottom: ${themeColors.spacing.xl};
`;

const ContentLayout = styled.div`
    display: flex;
    gap: ${themeColors.spacing.xxl};

    @media (max-width: 768px) {
        flex-direction: column;
        margin-bottom: ${themeColors.spacing.md};
    }
`;

const LeftColumn = styled.div`
    flex: 3;
    max-width: 620px;

    @media (max-width: 768px) {
        max-width: 100%;
        margin-bottom: ${themeColors.spacing.md};
    }
`;

const RightColumn = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        margin-bottom: ${themeColors.spacing.md};
    }
`;

const SectionContainer = styled.div`
    background-color: ${themeColors.colors.gray.background};
    border-radius: ${themeColors.spacing.sm};
    border: 1px solid ${themeColors.cardBorder.color};
    padding: ${themeColors.spacing.lg};
    overflow: hidden;
`;

const SectionTitle = styled.h2`
    font-size: ${themeColors.typography.headings.desktop.h4.fontSize}px;
    color: ${themeColors.colors.neutral.white};
    margin: 0 0 ${themeColors.spacing.md} 0;
    border-bottom: 1px solid ${themeColors.cardBorder.color};
    padding-bottom: ${themeColors.spacing.sm};
`;

const ContainerBottom = styled.div`
    width: 100%;
    margin-top: 0;
`;

export default function MyPage() {
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

    const handleChangeMonth = (date: Date) => {
        setCurrentMonth(date);
    };

    return (
        <PageContainer>
            <PageTitle>My Account</PageTitle>

            <ContentLayout>
                <LeftColumn>
                    <AccountDetails />
                </LeftColumn>
                <RightColumn>
                    <SectionContainer>
                        <SectionTitle>Event Calendar</SectionTitle>
                        <Calendar currentMonth={currentMonth} onChangeMonth={handleChangeMonth} />
                    </SectionContainer>
                </RightColumn>
            </ContentLayout>

            <ContainerBottom>
                <SectionContainer>
                    <SectionTitle>My Events</SectionTitle>
                    <EventTabs />
                </SectionContainer>
            </ContainerBottom>
        </PageContainer>
    );
}
