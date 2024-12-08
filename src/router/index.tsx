/* eslint-disable */
// @ts-nocheck

import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import PrivateWrapper from "./ProtectedRoute";

export default function RouterPage() {
  return (
      <Routes>
        {routes.map(({ path, component, auth }) => (
          <Route
            path={path}
            key={path}
            element={
                auth ? (
                <PrivateWrapper>{component}</PrivateWrapper>
                ) : (
                component
                )
            }
            />
        ))}
        {/* // we catch undefined paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  );
}

