import useAxios from '@/hooks/useAxios/useAxios';
import { ApiResponse } from '@/types/fetch';
import { NewsItem } from '@/types/news';
import { useMemo } from 'react';

/**
 * News Service - For News Data  Fetching
 * This file contains functions to interact with the news API endpoints.
 * @module useNewsService
 * @description This module provides functions to fetch news data from the API.
 */
export const useFetchNewsService = () => {
    const fetchData = useAxios();

    return useMemo(() => {
        return {
            getAllNews: async (newsType?: 'TECH' | 'MEETUP' | 'SOCIAL'): Promise<ApiResponse<NewsItem[]>> => {
                const params: Record<string, string> = {};
                if (newsType) {
                    params.type = newsType;
                }

                return fetchData<NewsItem[]>({
                    endpoint: '/news',
                    method: 'GET',
                    params,
                });
            },

            getNewsById: async (id: string): Promise<ApiResponse<NewsItem>> => {
                return fetchData<NewsItem>({
                    endpoint: `/news/${id}`,
                    method: 'GET',
                });
            },
        };
    }, [fetchData]);
};
