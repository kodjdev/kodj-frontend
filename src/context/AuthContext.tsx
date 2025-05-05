import useAxios from '@/hooks/useAxios/useAxios';
import { ApiResponse, AuthContextType } from '@/types/auth';
import { createContext, useState, useEffect, ReactNode } from 'react';

export type TokenResponse = {
    access_token: string;
    refresh_token: string;
};

export type User = {
    id: string;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    imageURL?: string;
    role?: string;
};

export const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    login: async () => ({ data: null }),
    validateOTP: async () => ({ data: { access_token: '', refresh_token: '' } }),
    loginWithGoogle: async () => ({ data: { access_token: '', refresh_token: '' } }),
    signUpWithGoogle: async () => ({ data: null }),
    logout: async () => {},
    refreshTokens: async () => false,
});

type AuthProviderProps = {
    children: ReactNode;
};

/**
 * AuthProvider - Context Provider for Authentication
 * This component provides authentication context to the application.
 * It manages user state, loading state, and authentication methods.
 * @param {ReactNode} children - The child components to be wrapped by the provider
 * @description This component initializes the authentication state, checks for valid tokens,
 * and provides methods for login, logout, and token refresh. It uses the useFetch hook for API calls.
 * It also handles token validation and user data loading.
 */
export default function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const fetchData = useAxios();

    // we check if user is authenticated on initial load
    useEffect(() => {
        const initAuth = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('access_token');

                if (token && isTokenValid(token)) {
                    await loadUserData(token);
                } else {
                    const refreshToken = localStorage.getItem('refresh_token');
                    if (refreshToken) {
                        const success = await refreshTokens();
                        if (!success) {
                            clearTokens();
                        }
                    } else {
                        setUser(null);
                    }
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                clearTokens();
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    const isTokenValid = (token: string): boolean => {
        if (!token) {
            console.warn('No token provided for validation');
            return false;
        }

        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));

            const currentTime = Math.floor(Date.now() / 1000);
            const isValid = payload.exp > currentTime;

            return isValid;
        } catch (error) {
            console.error('Token validation error:', error);
            return false;
        }
    };

    const loadUserData = async (token: string) => {
        try {
            const response = await fetchData<User>({
                endpoint: '/users/details',
                method: 'GET',
                customHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data) {
                setUser(response.data);
            } else {
                clearTokens();
            }
        } catch (error) {
            console.error('Error loading user data:', error);
            clearTokens();
        }
    };

    const refreshTokens = async (): Promise<boolean> => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) return false;

            const response = await fetchData<{ accessToken: string; refreshToken: string }>({
                endpoint: '/auth/refresh-token',
                method: 'GET',
                customHeaders: {
                    RefreshToken: refreshToken,
                },
            });

            if (response.data && response.data.accessToken) {
                localStorage.setItem('access_token', response.data.accessToken);
                if (response.data.refreshToken) {
                    localStorage.setItem('refresh_token', response.data.refreshToken);
                }
                await loadUserData(response.data.accessToken);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Token refresh error:', error);
            clearTokens();
            return false;
        }
    };

    const clearTokens = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
    };

    const login = async (email: string, password: string) => {
        try {
            return await fetchData({
                endpoint: '/auth/login',
                method: 'POST',
                data: { email, password },
            });
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    // OTP validation to complete the login
    const validateOTP = async (email: string, otp: string) => {
        try {
            const response = await fetchData<TokenResponse>({
                endpoint: '/auth/otp',
                method: 'POST',
                data: { email, otp },
            });

            if (response.data && response.data.access_token) {
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
                // await loadUserData(response.data.access_token);
            }
            return response;
        } catch (error) {
            console.error('OTP validation error:', error);
            throw error;
        }
    };

    const loginWithGoogle = async (idToken: string): Promise<ApiResponse<TokenResponse>> => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/api/v1/auth/google/sign-in`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: idToken,
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();

            if (responseData.data.access_token) {
                localStorage.setItem('access_token', responseData.data.access_token);
                localStorage.setItem('refresh_token', responseData.data.refresh_token);
                console.log('setting up the tokens', responseData.data.access_token, responseData.data.refresh_token);
                await loadUserData(responseData.access_token);
            }

            return {
                data: responseData,
                status: response.status,
            };
        } catch (error) {
            console.error('Google login error:', error);
            throw error;
        }
    };

    const signUpWithGoogle = async (credential: string) => {
        try {
            return await fetchData({
                endpoint: '/auth/google/sign-up',
                method: 'POST',
                data: credential,
            });
        } catch (error) {
            console.error('Google sign up error:', error);
            throw error;
        }
    };

    const logout = async (): Promise<void> => {
        clearTokens();
        window.location.reload();
    };

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        validateOTP,
        loginWithGoogle,
        signUpWithGoogle,
        logout,
        refreshTokens,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
