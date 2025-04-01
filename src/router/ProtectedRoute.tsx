import React, { useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const PrivateWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isLogin, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");

      console.group("Protected Route Check");
      console.log("Is Logged In:", isLogin);
      console.log("Loading:", loading);
      console.log("Token:", token);
      console.log("Current Location:", location.pathname);
      console.groupEnd();

      if (!loading) {
        if (!isLogin && !token) {
          navigate("/login", { state: { from: location } });
        }
      }
    };

    checkAuth();
  }, [isLogin, loading, location.pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isLogin ? <>{children}</> : null;
};
export default PrivateWrapper;
