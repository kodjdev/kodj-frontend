/* eslint-disable */
// @ts-nocheck

import { Navigate, Route, Routes } from 'react-router-dom';
import { routes } from '@/router/routes';
import ProtectedRoute from '@/router/ProtectedRoute';
import Error from '@/components/Error/Error';
import ErrorBoundary from '@/components/Error/ErrorBoundary';
import useAuth from '@/context/useAuth';
import { Suspense } from 'react';
import ComponentLoading from '@/components/ComponentLoading';

/**
 * RouterPage: Root Component to render the routes
 * @description Main routing component that handles:
 * - Public routes: Accessible without authentication
 * - Private routes: Requires authentication
 * - Error handling: Catches unhandled routes and runtime errors
 */
export default function RouterPage() {
    return (
        <ErrorBoundary>
            <Routes>
                {/* Public Routes */}
                {routes.public.map(({ path, element }) => (
                    <Route
                        path={path}
                        key={path}
                        element={<Suspense fallback={<ComponentLoading />}>{element}</Suspense>}
                    />
                ))}

                {/* Private Routes */}
                {routes.protected.map(({ path, element }) => (
                    <Route
                        path={path}
                        key={path}
                        element={
                            <ProtectedRoute>
                                <Suspense fallback={<ComponentLoading />}>{element}</Suspense>
                            </ProtectedRoute>
                        }
                    />
                ))}

                {/** Unhandled routes */}
                <Route path="*" element={<Error />} />
            </Routes>
        </ErrorBoundary>
    );
}
