import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsBack, BsChevronLeft, BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import AuthDecision from "../../components/AuthDecision";
import { useLoginMutation } from "../../features/api/userApi";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useAppContext } from "../../context/AppContext";
import ScreenLoader from "../../components/ScreenLoader";
import Navbar from "../../shared/Navbar";
type Props = {};

const Login = (props: Props) => {
  const { token, role, isLoading: userLoading } = useAppContext();

  const [isShow, setIsShow] = useState(false);
  const [pwdShow, setPwdShow] = useState(false);
  // from react router dom
  const navigate = useNavigate();

  // from react cookie
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  // get form data
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // get api hook for create acc
  const [loginUser, { isLoading, isError, error, isSuccess, data }] =
    useLoginMutation<any>();

  // submit form
  const onSubmit = handleSubmit(async (data) => {
    await loginUser({ ...data });
  });

  useEffect(() => {
    if (isSuccess) {
      setCookie("token", data?.data?.token, { path: "/" });
      toast.success("Login success");
      if (data?.data?.user?.role === "admin") {
        navigate("/admin/dashboard");
      }
      if (data?.data?.user?.role === "student") {
        navigate("/student/dashboard");
      }
      if (data?.data?.user?.role === "teacher") {
        navigate("/teacher/dashboard");
      }
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [data, isSuccess, isError, error]);

  useEffect(() => {
    if (token) {
      if (role === "admin") {
        navigate("/admin/dashboard");
      }
      if (role === "student") {
        navigate("/student/dashboard");
      }
      if (role === "teacher") {
        navigate("/teacher/dashboard");
      }
    }
  }, [token, role]);

  if (userLoading) {
    return <ScreenLoader />;
  }

  return (
    <>
      <div className="md:flex h-screen">
        <div className="relative overflow-hidden h-screen lg:flex flex-1 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
          <div>
            <Link to="/" className="text-white font-bold text-6xl font-sans">
              {" "}
              <span className="text-black">Pro</span>Platform
            </Link>
            <p className="text-white mt-1">
              Making learning seamless with technology
            </p>
            {/* <button type="submit" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Read More</button> */}
          </div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>

        <div className="flex flex-1 justify-center py-10 items-center bg-white">
          <section className="grid place-items-center w-full p-10 h-screen">
            {isShow && <AuthDecision setIsShow={setIsShow} />}
            {/* make register form */}
            <form
              action=""
              className="p-10 border shadow w-full max-w-lg bg-white relative"
              onSubmit={onSubmit}
            >
              <h1 className="text-3xl font-bold mb-5 flex items-center gap-1">
                Login to your account
              </h1>

              <div className="flex flex-col gap-2 mt-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  id="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full border-primary focus:border-primary"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {(errors as any).email.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2 mt-3">
                <label htmlFor="password">Password</label>
                <div className="relative">
                  <input
                    type={pwdShow ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must have at least 6 characters",
                      },
                    })}
                    id="password"
                    placeholder="Enter your password"
                    className="input input-bordered w-full border-primary focus:border-primary"
                  />
                  <span
                    className="cursor-pointer absolute right-3 top-4"
                    onClick={() => setPwdShow((prev) => !prev)}
                  >
                    {pwdShow ? <BsEyeSlash /> : <BsEye />}
                  </span>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {(errors as any).password.message}
                  </span>
                )}
              </div>

              {isLoading ? (
                <button
                  className="btn btn-primary w-full text-white mt-6 bg-gradient-to-tr from-blue-500 to-purple-600"
                  disabled
                >
                  Loading...
                </button>
              ) : (
                <button className="btn btn-primary w-full text-white mt-6 bg-gradient-to-tr from-blue-500 to-purple-600">
                  Login
                </button>
              )}

              <div className="mt-5">
                Don't have an account?{" "}
                <Link to={"/register"} className="text-primary cursor-pointer">
                  Create an account
                </Link>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

export default Login;
