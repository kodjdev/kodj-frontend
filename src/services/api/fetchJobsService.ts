import { useMemo } from 'react';
import { JobsApiResponse, JobsQueryParams, JobsListResponse, JobPost } from '@/services/api/types/jobs';
import useAxios from '@/hooks/useAxios/useAxios';
import { ApiResponse } from '@/types/fetch';

export const useFetchJobsService = () => {
    const fetchData = useAxios();

    return useMemo(
        () => ({
            /**
             * Get paginated list of job posts
             */
            getJobs: async (params: JobsQueryParams = {}): Promise<ApiResponse<JobsListResponse>> => {
                const queryParams = new URLSearchParams();

                if (params.category) queryParams.append('category', params.category);
                if (params.jobType) queryParams.append('jobType', params.jobType);
                if (params.jobOfferStatus) queryParams.append('jobOfferStatus', params.jobOfferStatus);
                if (params.page !== undefined) queryParams.append('page', params.page.toString());
                if (params.size !== undefined) queryParams.append('size', params.size.toString());
                if (params.sort) queryParams.append('sort', params.sort);

                const response = await fetchData({
                    endpoint: `/public/job-posts${queryParams.toString() ? `?${queryParams.toString()}` : ''}`,
                    method: 'GET',
                });

                return response as ApiResponse<JobsListResponse>;
            },

            /**
             * Get job post by its ID
             */
            getJobById: async (id: number): Promise<ApiResponse<JobPost>> => {
                const response = await fetchData({
                    endpoint: `/public/job-posts/${id}`,
                    method: 'GET',
                });

                return response as ApiResponse<JobPost>;
            },

            /**
             * Search jobs with filters
             */
            searchJobs: async (searchTerm: string, params: JobsQueryParams = {}): Promise<JobsApiResponse> => {
                const queryParams = new URLSearchParams();

                queryParams.append('search', searchTerm);

                if (params.category) queryParams.append('category', params.category);
                if (params.jobType) queryParams.append('jobType', params.jobType);
                if (params.jobOfferStatus) queryParams.append('jobOfferStatus', params.jobOfferStatus);
                if (params.page !== undefined) queryParams.append('page', params.page.toString());
                if (params.size !== undefined) queryParams.append('size', params.size.toString());
                if (params.sort) queryParams.append('sort', params.sort);

                const response = await fetchData({
                    endpoint: `/public/job-posts?${queryParams.toString()}`,
                    method: 'GET',
                });

                return response as JobsApiResponse;
            },
        }),
        [fetchData],
    );
};
