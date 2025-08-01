import { Speaker } from './speakers';

export type Timestamp = {
    toDate(): Date | undefined;
    seconds: number;
    nanoseconds: number;
};

export type BaseEvent = {
    id: string;
    title: string;
    description?: string;
    location?: string;
    author?: string;
    eventRoom?: string;
    parking?: boolean;
    maxSeats?: number;
    availableSeats?: number;
    registeredCount?: number;
    isFreeEvent?: boolean;
    time?: string;
    speakers?: Speaker[];
};

export type Event = BaseEvent & {
    date: string | Timestamp | { seconds: number } | null;
    images?: string[];
    imageUrl?: string;
    events?: string;
    docId?: string;
    imageUrls: string[];
    seats?: string;
    isUpcoming?: boolean;
    isPlaceholder?: boolean;
    description?: string;
};

export type EventForServer = BaseEvent & {
    speakerId?: string;
    headerTitle?: string;
    date?: string;
    images: string[];
    eventRoom: string;
    parking: boolean;
    seats: string;
    snacks?: boolean;
    imageUrl?: string;
    imageUrls: string[];
    speakers?: Speaker[];
    schedule?: EventTimeline[];
    rawDate?: Date;
};

export type EventDetails = {
    id: string;
    title: string;
    location?: string;
    imageUrl?: string;
    author?: string;
    eventRoom?: string;
    date: {
        seconds: number;
        nanoseconds: number;
    };
    eventLocation: string;
    description?: string;
};

export type EventCardProps = Pick<
    Event,
    | 'id'
    | 'title'
    | 'description'
    | 'author'
    | 'imageUrl'
    | 'isPlaceholder'
    | 'isUpcoming'
    | 'registeredCount'
    | 'maxSeats'
> & {
    date?: string | { seconds: number };
};

export type EventTimeline = {
    eventId: string;
    speakerName?: string;
    category: string;
    companyName: string;
    endTime: Timestamp;
    startTime: Timestamp;
    location: string;
    speakerId: number;
    subject: string;
};

export type BaseRegistration = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
};

export type UpcomingEventsRegistration = BaseRegistration & {
    id?: number;
    event: Event[];
};

export type RegistrationFormData = {
    attendanceReason: string;
    interestField: string;
    expectation: string;
    consent?: boolean;
};

export type SpeakerRegistration = {
    email: string;
    fullname: string;
    jobPosition: string;
    expertiseField: string;
    phone: string;
    topics: string;
    portfolioUrl: string;
    githubUrl: string;
    linkedinUrl: string;
    yearsOfExperience: string;
};

export type HeaderProps = {
    handleLangChange: (lang: string) => void;
    currentLang: string;
    langMenuOpen: boolean;
    toggleLangMenu: () => void;
    isAuthenticated: boolean;
    langMenuRef?: React.RefObject<HTMLDivElement>;
};

export type JobFormData = {
    title: string;
    companyName: string;
    location: string;
    contactEmail: string;
    contactPhone: string;
    deadline: string;
    category: string;
    workplaceType: string;
    jobType: string;
    experience: string;
    offerStatus: string;
    salaryRange: string;
    positions: string;
    description: string;
    companyTags: string[];
    techTags: string[];
    companyLogo?: File;
    companyPictures?: File[];
    socialAccounts?: {
        linkedin: string;
        instagram: string;
        twitter: string;
        facebook: string;
    };
};

export enum JobPostingStep {
    BASIC_INFO = 'basicInfo',
    COMPANY_DETAILS = 'companyDetails',
}
