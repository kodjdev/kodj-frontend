import React, { Suspense } from 'react';
import ComponentLoading from '@/components/ComponentLoading.tsx';
import { Home, EventsPage } from '@/router/lazyComponents.tsx';
import LoginRoot from '@/pages/Auth';
import MyPage from '@/pages/MyPage';
import CompleteProfile from '@/pages/Auth/CompleteAccount';

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
            element: (
                <Suspense fallback={<ComponentLoading />}>
                    <EventsPage />
                </Suspense>
            ),
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
