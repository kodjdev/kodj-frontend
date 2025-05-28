export type ApiResponse<T = unknown> = {
    data: T;
    message?: string;
    statusCode?: number;
    access_token?: string;
    refresh_token?: string;
};

export type RequestData = Record<string, unknown> | string | FormData | null | undefined;

export type FetchOption<TResponseData = unknown> = {
    endpoint: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: RequestData;
    customHeaders?: Record<string, string>;
    onError?: (error: unknown) => void;
    onSuccess?: (data: ApiResponse<TResponseData>) => void;
    formData?: boolean;
};

export type LoginCredentials = {
    email: string;
    password: string;
};

export type RegisterFormData = {
    email: string;
    password: string;
    username: string;
    name: string;
    phone: string;
};

export type PaginatedResponse<T> = {
    content: T[];
    pageable: {
        pageNumber: number;
        pageSize: number;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        offset: number;
        paged: boolean;
        unpaged: boolean;
    };
    totalElements: number;
    totalPages: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
};
