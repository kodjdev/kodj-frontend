import { useRecoilState } from 'recoil';
import { upcomingEventsAtom, pastEventsAtom, eventsCacheStatusAtom, eventDetailsAtom } from '@/atoms/events';
import { ApiResponse } from '@/types/fetch';
import { useMemo } from 'react';
import useAxios from '@/hooks/useAxios/useAxios';
import { MeetupResponse, PageResponse } from '@/types/hook';
import { Event, EventDetailsResponse } from '@/types/event';

export const CACHE_DURATION = 5 * 60 * 1000;

/**
 * Convert the MeetupResponse to Event format for internal use
 */
export const meetupToEvent = (meetup: MeetupResponse): Event => {
    const registeredCount = meetup.maxSeats - meetup.availableSeats;

    return {
        id: meetup.id.toString(),
        title: meetup.title || 'Untitled Event',
        description: meetup.description || 'No description available',
        date: meetup.meetupDate || null,
        location: meetup.location || 'Location TBD',
        maxSeats: meetup.maxSeats ?? 50,
        availableSeats: meetup.availableSeats ?? 50,
        startTime: meetup.startTime || '',
        endTime: meetup.endTime || '',
        registeredCount: registeredCount,
        imageUrl: meetup.imageURL || '',
        parking: meetup.parking ?? false,
        author: "KO'DJ",
        isFreeEvent: true,
        time: undefined,
        speakers: [],
        eventSchedule: [],
    };
};

/**
 * Convert the Event to MeetupResponse format for api compatibility
 */
export const eventToMeetup = (event: Event): MeetupResponse => {
    const maxSeats = event.maxSeats ?? 50;
    const registeredCount = event.registeredCount ?? 0;

    return {
        id: parseInt(event.id) || 0,
        title: event.title || 'Untitled Event',
        description: Array.isArray(event.description)
            ? event.description.join(' ')
            : event.description || 'No description available',
        meetupDate: typeof event.date === 'string' ? event.date : new Date().toISOString(),
        location: event.location || 'Location TBD',
        maxSeats: maxSeats || 50,
        availableSeats: Math.max(0, maxSeats - registeredCount),
        imageURL: event.imageUrl || '',
        parking: event.parking ?? false,
        provided: 'Cached Data',
        organizerId: 0,
        startTime: typeof event.date === 'string' ? event.date : '',
        endTime: typeof event.date === 'string' ? event.date : '',
        imageName: '',
    };
};

/**
 * Fetch Event Service - For Event Fetching
 * This file contains functions to fetch events from the API.
 * @module useFetchEventService
 * @description This module provides functions to fetch events from the API.
 */
