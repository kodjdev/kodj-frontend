import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import errorAtom from '@/atoms/errors';
import { ApiResponse } from '@/types/fetch';

type AxiosOptions<T> = {
    endpoint: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    data?: Record<string, unknown> | string | null;
    params?: Record<string, string | number | boolean>;
    signal?: AbortSignal;
    customHeaders?: Record<string, string>;
    onSuccess?: (response: ApiResponse<T>) => void;
    onError?: (error: Error | unknown) => void;
    withCredentials?: boolean;
    skipGlobalErrorHandler?: boolean;
};

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export default function useAxios() {
    const navigate = useNavigate();
    const setError = useSetRecoilState(errorAtom);

    const axiosInstance = axios.create({
        baseURL: apiUrl,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const setupInterceptors = (axiosInstance: AxiosInstance, navigate: NavigateFunction) => {
        axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                /* here we only handle 401 for authentication endpoints, not all 401s */
                if (
                    error.response?.status === 401 &&
                    !error.config?.url?.includes('verify-login-otp') &&
                    !error.config?.url?.includes('login')
                ) {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    navigate('/login');
                }
                return Promise.reject(error);
            },
        );
    };

    setupInterceptors(axiosInstance, navigate);

    return useCallback(
        async <T = unknown>({
            endpoint,
            method = 'GET',
            data = null,
            params = {},
            customHeaders = {},
            onSuccess,
            onError,
            withCredentials = true,
            skipGlobalErrorHandler = false,
        }: AxiosOptions<T> & { skipGlobalErrorHandler?: boolean }): Promise<ApiResponse<T>> => {
            const url = endpoint;
            console.log(`useAxios: Making ${method} request to ${url}`);

            try {
                const config: AxiosRequestConfig = {
                    method,
                    url,
                    params,
                    headers: { ...customHeaders },
                    withCredentials,
                };

                if (data) {
                    if (typeof data === 'object' && Object.keys(data).includes('credential')) {
                        config.data = {
                            credential: data.credential,
                        };
                    } else {
                        /* for normal use we do proper json stringification */
                        config.data = data;
                    }
                }

                const response: AxiosResponse = await axiosInstance(config);
                console.log(`useAxios: Received response with status ${response.status}`);

                /* format the response to match expected API response structure */
                const apiResponse: ApiResponse<T> = {
                    data: response.data.data as T,
                    statusCode: response.status,
                    message: response.data.message || 'success',
                };

                console.log('useAxios: Parsed response data:', apiResponse);

                if (onSuccess) {
                    onSuccess(apiResponse);
                }

                return apiResponse;
            } catch (error: unknown) {
                console.error(`useAxios error (${method} ${url}):`, error);

                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
                          'An unexpected error occurred';

                if (onError) {
                    onError(error);
                } else if (!skipGlobalErrorHandler) {
                    setError({
                        title: 'API Error',
                        message: `Request to ${endpoint} failed: ${errorMessage}`,
                        record: null,
                    });
                }

                throw error;
            }
        },
        [setError, axiosInstance],
    );
}
