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
        name: 'Alisher Usmanov',
        role: 'Senior Java Developer at Naver',
        feedback:
            "The KO'DJ AI & ML meetup was a game-changer for my career. The practical demonstrations of TensorFlow integration with Java backends gave me actionable knowledge I've already implemented at work. Looking forward to the next one!",
        avatar: undefined,
    },
    {
        id: '2',
        name: 'Lee Jiwon',
        role: 'Full Stack Developer',
        feedback:
            'As someone new to the Uzbek-Korean tech community, I felt incredibly welcomed. The bilingual format made technical content accessible, and I made valuable connections with developers working on similar cross-platform challenges.',
        avatar: undefined,
    },
    {
        id: '3',
        name: 'Dilfuza Rakhimova',
        role: 'DevOps Engineer at LG CNS',
        feedback:
            "The cloud infrastructure workshop hosted by KO'DJ was exactly what our team needed. The hands-on approach to CI/CD pipelines with practical examples solved problems we'd been struggling with for months. Excellent organization!",
        avatar: undefined,
    },
    {
        id: '4',
        name: 'Kim Minho',
        role: 'Startup Founder',
        feedback:
            'Attending the startup ecosystem meetup helped me connect with talented Uzbek developers. We ended up collaborating on our fintech project, bringing diverse perspectives that significantly improved our product. These meetups create real opportunities.',
        avatar: undefined,
    },
    {
        id: '5',
        name: 'Sardor Turakulov',
        role: 'Frontend Lead at Kakao',
        feedback:
            'The React performance optimization session was outstanding. The speaker shared advanced techniques beyond the typical advice, and the code examples were immediately useful. The Q&A session afterward addressed specific challenges many of us face daily.',
        avatar: undefined,
    },
    {
        id: '6',
        name: 'Park Jiyoung',
        role: 'AI Research Scientist',
        feedback:
            "KO'DJ's deep learning workshop provided a perfect balance of theory and application. The collaborative atmosphere encouraged cross-cultural exchange of ideas on ethical AI development. I've since joined their Telegram community for ongoing discussions.",
        avatar: undefined,
    },
    {
        id: '7',
        name: 'Aziz Karimov',
        role: 'iOS Developer at Coupang',
        feedback:
            'The mobile development meetup exceeded my expectations. Learning about Swift UI from experienced developers who shared their production challenges helped me avoid potential pitfalls in my own projects. The networking session afterward was equally valuable.',
        avatar: undefined,
    },
    {
        id: '8',
        name: 'Song Minseo',
        role: 'UX Research Lead',
        feedback:
            'The design systems workshop fostered genuine collaboration between designers and developers from both countries. I appreciated how the facilitators addressed cultural differences in user expectations, something often overlooked in international product development.',
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
