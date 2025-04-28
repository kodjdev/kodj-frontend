import { useEventService } from '@/services/api/eventService';
import { useUserService } from '@/services/api/userService';

/**
 * API Service - Centralized API Service
 * This file contains functions to interact with the API for user management, and event management.
 * @module apiService
 * It includes functions for user details retrieval, event registration, and speaker registration.
 * @returns {Object} - An object containing all the API service functions.
 */
export default function useApiService() {
    const userService = useUserService();
    const eventService = useEventService();

    return {
        ...userService,
        ...eventService,
    };
}
