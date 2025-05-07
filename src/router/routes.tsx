import React from 'react';
import { Home, EventsPage } from '@/router/lazyComponents.tsx';
import LoginRoot from '@/pages/Auth';
import MyPage from '@/pages/MyPage';
import CompleteProfile from '@/pages/Auth/CompleteAccount';
import EventDetails from '@/pages/Events/EventDetails/EventDetails';

type PathTypes = {
    path: string;
    element: React.ReactElement;
};

type RouteType = {
    public: PathTypes[];
    protected: PathTypes[];
};

/**
 * Routes - An array of route objects for the application.
 * @description This array defines the routes for the application, including the path,
 * component to render.
 */
export const routes: RouteType = {
    public: [
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/events',
            element: <EventsPage />,
        },
        {
            path: '/events/:type/details/:eventId',
            element: <EventDetails />,
        },
        {
            path: '/login',
            element: <LoginRoot />,
        },
        {
            path: '/completeAccount',
            element: <CompleteProfile />,
        },
    ],
    protected: [
        {
            path: '/mypage',
            element: <MyPage />,
        },
    ],
};
