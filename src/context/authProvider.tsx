import useAxios from '@/hooks/useAxios/useAxios';
import { ApiResponse, RegisterFormData } from '@/types/fetch';
import { EventRegistrationResponse } from '@/types/user';
import { useState, useEffect, ReactNode, useCallback, useRef } from 'react';
import { TokenResponse, User } from '@/types/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import useApiService from '@/services';
import { TokenStorage } from '@/utils/tokenStorage';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/atoms/user';

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
    const setUserAtom = useSetRecoilState(userAtom);
    const isMountedRef = useRef(true);

    const [userDataCache, setUserDataCache] = useState<Map<string, User>>(new Map());
    const [isRefreshing, setIsRefreshing] = useState(false);

    const clearTokens = useCallback(() => {
        TokenStorage.clearTokens();
        localStorage.removeItem('wasAuthenticated');
        localStorage.removeItem('lastUserId');
        setUserDataCache(new Map());
        setUser(null);
        setUserAtom({ id: '', username: '', firstName: '' });
    }, [setUserAtom]);

    const isTokenValid = useCallback((token: string): boolean => {
        if (!token) return false;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 > Date.now();
        } catch (error) {
            console.error('Token validation failed:', error);
            return false;
        }
    }, []);

    const loadUserData = useCallback(
        async (token: string): Promise<User | null> => {
            /* we first check cache */
            const tokenKey = token.substring(0, 20);
            if (userDataCache.has(tokenKey)) {
                const cachedUser = userDataCache.get(tokenKey)!;
                setUser(cachedUser);
                setUserAtom({
                    id: String(cachedUser.id),
                    username: cachedUser.username ?? '',
                    firstName: cachedUser.firstName?.trim() ?? '',
                });
                localStorage.setItem('wasAuthenticated', 'true');
                localStorage.setItem('lastUserId', String(cachedUser.id));
                return cachedUser;
            }

            try {
                const response = await getUserService.getUserDetails(token);
                if (response.data) {
                    const userData = response.data;

                    setUserDataCache((prev) => new Map(prev).set(tokenKey, userData));

                    setUser(userData);
                    setUserAtom({
                        id: String(userData.id),
                        username: userData.username ?? '',
                        firstName: userData.firstName?.trim() ?? '',
                    });
                    localStorage.setItem('wasAuthenticated', 'true');
                    localStorage.setItem('lastUserId', String(userData.id));
                    return userData;
                }
                throw new Error('User data not found in response.');
            } catch (error) {
                localStorage.removeItem('wasAuthenticated');
                localStorage.removeItem('lastUserId');
                console.error('Failed to load user data.', error);
                throw error;
            }
        },
        [getUserService, setUserAtom, userDataCache],
    );

    const refreshTokens = useCallback(async (): Promise<boolean> => {
        if (isRefreshing) return false;

        const refreshToken = TokenStorage.getRefreshToken();
        if (!refreshToken) return false;

        setIsRefreshing(true);
        try {
            const response = await fetchData<{ access_token: string; refresh_token: string }>({
                endpoint: '/auth/refresh-token',
                method: 'GET',
                customHeaders: { RefreshToken: refreshToken },
            });

            if (response.data?.access_token) {
                const newAccessToken = response.data.access_token;
                TokenStorage.setAccessToken(newAccessToken);
                if (response.data.refresh_token) {
                    TokenStorage.setRefreshToken(response.data.refresh_token);
                }
                await loadUserData(newAccessToken);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error refreshing tokens:', error);
            clearTokens();
            return false;
        } finally {
            setIsRefreshing(false);
        }
    }, [fetchData, loadUserData, clearTokens, isRefreshing]);

    /* we check if user is authenticated on initial load */
    useEffect(() => {
        isMountedRef.current = true;

        const initializeAuth = async () => {
            const accessToken = TokenStorage.getAccessToken();
            const wasAuthenticated = localStorage.getItem('wasAuthenticated') === 'true';
            const lastUserId = localStorage.getItem('lastUserId');

            if (!accessToken) {
                setIsLoading(false);
                return;
            }

            if (wasAuthenticated && lastUserId) {
                setUserAtom({
                    id: lastUserId,
                    username: localStorage.getItem('lastUsername') || '',
                    firstName: localStorage.getItem('lastFirstName') || '',
                });
                setIsLoading(false);
            }

            try {
                if (isTokenValid(accessToken)) {
                    /* we first check cache first before making API call */
                    const tokenKey = accessToken.substring(0, 20);
                    if (!userDataCache.has(tokenKey)) {
                        await loadUserData(accessToken);
                    } else {
                        /* this case we use cached data */
                        const cachedUser = userDataCache.get(tokenKey)!;
                        setUser(cachedUser);
                        setUserAtom({
                            id: String(cachedUser.id),
                            username: cachedUser.username ?? '',
                            firstName: cachedUser.firstName?.trim() ?? '',
                        });
                    }
                } else {
                    console.log('Access token is invalid, attempting to refresh...');
                    await refreshTokens();
                }
            } catch (error) {
                console.log('Initial user data load failed. trying to refresh token...', error);
                await refreshTokens();
            } finally {
                if (isMountedRef.current) {
                    setIsLoading(false);
                }
            }
        };

        initializeAuth();

        return () => {
            isMountedRef.current = false;
        };
    }, []);

    /* For raw login */
    const login = useCallback(
        async (email: string, password: string) => {
            const response = await fetchData<TokenResponse>({
                endpoint: '/auth/login',
                method: 'POST',
                data: {
                    email,
                    password,
                    ipAddress: window.location.hostname,
                    deviceType: 'web',
                },
                skipGlobalErrorHandler: true,
            });
            return response;
        },
        [fetchData],
    );

    /* For raw email registration */
    const register = useCallback(
        async (formData: RegisterFormData) => {
            const response = await fetchData<EventRegistrationResponse>({
                endpoint: '/auth/register',
                method: 'POST',
                data: formData,
                skipGlobalErrorHandler: true,
            });
            return response;
        },
        [fetchData],
    );

    /* OTP validation to complete the login */
    const validateOTP = useCallback(
        async (email: string, otp: string) => {
            const response = await fetchData<TokenResponse>({
                endpoint: '/auth/verify-login-otp',
                method: 'POST',
                data: { email, otp },
                skipGlobalErrorHandler: true,
            });

            if (response.data?.access_token) {
                clearTokens();
                TokenStorage.setAccessToken(response.data.access_token);
                TokenStorage.setRefreshToken(response.data.refresh_token);
                await loadUserData(response.data.access_token);
            }
            return response;
        },
        [fetchData, loadUserData, clearTokens],
    );

    const loginWithGoogle = useCallback(
        async (idToken: string): Promise<ApiResponse<TokenResponse>> => {
            const response = await fetchData<TokenResponse>({
                endpoint: '/auth/google/sign-in',
                method: 'POST',
                data: idToken,
                skipGlobalErrorHandler: true,
                customHeaders: {
                    'Content-Type': 'text/plain',
                },
            });

            if (response.data?.access_token) {
                setUserDataCache(new Map());
                setUser(null);
                TokenStorage.setAccessToken(response.data.access_token);
                TokenStorage.setRefreshToken(response.data.refresh_token);
                await loadUserData(response.data.access_token);
            }

            return response;
        },
        [fetchData, loadUserData, navigate],
    );

    const signUpWithGoogle = useCallback(
        async (credential: string, additionalData?: { username: string; phone: string }) => {
            let requestData;
            let headers;

            if (additionalData) {
                requestData = {
                    credential,
                    username: additionalData.username,
                    phone: additionalData.phone,
                };
                headers = {
                    'Content-Type': 'application/json',
                };
            } else {
                requestData = credential;
                headers = {
                    'Content-Type': 'text/plain',
                };
            }

            const response = await fetchData({
                endpoint: '/auth/google/sign-up',
                method: 'POST',
                data: requestData,
                customHeaders: headers,
                skipGlobalErrorHandler: true,
            });
            return response;
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
