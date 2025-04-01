

interface Timestamp {
  toDate(): Date | undefined;
  seconds: number;
  nanoseconds: number;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}


export interface Event {
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
  eventRoom?: string,
  parking?: boolean,
  seats?: string
  isUpcoming?: boolean;
  registeredCount?: number;
  isPlaceholder?: boolean;
}

export interface EventDetails {
  title: string;
  date: {
    seconds: number;
    nanoseconds: number;
  };
  eventLocation: string;
}

export interface UpcomingEventsRegistration {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  event: Event[];
}

export interface EventForServer {
  speakerId?: string;
  id: string;
  title: string;
  headerTitle?: string,
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
}

export interface RegistrationFormData {
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
}

export interface SpeakerRegistration {
  email: string;
  fullname: string;
  jobPosition: string;
  expertiseField: string;
  phone: string;
  topics: string,
  portfolioUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  yearsOfExperience: string;
}

export interface PastEventDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export interface NewsItem {
  id: string;
  uniqueId?: string;
  category?: string;
  title: string;
  author?: string;
  images?: string[];
  description?: string;
  lastEdited: Timestamp;
}

export interface Speaker {
  id?: string;
  category?: string;
  date?: Timestamp;
  linkedinUrl: string;
  name: string;
  position: string;
  speakerImg: string;
}

export interface EventTimeline {
  eventId: string;
  speakerName?: string;
  category: string;
  companyName: string;
  endTime: Timestamp;
  startTime: Timestamp;
  location: string;
  speakerId: number;
  subject: string;
}

export interface FormattedDateTime {
  date: string;
  time: string;
}

export interface FirebaseTimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface EventCardProps {
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
}

export interface StatisticsProps {
  speakerCount: number;
  meetupData: Array<{ date: string; value: number }>;
  currentUsers: number;
  maxUsers: number;
}
