import { createContext } from 'react';
import { AuthContextType } from '@/types/auth';

export const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    login: async () => ({ data: null }),
    register: async () => ({
        data: { registrationId: '', eventId: '', status: 'pending', success: false, message: '', otpSent: false },
    }),
    validateOTP: async () => ({ data: { data: { access_token: '', refresh_token: '' } } }),
    loginWithGoogle: async () => ({ data: { data: { access_token: '', refresh_token: '' } } }),
    signUpWithGoogle: async () => ({ data: null }),
    logout: async () => {},
    refreshTokens: async () => false,
});
