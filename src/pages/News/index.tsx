import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronRight, Calendar, User } from 'lucide-react';
import themeColors from '@/tools/themeColors';
import Card from '@/components/Card/Card';
import { NewsItem, sampleNews } from '@/pages/News/fakeData';
import useApiService from '@/services';

const Container = styled.div`
    max-width: ${themeColors.breakpoints.desktop};
    margin: 0 auto;
    padding-bottom: ${themeColors.spacing.fourXl};
`;

const NewsHeader = styled.div`
    margin-bottom: ${themeColors.spacing.xl};
`;

const NewsTitle = styled.h1`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.headings.desktop.h1.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h1.fontWeight};
    margin-bottom: ${themeColors.spacing.md};
`;

const CategoryTabs = styled.div`
    display: flex;
    gap: ${themeColors.spacing.md};
    margin-bottom: ${themeColors.spacing.xl};
`;

const CategoryTab = styled.button<{ isActive: boolean }>`
    background: transparent;
    border: none;
    border-bottom: 2px solid ${(props) => (props.isActive ? themeColors.colors.primary.main : 'transparent')};
    color: ${(props) => (props.isActive ? themeColors.colors.primary.main : themeColors.colors.gray.main)};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    padding: ${themeColors.spacing.xs} ${themeColors.spacing.sm};
    margin-bottom: 20px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        color: ${themeColors.colors.primary.hover};
    }
`;

const NewsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: ${themeColors.spacing.lg};

    @media (min-width: ${themeColors.breakpoints.tablet}) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: ${themeColors.breakpoints.laptop}) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const NewsCard = styled(Card)`
    height: 100%;
    max-height: 420px;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease;

    &:hover {
        transform: translateY(-5px);
    }
`;

const NewsImage = styled.div`
    height: 180px;
    margin: -24px -24px 16px -24px;
    border-radius: 8px 8px 0 0;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const NewsCardTitle = styled.h3`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.headings.desktop.h4.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h4.fontWeight};
    margin: 0 0 ${themeColors.spacing.sm} 0;
`;

const NewsCardMeta = styled.div`
    display: flex;
    gap: ${themeColors.spacing.md};
    margin-bottom: ${themeColors.spacing.sm};
    color: ${themeColors.colors.gray.main};
    font-size: ${themeColors.typography.body.small.fontSize}px;
`;

const MetaItem = styled.div`
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.xs};
`;

const NewsCardContent = styled.p`
    color: ${themeColors.colors.gray.text};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    flex-grow: 0;
`;

const ReadMoreLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    color: ${themeColors.colors.primary.main};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    text-decoration: none;
    margin-left: auto;
    margin-top: ${themeColors.spacing.sm};
    transition: color 0.2s ease;

    &:hover {
        color: ${themeColors.colors.primary.hover};
    }

    svg {
        margin-left: ${themeColors.spacing.xs};
    }
`;

export default function NewsList() {
    const [activeCategory, setActiveCategory] = useState<'all' | 'TECH' | 'MEETUP' | 'SOCIAL'>('all');
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const newsService = useApiService();

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                let response;
                if (activeCategory === 'all') {
                    response = await newsService.getAllNews();
                } else {
                    response = await newsService.getAllNews(activeCategory);
                }

                if (response.statusCode === 200 && response.data) {
                    setNews(response.data);
                }
                if (response.statusCode === 200 && response.data) {
                    setNews(response.data);
                }
                // as of now for demo purpose, later i will remove it since we handle in api service
                else if (response.statusCode === 403) {
                    console.warn('Access forbidden (403), using fallback data');
                    if (activeCategory === 'all') {
                        setNews(sampleNews);
                    } else {
                        setNews(sampleNews.filter((news) => news.news_type === activeCategory));
                    }
                } else {
                    throw new Error(`API returned status ${response.statusCode}: ${response.message}`);
                }
            } catch (error) {
                console.error('API not implemented yet, using fallback data:', error);
                if (activeCategory === 'all') {
                    setNews(sampleNews);
                } else {
                    setNews(sampleNews.filter((news) => news.news_type === activeCategory));
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <Container>
            <NewsHeader>
                <NewsTitle>News</NewsTitle>
                <CategoryTabs>
                    <CategoryTab isActive={activeCategory === 'all'} onClick={() => setActiveCategory('all')}>
                        all
                    </CategoryTab>
                    <CategoryTab isActive={activeCategory === 'TECH'} onClick={() => setActiveCategory('TECH')}>
                        tech
                    </CategoryTab>
                    <CategoryTab isActive={activeCategory === 'MEETUP'} onClick={() => setActiveCategory('MEETUP')}>
                        meetup
                    </CategoryTab>
                    <CategoryTab isActive={activeCategory === 'SOCIAL'} onClick={() => setActiveCategory('SOCIAL')}>
                        social
                    </CategoryTab>
                </CategoryTabs>
            </NewsHeader>

            <NewsGrid>
                {loading ? (
                    <div>Loading...</div>
                ) : news.length > 0 ? (
                    news.map((newsItem) => (
                        <NewsCard key={newsItem.id} backgroundColor="#161616" hoverEffect={false}>
                            {newsItem.image_url && (
                                <NewsImage>
                                    <img src={newsItem.image_url} alt={newsItem.title} />
                                </NewsImage>
                            )}
                            <NewsCardTitle>{newsItem.title}</NewsCardTitle>
                            <NewsCardMeta>
                                <MetaItem>
                                    <Calendar size={14} />
                                    {formatDate(newsItem.created_at)}
                                </MetaItem>
                                <MetaItem>
                                    <User size={14} />
                                    {newsItem.contact_email?.split('@')[0] || "KO'DJ Team"}
                                </MetaItem>
                            </NewsCardMeta>

                            <NewsCardContent>{newsItem.content.substring(0, 100)}...</NewsCardContent>
                            <ReadMoreLink to={`/news/${newsItem.id}`}>
                                Read more <ChevronRight size={16} />
                            </ReadMoreLink>
                        </NewsCard>
                    ))
                ) : (
                    <div>No news found.</div>
                )}
            </NewsGrid>
        </Container>
    );
}
