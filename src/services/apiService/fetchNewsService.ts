import useAxios from '@/hooks/useAxios/useAxios';
import { ApiResponse, PaginatedResponse } from '@/types/fetch';
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
            getAllNews: async (
                newsType?: 'TECH' | 'MEETUP' | 'SOCIAL',
            ): Promise<ApiResponse<{ data: PaginatedResponse<NewsItem>; message: string; statusCode: number }>> => {
                const params: Record<string, string> = {};
                if (newsType) {
                    params.type = newsType;
                }

                return fetchData<{ data: PaginatedResponse<NewsItem>; message: string; statusCode: number }>({
                    endpoint: '/news',
                    method: 'GET',
                    params,
                });
            },

            getNewsById: async (id: string): Promise<ApiResponse<{ data: NewsItem }>> => {
                return fetchData<{ data: NewsItem }>({
                    endpoint: `/news/${id}`,
                    method: 'GET',
                });
            },
        };
    }, [fetchData]);
};
