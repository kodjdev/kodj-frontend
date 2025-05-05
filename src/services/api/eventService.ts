import {
    EventRegistrationData,
    EventRegistrationResponse,
    SpeakerRegistrationData,
    SpeakerRegistrationResponse,
} from '@/types/user';
import useAxios from '@/hooks/useAxios/useAxios';
import { ApiResponse } from '@/types/fetch';

/**
 * Event Service - Event Management
 * This file contains functions to interact with the API for event management.
 * @module eventService
 * @description This module provides functions to interact with the API for event management.
 * It includes functions for event registration, speaker registration, and moving past events.
 */
export const useEventService = () => {
    const fetchData = useAxios();

    return {
        registerEvent: async (formData: EventRegistrationData): Promise<ApiResponse<EventRegistrationResponse>> => {
            return fetchData<EventRegistrationResponse>({
                endpoint: '/events/register',
                method: 'POST',
                data: formData,
                customHeaders: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        },

        registerSpeaker: async (
            speakerData: SpeakerRegistrationData,
        ): Promise<ApiResponse<SpeakerRegistrationResponse>> => {
            return fetchData<SpeakerRegistrationResponse>({
                endpoint: '/speakers/register',
                method: 'POST',
                data: speakerData,
                customHeaders: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        },
    };
};
