import { useSetRecoilState } from 'recoil';
import { upcomingEventsAtom, pastEventsAtom } from '@/atoms/events';
import { ApiResponse } from '@/types/fetch';
import { useMemo } from 'react';
import useAxios from '@/hooks/useAxios/useAxios';
import { MeetupResponse, PageResponse } from '@/types/hook';
import { Event } from '@/types';
import { EventDetailsResponse } from '@/types/event';

/**
 * Fetch Event Service - For Event Fetching
 * This file contains functions to fetch events from the API.
 * @module eventFetchService
 * @description This module provides functions to fetch events from the API.
 */
export const useEventFetchService = () => {
    const fetchData = useAxios();
    const setUpcomingEvents = useSetRecoilState(upcomingEventsAtom);
    const setPastEvents = useSetRecoilState(pastEventsAtom);

    /**
     * convert MeetupResponse to Event type
     */
    const convertMeetupToEvent = (meetup: MeetupResponse): Event => {
        return {
            id: meetup.id.toString(),
            title: meetup.title,
            description: meetup.description,
            date: meetup.meetupDate,
            location: meetup.location,
            maxSeats: meetup.maxSeats,
            imageUrl: meetup.imageURL,
            imageUrls: meetup.imageURL ? [meetup.imageURL] : [],
            parking: meetup.parking,
        };
    };

    return useMemo(() => {
        const updateRecoilAtomsFromResponse = (
            response: ApiResponse<PageResponse<MeetupResponse>>,
            type: 'upcoming' | 'past',
        ): void => {
            if (response.statusCode === 200) {
                const contentArray = response.data?.data?.content;

                if (contentArray && Array.isArray(contentArray)) {
                    const convertedEvents = contentArray.map(convertMeetupToEvent);

                    if (type === 'upcoming') {
                        setUpcomingEvents(convertedEvents);
                    } else if (type === 'past') {
                        setPastEvents(convertedEvents);
                    }
                    return;
                }
            }

            // fallback for empty data content
            if (type === 'upcoming') {
                setUpcomingEvents([]);
            } else if (type === 'past') {
                setPastEvents([]);
            }
        };

        return {
            getEvents: async ({ page = 0, size = 10, type = 'upcoming' } = {}): Promise<
                ApiResponse<PageResponse<MeetupResponse>>
            > => {
                const response = await fetchData<PageResponse<MeetupResponse>>({
                    endpoint: '/meetups',
                    method: 'GET',
                    params: {
                        page: page.toString(),
                        size: size.toString(),
                        type,
                    },
                });

                updateRecoilAtomsFromResponse(response, type as 'upcoming' | 'past');

                return response;
            },

            getEventById: async (id: string | number): Promise<ApiResponse<MeetupResponse>> => {
                if (!id) {
                    throw new Error('Event ID is required');
                }

                return fetchData<MeetupResponse>({
                    endpoint: `/meetups/${id}`,
                    method: 'GET',
                });
            },

            getEventDetails: async (meetupId: string | number): Promise<ApiResponse<EventDetailsResponse>> => {
                return fetchData<EventDetailsResponse>({
                    endpoint: `/meetups/${meetupId}/details`,
                    method: 'GET',
                });
            },

            convertMeetupToEvent,
        };
    }, [fetchData, setUpcomingEvents, setPastEvents]);
};
