export type Speaker = {
    id: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    organization?: string;
    position?: string;
    bio?: string;
    shortDescription?: string;
    experience?: string;
    topic: string;
    linkedinUrl?: string;
    imageName?: string;
    imageURL: string;
    category?: string;
    createdAt?: string;
};

export type SpeakerRegistrationData = {
    firstName: string;
    lastName: string;
    organization?: string;
    position?: string;
    bio?: string;
    shortDescription?: string;
    experience?: string;
    topic: string;
    linkedinUrl?: string;
    image?: File;
    category?: string;
};

export type SpeakerRegistrationResponse = {
    id: number;
};
