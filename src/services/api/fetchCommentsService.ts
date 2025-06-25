import useAxios from '@/hooks/useAxios/useAxios';
import { ApiResponse } from '@/types/fetch';
import { CommentData, CommentRequest, LikeOrDislikeResponse } from '@/types/news';
import { useMemo } from 'react';

/**
 * Comments Api Service - For Comments Data Fetching and Management
 * File contains functions to interact with the news comments API endpoints.
 * @module useFetchCommentsService
 * @description This module provides functions to fetch, create, and manage comments for news articles.
 */
export const useFetchCommentsService = () => {
    const fetchData = useAxios();

    return useMemo(() => {
        return {
            getComments: async (newsId: string): Promise<ApiResponse<CommentData[]>> => {
                return fetchData<CommentData[]>({
                    endpoint: `/news/${newsId}/comments`,
                    method: 'GET',
                });
            },
            getCommentReplies: async (
                newsId: string,
                commentId: string | number,
            ): Promise<ApiResponse<CommentData[]>> => {
                return fetchData<CommentData[]>({
                    endpoint: `/news/${newsId}/comments/${commentId}/replies`,
                    method: 'GET',
                });
            },
            sendComment: async (commentData: CommentRequest): Promise<ApiResponse<CommentData>> => {
                return fetchData<CommentData>({
                    endpoint: `/news/${commentData.articleId}/comments`,
                    method: 'POST',
                    data: {
                        comment: commentData.text,
                        repliedUsername: commentData.repliedUsername,
                    },
                });
            },
            sendReply: async (
                newsId: string,
                commentId: string | number,
                replyData: { text: string; repliedUsername?: string },
            ): Promise<ApiResponse<CommentData>> => {
                return fetchData<CommentData>({
                    endpoint: `/news/${newsId}/comments/${commentId}/replies`,
                    method: 'POST',
                    data: {
                        comment: replyData.text,
                        repliedUsername: replyData.repliedUsername,
                    },
                });
            },
            likeComment: async (
                newsId: string,
                commentId: string | number,
            ): Promise<ApiResponse<LikeOrDislikeResponse>> => {
                return fetchData<LikeOrDislikeResponse>({
                    endpoint: `/news/${newsId}/comments/${commentId}/like`,
                    method: 'POST',
                });
            },
            dislikeComment: async (
                newsId: string,
                commentId: string | number,
            ): Promise<ApiResponse<LikeOrDislikeResponse>> => {
                return fetchData<LikeOrDislikeResponse>({
                    endpoint: `/news/${newsId}/comments/${commentId}/dislike`,
                    method: 'POST',
                });
            },
        };
    }, [fetchData]);
};
