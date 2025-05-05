import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import errorAtom from '@/atoms/errors';
import { ApiResponse } from '@/types/fetch';

type AxiosOptions<T> = {
    endpoint: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    data?: Record<string, unknown> | null;
    params?: Record<string, string | number | boolean>;
    customHeaders?: Record<string, string>;
    onSuccess?: (response: ApiResponse<T>) => void;
    onError?: (error: Error | unknown) => void;
    withCredentials?: boolean;
};

export default function useAxios() {
    const navigate = useNavigate();
    const setError = useSetRecoilState(errorAtom);
    const API_BASE_URL = 'http://localhost:8080/api/v1';

    const axiosInstance = axios.create({
        baseURL: API_BASE_URL,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // response interceptor for common error handling
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            // handling the  401 Unauthorized errors
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');

                navigate('/login');
            }
            return Promise.reject(error);
        },
    );

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
        }: AxiosOptions<T>): Promise<ApiResponse<T>> => {
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
                    config.data = data;
                }

                const response: AxiosResponse = await axiosInstance(config);
                console.log(`useAxios: Received response with status ${response.status}`);

                // format the response to match expected API response structure
                const apiResponse: ApiResponse<T> = {
                    data: response.data,
                    status: response.status,
                    message: 'success',
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
                } else {
                    setError({
                        title: 'API Error',
                        message: `Request to ${endpoint} failed: ${errorMessage}`,
                        record: null,
                    });
                }

                throw error;
            }
        },
        [navigate, setError],
    );
}
