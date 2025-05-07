import useAxios from '@/hooks/useAxios/useAxios';
import { ApiResponse } from '@/types/fetch';
import { UserCount, UserDetails } from '@/types/user';
import { useMemo } from 'react';

/**
 * User Service - User Management
 * This file contains functions to interact with the API for user management.
 * @module userService
 * @description This module provides functions to interact with the API for user management.
 * It includes functions for user details retrieval, registration, and user count.
 */
export const useUserService = () => {
    const fetchData = useAxios();

    return useMemo(() => {
        return {
            getUserDetails: async (token: string): Promise<ApiResponse<UserDetails>> => {
                return fetchData<UserDetails>({
                    endpoint: '/users/details',
                    method: 'GET',
                    customHeaders: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            },

            getTotalUserCount: async (): Promise<ApiResponse<UserCount>> => {
                return fetchData<UserCount>({
                    endpoint: '/users/count',
                    method: 'GET',
                });
            },
        };
    }, [fetchData]);
};
