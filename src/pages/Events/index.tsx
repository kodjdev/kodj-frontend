import { Suspense } from 'react';
import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import { Spin } from 'antd';
import EventsList from '@/pages/Events/EventsList';

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

/**
 * EventsPage - A page component that displays a list of events.
 * @description This component uses React's Suspense to handle loading states while fetching events data.
 */
export default function EventsPage() {
    return (
        <PageContainer>
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
