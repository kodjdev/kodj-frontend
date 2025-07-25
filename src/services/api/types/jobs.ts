export type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP';
export type JobOfferStatus = 'OPEN' | 'CLOSED' | 'FILLED' | 'PENDING';
export type Region = 'Seoul' | 'Busan' | 'Incheon' | 'Daegu' | 'Daejeon' | 'Gwangju' | 'Ulsan' | 'Suwon';

export type User = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    oauthProvider: string;
    imageUrl: string;
    imageName: string;
    region: Region;
    bio: string;
    createdAt: string;
};

export type JobPost = {
    id: number;
    user: User;
    category: string;
    title: string;
    content: string;
    companyName: string;
    requiredExperience: string;
    technologies: string;
    jobOfferStatus: JobOfferStatus;
    jobType: JobType;
    jobBenefits: string;
    remote: boolean;
    placeOfWork: string;
    salaryRange: string;
    contactPhone: string;
    contactEmail: string;
    twitterProfile?: string;
    linkedinProfile?: string;
    facebookProfile?: string;
    instagramProfile?: string;
    createdAt: string;
    imageName?: string;
    imageURL?: string;
};

export type Sort = {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
};

export type Pageable = {
    offset: number;
    sort: Sort;
    pageSize: number;
    paged: boolean;
    pageNumber: number;
    unpaged: boolean;
};

export type JobsListResponse = {
    totalElements: number;
    totalPages: number;
    size: number;
    content: JobPost[];
    number: number;
    sort: Sort;
    numberOfElements: number;
    pageable: Pageable;
    first: boolean;
    type: JobType | null | string;
    last: boolean;
    empty: boolean;
};

export type JobsApiResponse = {
    message: string;
    data: JobsListResponse;
    statusCode: number;
};

// export type JobDetailsApiResponse = {
//     message: string;
//     data: JobPost;
//     statusCode: number;
// };

export type JobsQueryParams = {
    category?: string;
    jobType?: JobType;
    signal?: AbortSignal;
    jobOfferStatus?: JobOfferStatus;
    page?: number;
    size?: number;
    sort?: string;
};

export type JobDetailsData = {
    id: string;
    title: string;
    company: string;
    location: string;
    salary?: string;
    jobType?: string;
    deadline?: string;
    isRemote?: boolean;
    isUrgent?: boolean;
    postedDate: string;
    companyPhone?: string;
    companyEmail?: string;
    companyUrl?: string;
    fullDescription: string;
    requirements?: string[];
    technologies?: string;
    benefits?: string[];
    companyDescription?: string;
    skills?: string[];
    companyWebsite?: string;
    user?: {
        firstName?: string;
        lastName?: string;
        bio?: string;
        jobOfferStatus?: string;
    };
};
