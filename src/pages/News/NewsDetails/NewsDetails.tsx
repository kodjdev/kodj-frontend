import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import themeColors from '@/tools/themeColors';
import Button from '@/components/Button/Button';
import { NewsItem, sampleNews } from '@/pages/News/fakeData';
import useApiService from '@/services';
import { useRecoilState } from 'recoil';
import errorAtom from '@/atoms/errors';
import useFormatDate from '@/hooks/useFormatDate';

const Container = styled.div`
    max-width: ${themeColors.breakpoints.desktop};
    margin: 0 auto;
    padding-bottom: ${themeColors.spacing.fourXl};
`;

const BackLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    color: ${themeColors.colors.gray.main};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    text-decoration: none;
    margin-bottom: ${themeColors.spacing.lg};
    transition: color 0.2s ease;

    &:hover {
        color: ${themeColors.colors.primary.main};
    }

    svg {
        margin-right: ${themeColors.spacing.xs};
    }
`;

const Article = styled.article`
    background-color: #161616;
    border-radius: 8px;
    padding: ${themeColors.spacing.xl};
    border: 1px solid ${themeColors.cardBorder.color};
`;

const ArticleHeader = styled.div`
    margin-bottom: ${themeColors.spacing.xl};
`;

const ArticleTitle = styled.h1`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.headings.desktop.h2.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h2.fontWeight};
    margin-bottom: ${themeColors.spacing.md};
`;

const ArticleMeta = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${themeColors.spacing.md};
    color: ${themeColors.colors.gray.main};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    margin-bottom: ${themeColors.spacing.lg};
`;

const MetaItem = styled.div`
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.xs};
`;

const CategoryBadge = styled.span`
    display: inline-flex;
    align-items: center;
    gap: ${themeColors.spacing.xs};
    background-color: rgba(5, 124, 204, 0.1);
    color: ${themeColors.colors.primary.main};
    padding: ${themeColors.spacing.xs} ${themeColors.spacing.sm};
    border-radius: 4px;
    font-size: ${themeColors.typography.body.small.fontSize}px;
`;

const ArticleImage = styled.div`
    width: 100%;
    max-height: 400px;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: ${themeColors.spacing.xl};

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const ArticleContent = styled.div`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    line-height: 1.8;

    p {
        margin-bottom: ${themeColors.spacing.lg};
    }
`;

const ShareSection = styled.div`
    margin-top: ${themeColors.spacing.xxl};
    padding-top: ${themeColors.spacing.lg};
    border-top: 1px solid ${themeColors.cardBorder.color};
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ShareText = styled.span`
    color: ${themeColors.colors.gray.main};
    font-size: ${themeColors.typography.body.small.fontSize}px;
`;

const ShareButtons = styled.div`
    display: flex;
    gap: ${themeColors.spacing.sm};
`;

/**
 * NewsDetail Component - Page Component
 * @description Displays detailed view of a single news article.
 * Fetches the specific news item by ID from the API or falls back to sample data if needed.
 * Handles loading states and error cases with Recoil for global error management.
 */
export default function NewsDetail() {
    const { id } = useParams<{ id: string }>();
    const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(true);

    const [newsError, setNewsError] = useRecoilState(errorAtom);

    const { formatDate } = useFormatDate();
    const newsService = useApiService();

    useEffect(() => {
        const fetchNewsItem = async () => {
            setLoading(true);
            try {
                if (!id) {
                    throw new Error('News ID is required');
                }

                const response = await newsService.getNewsById(id);

                if (response.statusCode === 200 && response.data) {
                    setNewsItem(response.data);
                } else {
                    throw new Error('Failed to fetch news item');
                }
            } catch (error) {
                console.error('API not implemented yet, using fallback data:', error);

                const fallbackItem = sampleNews.find((news) => news.id === id);

                if (fallbackItem) {
                    setNewsItem(fallbackItem);
                } else {
                    setNewsError({
                        title: 'Article Not Found',
                        message: 'The news article you requested could not be found.',
                        record: id || null,
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNewsItem();

        return () => {
            if (newsError) {
                setNewsError(null);
            }
        };
    }, []);

    if (loading) {
        return (
            <Container>
                <div>Loading...</div>
            </Container>
        );
    }

    if (!newsItem) {
        return (
            <Container>
                <BackLink to="/news">
                    <ArrowLeft size={16} /> Back to news
                </BackLink>
                <div>News article not found.</div>
            </Container>
        );
    }

    const getCategoryLabel = (category: string) => {
        switch (category) {
            case 'TECH':
                return 'Technology';
            case 'MEETUP':
                return 'Meetup';
            case 'SOCIAL':
                return 'Social';
            default:
                return category;
        }
    };

    return (
        <Container>
            <BackLink to="/news">
                <ArrowLeft size={16} /> Back to news
            </BackLink>

            <Article>
                <ArticleHeader>
                    <ArticleTitle>{newsItem.title}</ArticleTitle>
                    <ArticleMeta>
                        <MetaItem>
                            <Calendar size={14} />
                            {formatDate(newsItem.created_at)}
                        </MetaItem>
                        <MetaItem>
                            <User size={14} />
                            {newsItem?.contact_email?.split('@')[0] || "KO'DJ Team"}
                        </MetaItem>
                        <CategoryBadge>
                            <Tag size={14} />
                            {getCategoryLabel(newsItem.news_type)}
                        </CategoryBadge>
                    </ArticleMeta>
                </ArticleHeader>

                {newsItem.image_url && (
                    <ArticleImage>
                        <img src={newsItem.image_url} alt={newsItem.title} />
                    </ArticleImage>
                )}

                <ArticleContent>
                    <p>{newsItem.content}</p>
                </ArticleContent>

                <ShareSection>
                    <ShareText>Share this article:</ShareText>
                    <ShareButtons>
                        {newsItem?.twitter_profile && (
                            <a href={newsItem.twitter_profile} target="_blank" rel="noopener noreferrer">
                                <Button variant="text" size="sm">
                                    Twitter
                                </Button>
                            </a>
                        )}
                        {newsItem?.facebook_profile && (
                            <a href={newsItem.facebook_profile} target="_blank" rel="noopener noreferrer">
                                <Button variant="text" size="sm">
                                    Facebook
                                </Button>
                            </a>
                        )}
                        {newsItem?.linkedin_profile && (
                            <a href={newsItem.linkedin_profile} target="_blank" rel="noopener noreferrer">
                                <Button variant="text" size="sm">
                                    LinkedIn
                                </Button>
                            </a>
                        )}
                        {!newsItem?.twitter_profile && !newsItem?.facebook_profile && !newsItem?.linkedin_profile && (
                            <>
                                <Button variant="text" size="sm">
                                    Twitter
                                </Button>
                                <Button variant="text" size="sm">
                                    Facebook
                                </Button>
                                <Button variant="text" size="sm">
                                    LinkedIn
                                </Button>
                            </>
                        )}
                    </ShareButtons>
                </ShareSection>
            </Article>
        </Container>
    );
}
