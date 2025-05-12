import { FormatOptions } from '@/types/hook';
import { useMemo } from 'react';

/**
 * Custom Hook - For formatting dates
 * @param defaultOptions Default formatting options to use
 * @returns An object with date formatting functions
 */
export default function useFormatDate(defaultOptions?: FormatOptions) {
    const defaultOpts = useMemo(
        () => ({
            locale: 'en-US',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            ...defaultOptions,
        }),
        [defaultOptions],
    );

    const validateDate = (dateString: string, context: string = 'date'): Date | null => {
        try {
            const date = new Date(dateString);

            if (isNaN(date.getTime())) {
                console.warn(`Invalid ${context} string:`, dateString);
                return null;
            }

            return date;
        } catch (error) {
            console.error(`Error parsing ${context}:`, error);
            return null;
        }
    };

    /**
     * Format a date string to a localized string
     * @param dateString The date string to format
     * @param options Optional formatting options that override the defaults
     * @returns Formatted date string
     */
    const formatDate = (dateString: string, options?: FormatOptions) => {
        const date = validateDate(dateString);
        if (!date) return 'Invalid date';

        try {
            const mergedOptions = { ...defaultOpts, ...options };
            return date.toLocaleDateString(mergedOptions.locale, mergedOptions as Intl.DateTimeFormatOptions);
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Error formatting date';
        }
    };

    /**
     * Format a date string to a relative time (ex: "2 days ago")
     * @param dateString The date string to format
     * @returns Relative time string
     */
    const formatRelativeTime = (dateString: string) => {
        const date = validateDate(dateString, 'relative time');
        if (!date) return 'Invalid date';

        try {
            const now = new Date();
            const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

            if (diffInSeconds < 60) {
                return 'just now';
            }

            const diffInMinutes = Math.floor(diffInSeconds / 60);
            if (diffInMinutes < 60) {
                return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
            }

            const diffInHours = Math.floor(diffInMinutes / 60);
            if (diffInHours < 24) {
                return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
            }

            const diffInDays = Math.floor(diffInHours / 24);
            if (diffInDays < 30) {
                return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
            }

            const diffInMonths = Math.floor(diffInDays / 30);
            if (diffInMonths < 12) {
                return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
            }

            const diffInYears = Math.floor(diffInMonths / 12);
            return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
        } catch (error) {
            console.error('Error formatting relative time:', error);
            return 'Error formatting date';
        }
    };

    /**
     * Format a date string to a time string (ex: "14:30")
     * @param dateString The date string to format
     * @param options Optional formatting options
     * @returns Formatted time string
     */
    const formatTime = (dateString: string, options?: Intl.DateTimeFormatOptions) => {
        const date = validateDate(dateString, 'time');
        if (!date) return 'Invalid time';

        try {
            const timeOptions = {
                hour: '2-digit' as const,
                minute: '2-digit' as const,
                ...options,
            };

            return date.toLocaleTimeString(defaultOpts.locale, timeOptions);
        } catch (error) {
            console.error('Error formatting time:', error);
            return 'Error formatting time';
        }
    };

    return { formatDate, formatRelativeTime, formatTime };
}
