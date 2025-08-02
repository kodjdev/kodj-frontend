import { KeynoteSession, MeetupRegistration, Note, Review } from '@/types/api';
import { Speaker } from '@/types/speakers';

export type UserRegisteredEventsResponse = {
    upcomingEvents: Event[];
    pastEvents: Event[];
};

export type Event = {
    id: string;
    title: string;
    description: string | string[];
    date: string | { seconds: number } | null;
    time?: string;
    location?: string;
    author?: string;
    imageUrl?: string;
    registeredCount?: number;
    maxSeats?: number;
    provided?: string;
    startTime?: string;
    endTime?: string;
    availableSeats?: number;
    isFreeEvent?: boolean;
    subtitle?: string;
    speakers?: Speaker[];
    eventSchedule?: KeynoteSession[];
    parking?: boolean;
    eventRoom?: string;
};

export type EventDetailsResponse = {
    availableSeats: number;
    speakers: Speaker[];
    keynoteSessions: KeynoteSession[];
    meetupRegistrations: MeetupRegistration[];
    notes: Note[];
    reviews: Review[];
    provided?: string;
    title: string;
    location: string;
    description: string;
    parking: boolean;
    maxSeats: number;
    startTime: string;
    endTime: string;
    imageName: string;
    imageURL: string;
    meetupDate: string;
};

export type EventDetailsApiWrapper = {
    message: string;
    data: EventDetailsResponse;
    statusCode: number;
};

export type UserRegisteredEventApiResponse = {
    id: number;
    title: string;
    description: string;
    parking: boolean;
    location: string;
    maxSeats: number;
    availableSeats: number;
    provided: string;
    meetupDate: string;
    organizerId: number;
    startTime: string;
    endTime: string;
    registrationTime: string;
    imageName: string;
    imageURL: string;
    cancelled: boolean;
};

export type UserRegisteredEventsListResponse = UserRegisteredEventApiResponse[];
