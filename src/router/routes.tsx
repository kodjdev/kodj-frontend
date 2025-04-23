import { HomePage } from '../pages';
import React, { Suspense } from 'react';
import ComponentLoading from '../components/ComponentLoading.tsx';

import { EventRegister, NewsDetails, NewsList, SpeakerRegistrationForm, EventsPage } from './lazyComponents';

type RouteType = {
    path: string;
    component: React.ReactElement;
    auth?: boolean;
};

export const routes: RouteType[] = [
    {
        path: '/',
        component: <HomePage />,
        auth: false,
    },
    // {
    //   path: "/about",
    //   component: <About />,
    //   auth: false,
    // },
    // {
    //   path: "/login",
    //   component: <LoginPage />,
    //   auth: false,
    // },
    // {
    //   path: "/signup",
    //   component: <SignupPage />,
    //   auth: false,
    // },
    // {
    //   path: "/complete-profile",
    //   component: (
    //       <UserDetailsForm />
    //   ),
    //   auth: true
    // },
    // {
    //   path: "/forgot-password",
    //   component: <ForgotPassword />,
    //   auth: false,
    // },
    // {
    //   path: "/mypage",
    //   component: (
    //     <Suspense fallback={<ComponentLoading />}>
    //       <MyPage />
    //     </Suspense>
    //   ),
    //   auth: true,
    // },
    // {
    //   path: "/mypage/editProfile",
    //   component: (
    //     <Suspense fallback={<ComponentLoading />}>
    //       <EditMyPage />
    //     </Suspense>
    //   ),
    //   auth: true,
    // },
    {
        path: '/events',
        component: (
            <Suspense fallback={<ComponentLoading />}>
                <EventsPage />
            </Suspense>
        ),
        auth: false,
    },
    // {
    //   path: "/events:type",
    //   component: <EventsList />,
    //   auth: false,
    // },
    // {
    //   path: "/events/:type/details/:id",
    //   component: (
    //     <Suspense fallback={<ComponentLoading />}>
    //       <EventDetails />
    //     </Suspense>
    //   ),
    //   auth: false,
    // },
    {
        path: '/events/upcoming/details/:id/register',
        component: (
            <Suspense fallback={<ComponentLoading />}>
                <EventRegister />
            </Suspense>
        ),
        auth: true, // Protected route
    },
    {
        path: '/speakers',
        component: (
            <Suspense fallback={<ComponentLoading />}>
                <SpeakerRegistrationForm />
            </Suspense>
        ),
    },
    {
        path: '/news',
        component: (
            <Suspense fallback={<ComponentLoading />}>
                <NewsList />
            </Suspense>
        ),
    },
    {
        path: '/news/:category',
        component: (
            <Suspense fallback={<ComponentLoading />}>
                <NewsList />,
            </Suspense>
        ),
    },
    {
        path: '/news/:category/:id',
        component: (
            <Suspense fallback={<ComponentLoading />}>
                <NewsDetails />,
            </Suspense>
        ),
    },
];
