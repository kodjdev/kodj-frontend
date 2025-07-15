import { FilterTypes } from '@/pages/News';
import { UserDetails } from '@/types/user';

export type NewsItem = {
    id: number;
    title: string;
    content: string;
    imageName?: string;
    imageURL?: string;
    type: FilterTypes;
    contactPhone?: string;
    contactEmail?: string;
    twitterProfile?: string;
    linkedinProfile?: string;
    facebookProfile?: string;
    instagramHandle?: string;
    createdAt: string;
    user?: UserDetails;
    tags?: string[];
    read_time?: number;
};

export type CommentData = {
    id: number;
    repliedUsername?: string;
    username: string;
    avatarURL?: string;
    comment: string;
    likes: number;
    dislikes: number;
    replies: number;
    createdAt: string;
};

export type CommentRequest = {
    articleId: string;
    text: string;
    repliedUsername?: string;
};

export type LikeOrDislikeResponse = {
    success: boolean;
    message: string;
    likes?: number;
    dislikes?: number;
};
