export type Timestamp = {
    toDate(): Date | undefined;
    seconds: number;
    nanoseconds: number;
};

export type User = {
    id: string;
    email: string;
    name?: string;
    role?: string;
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
    registeredCount?: number;
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
};

export type EventForServer = BaseEvent & {
    speakerId?: string;
    headerTitle?: string;
    date: Timestamp;
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
    title: string;
    date: {
        seconds: number;
        nanoseconds: number;
    };
    eventLocation: string;
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

export type RegistrationFormData = BaseRegistration & {
    id?: string;
    jobTitle: string;
    eventDetails: EventDetails;
    experience: string;
    notify: string;
    consent: boolean;
    interestedField: string;
    hopes: string;
    additionalInfo: string;
    eventId: string;
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

export type Speaker = {
    id?: string;
    category?: string;
    date?: Timestamp;
    linkedinUrl: string;
    name: string;
    position: string;
    speakerImg: string;
};

export type NewsItem = {
    id: string;
    uniqueId?: string;
    category?: string;
    title: string;
    author?: string;
    images?: string[];
    description?: string;
    lastEdited: Timestamp;
};

export type HeaderProps = {
    handleLangChange: (lang: string) => void;
    currentLang: string;
    langMenuOpen: boolean;
    toggleLangMenu: () => void;
};

export type PastEventDetailsProps = {
    params: Promise<{
        id: string;
    }>;
};

export type FormattedDateTime = {
    date: string;
    time: string;
};

export type StatisticsProps = {
    speakerCount: number;
    meetupData: Array<{ date: string; value: number }>;
    currentUsers: number;
    maxUsers: number;
};
