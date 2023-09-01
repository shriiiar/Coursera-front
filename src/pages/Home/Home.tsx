import { useState } from "react";
import { Link } from "react-router-dom";
import AuthDecision from "../../components/AuthDecision";
import { useAppContext } from "../../context/AppContext";
import Navbar from "../../shared/Navbar";
import axios from "axios";
import { toast } from "react-hot-toast";
import HeroSection from "./HeroSection";

type Props = {};

const Home = (props: Props) => {
  const [isShow, setIsShow] = useState(false);
  const { token, currentUser } = useAppContext();

  const dashboardLink =
    (currentUser?.role === "student"
      ? "/student/dashboard"
      : "/teacher/dashboard") ||
    (currentUser.role === "admin" && "/admin/dashboard");

  return (
    <div>
      <div className="bg-[#7594fc]">
        <Navbar></Navbar>
      </div>

      <div className="hero bg-base-200 h-[calc(100vh-84px)]">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold">
              Hello, Welcome to{" "}
              <span className="text-primary">Course management App</span>
            </h1>

            <div className="flex items-center gap-2 justify-center mt-10">
              {token && (
                <Link to={dashboardLink} className="btn btn-primary">
                  Go to Dashboard
                </Link>
              )}
              {!token && (
                <>
                  <Link to={"/register"}
                    className="btn btn-primary"
                  >
                    Create Account
                  </Link>
                  <Link to={"/login"} className="btn btn-ghost">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <HeroSection />
    </div>
  );
};

export default Home;
