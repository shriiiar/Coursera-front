import React, { ReactNode } from "react";
import { useAppContext } from "../context/AppContext";
import { Navigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import ScreenLoader from "../components/ScreenLoader";

type Props = {
  children: ReactNode;
};

const StudentGuard = ({ children }: Props) => {
  const { isLoading, token, role } = useAppContext();
  const location = useLocation();
  const [cookies] = useCookies(["token"]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  if (role === "student") {
    return (
      <Navigate to="/student/dashboard" state={{ from: location }} replace />
    );
  }

  return <>{children}</>;
};

export default StudentGuard;
