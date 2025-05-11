import React from 'react';

/**
 * Lazy-loaded components for the application.
 * @description This file exports components that are loaded lazily to improve performance.
 */
export const Home = React.lazy(() => import('@/pages/Home/index.tsx'));
export const EventsPage = React.lazy(() => import('@/pages/Events/index.tsx'));
export const LoginRoot = React.lazy(() => import('@/pages/Auth'));
export const MyPage = React.lazy(() => import('@/pages/MyPage/index'));
export const CompleteProfile = React.lazy(() => import('@/pages/Auth/CompleteAccount'));
export const EventDetails = React.lazy(() => import('@/pages/Events/EventDetails/EventDetails'));
export const AboutUs = React.lazy(() => import('@/pages/About'));
