import useFetch from '@/hooks/useFetch/useFetch';
import {
    EventRegistrationData,
    EventRegistrationResponse,
    SpeakerRegistrationData,
    SpeakerRegistrationResponse,
} from '@/types/auth';
import { ApiResponse } from '@/types/hook';

/**
 * Event Service - Event Management
 * This file contains functions to interact with the API for event management.
 * @module eventService
 * @description This module provides functions to interact with the API for event management.
 * It includes functions for event registration, speaker registration, and moving past events.
 */
export const useEventService = () => {
    const fetchData = useFetch();

    return {
        registerEvent: async (formData: EventRegistrationData): Promise<ApiResponse<EventRegistrationResponse>> => {
            return fetchData({
                endpoint: '/events/register',
                method: 'POST',
                data: formData,
            });
        },

        registerSpeaker: async (
            speakerData: SpeakerRegistrationData,
        ): Promise<ApiResponse<SpeakerRegistrationResponse>> => {
            return fetchData({
                endpoint: '/speakers/register',
                method: 'POST',
                data: speakerData,
            });
        },
    };
};
