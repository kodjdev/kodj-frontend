import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Calendar, ArrowLeft, Timer, Twitter, LinkedinIcon } from 'lucide-react';
import themeColors from '@/tools/themeColors';
import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import { useRecoilState } from 'recoil';
import errorAtom from '@/atoms/errors';
import useFormatDate from '@/hooks/useFormatDate';
import CopyLink from '@/components/CopyLink/CopyLink';
import { NewsItem } from '@/types/news';
import useApiService from '@/services';
import PageLoading from '@/components/Loading/LoadingAnimation';
import defaultImg from '@/static/icons/default.jpg';

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
    background-color: #1e1e1e;
    border-radius: 16px;
    padding: ${themeColors.spacing.lg};
    border: 1px solid ${themeColors.cardBorder.color};
    margin-bottom: ${themeColors.spacing.xl};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: ${themeColors.spacing.md};
        margin-bottom: ${themeColors.spacing.lg};
`;

const ArticleHeader = styled.div`
    margin-bottom: ${themeColors.spacing.xl};
`;

const ArticleTitle = styled.h1`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.headings.desktop.h2.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h2.fontWeight};
    margin-bottom: ${themeColors.spacing.md};
    margin-top: 0;
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

const ReadTimeShow = styled.span`
    display: inline-flex;
    align-items: center;
    gap: ${themeColors.spacing.xs};
    background-color: rgba(5, 124, 204, 0.1);
    color: ${themeColors.colors.primary.main};
    padding: ${themeColors.spacing.xs} ${themeColors.spacing.sm};
    border-radius: ${themeColors.radiusSizes.xl};
    font-size: ${themeColors.typography.body.small.fontSize}px;
`;

const ArticleImage = styled.div`
    width: 100%;
    height: 450px;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: ${themeColors.spacing.xl};
    background-color: #111;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        height: 200px;
        margin-bottom: ${themeColors.spacing.lg};
        border-radius: 8px;
        overflow: hidden;

        img {
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 0;
        }
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
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        flex-direction: column;
        align-items: flex-start;
        gap: ${themeColors.spacing.md};
    }
`;

const ShareButtons = styled.div`
    display: flex;
    gap: ${themeColors.spacing.md};
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        width: 100%;
        justify-content: flex-start;
    }
`;

const ShareButton = styled(Button)`
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.xs};
    padding: 6px 12px;
    border-radius: 4px;
    background-color: transparent !important;
    border: none;
    transition: color 0.2s ease;
    border: 1px solid ${themeColors.cardBorder.color};
    border-radius: ${themeColors.radiusSizes.xl};

    &:hover {
        background-color: transparent !important;
        color: ${themeColors.colors.primary.main} !important;
    }

    svg {
        stroke-width: 1.5px;
    }
`;

const ReadNextSection = styled.div`
    margin-top: ${themeColors.spacing.xl};
`;

const ReadNextHeader = styled.h3`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.headings.desktop.h3.fontSize}px;
    margin-bottom: ${themeColors.spacing.lg};
`;

const RelatedNewsCard = styled(Card)`
    border-radius: 12px;
    background-color: #1e1e1e;
    cursor: pointer;

    &:hover {
        transform: translateY(-2px);
        transition: all 0.2s ease;
    }
`;

