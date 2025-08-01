import { useMemo } from 'react';
import { ApiResponse } from '@/types/fetch';
import useAxios from '@/hooks/useAxios/useAxios';

export type StatsOverview = {
    totalSpeakers: number;
    totalEvents: number;
    totalUsers: number;
};

export const useFetchStatsService = () => {
    const fetchData = useAxios();

    return useMemo(() => {
        return {
            getStatisticsOverview: async (): Promise<ApiResponse<StatsOverview>> => {
                return fetchData<StatsOverview>({
                    endpoint: '/public/statistics',
                    method: 'GET',
                });
            },
        };
    }, [fetchData]);
};
