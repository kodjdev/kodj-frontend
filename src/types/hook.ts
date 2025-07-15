export type MeetupResponse = {
    id: number;
    title: string;
    description: string;
    parking: boolean;
    location: string;
    maxSeats: number;
    availableSeats: number;
    provided: string;
    meetupDate: string;
    organizerId: number;
    startTime: string;
    endTime: string;
    imageName: string;
    imageURL: string;
};

export type PageResponse<T> = {
    data: {
        content: T[];
    };
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
};

export type PaginationState = {
    totalPages: number;
    totalElements: number;
    currentPage: number;
    size: number;
    isFirst: boolean;
    isLast: boolean;
    isEmpty: boolean;
};

export type UseFetchEventsOptions = {
    page?: number;
    size?: number;
    type?: 'upcoming' | 'past' | 'ongoing';
    id?: number;
    onSuccess?: (data: PageResponse<MeetupResponse> | MeetupResponse) => void;
    onError?: (error: unknown) => void;
};

export type FormatOptions = {
    locale?: string;
    year?: 'numeric' | '2-digit';
    month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
    day?: 'numeric' | '2-digit';
    hour?: 'numeric' | '2-digit';
    minute?: 'numeric' | '2-digit';
    second?: 'numeric' | '2-digit';
    weekday?: 'long' | 'short' | 'narrow';
    timeZoneName?: 'long' | 'short';
};
