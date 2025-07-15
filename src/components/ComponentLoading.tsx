import styled from 'styled-components';
import PageLoading from '@/components/Loading/LoadingAnimation';

const LoadingWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
`;

/**
 * ComponentLoading - A Molecule Component
 * @description This component displays a loading spinner while content is being fetched or processed.
 * It wraps the LoadingAnimation Atom Component to provide a consistent loading experience across the application.
 */
export default function ComponentLoading() {
    return (
        <LoadingWrapper>
            <PageLoading message="Loading a page" />
        </LoadingWrapper>
    );
}
