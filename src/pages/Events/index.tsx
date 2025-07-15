import { Suspense } from 'react';
import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import EventsList from '@/pages/Events/EventsList';
import PageLoading from '@/components/Loading/LoadingAnimation';

const PageContainer = styled.div`
    background-color: ${themeColors.colors.neutral.black};
    min-height: 100vh;
`;

/**
 * EventsPage - A page component that displays a list of events.
 * @description This component uses React's Suspense to handle loading states while fetching events data.
 */
export default function EventsPage() {
    return (
        <PageContainer>
            <Suspense fallback={<PageLoading message="Loading Events ..." />}>
                <EventsList />
            </Suspense>
        </PageContainer>
    );
}
