import { ReactNode } from 'react';
import { ApiResponse, RegisterFormData } from './fetch';
import { EventRegistrationResponse } from './user';

export type User = {
    data: {
        id: number;
        username: string;
        email: string;
        firstName: string | null;
        lastName: string | null;
        oauthProvider: string;
        imageUrl: string;
        imageName: string;
        region: string | null;
        bio: string | null;
        category: string | null;
        createdAt: string;
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
    signUpWithGoogle: (credential: string) => Promise<ApiResponse>;
    logout: () => Promise<void>;
    refreshTokens: () => Promise<boolean>;
};

export type AuthProviderProps = {
    children: ReactNode;
};
