import { NewsItem } from '@/types/news';
import { atom } from 'recoil';

export const techNewsAtom = atom<NewsItem[]>({
    key: 'techNewsAtom',
    default: [],
});

export const meetupNewsAtom = atom<NewsItem[]>({
    key: 'meetupNewsAtom',
    default: [],
});

export const socialNewsAtom = atom<NewsItem[]>({
    key: 'socialNewsAtom',
    default: [],
});

export const newsCacheStatusAtom = atom<{
    TECH: { loaded: boolean; lastFetch: number | null };
    MEETUP: { loaded: boolean; lastFetch: number | null };
    SOCIAL: { loaded: boolean; lastFetch: number | null };
}>({
    key: 'newsCacheStatusAtom',
    default: {
        TECH: { loaded: false, lastFetch: null },
        MEETUP: { loaded: false, lastFetch: null },
        SOCIAL: { loaded: false, lastFetch: null },
    },
});

export const newsDetailsAtom = atom<Record<string, { data: NewsItem; lastFetch: number }>>({
    key: 'newsDetailsAtom',
    default: {},
});
