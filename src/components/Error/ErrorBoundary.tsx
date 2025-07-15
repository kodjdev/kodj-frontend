import { ReactNode, useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';
import ErrorFallback from '@/components/Error/ErrorFallback';
import errorAtom from '@/atoms/errors';

type ErrorBoundaryProps = {
    children: ReactNode;
    fallback?: ReactNode;
};

/**
 * ErrorBoundary - React Component for Error Handling
 *
 * @description A functional component that catches JavaScript
 * errors anywhere in its child component tree
 * and displays a fallback UI instead of the component tree that crashed.
 * Uses Recoil for centralized error state management.
 */
export default function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
    const [errorState, setErrorState] = useRecoilState(errorAtom);

    const location = useLocation();

    useEffect(() => {
        setErrorState(null);

        const errorHandler = (errorEvent: ErrorEvent) => {
            console.error('Uncaught error:', errorEvent);

            setErrorState({
                title: 'Uncaught Error',
                message: errorEvent.message || 'An unexpected error occurred',
                record: errorEvent.filename ? `${errorEvent.filename}:${errorEvent.lineno}` : null,
            });
        };

        window.addEventListener('error', errorHandler);

        return () => {
            window.removeEventListener('error', errorHandler);
        };
    }, [location.pathname, setErrorState]);

    const resetErrorBoundary = useCallback(() => {
        setErrorState(null);
    }, [setErrorState]);

    if (errorState) {
        if (fallback) {
            return <>{fallback}</>;
        }

        return (
            <ErrorFallback
                error={new Error(errorState.message as string)}
                resetErrorBoundary={resetErrorBoundary}
                title={errorState.title}
            />
        );
    }

    return <>{children}</>;
}
