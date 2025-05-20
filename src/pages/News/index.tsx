import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Calendar, Bookmark, MessageSquare, ThumbsUp, Link2, CheckCircle } from 'lucide-react';
import themeColors from '@/tools/themeColors';
import Card from '@/components/Card/Card';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { NewsItem, sampleNews } from '@/pages/News/fakeData';
import useApiService from '@/services';
import useFormatDate from '@/hooks/useFormatDate';
import { FaSearch } from 'react-icons/fa';

type TagVariant = 'default' | 'programming' | 'ai' | 'development';
type FilterTypes = 'TECH' | 'MEETUP' | 'SOCIAL';

const TAG_VARIANT_MAP: Record<string, TagVariant> = {
    programming: 'programming',
    ai: 'ai',
    development: 'development',
};

const Container = styled.div`
    max-width: ${themeColors.breakpoints.desktop};
    margin: 0 auto;
    padding-top: ${themeColors.spacing.xl};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: 0 ${themeColors.spacing.sm};
        padding-top: ${themeColors.spacing.md};
    }
`;

const SearchContainer = styled.div`
    margin-top: ${themeColors.spacing.md};
    margin-bottom: ${themeColors.spacing.xl};
    display: flex;
    flex-direction: column;
    gap: ${themeColors.spacing.md};

    @media (min-width: ${themeColors.breakpoints.mobile}) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
`;

const CategoryFilters = styled.div`
    display: flex;
    gap: ${themeColors.spacing.md};
    flex-wrap: wrap;
    margin-bottom: ${themeColors.spacing.xs};
    justify-content: flex-start;
`;

const FilterButton = styled(Button)<{ isActive: boolean }>`
    background-color: ${(props) => (props.isActive ? themeColors.white : 'transparent')}!important;
    color: ${(props) => (props.isActive ? themeColors.colors.neutral.black : themeColors.colors.gray.main)} !important;
    border: 1px solid ${themeColors.cardBorder.color};
    border-radius: ${themeColors.radiusSizes.two_xl};
    padding: 6px 10px;
    height: auto;
    font-size: ${themeColors.typography.body.small.fontSize}px;
    font-weight: ${themeColors.font16.lineHeight};
    text-transform: none;
    outline: none !important;
    box-shadow: none !important;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.body.xsmall.fontSize}px;
        padding: 3px 6px !important;
    }
`;

const SearchBar = styled.div`
    width: 100%;
    max-width: 100%;
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    @media (min-width: ${themeColors.breakpoints.mobile}) {
        max-width: 300px;
        margin-left: auto;
    }
`;

const NewsGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${themeColors.spacing.xl};
    padding-bottom: ${themeColors.spacing.xxl};
`;

const NewsCard = styled(Card)`
    border-radius: 16px;
    overflow: hidden;
    background-color: #161616;
    border: none;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        flex-direction: column;
        gap: ${themeColors.spacing.sm};
        padding: ${themeColors.spacing.xs};
    }
`;

const NewsCardContent = styled.div`
    display: flex;
    gap: ${themeColors.spacing.xl};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: ${themeColors.spacing.md};
        flex-direction: column-reverse;
    }
`;

const NewsCardMain = styled.div`
    flex: 1;
`;

const NewsCardImage = styled.div`
    width: 300px;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;
    background-color: #111;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        width: 100%;
        height: 160px;
        margin-bottom: ${themeColors.spacing.md};
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const NewsTitle = styled.h2`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.headings.desktop.h3.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h3.fontWeight};
    margin-bottom: ${themeColors.spacing.md};
    line-height: 1.4;
    margin-top: 0;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        margin-bottom: ${themeColors.spacing.sm};
        font-size: 20px;
        line-height: 1.4;
        letter-spacing: -0.05em;
        padding-right: 0;
        word-break: break-word;
        overflow-wrap: break-word;
    }
`;

const NewsDescription = styled.p`
    color: ${themeColors.colors.gray.text};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    margin-bottom: ${themeColors.spacing.sm};
    line-height: 1.6;
`;

const NewsCardMeta = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${themeColors.spacing.lg};
    color: ${themeColors.colors.gray.main};
    font-size: ${themeColors.typography.body.small.fontSize}px;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        flex-direction: column;
        align-items: flex-start;
        gap: ${themeColors.spacing.md};
    }
`;

const MetaItem = styled.div`
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.xs};
    align-self: center;

    svg {
        margin-right: ${themeColors.spacing.xs};
        margin-top: -2px;
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        width: 100%;
        justify-content: flex-start;
    }
`;
const TagList = styled.div`
    display: flex;
    gap: ${themeColors.spacing.xs};
    margin-bottom: ${themeColors.spacing.md};
    flex-wrap: wrap;
