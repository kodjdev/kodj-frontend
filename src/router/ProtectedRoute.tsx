/* eslint-disable */
// @ts-nocheck

import { Navigate } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../context/useAuth';

interface ProtectedRouteProps {
    children: React.ReactElement;
}

const PrivateWrapper: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateWrapper;