const NewsCardLink = styled(Link)`
    text-decoration: none;
    color: inherit;
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
    const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);

    const [newsError, setNewsError] = useRecoilState(errorAtom);
    const newsService = useApiService();

    const { formatDate } = useFormatDate();

    useEffect(() => {
        let isMounted = true;

        const fetchNewsItem = async () => {
            if (!id) {
                if (isMounted) {
                    setNewsError({
                        title: 'Invalid Article ID',
                        message: 'The article ID provided is invalid.',
                        record: null,
                    });
                }
                return;
            }

            if (isMounted) setLoading(true);

            try {
                const response = await newsService.getNewsById(id);

                if (!isMounted) return;

                if (response.statusCode === 200 && response.data) {
                    const newsData = response.data.data;
                    setNewsItem(newsData);
                    setNewsError(null);
                } else {
                    setNewsError({
                        title: 'Article Not Found',
                        message: 'The news article you requested could not be found.',
                        record: id || null,
                    });
                }
            } catch (error) {
                console.error('Error loading news item:', error);
                if (isMounted) {
                    setNewsError({
                        title: 'Error Loading Article',
                        message: 'There was a problem loading this article. Please try again.',
                        record: id || null,
                    });
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchNewsItem();

        return () => {
            isMounted = false;
        };
    }, [id]);

    useEffect(() => {
        if (newsItem && newsItem.type) {
            const fetchRelatedNews = async () => {
                try {
                    const response = await newsService.getAllNews(newsItem.type);
                    if (response.statusCode === 200 && response.data && response.data.data.content) {
                        const filtered = response.data.data.content
                            .filter((news) => news.id.toString() !== id)
                            .slice(0, 5);
                        setRelatedNews(filtered);
                    }
                } catch (error) {
                    console.error('Error fetching related news:', error);
                }
            };

            fetchRelatedNews();
        }
    }, [newsItem?.id, newsItem?.type, id]);

    if (loading) {
        return <PageLoading message="Loading details.." />;
    }

    if (newsError || !newsItem) {
        return (
            <Container>
                <BackLink to="/news">
                    <ArrowLeft size={16} /> Back to news
                </BackLink>
                <Article>
                    <ArticleHeader>
                        <ArticleTitle>{newsError?.title || 'Error'}</ArticleTitle>
                        <ArticleContent>
                            <p>{newsError?.message}</p>
                        </ArticleContent>
                    </ArticleHeader>
                </Article>
            </Container>
        );
    }

    const shareOnTwitter = () => {
        const text = `Check out this article: ${newsItem.title}`;
        const url = window.location.href;
        window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            '_blank',
        );
    };

    const shareOnLinkedIn = () => {
        const url = window.location.href;
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
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
                            <Calendar
                                size={14}
                                style={{
                                    paddingRight: '4px',
                                }}
                            />
                            {formatDate(newsItem.createdAt)}
                        </MetaItem>
                        <ReadTimeShow>
                            <Timer
                                size={14}
                                style={{
                                    paddingRight: '4px',
                                }}
                            />
                            {newsItem.read_time ? `${newsItem.read_time} min read` : '3 min read'}
                        </ReadTimeShow>
                    </ArticleMeta>
                </ArticleHeader>
                <ArticleImage>
                    {newsItem.imageURL ? (
                        <img src={newsItem.imageURL} alt={newsItem.title} />
                    ) : (
                        <img
                            src={defaultImg}
                            alt="KO'DJ"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    )}
                </ArticleImage>

                <ArticleContent>
                    <p>
                        {(() => {
                            if (!newsItem.content) {
                                return 'No content available for this article.';
                            }

                            if (newsItem.content.length > 100) {
                                const sentences = newsItem.content.split('.');
                                const firstPart = sentences.slice(0, 2).join('.') + '.';
                                const secondPart = sentences.slice(2).join('.').trim();

                                return (
                                    <>
                                        {firstPart}
                                        <br />
                                        <br />
                                        {secondPart}
                                    </>
                                );
                            }

                            return newsItem.content;
                        })()}
                    </p>
                </ArticleContent>
                <ShareSection>
                    <ShareButtons>
                        <ShareButton variant="text" size="sm">
                            <CopyLink url={window.location.href} iconSize={19} showText={false} />
                        </ShareButton>
                        <ShareButton variant="text" size="sm" onClick={shareOnTwitter}>
                            <Twitter size={19} />
                        </ShareButton>
                        <ShareButton variant="text" size="sm" onClick={shareOnLinkedIn}>
                            <LinkedinIcon size={19} />
                        </ShareButton>
                    </ShareButtons>
                </ShareSection>
            </Article>

            {/* <NewsComments articleId={id || ''} /> */}

            {relatedNews.length > 0 && (
                <ReadNextSection>
                    <ReadNextHeader>Related Articles</ReadNextHeader>
                    {relatedNews.map((article) => (
                        <NewsCardLink key={article.id} to={`/news/${article.id}`}>
                            <RelatedNewsCard padding="1rem" style={{ marginBottom: '1rem' }}>
                                <h3 style={{ color: themeColors.colors.neutral.white, marginBottom: '0.5rem' }}>
                                    {article.title}
                                </h3>
                                <p style={{ color: themeColors.colors.gray.text }}>
                                    {article.content.substring(0, 150)}...
                                </p>
                            </RelatedNewsCard>
                        </NewsCardLink>
                    ))}
                </ReadNextSection>
            )}
        </Container>
    );
}
