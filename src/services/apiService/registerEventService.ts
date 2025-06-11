import {
    EventRegistrationData,
    EventRegistrationResponse,
    SpeakerRegistrationData,
    SpeakerRegistrationResponse,
} from '@/types/user';
import useAxios from '@/hooks/useAxios/useAxios';
import { ApiResponse } from '@/types/fetch';
import { UserRegisteredEventsResponse } from '@/types/event';
import { useMemo } from 'react';

/**
 * Register Event Service - Event Management
 * This file contains functions to interact with the API for event management.
 * @module useRegisterEventService
 * @description This module provides functions to interact with the API for event management.
 * It includes functions for event registration, speaker registration, and moving past events.
 */
export const useRegisterEventService = () => {
    const fetchData = useAxios();

    return useMemo(() => {
        return {
            registerEvent: async (
                meetupId: string,
                registrationData: EventRegistrationData,
            ): Promise<ApiResponse<EventRegistrationResponse>> => {
                const access_token = localStorage.getItem('access_token');
                return fetchData<EventRegistrationResponse>({
                    endpoint: `/users/meetups/${meetupId}/registration`,
                    method: 'POST',
                    data: registrationData,
                    customHeaders: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`,
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

            getUserRegisteredEvents: async (token: string): Promise<ApiResponse<UserRegisteredEventsResponse>> => {
                return fetchData<UserRegisteredEventsResponse>({
                    endpoint: '/users/meetups',
                    method: 'GET',
                    customHeaders: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            },
        };
    }, [fetchData]);
};
