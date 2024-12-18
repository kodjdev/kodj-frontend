/* eslint-disable */
// @ts-nocheck

import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import PrivateWrapper from "./ProtectedRoute";
import Error from "../components/Error";

export default function RouterPage() {
  return (
    <Routes>
      {routes.map(({ path, component, auth }) => (
        <Route
          path={path}
          key={path}
          element={
            auth ? <PrivateWrapper>{component}</PrivateWrapper> : component
          }
        />
      ))}
      {/* // unhandled routes will be moved to 404 page error handling component */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