`;

const Tag = styled.span<{
    variant?: TagVariant;
}>`
    padding: ${themeColors.spacing.xs} ${themeColors.spacing.sm};
    border-radius: 50px;
    font-size: ${themeColors.typography.body.small.fontSize}px;
    font-weight: 500;
    font-size: 12px;
    display: inline-block;
    margin-right: ${themeColors.spacing.xs};
    margin-bottom: ${themeColors.spacing.xs};

    ${(props) => {
        switch (props.variant) {
            case 'programming':
                return css`
                    background-color: ${themeColors.colors.tags.programming.background};
                    color: ${themeColors.colors.tags.programming.text};
                `;
            case 'ai':
                return css`
                    background-color: ${themeColors.colors.tags.ai.background};
                    color: ${themeColors.colors.tags.ai.text};
                `;
            case 'development':
                return css`
                    background-color: ${themeColors.colors.tags.development.background};
                    color: ${themeColors.colors.tags.development.text};
                `;
            default:
                return css`
                    background-color: ${themeColors.colors.tags.grayDefault.background};
                    color: ${themeColors.colors.gray.main};
                `;
        }
    }}

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.body.xsmall.fontSize}px;
        padding: 3px 5px;
    }
`;

const InteractionButton = styled.button`
    background: transparent;
    border: none;
    color: ${themeColors.colors.gray.main};
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.xs};
    cursor: pointer;
    font-size: ${themeColors.typography.body.small.fontSize}px;

    &:hover {
        color: ${themeColors.colors.primary.main};
    }
`;

const NewsCardLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    display: block;
    flex: 1;
    border-radius: 17px;
    overflow: hidden;

    &:hover {
        background-color: ${themeColors.colors.gray.inputTag};
        box-shadow: 0 2px 8px ${themeColors.colors.gray.inputTag};
        transform: translateY(-2px);
        transition: all 0.2s ease;
    }
    &:active {
        background-color: ${themeColors.colors.gray.inputTag};
        box-shadow: 0 2px 10px ${themeColors.colors.gray.inputTag};
        transform: translateY(0);
        transition: all 0.2s ease;
    }
`;

const ReadTimeText = styled.span`
    color: ${themeColors.colors.gray.main};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    margin-left: ${themeColors.spacing.md};
`;

const ShareButton = styled.button`
    background: transparent;
    color: ${themeColors.colors.gray.main};
    cursor: pointer;
    font-size: ${themeColors.typography.body.small.fontSize}px;
    border: none;
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.xs};
    padding: 0;

    &:hover {
        color: ${themeColors.colors.primary.main};
    }
`;

const CopyNotification = styled.div`
    position: fixed;
    top: 4rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${themeColors.colors.ui.dimmed};
    color: white;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 4px 10px ${themeColors.shadow_purple_input_inset};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    z-index: 1000;
    animation:
        fadeIn 0.3s,
        fadeOut 0.3s 1.7s;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translate(-50%, -10px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translate(-50%, 0);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -10px);
        }
    }
`;

/**
 * NewsList Component - Root Page Component
 * This component displays a list of news articles with filtering and search functionality.
 * It allows users to filter by category (Tech, Meetup, Social) and search by title or content.
 * It also provides a "Load More" button to load additional articles and a notification for copying the link.
 * @param {string} activeCategory - The currently selected category (Tech, Meetup, Social).
 * @param {Array<NewsItem>} news - The list of news articles.
 * @param {string | null} activeTag - The currently selected tag for filtering.
 */
