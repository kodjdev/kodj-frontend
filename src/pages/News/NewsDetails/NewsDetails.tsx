import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Calendar, ArrowLeft, Timer, Twitter, LinkedinIcon } from 'lucide-react';
import themeColors from '@/tools/themeColors';
import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import { useRecoilState, useRecoilValue } from 'recoil';
import errorAtom from '@/atoms/errors';
import useFormatDate from '@/hooks/useFormatDate';
import CopyLink from '@/components/CopyLink/CopyLink';
import { NewsItem } from '@/types/news';
import useApiService from '@/services';
import PageLoading from '@/components/Loading/LoadingAnimation';
import defaultImg from '@/static/icons/default.jpg';
import { newsCacheStatusAtom, techNewsAtom } from '@/atoms/news';
import { AnimatePresence, motion } from 'framer-motion';
import { FilterTypes } from '..';

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
    border-radius: 16px;
    padding: 0;
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
    font-size: ${themeColors.typography.headings.desktop.h3.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h2.fontWeight};
    margin-bottom: ${themeColors.spacing.md};
    margin-top: 0;
    line-height: 1.3;
    width: 100%;
    max-width: 100%;
    word-wrap: break-word;
    hyphens: auto;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: 24px;
        font-weight: 600;
        line-height: 1.4;
        margin-bottom: ${themeColors.spacing.sm};
        margin-top: 0;
        padding-right: 0;
        width: 100%;
        max-width: 100%;
    }

    @media (max-width: 480px) {
        font-size: 22px;
        line-height: 1.3;
    }
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
    cursor: pointer;
    transition: transform 0.2s ease;
    border-radius: 12px;
    border: 1px solid ${themeColors.cardBorder.color};

    &:hover {
        transform: scale(1.006);
    }

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

const NewsCardLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;
const RelatedNewsCard = styled(Card)`
    padding: ${themeColors.spacing.lg};
    margin-bottom: 1rem;
    display: flex;
    gap: ${themeColors.spacing.lg};
    align-items: flex-start;
    background-color: #161616;
    border: 1px solid ${themeColors.cardBorder.color};
    border-radius: 12px;
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        flex-direction: column;
        gap: ${themeColors.spacing.md};
        padding: ${themeColors.spacing.md};
    }
`;

const RelatedNewsContent = styled.div`
    flex: 1;
    min-width: 0;
`;

const RelatedNewsTitle = styled.h3`
    color: ${themeColors.colors.neutral.white};
    margin-bottom: ${themeColors.spacing.sm};
    margin-top: 0;
    font-size: ${themeColors.typography.headings.desktop.h4.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h4.fontWeight};
    line-height: 1.4;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: 18px;
        -webkit-line-clamp: 3;
    }
`;

const RelatedNewsDescription = styled.p`
    color: ${themeColors.colors.gray.text};
    margin: 0;
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    line-height: 1.5;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.body.small.fontSize}px;
        -webkit-line-clamp: 2;
    }
`;

const RelatedNewsImage = styled.div`
    width: 140px;
    height: 90px;
    border-radius: 8px;
    overflow: hidden;
    background-color: #111;
    flex-shrink: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        max-width: 100%;
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        width: 100%;
        height: 120px;
    }
`;

const ImageModal = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: ${themeColors.spacing.lg};
    cursor: pointer;
`;

const ModalImage = styled(motion.img)`
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background: ${themeColors.colors.ui.dimmed};
    border: none;
    color: white;
    font-size: 24px;
    width: 30px;
    height: 40px;
    border-radius: 20%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
    transition: background 0.2s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;

/**
 * NewsDetail Component - Page Component
 * @description Displays detailed view of a single news article.
 * Fetches the specific news item by ID from the API or falls back to sample data if needed.
 * Handles loading states and error cases with Recoil for global error management.
 */
export default function NewsDetails() {
    const allNews = useRecoilValue(techNewsAtom);
    const cacheStatus = useRecoilValue(newsCacheStatusAtom);
    const [newsError, setNewsError] = useRecoilState(errorAtom);
    const newsService = useApiService();
    const { formatDate } = useFormatDate();

    const hasFetched = useRef(false);
    const relatedHasFetched = useRef(false);
    const { id } = useParams<{ id: string }>();

    const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);
    const [showImageModal, setShowImageModal] = useState(false);

    useEffect(() => {
        hasFetched.current = false;
        relatedHasFetched.current = false;
        setLoading(true);
        setNewsItem(null);
        setRelatedNews([]);
        setShowImageModal(false);
        setNewsError(null);
    }, [id]);

    useEffect(() => {
        if (hasFetched.current || !id) return;
        hasFetched.current = true;

        const fetchNewsItem = async () => {
            try {
                setLoading(true);

                /* here we first ensure we have all news cached */
                const techCacheInfo = cacheStatus.TECH;
                if (!techCacheInfo.loaded && !relatedHasFetched.current) {
                    await newsService.getAllNews(FilterTypes.TECH);
                    relatedHasFetched.current = true;
                }

                const response = await newsService.getNewsById(id);

                if (response.statusCode === 200 && response.data) {
                    const newsData = response.data;
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
                setNewsError({
                    title: 'Error Loading Article',
                    message: 'There was a problem loading this article. Please try again.',
                    record: id || null,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchNewsItem();
    }, [id, cacheStatus, setNewsError]);

    useEffect(() => {
        const getRelatedNews = () => {
            if (!newsItem || allNews.length === 0) {
                setRelatedNews([]);
                return;
            }

            const filtered = allNews.filter((news) => news.id !== newsItem.id).slice(0, 5);
            setRelatedNews(filtered);
        };

        getRelatedNews();
    }, [newsItem, allNews]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setShowImageModal(false);
            }
        };

        if (showImageModal) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [showImageModal]);

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
                <ArticleImage onClick={() => setShowImageModal(true)}>
                    {newsItem.imageURL ? (
                        <img src={newsItem.imageURL} alt={newsItem.title} />
                    ) : (
                        <img
                            src={defaultImg}
                            alt="Default news image"
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
                    <ReadNextHeader>Related Articles:</ReadNextHeader>
                    {relatedNews.map((article) => (
                        <NewsCardLink key={article.id} to={`/news/${article.id}`}>
                            <RelatedNewsCard>
                                <RelatedNewsContent>
                                    <RelatedNewsTitle>{article.title}</RelatedNewsTitle>
                                    <RelatedNewsDescription>
                                        {article.content.substring(0, 150)}...
                                    </RelatedNewsDescription>
                                </RelatedNewsContent>
                                <RelatedNewsImage>
                                    {article.imageURL ? (
                                        <img src={article.imageURL} alt={article.title} />
                                    ) : (
                                        <img src={defaultImg} alt="KO'DJ" />
                                    )}
                                </RelatedNewsImage>
                            </RelatedNewsCard>
                        </NewsCardLink>
                    ))}
                </ReadNextSection>
            )}
            <AnimatePresence>
                {showImageModal && (
                    <ImageModal
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setShowImageModal(false)}
                    >
                        <CloseButton onClick={() => setShowImageModal(false)}>×</CloseButton>
                        <ModalImage
                            src={newsItem?.imageURL || defaultImg}
                            alt={newsItem?.title || 'News image'}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </ImageModal>
                )}
            </AnimatePresence>
        </Container>
    );
}
