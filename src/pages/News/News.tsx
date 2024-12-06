import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const News: React.FC = () => {

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{"news"}</h1>
      <nav className="flex space-x-4 mb-6">
        <NavLink
          to={`/news/tech`}
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 border-b-2 border-blue-500 pb-1"
              : "text-gray-500 hover:text-blue-500"
          }
        >
          {"tech"}
        </NavLink>
        <NavLink
          to={`/news/meetup`}
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 border-b-2 border-blue-500 pb-1"
              : "text-gray-500 hover:text-blue-500"
          }
        >
          {"meetup"}
        </NavLink>
        <NavLink
          to={`/news/social`}
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 border-b-2 border-blue-500 pb-1"
              : "text-gray-500 hover:text-blue-500"
          }
        >
          {"social"}
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default News;
