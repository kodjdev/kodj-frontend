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
    isFreeEvent?: boolean;
    subtitle?: string;
    speakers?: Speaker[];
    eventSchedule?: KeynoteSession[];
    parking?: boolean;
};

export type EventDetailsResponse = {
    availableSeats: number;
    speakers: Speaker[];
    keynoteSessions: KeynoteSession[];
    meetupRegistrations: MeetupRegistration[];
    notes: Note[];
    reviews: Review[];
};

export type EventDetailsApiWrapper = {
    message: string;
    data: EventDetailsResponse;
    statusCode: number;
};
