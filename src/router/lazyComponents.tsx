import React from "react";

export const MyPage = React.lazy(() => import("../pages/MyPage/index.tsx"));
export const EventDetails = React.lazy(() => import("../pages/Events/details/EventDetails.tsx"));
export const EventRegister = React.lazy(() => import("../pages/Events/EventRegister/index.tsx"));
export const NewsDetails = React.lazy(() => import("../pages/News/NewsDetails/NewsDetails.tsx"));
export const NewsList = React.lazy(() => import("../pages/News/NewsList.tsx"));
export const SpeakerRegistrationForm = React.lazy(() => import ("../pages/Speakers/index.tsx"))
export const EventsList = React.lazy(() => import("../pages/Events/EventsList.tsx"))

