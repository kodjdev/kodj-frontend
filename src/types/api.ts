import { MediaType, MeetupRegistrationStatus, NoteStatus } from './enums';
import { Speaker } from './speakers';

export type KeynoteSession = {
    id: number;
    speaker: Speaker;
    subject: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    imageName: string;
    imageURL: string;
};

export type MeetupRegistration = {
    id: number;
    firstName: string;
    lastName: string;
    avatarURL: string;
    status: MeetupRegistrationStatus;
    // cancelled: boolean;
    attendanceReason: string;
    expectation: string;
    interestField: string;
    createdAt: string;
};

export type Note = {
    id: number;
    status: NoteStatus;
    title: string;
    description: string;
    createdAt: string;
};

export type Media = {
    id: number;
    url: string;
    name: string;
    mediaType: MediaType;
    createdAt: string;
};

export type Review = {
    id: number;
    username: string;
    avatarURL: string;
    description: string;
    createdAt: string;
    media: Media[];
};
