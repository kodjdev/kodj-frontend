import { HomePage, LoginPage, RegisterPage, UpcomingEvents, PastEvents, Organizers, About } from "../pages";
import React from "react";

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
    path: "/events/upcoming",
    component: <UpcomingEvents />,
    auth: false, 
  },
  {
    path: "/events/upcoming/details/:id",
    component: <UpcomingEvents />,
    auth: true, // Protected route
  },
  {
    path: "/events/past",
    component: <PastEvents />,
    auth: false, 
  },
  {
    path: "/organizers",
    component: <Organizers />,
    auth: false, 
  },
];
