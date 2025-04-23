import { useState, useEffect, ReactNode } from 'react';
import ErrorFallback from '@/components/Error/ErrorFallback';

type ErrorBoundaryProps = {
    children: ReactNode;
    fallback?: ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
    error: Error | null;
};

/**
 * ErrorBoundary - React Component for Error Handling
 *
 * @description A functional component that catches JavaScript
 * errors anywhere in its child component tree
 * and displays a fallback UI instead of the component tree that crashed.
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to be rendered
 * @param {ReactNode} [props.fallback] - Custom fallback UI component (defaults to ErrorFallback)
 */
export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
    const [{ hasError, error }, setErrorState] = useState<ErrorBoundaryState>({
        hasError: false,
        error: null,
    });

    const resetErrorBoundary = () => {
        setErrorState({
            hasError: false,
            error: null,
        });
    };

    useEffect(() => {
        const errorHandler = (error: ErrorEvent) => {
            console.error('Uncaught error:', error);
            setErrorState({
                hasError: false,
                error: null,
            });
        };

        window.addEventListener('error', errorHandler);

        return () => {
            window.removeEventListener('error', errorHandler);
        };
    }, []);

    if (hasError) {
        return (
            <>
                <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
            </>
        );
    }

    return <>{children}</>;
}
