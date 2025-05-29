import { createContext } from 'react';
import { AuthContextType } from '@/types/auth';

const createContextError = (methodName: string) => () => {
    throw new Error(`${methodName} must be used within AuthProvider`);
};

export const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    login: createContextError('login'),
    register: createContextError('register'),
    validateOTP: createContextError('validateOTP'),
    loginWithGoogle: createContextError('loginWithGoogle'),
    signUpWithGoogle: createContextError('signUpWithGoogle'),
    logout: createContextError('logout'),
    refreshTokens: createContextError('refreshTokens'),
});
