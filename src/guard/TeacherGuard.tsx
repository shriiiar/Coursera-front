import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import ScreenLoader from "../components/ScreenLoader";
import { useCookies } from "react-cookie";
import { useAppContext } from "../context/AppContext";

type Props = {
  children: any;
};

const TeacherGuard = ({ children }: Props) => {
  const { isLoading, token, role } = useAppContext();
  const location = useLocation();
  const [cookies] = useCookies(["token"]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  if (role === "teacher") {
    return (
      <Navigate to="/teacher/dashboard" state={{ from: location }} replace />
    );
  } else if (role === "student") {
    return (
      <Navigate to="/student/dashboard" state={{ from: location }} replace />
    );
  }

  return <>{children}</>;
};

export default TeacherGuard;
