import { useUserService } from '@/services/apiService/userService';
import { useFetchEventService } from '@/services/apiService/fetchEventService';
import { useRegisterEventService } from '@/services/apiService/registerEventService';

/**
 * API Service - Centralized API Service
 * This file contains functions to interact with the API for user management, and event management.
 * @module apiService
 * It includes functions for user details retrieval, event registration, and speaker registration.
 * @returns {Object} - An object containing all the API service functions.
 */
export default function useApiService() {
    const userService = useUserService();
    const eventFetchService = useFetchEventService();
    const eventRegisterService = useRegisterEventService();

    return {
        ...userService,
        ...eventFetchService,
        ...eventRegisterService,
    };
}
