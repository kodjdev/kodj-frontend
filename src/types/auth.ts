import { ReactNode } from 'react';
import { ApiResponse, RegisterFormData } from './fetch';
import { EventRegistrationResponse } from './user';

export type User = {
    id: string;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    imageURL?: string;
    role?: string;
};

export type TokenResponse = {
    access_token: string;
    refresh_token: string;
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
