import { ReactNode } from 'react';

export type User = {
    id: string;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    imageURL?: string;
    role?: string;
};

export type ApiResponse<T = unknown> = {
    data: T;
    message?: string;
    status?: number;
};

export type TokenResponse = {
    accessToken: string;
    refreshToken: string;
};

export type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<ApiResponse>;
    validateOTP: (email: string, otp: string) => Promise<ApiResponse<TokenResponse>>;
    loginWithGoogle: (credential: string) => Promise<ApiResponse<TokenResponse>>;
    signUpWithGoogle: (credential: string) => Promise<ApiResponse>;
    logout: () => Promise<void>;
    refreshTokens: () => Promise<boolean>;
};

export type AuthProviderProps = {
    children: ReactNode;
};
