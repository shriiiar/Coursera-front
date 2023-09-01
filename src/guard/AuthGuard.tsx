import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import ComponentLoader from "../components/ComponentLoader";
import ScreenLoader from "../components/ScreenLoader";
import { useAppContext } from "../context/AppContext";
import { useCookies } from "react-cookie";

type Props = {
  children: React.ReactNode;
};

const AuthGuard = ({ children }: Props) => {
  const { isLoading, token, role } = useAppContext();
  const location = useLocation();
  const [cookies] = useCookies(["token"]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  if (!cookies?.token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  /* if (role === "student") {
    return (
      <Navigate to="/student/dashboard" state={{ from: location }} replace />
    );
  }

  if (role === "teacher") {
    return (
      <Navigate to="/teacher/dashboard" state={{ from: location }} replace />
    );
  }

  if (role === "admin") {
    return (
      <Navigate to="/admin/dashboard" state={{ from: location }} replace />
    );
  } */

  return <>{children}</>;
};

export default AuthGuard;