export default function NewsList() {
    const [activeCategory, setActiveCategory] = useState<FilterTypes>('TECH');
    const [news, setNews] = useState<Array<NewsItem>>([]);
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [visibleCount, setVisibleCount] = useState(4);
    const [hasMore, setHasMore] = useState(true);

    const [showCopyNotification, setShowCopyNotification] = useState(false);

    const { formatDate } = useFormatDate();
    const newsService = useApiService();

    const filteredNews = news.filter((newsItem) => {
        const matchesSearch =
            newsItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            newsItem.content.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesTag = !activeTag || (newsItem.tags && newsItem.tags.includes(activeTag));

        return matchesSearch && matchesTag;
    });

    const visibleNews = filteredNews.slice(0, visibleCount);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                // const response = await newsService.getAllNews(activeCategory);

                // if (response.statusCode === 200 && response.data) {
                //     setNews(response.data);
                // } else {

                // as of now for test purposes we just use the  sample news
                const fallbackData =
                    activeCategory === 'TECH'
                        ? sampleNews
                        : sampleNews.filter((news) => news.news_type === activeCategory);

                setNews(fallbackData);
                // }
            } catch (error) {
                // fallback to sample news for any error
                const fallbackData =
                    activeCategory === 'TECH'
                        ? sampleNews
                        : sampleNews.filter((news) => news.news_type === activeCategory);

                console.error('Error fetching news, using fallback:', error);
                setNews(fallbackData);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [activeCategory, newsService]);

    useEffect(() => {
        setVisibleCount(3);
        setHasMore(filteredNews.length > 3);
    }, [activeCategory, activeTag, searchTerm, filteredNews.length]);

    const handleLoadMore = () => {
        const newCount = visibleCount + 3;
        setVisibleCount(newCount);

        if (newCount >= filteredNews.length) {
            setHasMore(false);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleCopyLink = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(window.location.href);
        setShowCopyNotification(true);
        setTimeout(() => setShowCopyNotification(false), 2000);
    };

    return (
        <Container>
            <SearchContainer>
                <CategoryFilters>
                    <FilterButton
                        isActive={activeCategory === 'TECH' && !activeTag}
                        onClick={() => {
                            setActiveCategory('TECH');
                            setActiveTag(null);
                        }}
                    >
                        All
                    </FilterButton>
                    <FilterButton
                        isActive={activeCategory === 'MEETUP' && !activeTag}
                        onClick={() => {
                            setActiveCategory('MEETUP');
                            setActiveTag(null);
                        }}
                    >
                        Meetup
                    </FilterButton>
                    <FilterButton
                        isActive={activeCategory === 'SOCIAL' && !activeTag}
                        onClick={() => {
                            setActiveCategory('SOCIAL');
                            setActiveTag(null);
                        }}
                    >
                        Social
                    </FilterButton>
                </CategoryFilters>
                <SearchBar>
                    <Input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearch}
                        icon={<FaSearch size={16} />}
                        iconPosition="left"
                        hideIconOnFocus={false}
                        fullWidth
                        customStyles={{
                            backgroundColor: 'transparent',
                            border: `1px solid ${themeColors.cardBorder.color}`,
                            borderRadius: '30px',
                            height: '32px',
                            fontSize: '14px',
                            padding: '0 38px',
                        }}
                    />
                </SearchBar>
            </SearchContainer>

            <NewsGrid>
                {loading ? (
                    <div>Loading...</div>
                ) : filteredNews.length > 0 ? (
                    <>
                        {visibleNews.map((newsItem) => (
                            <NewsCardLink key={newsItem.id} to={`/news/${newsItem.id}`}>
                                <NewsCard key={newsItem.id}>
                                    <NewsCardContent>
                                        <NewsCardMain>
                                            <NewsTitle>{newsItem.title}</NewsTitle>

                                            <TagList>
                                                {newsItem.tags?.map((tag, index) => (
                                                    <Tag
                                                        key={`${newsItem.id}-tag-${index}`}
                                                        variant={TAG_VARIANT_MAP[tag.toLowerCase()] || 'default'}
                                                    >
                                                        {tag}
                                                    </Tag>
                                                )) || (
                                                    <>
                                                        <Tag variant="default">JavaScript</Tag>
                                                        <Tag variant="default">Frontend</Tag>
                                                        <Tag variant="programming">Programming</Tag>
                                                    </>
                                                )}
                                            </TagList>
                                            <NewsDescription>{newsItem.content.substring(0, 150)}...</NewsDescription>

                                            <NewsCardMeta>
                                                <MetaItem>
                                                    <Calendar
                                                        size={14}
                                                        style={{
                                                            paddingLeft: '2px',
                                                            borderRadius: '50%',
                                                        }}
                                                    />
                                                    {formatDate(newsItem.created_at) || '2025.05.18'}

                                                    <ReadTimeText>3 min read</ReadTimeText>
                                                </MetaItem>
                                                <div style={{ display: 'flex', gap: themeColors.spacing.sm }}>
                                                    <InteractionButton>
                                                        <ShareButton onClick={handleCopyLink}>
                                                            <Link2 size={20} />
                                                        </ShareButton>
                                                    </InteractionButton>
                                                    <InteractionButton>
                                                        <Bookmark size={16} />
                                                    </InteractionButton>
                                                    <InteractionButton>
                                                        <MessageSquare size={16} />
                                                        <span>5</span>
                                                    </InteractionButton>
                                                    <InteractionButton>
                                                        <ThumbsUp size={16} />
                                                        <span>100</span>
                                                    </InteractionButton>
                                                </div>
                                            </NewsCardMeta>
                                        </NewsCardMain>

                                        <NewsCardImage>
                                            {newsItem.image_url ? (
                                                <img
                                                    src={newsItem.image_url}
                                                    alt={newsItem.title}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <img src="/api/placeholder/300/200" alt="KO'DJ" />
                                            )}
                                        </NewsCardImage>
                                    </NewsCardContent>
                                </NewsCard>
                            </NewsCardLink>
                        ))}
                        {hasMore && (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    gap: themeColors.spacing.sm,
                                    marginTop: themeColors.spacing.sm,
                                }}
                            >
                                <Button size="sm" variant="signOut" fullWidth={false} onClick={handleLoadMore}>
                                    Load More ...
                                </Button>
                            </div>
                        )}
                        {showCopyNotification && (
                            <CopyNotification>
                                <CheckCircle size={16} color="#4BB543" />
                                Link copied to clipboard
                            </CopyNotification>
                        )}
                    </>
                ) : (
                    <div>No news found.</div>
                )}
            </NewsGrid>
        </Container>
    );
}
