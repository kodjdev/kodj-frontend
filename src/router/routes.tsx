import React, { Suspense } from 'react';
import ComponentLoading from '@/components/ComponentLoading.tsx';
import { Home, EventsPage } from '@/router/lazyComponents.tsx';

type RouteType = {
    path: string;
    component: React.ReactElement;
    auth?: boolean;
};

/**
 * Routes - An array of route objects for the application.
 * @description This array defines the routes for the application, including the path,
 * component to render, and authentication requirements.
 */
export const routes: RouteType[] = [
    {
        path: '/',
        component: <Home />,
        auth: false,
    },
    {
        path: '/events',
        component: (
            <Suspense fallback={<ComponentLoading />}>
                <EventsPage />
            </Suspense>
        ),
        auth: false,
    },
];
