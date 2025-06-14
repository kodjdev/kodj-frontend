import FeedbackSlider from '@/components/Feedback/FeedbackSlider';
import themeColors from '@/tools/themeColors';
import { useState, useEffect } from 'react';

type FeedbackData = {
    id: string;
    name: string;
    role: string;
    feedback: string;
    avatar?: string;
};

type ApiResponse<T> = {
    statusCode: number;
    data?: T;
    message?: string;
};

const mockFeedbackData: FeedbackData[] = [
    {
        id: '1',
        name: 'Alli',
        role: 'Java developer',
        feedback:
            'I recently attended the IT meet-up, and it was an incredible experience. The sessions were highly informative in AI. The speakers were knowledgeable and provided practical insights that I can apply to my projects.',
        avatar: undefined,
    },
    {
        id: '2',
        name: 'Alli',
        role: 'Java developer',
        feedback:
            'I recently attended the IT meet-up, and it was an incredible experience. The sessions were highly informative in AI. The speakers were knowledgeable and provided practical insights that I can apply to my projects.',
        avatar: undefined,
    },
    {
        id: '3',
        name: 'Alli',
        role: 'Java developer',
        feedback:
            'I recently attended the IT meet-up, and it was an incredible experience. The sessions were highly informative in AI. The speakers were knowledgeable and provided practical insights that I can apply to my projects.',
        avatar: undefined,
    },
    {
        id: '4',
        name: 'Alli',
        role: 'Java developer',
        feedback:
            'I recently attended the IT meet-up, and it was an incredible experience. The sessions were highly informative in AI. The speakers were knowledgeable and provided practical insights that I can apply to my projects.',
        avatar: undefined,
    },
    {
        id: '5',
        name: 'Sardor',
        role: 'Frontend Developer',
        feedback:
            'The networking opportunities were fantastic. I connected with like-minded professionals and learned about the latest trends in web development. Highly recommend these meetups!',
        avatar: undefined,
    },
    {
        id: '6',
        name: 'Dilshod',
        role: 'Data Scientist',
        feedback:
            'Amazing event! The machine learning workshop was particularly insightful. The organizers did a great job bringing together experts from different fields.',
        avatar: undefined,
    },
    {
        id: '7',
        name: 'Aziz',
        role: 'Mobile Developer',
        feedback:
            'Great meetup with excellent speakers. I learned new approaches to mobile app development and got inspired by the innovative projects shared during the event.',
        avatar: undefined,
    },
    {
        id: '8',
        name: 'Nodira',
        role: 'UX Designer',
        feedback:
            'The design thinking session was eye-opening. It helped me understand how to better collaborate with developers and create more user-centered products.',
        avatar: undefined,
    },
];

export default function Feedbacks() {
    const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchFeedbacks = async (): Promise<ApiResponse<FeedbackData[]>> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    statusCode: 200,
                    data: mockFeedbackData,
                    message: 'Feedbacks fetched successfully',
                });
            }, 1000);
        });
    };

    useEffect(() => {
        const loadFeedbacks = async () => {
            try {
                setLoading(true);

                const response = await fetchFeedbacks();

                if (response.statusCode === 200 && response.data) {
                    setFeedbacks(response.data);
                } else {
                    setFeedbacks(mockFeedbackData);
                }
            } catch (err) {
                setFeedbacks(mockFeedbackData);
                console.warn('Feedback API error:', err);
            } finally {
                setLoading(false);
            }
        };

        loadFeedbacks();
    }, []);

    if (loading && feedbacks.length === 0) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '400px',
                    color: themeColors.white,
                }}
            >
                Loading feedbacks...
            </div>
        );
    }

    return (
        <FeedbackSlider
            feedbacks={feedbacks}
            title="Participants' Feedback About the Meet-Ups"
            autoPlay={true}
            speed={30}
        />
    );
}
