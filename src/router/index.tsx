/* eslint-disable */
// @ts-nocheck

import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from '@/router/routes';
import ProtectedRoute from '@/router/ProtectedRoute';
import Error from '@/components/Error/Error';
import ErrorBoundary from '@/components/Error/ErrorBoundary';

/**
 * RouterPage - This component is responsible for rendering the application's routes.
 * @param {Readonly<{ children: React.ReactNode }>} props - The props for the RouterPage component.
 */
export default function RouterPage() {
    return (
        <Routes>
            {routes.map(({ path, component, auth }) => (
                <Route
                    path={path}
                    key={path}
                    element={
                        auth ? (
                            <ErrorBoundary>
                                <PrivateWrapper>{component}</PrivateWrapper>
                            </ErrorBoundary>
                        ) : (
                            <ErrorBoundary> {component}</ErrorBoundary>
                        )
                    }
                />
            ))}
            <Route path="*" element={<Error />} />
        </Routes>
    );
}
