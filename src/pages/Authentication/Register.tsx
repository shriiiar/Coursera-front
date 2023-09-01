import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BsChevronLeft, BsEye, BsEyeSlash } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useRegisterMutation } from "../../features/api/userApi";
import Navbar from "../../shared/Navbar";
import { useCookies } from "react-cookie";
type Props = {};

const Register = (props: Props) => {
  const navigate = useNavigate();
  const { token, role: userRole } = useAppContext();
  const [pwdShow, setPwdShow] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  // batches
  const [batches, setBatches] = useState<any>([
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
  ]);

  // get form data
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // get api hook for create acc
  const [createAccount, { isLoading, isError, error, isSuccess, data }] =
    useRegisterMutation<any>();

  // submit form
  const onSubmit = handleSubmit(async (data) => {
    await createAccount({ ...data, role: "student" });
  });

  useEffect(() => {
    if (isSuccess) {
      setCookie("token", data?.data?.token, { path: "/" });
      toast.success("Register success");
      if (data?.data?.user?.role === "student") {
        navigate("/student/dashboard");
      }
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [data, isSuccess, isError, error]);

  useEffect(() => {
    if (token) {
      if (userRole === "student") {
        navigate("/student/dashboard");
      }
    }
  }, [token]);

  return (
    <>
      <div className="flex gap-5 justify-center mx-auto min-h-screen">
        <div className="relative flex-1 overflow-hidden lg:flex bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
          <div>
            <Link to="/" className="text-white font-bold text-6xl font-sans">
              <span className="text-black">Pro</span>Platform
            </Link>
            <p className="text-white mt-1">
              Making learning seamless with technology
            </p>
          </div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>

        <div className="flex-1 my-10 items-center bg-white ">
          <section className="flex justify-center items-center h-full">
            <form
              action=""
              className={`p-10 border shadow w-[40rem] bg-white relative`}
              onSubmit={onSubmit}
            >
              <h1 className="text-3xl font-bold mb-5">
                Register as{" "}
                <span className="text-primary capitalize">Student</span>
              </h1>
              <div className="flex flex-col gap-2">
                <label htmlFor="name">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                  placeholder="Enter your name"
                  className="input h-10 input-bordered w-full border-primary focus:border-primary"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {(errors as any).name.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 mt-3">
                <label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Email is invalid",
                    },
                  })}
                  id="email"
                  placeholder="Enter your email"
                  className="input h-10 input-bordered w-full border-primary focus:border-primary"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm ">
                    {(errors as any).email.message}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2 mt-3">
                  <label htmlFor="phone">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("phone", {
                      required: {
                        value: true,
                        message: "Phone is required",
                      },
                      pattern: {
                        value: /^[0-9]+$/i,
                        message: "Phone is invalid",
                      },
                    })}
                    id="phone"
                    placeholder="Enter your phone"
                    className="input h-10 input-bordered w-full border-primary focus:border-primary"
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-sm ">
                      {(errors as any).phone.message}
                    </span>
                  )}
                </div>
                {/* batch */}

                <>
                  <div className="flex flex-col gap-2 mt-3">
                    <label htmlFor="role">
                      Student ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("studentId", {
                        required: {
                          value: true,
                          message: "Student ID is required",
                        },
                      })}
                      id="role"
                      placeholder="Enter your Student ID"
                      className="input h-10 input-bordered w-full border-primary focus:border-primary"
                    />
                    {errors.studentId && (
                      <span className="text-red-500 text-sm ">
                        {(errors as any).studentId.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 mt-3">
                    <label htmlFor="batch">
                      Batch No <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="batch"
                      {...register("batch", { required: true })}
                      className="h-10 select-bordered px-3 ring-1 ring-primary rounded-md w-full border-primary focus:border-primary"
                    >
                      <option value="">Select Batch</option>
                      {batches.map((batch: any) => (
                        <option className="text-sm" key={batch} value={batch}>
                          Batch {batch}
                        </option>
                      ))}
                    </select>
                    {errors.batch && (
                      <span className="text-red-500 text-sm ">
                        Batch no is required
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 mt-3">
                    <label htmlFor="section">
                      Section <span className="text-red-500">*</span>{" "}
                    </label>
                    <select
                      id="section"
                      {...register("section", { required: true })}
                      className="h-10 select-bordered px-3 ring-1 ring-primary rounded-md w-full border-primary focus:border-primary"
                    >
                      <option value="">Select Section</option>
                      <option className="text-sm">Section A</option>
                      <option className="text-sm">Section B</option>
                      <option className="text-sm">Section C</option>
                      <option className="text-sm">Section D</option>
                      <option className="text-sm">Section E</option>
                    </select>
                    {errors.section && (
                      <span className="text-red-500 text-sm ">
                        Section is required
                      </span>
                    )}
                  </div>
                  {/* codeforce */}
                  <div className="flex flex-col gap-2 mt-3">
                    <label htmlFor="codeForces">
                      CodeForce Id <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("codeForces", {})}
                      id="codeForces"
                      placeholder="Enter your codeForces id"
                      className="input h-10 input-bordered w-full border-primary focus:border-primary"
                    />
                    {errors.codeForces && (
                      <span className="text-red-500 text-sm ">
                        {(errors as any).codeForces.message}
                      </span>
                    )}
                  </div>
                  {/* atCoder */}
                  <div className="flex flex-col gap-2 mt-3">
                    <label htmlFor="atCoder">
                      atCoder Id <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("atCoder", {})}
                      id="atCoder"
                      placeholder="Enter your atCoder id"
                      className="input h-10 input-bordered w-full border-primary focus:border-primary"
                    />
                    {errors.atCoder && (
                      <span className="text-red-500 text-sm ">
                        {(errors as any).atCoder.message}
                      </span>
                    )}
                  </div>
                  {/* codeChef */}
                  <div className="flex flex-col gap-2 mt-3">
                    <label htmlFor="codeChef">
                      codeChef Id <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("codeChef", {})}
                      id="codeChef"
                      placeholder="Enter your codeChef id"
                      className="input h-10 input-bordered w-full border-primary focus:border-primary"
                    />
                    {errors.codeChef && (
                      <span className="text-red-500 text-sm ">
                        {(errors as any).codeChef.message}
                      </span>
                    )}
                  </div>
                  {/* leetCode */}
                  <div className="flex flex-col gap-2 mt-3">
                    <label htmlFor="leetCode">
                      leetCode Id <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("leetCode", {})}
                      id="leetCode"
                      placeholder="Enter your leetCode id"
                      className="input h-10 input-bordered w-full border-primary focus:border-primary"
                    />
                    {errors.leetCode && (
                      <span className="text-red-500 text-sm ">
                        {(errors as any).leetCode.message}
                      </span>
                    )}
                  </div>
                </>
              </div>

              <div className="flex flex-col gap-2 mt-3">
                <label htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </label>
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
                    className="input h-10 input-bordered w-full border-primary focus:border-primary"
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
                  className="h-11 rounded-md btn-primary w-full mt-3"
                  disabled
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="animate-spin">
                      <FaSpinner />
                    </span>
                    <span>Registering...</span>
                  </div>
                </button>
              ) : (
                <button
                  type="submit"
                  className="h-11 rounded-md mt-6 text-white btn-primary w-full bg-gradient-to-tr from-blue-500 to-purple-600"
                >
                  Register
                </button>
              )}
              <div className="mt-2">
                Already have an account?{" "}
                <Link to="/login" className="text-primary">
                  Login
                </Link>
              </div>
            </form>
            <div></div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Register;
