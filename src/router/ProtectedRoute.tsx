/* eslint-disable */
// @ts-nocheck

import { Navigate } from 'react-router-dom';
import React from 'react';
import useAuth from '@/context/useAuth';

type ProtectedRouteProps = {
    children: React.ReactElement;
};

/**
 * ProtectedRoute - A component that protects routes based on authentication status.
 * @param {ProtectedRouteProps} props - The props for the ProtectedRoute component.
 * @returns {React.ReactElement} - The protected route or a redirect to the login page.
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    return children;
}
