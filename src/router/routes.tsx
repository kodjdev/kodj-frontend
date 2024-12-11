import {
  HomePage,
  LoginPage,
  About,
} from "../pages";
import React from "react";
import EventRegister from "../pages/EventRegister/EventRegister";
import MyPage from "../pages/MyPage/MyPage";
import EventsList from "../pages/UpcomingEvents/EventsList.tsx";
import NewsDetails from "../pages/News/NewsDetails/NewsDetails";
import NewsList from "../pages/News/NewsList";
import EventDetails from "../pages/UpcomingEvents/details/EventDetails.tsx";

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
    path: "/mypage",
    component: <MyPage />,
    auth: true,
  },
  {
    path: "/events",
    component: <EventsList/>,
    auth: false,
  },
  {
    path: "/events:type",
    component: <EventsList/>,
    auth: false,
  },
  {
    path: "/events/:type/details/:id",
    component: <EventDetails/>,
    auth: false,
  },
  {
    path: "/events/upcoming/details/:id/register",
    component: <EventRegister />,
    auth: true, // Protected route
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
