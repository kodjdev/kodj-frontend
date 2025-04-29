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

export type ApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
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
    name: string;
    email: string;
    password?: string;
    avatar?: File;
    bio?: string;
    role?: 'user' | 'admin' | 'speaker';
};

export type UserDetails = {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
    role: 'user' | 'admin' | 'speaker';
    createdAt: string;
};

export type UserCount = {
    total: number;
    active: number;
};
