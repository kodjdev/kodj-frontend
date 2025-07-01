import useAxios from '@/hooks/useAxios/useAxios';
import { ApiResponse, RegisterFormData } from '@/types/fetch';
import { EventRegistrationResponse } from '@/types/user';
import { useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import { TokenResponse, User } from '@/types/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import useApiService from '@/services';

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
    const navigate = useNavigate();
    const getUserService = useApiService();

    const isLoadingUserRef = useRef(false);

    const clearTokens = useCallback(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
    }, []);

    const isTokenValid = useCallback((token: string): boolean => {
        if (!token) {
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
    }, []);

    const loadUserData = useCallback(
        async (token: string): Promise<User | null> => {
            if (isLoadingUserRef.current) {
                return null;
            }

            isLoadingUserRef.current = true;

            try {
                const response = await getUserService.getUserDetails(token);

                if (response.data?.data) {
                    const userData = response.data;
                    setUser(userData);
                    return userData;
                } else {
                    clearTokens();
                    return null;
                }
            } catch (error) {
                console.error('Error loading user data:', error);
                clearTokens();
                return null;
            } finally {
                isLoadingUserRef.current = false;
            }
        },
        [getUserService, clearTokens],
    );

    const refreshTokens = useCallback(async (): Promise<boolean> => {
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
    }, [fetchData, loadUserData, clearTokens]);

    // we check if user is authenticated on initial load
    useEffect(() => {
        let isMounted = true;

        const initializeAuth = async () => {
            setIsLoading(true);

            try {
                const accessToken = localStorage.getItem('access_token');

                if (accessToken && isTokenValid(accessToken)) {
                    const userData = await loadUserData(accessToken);

                    if (isMounted && !userData) {
                        console.log('Failed to load user data with valid token');
                    }
                } else {
                    const refreshToken = localStorage.getItem('refresh_token');

                    if (refreshToken) {
                        const refreshSuccess = await refreshTokens();
                        if (!refreshSuccess && isMounted) {
                            console.log('Token refresh failed');
                            clearTokens();
                        }
                    } else {
                        console.log('No refresh token available');
                        if (isMounted) {
                            setUser(null);
                        }
                    }
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                if (isMounted) {
                    clearTokens();
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        initializeAuth();

        return () => {
            isMounted = false;
        };
    }, []);

    // for raw login
    const login = useCallback(
        async (email: string, password: string) => {
            try {
                return await fetchData<TokenResponse>({
                    endpoint: '/auth/login',
                    method: 'POST',
                    data: {
                        email,
                        password,
                        ipAddress: window.location.hostname,
                        deviceType: 'web',
                    },
                });
            } catch (error) {
                console.error('Login error:', error);
                throw error;
            }
        },
        [fetchData],
    );

    // for raw email registration
    const register = useCallback(
        async (formData: RegisterFormData) => {
            try {
                const response = await fetchData<EventRegistrationResponse>({
                    endpoint: '/auth/register',
                    method: 'POST',
                    data: formData,
                });
                return response;
            } catch (error) {
                console.error('Registration error:', error);
                throw error;
            }
        },
        [fetchData],
    );

    // OTP validation to complete the login
    const validateOTP = useCallback(
        async (email: string, otp: string) => {
            try {
                const response = await fetchData<TokenResponse>({
                    endpoint: '/auth/verify-login-otp',
                    method: 'POST',
                    data: { email, otp },
                });

                if (response.data?.data?.access_token) {
                    localStorage.setItem('access_token', response.data.data.access_token);
                    localStorage.setItem('refresh_token', response.data.data.refresh_token);
                    await loadUserData(response.data.data.access_token);
                }
                return response;
            } catch (error) {
                console.error('OTP validation error:', error);
                throw error;
            }
        },
        [fetchData, loadUserData],
    );

    const loginWithGoogle = useCallback(
        async (idToken: string): Promise<ApiResponse<TokenResponse>> => {
            try {
                const response = await fetchData<TokenResponse>({
                    endpoint: '/auth/google/sign-in',
                    method: 'POST',
                    data: idToken,
                    customHeaders: {
                        'Content-Type': 'text/plain',
                    },
                });

                if (response.data?.data?.access_token) {
                    localStorage.setItem('access_token', response.data.data.access_token);
                    localStorage.setItem('refresh_token', response.data.data.refresh_token);

                    await loadUserData(response.data.data.access_token);
                    console.log('User data loaded successfully after Google login');
                }

                return response;
            } catch (error) {
                console.error('Google login error:', error);
                throw error;
            }
        },
        [fetchData, loadUserData, navigate],
    );

    const signUpWithGoogle = useCallback(
        async (credential: string) => {
            try {
                const response = await fetchData({
                    endpoint: '/auth/google/sign-up',
                    method: 'POST',
                    data: credential,
                    customHeaders: {
                        'Content-Type': 'text/plain',
                    },
                });
                return response;
            } catch (error) {
                console.error('Google sign up error:', error);
                throw error;
            }
        },
        [fetchData],
    );

    const logout = useCallback(async (): Promise<void> => {
        clearTokens();
        navigate('/login');
    }, [clearTokens, navigate]);

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,

        login,
        register,
        validateOTP,
        loginWithGoogle,
        signUpWithGoogle,
        logout,
        refreshTokens,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
