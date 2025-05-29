import { EventDetails } from '.';

type RegistrationStatus = 'confirmed' | 'pending' | 'waitlist';
type SpeakerStatus = 'confirmed' | 'pending';

export type EventRegistrationData = {
    eventId: string;
    userId: string;
    attendeeCount?: number;
    notes?: string;
};

export type SpeakerRegistrationData = {
    name: string;
    bio: string;
    topic: string;
    eventId: string;
    presentationUrl?: string;
};

export type EventRegistrationResponse = {
    registrationId: string;
    eventId: string;
    status: RegistrationStatus;
};

export type SpeakerRegistrationResponse = {
    speakerId: string;
    eventId: string;
    status: SpeakerStatus;
};

export type UserData = {
    name?: string;
    email: string;
    password?: string;
    avatar?: File;
    bio?: string;
    role?: 'user' | 'admin' | 'speaker';
    returnUrl?: string;
    eventDetails?: EventDetails;
};

export type UserDetails = {
    data: {
        id: string;
        name?: string;
        email: string;
        avatar?: string;
        bio?: string;
        role: 'user' | 'admin' | 'speaker';
        createdAt: string;
        providerId?: string;
        username: string;
        phone: string;
        oauthId?: string;
        oauthProvider: string;
        firstName?: string;
        lastName?: string;
        imageUrl?: string;
        imageName?: string;
        region?: string;
        provider: string;
        category: string;
    };
};

export type UserCount = {
    total: number;
    active: number;
};
