import errorAtom from '@/atoms/errors';
import { ApiResponse, FetchOption, RequestData } from '@/types/fetch';
import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

/**
 * Custom Hook - useFetch
 * A Type Safe hook for making HTTP requests with built-in error handling and authentication flow.
 * @returns A function that makes HTTP requests and returns the response data
 */
export default function useFetch() {
    const navigate = useNavigate();
    const setError = useSetRecoilState(errorAtom);
    const { pathname, search } = useLocation();
    const currentPath = pathname + search;
    const API_BASE_URL = 'http://localhost:8080/api/v1';

    return useCallback(
        async <T = unknown>({
            endpoint,
            method = 'GET',
            data = null,
            customHeaders = {},
            onSuccess,
            onError,
            formData = false,
        }: FetchOption<T>): Promise<ApiResponse<T>> => {
            const url = `${API_BASE_URL}${endpoint}`;
            console.log(`useFetch: Making ${method} request to ${url}`);

            try {
                // setup the headers based on content type
                const headers: Record<string, string> = { ...customHeaders };
                if (!formData && !headers['Content-Type']) {
                    headers['Content-Type'] = 'application/json';
                }

                const options: RequestInit = {
                    method,
                    headers,
                    credentials: 'include',
                    mode: 'cors',
                };

                // we add the body if needed
                if (data) {
                    if (formData) {
                        options.body = data instanceof FormData ? data : createFormData(data);
                    } else if (method === 'POST' || method === 'PUT') {
                        options.body = typeof data === 'string' ? data : JSON.stringify(data);
                    }
                }

                const response = await fetch(url, options);
                console.log(`useFetch: Received response with status ${response.status}`);

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText || `HTTP error! Status: ${response.status}`);
                }

                let responseData: ApiResponse<T> | string;
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    responseData = (await response.json()) as ApiResponse<T>;
                } else {
                    responseData = await response.text();
                }

                // ensuring that we're working with a proper api endpoint
                let apiResponse: ApiResponse<T>;
                if (typeof responseData === 'string') {
                    // convert the plain text responses to API response format
                    apiResponse = {
                        data: responseData as unknown as T,
                        message: 'success',
                        status: response.status,
                    };
                } else {
                    apiResponse = responseData;
                }

                console.log('useFetch: Parsed response data:', apiResponse);

                if (onSuccess) {
                    onSuccess(apiResponse);
                }

                return apiResponse;
            } catch (error) {
                console.error(`useFetch error (${method} ${url}):`, error);

                // we call error callback if provided, otherwise set global error
                if (onError) {
                    onError(error);
                } else {
                    setError({
                        title: 'API Error',
                        message: `Request to ${endpoint} failed: ${error instanceof Error ? error.message : String(error)}`,
                        record: null,
                    });
                }
                throw error;
            }
        },
        [navigate, currentPath, setError],
    );
}

/**
 * Helper method - FormData object from a plain object
 * @param data The data to convert to FormData
 * @returns A FormData object containing the data
 * @throws Error if data is not an object
 */
function createFormData(data: RequestData): FormData {
    if (typeof data !== 'object' || data === null) {
        throw new Error('FormData can only be created from an object');
    }

    const formData = new FormData();
    for (const key in data as Record<string, unknown>) {
        const value = (data as Record<string, unknown>)[key];
        if (value !== undefined && value !== null) {
            formData.append(key, value instanceof Blob ? value : String(value));
        }
    }
    return formData;
}
