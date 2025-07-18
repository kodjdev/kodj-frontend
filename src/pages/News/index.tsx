import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Calendar, Bookmark, MessageSquare, ThumbsUp } from 'lucide-react';
import themeColors from '@/tools/themeColors';
import Card from '@/components/Card/Card';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import useApiService from '@/services';
import useFormatDate from '@/hooks/useFormatDate';
import { FaSearch } from 'react-icons/fa';
import CopyLink from '@/components/CopyLink/CopyLink';
import defaultImg from '@/static/icons/default.jpg';
import PageLoading from '@/components/Loading/LoadingAnimation';
import { useRecoilValue } from 'recoil';
import { meetupNewsAtom, newsCacheStatusAtom, socialNewsAtom, techNewsAtom } from '@/atoms/news';

export type TagVariant = 'default' | 'programming' | 'ai' | 'development';

export enum FilterTypes {
    TECH = 'TECH',
    MEETUP = 'MEETUP',
    SOCIAL = 'SOCIAL',
}

const TAG_VARIANT_MAP: Record<string, TagVariant> = {
    programming: 'programming',
    ai: 'ai',
    development: 'development',
};

const Container = styled.div`
    max-width: ${themeColors.breakpoints.desktop};
    margin: 0 auto;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: 0 ${themeColors.spacing.sm};
        padding-top: ${themeColors.spacing.md};
    }
`;

const SearchContainer = styled.div`
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
    height: 100%;
    align-items: stretch;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: ${themeColors.spacing.md};
        flex-direction: column-reverse;
    }
`;

const NewsCardMain = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 0;
    flex: 1;
    min-width: 0;
`;

const NewsCardImage = styled.div`
    width: 280px;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;
    background-color: #111;
    display: flex;
    align-self: flex-start;
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

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        margin-bottom: ${themeColors.spacing.sm};
        font-size: 20px;
        line-height: 1.4;
        letter-spacing: -0.05em;
        padding-right: 0;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
    const [activeCategory, setActiveCategory] = useState<FilterTypes>(FilterTypes.TECH);
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [visibleCount, setVisibleCount] = useState(4);
    const [hasMore, setHasMore] = useState(true);
    const hasFetched = useRef(false);

    const techNews = useRecoilValue(techNewsAtom);
    const meetupNews = useRecoilValue(meetupNewsAtom);
    const socialNews = useRecoilValue(socialNewsAtom);
    const cacheStatus = useRecoilValue(newsCacheStatusAtom);

    const { formatDate } = useFormatDate();
    const newsService = useApiService();

    const getCurrentNews = () => {
        switch (activeCategory) {
            case FilterTypes.TECH:
                return techNews;
            case FilterTypes.MEETUP:
                return meetupNews;
            case FilterTypes.SOCIAL:
                return socialNews;
            default:
                return [];
        }
    };

    const news = getCurrentNews();

    const filteredNews = news.filter((newsItem) => {
        const matchesSearch =
            newsItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            newsItem.content.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesTag = !activeTag || (newsItem.tags && newsItem.tags.includes(activeTag));

        return matchesSearch && matchesTag;
    });

    const visibleNews = filteredNews.slice(0, visibleCount);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchNews = async () => {
            const cacheInfo = cacheStatus[activeCategory];

            if (cacheInfo.loaded) {
                console.log(`Using cached ${activeCategory} news`);
                return;
            }

            try {
                setLoading(true);
                await newsService.getAllNews(activeCategory);
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [activeCategory]);

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

    return (
        <Container>
            <SearchContainer>
                <CategoryFilters>
                    <FilterButton
                        isActive={activeCategory === 'TECH' && !activeTag}
                        onClick={() => {
                            setActiveCategory(FilterTypes.TECH);
                            setActiveTag(null);
                        }}
                        size="mini"
                    >
                        All
                    </FilterButton>
                    <FilterButton
                        isActive={activeCategory === 'MEETUP' && !activeTag}
                        onClick={() => {
                            setActiveCategory(FilterTypes.MEETUP);
                            setActiveTag(null);
                        }}
                        size="mini"
                    >
                        Meetup
                    </FilterButton>
                    <FilterButton
                        isActive={activeCategory === 'SOCIAL' && !activeTag}
                        onClick={() => {
                            setActiveCategory(FilterTypes.SOCIAL);
                            setActiveTag(null);
                        }}
                        size="mini"
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
                    <PageLoading message="Loading news articles..." />
                ) : filteredNews.length > 0 ? (
                    <>
                        {visibleNews.map((newsItem) => (
                            <NewsCardLink key={newsItem.id} to={`/news/${newsItem.id}`}>
                                {' '}
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
                                            <NewsDescription>{newsItem.content.substring(0, 70)}...</NewsDescription>

                                            <NewsCardMeta>
                                                <MetaItem>
                                                    <Calendar
                                                        size={14}
                                                        style={{
                                                            paddingLeft: '2px',
                                                            borderRadius: '50%',
                                                        }}
                                                    />
                                                    {formatDate(newsItem.createdAt) || '2025.05.18'}

                                                    <ReadTimeText>3 min read</ReadTimeText>
                                                </MetaItem>
                                                <div style={{ display: 'flex', gap: themeColors.spacing.sm }}>
                                                    <InteractionButton>
                                                        <CopyLink
                                                            url={window.location.href}
                                                            iconSize={16}
                                                            showText={false}
                                                        />
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
                                            {newsItem.imageURL ? (
                                                <img
                                                    src={newsItem.imageURL}
                                                    alt={newsItem.title}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <img src={defaultImg} alt="KO'DJ" />
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
                    </>
                ) : (
                    <div>No news found.</div>
                )}
            </NewsGrid>
        </Container>
    );
}
