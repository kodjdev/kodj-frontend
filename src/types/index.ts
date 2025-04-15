import { type } from "os";

export type HeaderProps = {
  handleLangChange: (lang: string) => void;
  currentLang: string;
  langMenuOpen: boolean;
  toggleLangMenu: () => void;
};

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

export type Event = {
  id: string;
  title: string;
  description?: string;
  date: string | Timestamp | { seconds: number } | null;
  location?: string;
  author?: string;
  images?: string[];
  imageUrl?: string;
  events?: string;
  docId?: string;
  maxSeats?: number;
  imageUrls: string[];
  eventRoom?: string;
  parking?: boolean;
  seats?: string;
  isUpcoming?: boolean;
  registeredCount?: number;
  isPlaceholder?: boolean;
};

export type EventDetails = {
  title: string;
  date: {
    seconds: number;
    nanoseconds: number;
  };
  eventLocation: string;
};

export type UpcomingEventsRegistration = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  event: Event[];
};

export type EventForServer = {
  speakerId?: string;
  id: string;
  title: string;
  headerTitle?: string;
  description: string;
  date: Timestamp;
  location: string;
  eventRoom: string;
  images: string[];
  author: string;
  parking: boolean;
  seats: string;
  snacks?: boolean;
  imageUrl?: string;
  imageUrls: string[];
  speakers?: Speaker[];
  schedule?: EventTimeline[];
  maxSeats?: number;
  registeredCount?: number;
  rawDate?: Date;
};

export type RegistrationFormData = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
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

export type PastEventDetailsProps = {
  params: Promise<{
    id: string;
  }>;
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

export type Speaker = {
  id?: string;
  category?: string;
  date?: Timestamp;
  linkedinUrl: string;
  name: string;
  position: string;
  speakerImg: string;
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

export type FormattedDateTime = {
  date: string;
  time: string;
};

export type FirebaseTimestamp = {
  seconds: number;
  nanoseconds: number;
};

export type EventCardProps = {
  id?: string;
  title?: string;
  description?: string;
  date?: string | { seconds: number };
  author?: string;
  imageUrl?: string;
  isPlaceholder?: boolean;
  isUpcoming?: boolean;
  registeredCount?: number;
  maxSeats?: number;
};

export type StatisticsProps = {
  speakerCount: number;
  meetupData: Array<{ date: string; value: number }>;
  currentUsers: number;
  maxUsers: number;
};