export const useFetchEventService = () => {
    const fetchData = useAxios();
    const [upcomingEvents, setUpcomingEvents] = useRecoilState(upcomingEventsAtom);
    const [pastEvents, setPastEvents] = useRecoilState(pastEventsAtom);
    const [cacheStatus, setCacheStatus] = useRecoilState(eventsCacheStatusAtom);
    const [eventDetailsCache, setEventDetailsCache] = useRecoilState(eventDetailsAtom);

    const isCacheValid = (lastFetch: number | null): boolean => {
        if (!lastFetch) return false;
        const currentTime = Date.now();
        return currentTime - lastFetch < CACHE_DURATION;
    };

    const updateRecoilAtomsFromResponse = (
        response: ApiResponse<PageResponse<MeetupResponse>>,
        type: 'upcoming' | 'past',
    ): void => {
        const now = Date.now();

        if (response.statusCode === 200) {
            const contentArray = response.data?.content;

            if (contentArray && Array.isArray(contentArray)) {
                const convertedEvents = contentArray.map(meetupToEvent);

                if (type === 'upcoming') {
                    setUpcomingEvents(convertedEvents);
                } else if (type === 'past') {
                    setPastEvents(convertedEvents);
                }

                setCacheStatus((prev) => ({
                    ...prev,
                    [type]: { loaded: true, lastFetch: now },
                }));

                return;
            }
        }

        if (type === 'upcoming') {
            setUpcomingEvents([]);
        } else if (type === 'past') {
            setPastEvents([]);
        }

        setCacheStatus((prev) => ({
            ...prev,
            [type]: { loaded: true, lastFetch: now },
        }));
    };

    return useMemo(
        () => ({
            getEvents: async ({ page = 0, size = 10, type = 'upcoming' } = {}): Promise<
                ApiResponse<PageResponse<MeetupResponse>>
            > => {
                const cacheInfo = cacheStatus[type as 'upcoming' | 'past'];

                if (cacheInfo.loaded && isCacheValid(cacheInfo.lastFetch)) {
                    const cachedEvents = type === 'upcoming' ? upcomingEvents : pastEvents;
                    return {
                        data: {
                            content: cachedEvents.map(eventToMeetup),
                        } as PageResponse<MeetupResponse>,
                        statusCode: 200,
                        message: 'success',
                    };
                }

                const response = await fetchData<PageResponse<MeetupResponse>>({
                    endpoint: '/public/meetups',
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

            getEventDetails: async (meetupId: string | number): Promise<ApiResponse<EventDetailsResponse>> => {
                const eventId = meetupId.toString();
                const cachedDetail = eventDetailsCache[eventId];

                if (cachedDetail && isCacheValid(cachedDetail.lastFetch)) {
                    return {
                        data: cachedDetail.data,
                        statusCode: 200,
                        message: 'success',
                    };
                }

                const response = await fetchData<EventDetailsResponse>({
                    endpoint: `/public/meetups/${meetupId}/details`,
                    method: 'GET',
                });

                if (response.statusCode === 200 && response.data) {
                    const eventDetailsData = response.data;

                    setEventDetailsCache((prev) => ({
                        ...prev,
                        [eventId]: {
                            data: eventDetailsData,
                            lastFetch: Date.now(),
                        },
                    }));

                    return {
                        data: eventDetailsData,
                        statusCode: response.statusCode,
                        message: response.message,
                    };
                }

                return {
                    data: {
                        availableSeats: 0,
                        speakers: [],
                        keynoteSessions: [],
                        meetupRegistrations: [],
                        notes: [],
                        reviews: [],
                    },
                    statusCode: response.statusCode || 500,
                    message: response.message || 'Failed to fetch event details',
                };
            },

            getEventById: async (id: string | number): Promise<ApiResponse<MeetupResponse>> => {
                if (!id) {
                    throw new Error('Event ID is required');
                }

                const eventId = id.toString();
                const allEvents = [...upcomingEvents, ...pastEvents];
                const cachedEvent = allEvents.find((event) => event.id === eventId);

                if (cachedEvent && cacheStatus.upcoming.loaded && cacheStatus.past.loaded) {
                    return {
                        data: eventToMeetup(cachedEvent),
                        statusCode: 200,
                        message: 'success',
                    };
                }

                return fetchData<MeetupResponse>({
                    endpoint: `/public/meetups/${id}`,
                    method: 'GET',
                });
            },

            meetupToEvent,
            eventToMeetup,

            clearCache: () => {
                setUpcomingEvents([]);
                setPastEvents([]);
                setEventDetailsCache({});
                setCacheStatus({
                    upcoming: { loaded: false, lastFetch: null },
                    past: { loaded: false, lastFetch: null },
                });
            },

            /* here we force refresh ( as we ignore the cache) */
            forceRefresh: async (type?: 'upcoming' | 'past') => {
                if (type) {
                    setCacheStatus((prev) => ({
                        ...prev,
                        [type]: { loaded: false, lastFetch: null },
                    }));
                } else {
                    setCacheStatus({
                        upcoming: { loaded: false, lastFetch: null },
                        past: { loaded: false, lastFetch: null },
                    });
                    setEventDetailsCache({});
                }
            },
        }),
        [
            fetchData,
            upcomingEvents,
            pastEvents,
            cacheStatus,
            eventDetailsCache,
            setUpcomingEvents,
            setPastEvents,
            setCacheStatus,
            setEventDetailsCache,
        ],
    );
};
