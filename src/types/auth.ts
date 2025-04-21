import { Timestamp } from 'firebase/firestore';

export type User = {
    id: string;
    email: string;
    isAdmin?: boolean;
    username?: string;
};
export type AuthType = {
    accessToken?: string | null;
    refreshToken?: string | null;
    user?: User | null;
};

export type CustomUserProps = User & {
    createdAt?: Timestamp;
    displayName?: string;
};
