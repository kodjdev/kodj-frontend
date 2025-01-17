import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type Event = {
    id: number | string;
    title: string;
    description?: string;
    date?: string | Timestamp;
    location?: string;
    author?: string;
    images?: string[];
    imageUrl?: string[] | string;
    events?: string;
    docId?: string;
    maxSeats?: number;
  }

export const pastEventsAtom = atom<Event[]> ({
    key: "pastEventsAtom",
    default: []
})

export const upcomingEventsAtom = atom<Event[]>({
    key: "upcomingEventsAtom",
    default: []
})