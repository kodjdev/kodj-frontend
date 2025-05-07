import { KeynoteSession, MeetupRegistration, Note, Review } from './api';
import { Speaker } from './speakers';

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
};

// export type EventDetailsResponse = {
//     availableSeats: number;
//     speakers: Speaker[];
//     keynoteSessions: KeynoteSession[];
//     meetupRegistrations: MeetupRegistration[];
//     notes: Note[];
//     reviews: Review[];
// };

export type EventDetailsResponseData = {
    availableSeats: number;
    speakers: Speaker[];
    keynoteSessions: KeynoteSession[];
    meetupRegistrations: MeetupRegistration[];
    notes: Note[];
    reviews: Review[];
};

export type EventDetailsResponse = {
    message: string;
    data: EventDetailsResponseData;
    statusCode: number;
};
