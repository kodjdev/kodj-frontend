import { Timestamp } from "firebase/firestore";

export interface Event {
    id: number | string;
    title: string;
    description?: string;
    date?: string | Timestamp;
    location?: string;
    author?: string;
    images?: string[];
    imageUrl?: string[] | string;
    events?: string;
}

export interface EventDetails {
    title: string;
    date: string;
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
    speakerId?: string,
    id: string;
    title: string;
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
}

export interface RegistrationFormData {
    id?: string;
    firstname: string;
    lastname: string;
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
    lastEdited?: Timestamp; 
  }

  export interface Speaker {
    id?: string,
    category?: string,
    date?: Timestamp,
    expertises: string[],
    linkedinUrl: string,
    name: string,
    position: string,
    speakerImg: string,
    speakersId: string
  }

  export interface EventTimeline {
    eventId: string,
    speakerName?: string,
    category: string,
    companyName: string,
    endTime: Timestamp,
    startTime:Timestamp,
    location: string,
    speakerId: number,
    subject: string
  }

  export interface FormattedDateTime  {
    date: string;
    time: string;
  };