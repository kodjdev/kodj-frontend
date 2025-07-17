import { ReactNode } from 'react';
import { ApiResponse, RegisterFormData } from './fetch';
import { EventRegistrationResponse } from './user';

export type User = {
    data: {
        id: string;
        email: string;
        firstName?: string;
        lastName?: string;
        imageUrl?: string;
        bio?: string;
        role: 'user' | 'admin' | 'speaker';
        createdAt: string;
        username: string;
        phone?: string;
        oauthProvider?: string;
        region?: string;
        category?: string;
        provider?: string;
    };
};

export type TokenResponse = {
    data: {
        access_token: string;
        refresh_token: string;
    };
};

export type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<ApiResponse>;
    register: (formData: RegisterFormData) => Promise<ApiResponse<EventRegistrationResponse>>;
    validateOTP: (email: string, otp: string) => Promise<ApiResponse<TokenResponse>>;
    loginWithGoogle: (credential: string) => Promise<ApiResponse<TokenResponse>>;
    signUpWithGoogle: (
        credential: string,
        additionalData?: { username: string; phone: string },
    ) => Promise<ApiResponse>;
    logout: () => Promise<void>;
    refreshTokens: () => Promise<boolean>;
};

export type AuthProviderProps = {
    children: ReactNode;
};
