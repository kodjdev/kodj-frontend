import React from 'react';

/**
 * Lazy-loaded components for the application.
 * @description This file exports components that are loaded lazily to improve performance.
 */
export const Home = React.lazy(() => import('@/pages/Home/index.tsx'));
export const EventsPage = React.lazy(() => import('@/pages/Events/index.tsx'));
