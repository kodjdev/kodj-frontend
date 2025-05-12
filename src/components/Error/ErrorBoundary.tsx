import { ReactNode, useEffect } from 'react';
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

    const resetErrorBoundary = () => {
        setErrorState(null);
    };

    /* we reset the error state when route changes */
    useEffect(() => {
        resetErrorBoundary();
    }, [location.pathname, setErrorState]);

    /* listen for uncaught errors */
    useEffect(() => {
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
    }, [setErrorState]);

    if (errorState) {
        /* if a custom fallback is provided, use it */
        if (fallback) {
            return <>{fallback}</>;
        }

        /* if not just use the default ErrorFallback */
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
