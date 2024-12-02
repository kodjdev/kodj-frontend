/* eslint-disable */
// @ts-nocheck

import { Route, Routes } from "react-router-dom";
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
      </Routes>
  );
}

