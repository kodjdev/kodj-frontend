import { Event, EventDetailsResponse } from '@/types/event';
import { atom } from 'recoil';

export const pastEventsAtom = atom<Event[]>({
    key: 'pastEventsAtom',
    default: [],
});

export const upcomingEventsAtom = atom<Event[]>({
    key: 'upcomingEventsAtom',
    default: [],
});

export const eventsCacheStatusAtom = atom<{
    upcoming: { loaded: boolean; lastFetch: number | null };
    past: { loaded: boolean; lastFetch: number | null };
}>({
    key: 'eventsCacheStatusAtom',
    default: {
        upcoming: { loaded: false, lastFetch: null },
        past: { loaded: false, lastFetch: null },
    },
});

export const eventDetailsAtom = atom<Record<string, { data: EventDetailsResponse; lastFetch: number }>>({
    key: 'eventDetailsAtom',
    default: {},
});
