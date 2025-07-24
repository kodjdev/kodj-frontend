import { meetupNewsAtom, newsCacheStatusAtom, newsDetailsAtom, socialNewsAtom, techNewsAtom } from '@/atoms/news';
import useAxios from '@/hooks/useAxios/useAxios';
import { FilterTypes } from '@/pages/News';
import { ApiResponse, PaginatedResponse } from '@/types/fetch';
import { NewsItem } from '@/types/news';
import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { CACHE_DURATION } from '@/services/api/fetchEventService';

/**
 * News Service - For News Data  Fetching
 * This file contains functions to interact with the news API endpoints.
 * @module useNewsService
 * @description This module provides functions to fetch news data from the API.
 */
export const useFetchNewsService = () => {
    const fetchData = useAxios();
    const [techNews, setTechNews] = useRecoilState(techNewsAtom);
    const [meetupNews, setMeetupNews] = useRecoilState(meetupNewsAtom);
    const [socialNews, setSocialNews] = useRecoilState(socialNewsAtom);

    const [cacheStatus, setCacheStatus] = useRecoilState(newsCacheStatusAtom);
    const [newsDetailsCache, setNewsDetailsCache] = useRecoilState(newsDetailsAtom);

    const isCacheValid = (lastFetch: number | null): boolean => {
        if (!lastFetch) return false;
        return Date.now() - lastFetch < CACHE_DURATION;
    };

    const getNewsAtomByType = (type: FilterTypes) => {
        switch (type) {
            case FilterTypes.TECH:
                return techNews;
            case FilterTypes.MEETUP:
                return meetupNews;
            case FilterTypes.SOCIAL:
                return socialNews;
        }
    };

    const setNewsAtomByType = (type: FilterTypes, data: NewsItem[]) => {
        switch (type) {
            case FilterTypes.TECH:
                setTechNews(data);
                break;
            case FilterTypes.MEETUP:
                setMeetupNews(data);
                break;
            case FilterTypes.SOCIAL:
                setSocialNews(data);
                break;
        }
    };

    const updateNewCache = (response: ApiResponse<PaginatedResponse<NewsItem>>, type: FilterTypes) => {
        const now = Date.now();

        if (response.statusCode === 200 && response.data?.content) {
            const newsItems = response.data?.content;

            if (newsItems && Array.isArray(newsItems)) {
                setNewsAtomByType(type, newsItems);

                setCacheStatus((prev) => ({
                    ...prev,
                    [type]: { loaded: true, lastFetch: now },
                }));

                return;
            } else {
                setNewsAtomByType(type, []);
                setCacheStatus((prev) => ({
                    ...prev,
                    [type]: { loaded: true, lastFetch: now },
                }));
            }
        }
    };

    return useMemo(
        () => ({
            getAllNews: async (newsType?: FilterTypes): Promise<ApiResponse<PaginatedResponse<NewsItem>>> => {
                const type = newsType || FilterTypes.TECH;
                const cacheInfo = cacheStatus[type];

                if (cacheInfo.loaded && isCacheValid(cacheInfo.lastFetch)) {
                    const cachedNews = getNewsAtomByType(type);

                    const paginationData: PaginatedResponse<NewsItem> = {
                        content: cachedNews,
                        totalElements: cachedNews.length,
                        totalPages: 1,
                        size: cachedNews.length,
                        number: 0,
                        first: true,
                        last: true,
                        empty: cachedNews.length === 0,
                        numberOfElements: cachedNews.length,
                        pageAble: {
                            pageNumber: 0,
                            pageSize: cachedNews.length,
                            sort: { empty: true, sorted: false, unsorted: true },
                            offset: 0,
                            paged: true,
                            unpaged: false,
                        },
                        sort: { empty: true, sorted: false, unsorted: true },
                    };

                    return {
                        data: paginationData,
                        statusCode: 200,
                        message: 'success',
                    };
                }

                const params: Record<string, string> = {};
                if (newsType) {
                    params.type = newsType;
                }

                const response = await fetchData<PaginatedResponse<NewsItem>>({
                    endpoint: '/public/news',
                    method: 'GET',
                    params,
                });

                updateNewCache(response, type);

                return response;
            },

            getNewsById: async (id: string): Promise<ApiResponse<NewsItem>> => {
                const cachedDetail = newsDetailsCache[id];

                if (cachedDetail && isCacheValid(cachedDetail.lastFetch)) {
                    return {
                        data: cachedDetail.data,
                        statusCode: 200,
                        message: 'success',
                    };
                }

                const response = await fetchData<NewsItem>({
                    endpoint: `/public/news/${id}`,
                    method: 'GET',
                });

                if (response.statusCode === 200 && response.data) {
                    const now = Date.now();
                    setNewsDetailsCache((prev) => ({
                        ...prev,
                        [id]: {
                            data: response.data,
                            lastFetch: now,
                        },
                    }));
                }

                return response;
            },

            clearCache: () => {
                setTechNews([]);
                setMeetupNews([]);
                setSocialNews([]);
                setNewsDetailsCache({});
                setCacheStatus({
                    TECH: { loaded: false, lastFetch: null },
                    MEETUP: { loaded: false, lastFetch: null },
                    SOCIAL: { loaded: false, lastFetch: null },
                });
            },

            forceRefresh: (type?: 'TECH' | 'MEETUP' | 'SOCIAL') => {
                if (type) {
                    setCacheStatus((prev) => ({
                        ...prev,
                        [type]: { loaded: false, lastFetch: null },
                    }));
                } else {
                    setCacheStatus({
                        TECH: { loaded: false, lastFetch: null },
                        MEETUP: { loaded: false, lastFetch: null },
                        SOCIAL: { loaded: false, lastFetch: null },
                    });
                    setNewsDetailsCache({});
                }
            },
        }),
        [
            fetchData,
            techNews,
            meetupNews,
            socialNews,
            cacheStatus,
            newsDetailsCache,
            setTechNews,
            setMeetupNews,
            setSocialNews,
            setCacheStatus,
            setNewsDetailsCache,
        ],
    );
};
