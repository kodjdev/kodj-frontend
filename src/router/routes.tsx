import React from 'react';
import {
    Home,
    EventsPage,
    LoginRoot,
    MyPage,
    CompleteProfile,
    EventDetails,
    AboutUs,
    News,
    NewsDetail,
    EventRegister,
} from '@/router/lazyComponents';

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
            path: '/about',
            element: <AboutUs />,
        },
        {
            path: '/news',
            element: <News />,
        },
        {
            path: '/news/:id',
            element: <NewsDetail />,
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
            path: '/events/:type/register/:eventId',
            element: <EventRegister />,
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
