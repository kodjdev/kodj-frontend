import {
  HomePage,
  LoginPage,
  RegisterPage,
  UpcomingEvents,
  PastEvents,
  About,
} from "../pages";
import React from "react";
import EventRegister from "../pages/EventRegister/EventRegister";
import MyPage from "../pages/MyPage/MyPage";
import UpcomingEventDetails from "../pages/UpcomingEvents/details/UpcomingEventDetails";
import PastEventDetails from "../pages/PastEvents/details/PastEventDetails";
import NewsDetails from "../pages/News/NewsDetails/NewsDetails";
import NewsList from "../pages/News/NewsList";

interface RouteType {
  path: string;
  component: React.ReactElement;
  auth?: boolean;
}

export const routes: RouteType[] = [
  {
    path: "/",
    component: <HomePage />,
    auth: false, // Public route
  },
  {
    path: "/about",
    component: <About />,
    auth: false, // Public route
  },
  {
    path: "/login",
    component: <LoginPage />,
    auth: false, // Public route
  },
  {
    path: "/register",
    component: <RegisterPage />,
    auth: false, // Public route
  },
  {
    path: "/mypage",
    component: <MyPage />,
    auth: true,
  },
  {
    path: "/events/upcoming",
    component: <UpcomingEvents />,
    auth: false,
  },
  {
    path: "/events/upcoming/details/:id",
    component: <UpcomingEventDetails />,
    auth: false,
  },
  {
    path: "/events/upcoming/details/:id/register",
    component: <EventRegister />,
    auth: true, // Protected route
  },
  {
    path: "/events/past",
    component: <PastEvents />,
    auth: false,
  },
  {
    path: "/events/past/details/:id",
    component: <PastEventDetails />,
    auth: false,
  },
  {
    path: "/news",
    component: <NewsList />,
  },
  {
    path: "/news/:category",
    component: <NewsList />,
  },
  {
    path: "/news/:category/:id",
    component: <NewsDetails />,
  }
];
