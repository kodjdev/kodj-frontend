import { useMemo } from 'react';
import { ApiResponse } from '@/types/fetch';
import useAxios from '@/hooks/useAxios/useAxios';

export type MonthlyMeetupData = {
    year: number;
    month: number;
    count: number;
    monthYear?: string;
};

export type StatsOverview = {
    totalSpeakers: number;
    totalMeetups: number;
    totalUsers: number;
    monthlyMeetupResponse: MonthlyMeetupData[];
};

export const useFetchStatsService = () => {
    const fetchData = useAxios();

    return useMemo(() => {
        return {
            getStatisticsOverview: async (): Promise<ApiResponse<StatsOverview>> => {
                return fetchData<StatsOverview>({
                    endpoint: '/statistics/overview',
                    method: 'GET',
                });
            },
        };
    }, [fetchData]);
};
