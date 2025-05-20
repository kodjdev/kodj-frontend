import kodjLogo from '@/static/icons/kodj_new.jpg';
import workShop from '@/static/icons/logo.png';
import work from '@/static/icons/rocket.jpg';

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

export const sampleNews: NewsItem[] = [
    {
        id: '1',
        title: "KO'DJ web safihasi ishga tushdi",
        content:
            "We're excited to announce the launch of our new website! Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        news_type: 'TECH',
        image_url: kodjLogo,
        created_at: '2025-05-12T10:00:00Z',
        user_id: 1,
        contact_email: 'info@kodj.dev',
        tags: ['programming', 'development', 'ai'],
        read_time: 5,
    },
    {
        id: '2',
        title: 'Upcoming AI Workshop in Tashkent',
        content:
            'Join us for a hands-on machine learning workshop next month. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        news_type: 'MEETUP',
        image_url: workShop,
        created_at: '2025-05-20T14:30:00Z',
        user_id: 2,
        contact_email: 'workshops@kodj.dev',
        tags: ['workshop', 'AI', 'Tashkent'],
        read_time: 3,
    },
    {
        id: '3',
        title: 'Developer Networking Event',
        content:
            'Connect with fellow developers at our monthly social gathering. Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        news_type: 'SOCIAL',
        image_url: work,
        created_at: '2025-06-05T18:00:00Z',
        user_id: 3,
        contact_email: 'events@kodj.dev',
        tags: ['networking', 'developers', 'social'],
        read_time: 4,
    },
];
