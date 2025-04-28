import useFetch from '@/hooks/useFetch/useFetch';
import { UserCount, UserData, UserDetails } from '@/types/auth';
import { ApiResponse } from '@/types/hook';

/**
 * User Service - User Management
 * This file contains functions to interact with the API for user management.
 * @module userService
 * @description This module provides functions to interact with the API for user management.
 * It includes functions for user details retrieval, registration, and user count.
 */
export const useUserService = () => {
    const fetchData = useFetch();

    return {
        getUserDetails: async (token: string): Promise<ApiResponse<UserDetails>> => {
            return fetchData({
                endpoint: '/users/details',
                method: 'GET',
                customHeaders: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
        },

        registerUser: async (userData: UserData): Promise<ApiResponse<UserDetails>> => {
            return fetchData({
                endpoint: '/users',
                method: 'POST',
                data: userData,
                formData: true,
            });
        },

        getTotalUserCount: async (): Promise<ApiResponse<UserCount>> => {
            return fetchData({
                endpoint: '/users/count',
                method: 'GET',
            });
        },
    };
};
