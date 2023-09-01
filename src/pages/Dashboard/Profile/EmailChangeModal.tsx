import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useEmailChangeMutation } from "../../../features/api/userApi";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";
import { SerializedError } from "@reduxjs/toolkit";
type Props = { setEmailChangeModalOpen: any; userEmail: any };

export default function EmailChangeModal({
  setEmailChangeModalOpen,
  userEmail,
}: Props) {
  interface CustomError extends SerializedError {
    data?: {
      error?: string;
    };
  }
  const { token, currentUser, setToken, setCurrentUser, setRole } =
    useAppContext();
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies(["token"]);
  const [emailChange, { isLoading, isSuccess, isError, error }] =
    useEmailChangeMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    await emailChange({ ...data, oldEmail: userEmail });
  });

  /* handle logout */
  //   const handleLogout = () => {
  //     removeCookies("token", {
  //       path: "/",
  //     });
  //     setToken(null);
  //     setCurrentUser(null);
  //     setRole(null);
  //     navigate("/login");
  //   };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully changed password", { id: "changePassword" });
      setEmailChangeModalOpen(null);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      const errorMessage = (error as CustomError)?.data?.error;
      if (errorMessage) {
        toast.error(errorMessage, { id: "changePassword" });
      }
    }
  }, [isError, error]);

  return (
    <div className="fixed w-full h-full inset-0 z-50 bg-black/50 poppins">
      <div className="rounded-lg w-full max-w-lg space-y-7 bg-[#F2F3F8] p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <span
          onClick={() => setEmailChangeModalOpen(null)}
          className="absolute -right-4 -top-4 cursor-pointer font-semibold text-lg bg-violet-600 h-9 w-9 text-white rounded-full flex items-center justify-center"
        >
          X
        </span>
        <div>
          <p className="font-semibold text-lg text-center">Change Email</p>

          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-2 mt-3">
              <label htmlFor="newEmail">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register("newEmail", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email is invalid",
                  },
                })}
                id="newEmail"
                placeholder="Enter your new email"
                className="input input-bordered w-full border-primary focus:border-primary h-10"
              />
              {errors.newEmail && (
                <span className="text-red-500 text-sm ">
                  {(errors as any).newEmail.message}
                </span>
              )}
            </div>
            <div className="mt-5 flex justify-end gap-5">
              <button
                type="submit"
                className="py-2 px-4 bg-violet-600 text-white rounded-md font-medium"
              >
                Update
              </button>
              <button
                onClick={() => setEmailChangeModalOpen(null)}
                className="py-2 px-4 bg-slate-800 text-white rounded-md font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
