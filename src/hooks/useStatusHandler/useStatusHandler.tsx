import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import { STATUS_MESSAGES } from '@/utils/constant';

type MessageType = 'success' | 'error' | 'warning' | 'info' | 'loading';

type MessageFunction = (content: React.ReactNode | string, duration?: number, onClose?: () => void) => void;

export type MessageApi = {
    [K in MessageType]: MessageFunction;
};

/**
 * export type MessageApi = {
    success: (content: React.ReactNode | string, duration?: number, onClose?: () => void) => void;
    error: (content: React.ReactNode | string, duration?: number, onClose?: () => void) => void;
    warning: (content: React.ReactNode | string, duration?: number, onClose?: () => void) => void;
    info: (content: React.ReactNode | string, duration?: number, onClose?: () => void) => void;
    loading: (content: React.ReactNode | string, duration?: number, onClose?: () => void) => void;
};
 */

export type ApiResponse<T = unknown> = {
    status?: number;
    statusCode?: number;
    message?: string;
    data?: T;
};

export type OperationConfig<T = unknown> = {
    loadingMessage?: string;
    successMessage?: string;
    errorMessage?: string;
    showLoading?: boolean;
    showSuccess?: boolean;
    showError?: boolean;
    onSuccess?: (data?: T) => void;
    onError?: (error: ApiError) => void;
};

export type ApiError = {
    statusCode: number;
    message: string;
    originalError?: unknown;
};

export const useStatusHandler = (messageApi?: MessageApi) => {
    const [loading, setLoading] = useState(false);

    const getStatusMessage = useCallback((statusCode: number): { type: 'success' | 'error'; message: string } => {
        if (statusCode in STATUS_MESSAGES) {
            return STATUS_MESSAGES[statusCode as keyof typeof STATUS_MESSAGES];
        }

        if (statusCode >= 200 && statusCode < 300) {
            return { type: 'success', message: 'Operation completed successfully' };
        }
        if (statusCode >= 400 && statusCode < 500) {
            return { type: 'error', message: 'Bad request. Please check your input and try again.' };
        }
        if (statusCode >= 500) {
            return { type: 'error', message: 'Server error. Please try again later.' };
        }

        return { type: 'error', message: 'An unexpected error occurred. Please try again.' };
    }, []);

    const extractApiError = useCallback(
        (error: unknown): ApiError => {
            let statusCode = 500;
            let message = 'An unexpected error occurred';

            if (error instanceof AxiosError) {
                statusCode = error.response?.status || (error.code === 'NETWORK_ERROR' ? 0 : 500);

                const standardMessage = getStatusMessage(statusCode);
                message = standardMessage.message;

                if (import.meta.env.VITE_NODE_ENV === 'dev') {
                    console.error('API Error Details:', {
                        status: statusCode,
                        apiMessage: error.response?.data?.message || error.response?.data?.data,
                        standardMessage: message,
                    });
                }
            } else if (error instanceof Error) {
                message = 'An unexpected error occurred. Please try again.';
            }

            return { statusCode, message, originalError: error };
        },
        [getStatusMessage],
    );

    const showMessage = useCallback(
        (type: 'success' | 'error' | 'warning' | 'info' | 'loading', content: string, duration?: number) => {
            if (messageApi && messageApi[type]) {
                messageApi[type](content, duration);
            }
        },
        [messageApi],
    );

    const handleAsyncOperation = useCallback(
        async <TData = unknown,>(
            operation: () => Promise<TData>,
            config: OperationConfig<TData> = {},
        ): Promise<{ data: TData | null; error: ApiError | null }> => {
            const {
                loadingMessage = 'Processing...',
                successMessage,
                errorMessage,
                showLoading = true,
                showSuccess = true,
                showError = true,
                onSuccess,
                onError,
            } = config;

            try {
                setLoading(true);

                if (showLoading && loadingMessage) {
                    showMessage('loading', loadingMessage);
                }

                const result = await operation();

                if (showSuccess && successMessage) {
                    showMessage('success', successMessage);
                }

                if (onSuccess) {
                    onSuccess(result);
                }

                return { data: result, error: null };
            } catch (error) {
                const apiError = extractApiError(error);

                if (showError) {
                    const finalErrorMessage = errorMessage || apiError.message;
                    showMessage('error', finalErrorMessage);
                }

                if (onError) {
                    onError(apiError);
                }

                return { data: null, error: apiError };
            } finally {
                setLoading(false);
            }
        },
        [extractApiError, showMessage],
    );

    /* simpler method for common tasks */
    const execute = useCallback(
        async <TData = unknown,>(
            operation: () => Promise<TData>,
            messages: {
                loading?: string;
                success?: string;
                error?: string;
            } = {},
        ): Promise<TData | null> => {
            const { data } = await handleAsyncOperation(operation, {
                loadingMessage: messages.loading,
                successMessage: messages.success,
                errorMessage: messages.error,
            });
            return data;
        },
        [handleAsyncOperation],
    );

    return {
        loading,
        handleAsyncOperation,
        execute,
        extractApiError,
        getStatusMessage,
        showMessage,
    };
};
