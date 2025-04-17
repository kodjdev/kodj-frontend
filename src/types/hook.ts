// Types
export type MeetupResponse = {
  id: number;
  title: string;
  description: string;
  parking: boolean;
  location: string;
  maxSeats: number;
  provided: string;
  meetupDate: string; // "yyyy-MM-dd"
  organizerId: number;
  startTime: string; // "yyyy-MM-dd HH:mm:ss"
  endTime: string; // "yyyy-MM-dd HH:mm:ss"
  imageName: string;
  imageURL: string;
};

export type PageResponse<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type ApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
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
  type?: "upcoming" | "past" | "ongoing";
  id?: number;
  onSuccess?: (data: PageResponse<MeetupResponse> | MeetupResponse) => void;
  onError?: (error: unknown) => void;
};
