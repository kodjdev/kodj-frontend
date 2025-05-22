export type NewsItem = {
    id: string;
    title: string;
    content: string;
    image_name?: string;
    image_url?: string;
    news_type: 'TECH' | 'MEETUP' | 'SOCIAL';
    contact_phone?: string;
    contact_email?: string;
    twitter_profile?: string;
    linkedin_profile?: string;
    facebook_profile?: string;
    instagram_handle?: string;
    created_at: string;
    user_id?: number;
    category_id?: number;
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
