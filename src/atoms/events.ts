import { EventTimeline, Speaker } from "@/types";
import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type Event = {
  speakerId?: string;
  id: string;
  title: string;
  description: string;
  date: Timestamp;
  location: string;
  eventRoom: string;
  images: string[];
  author: string;
  parking: boolean;
  seats: string;
  snacks?: boolean;
  imageUrl?: string;
  imageUrls: string[];
  speakers?: Speaker[];
  schedule?: EventTimeline[];
  maxSeats?: number;
  registeredCount?: number;
};

export const pastEventsAtom = atom<Event[]>({
  key: "pastEventsAtom",
  default: [],
});

export const upcomingEventsAtom = atom<Event[]>({
  key: "upcomingEventsAtom",
  default: [],
});
