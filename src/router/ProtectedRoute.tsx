/* eslint-disable */
// @ts-nocheck

import { Navigate } from 'react-router-dom';
import React from 'react';
import useAuth from '@/context/useAuth';
import { ModalLoading } from '@/components/Loading/LoadingAnimation';
import { TokenStorage } from '@/utils/tokenStorage';

type ProtectedRouteProps = {
    children: React.ReactElement;
};

/**
 * ProtectedRoute - A component that protects routes based on authentication status.
 * @param {ProtectedRouteProps} props - The props for the ProtectedRoute component.
 * @returns {React.ReactElement} - The protected route or a redirect to the login page.
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading, user } = useAuth();

    const wasAuthenticated = localStorage.getItem('wasAuthenticated') === 'true';
    const hasValidToken = TokenStorage.getAccessToken();

    if (isLoading && !wasAuthenticated) {
        return (
            <div>
                <ModalLoading message="Loading..." />
            </div>
        );
    }

    if (wasAuthenticated && hasValidToken && !user) {
        return children;
    }

    if (!isAuthenticated && !wasAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    return children;
}
