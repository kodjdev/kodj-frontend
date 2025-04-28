import styled from 'styled-components';
import themeColors from '@/tools/themeColors';

type ErrorFallbackProps = {
    error: Error | null;
    resetErrorBoundary?: () => void;
};

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    padding: 2rem;
    background: ${themeColors.colors.neutral.black};
    border-radius: 8px;
`;
const ErrorTitle = styled.h1`
    color: ${themeColors.colors.status.error.text};
    margin-bottom: 1rem;
    font-size: 2rem;
`;

const ErrorMessage = styled.p`
    color: ${themeColors.colors.gray.main};
    margin-bottom: 2rem;
    text-align: center;
    max-width: 600px;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
`;

const Button = styled.button<{ primary?: boolean }>`
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-weight: 500;
    background: ${(props) => (props.primary ? themeColors.colors.primary.main : 'transparent')};
    color: ${themeColors.colors.neutral.white};
    border: 1px solid ${themeColors.colors.primary.main};
    transition: opacity 0.2s ease;

    &:hover {
        opacity: 0.9;
    }
`;

/**
 * ErrorFallback - Custom Error Boundary Component
 * @description Displays a user-friendly error message with options to retry
 */
export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
    const handleReportError = () => {
        // Add your error reporting service integration here
        console.error('Error details:', {
            message: error?.message,
            stack: error?.stack,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
        });
    };

    return (
        <ErrorContainer role="alert" aria-live="assertive">
            <ErrorTitle>Something went wrong</ErrorTitle>
            <ErrorMessage>{error?.message || 'An unexpected error occurred'}</ErrorMessage>
            <ButtonGroup>
                <Button
                    primary
                    onClick={() => resetErrorBoundary?.() || window.location.reload()}
                    aria-label="Reload page"
                >
                    Try Again
                </Button>
                <Button onClick={handleReportError} aria-label="Report error">
                    Report Issue
                </Button>
            </ButtonGroup>
        </ErrorContainer>
    );
}
