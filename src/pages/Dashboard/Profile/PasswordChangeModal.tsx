import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { usePasswordChangeMutation } from "../../../features/api/userApi";
import { toast } from "react-hot-toast";
import { SerializedError } from "@reduxjs/toolkit";
type Props = { setPasswordChangeModalOpen: any; userId: any };

export default function PasswordChangeModal({
  setPasswordChangeModalOpen,
  userId,
}: Props) {
  interface CustomError extends SerializedError {
    data?: {
      error?: string;
    };
  }
  const [passwordChange, { isLoading, isSuccess, isError, error }] =
    usePasswordChangeMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [oldPwdShow, setOldPwdShow] = useState(false);
  const [oldNewShow, setNewPwdShow] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    await passwordChange({ ...data, userId });
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully changed password", { id: "changePassword" });
      setPasswordChangeModalOpen(null);
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
          onClick={() => setPasswordChangeModalOpen(null)}
          className="absolute -right-4 -top-4 cursor-pointer font-semibold text-lg bg-violet-600 h-9 w-9 text-white rounded-full flex items-center justify-center"
        >
          X
        </span>
        <div>
          <p className="font-semibold text-lg text-center">Change Password</p>

          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-2 mt-3">
              <label htmlFor="oldPassword">
                Old Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={oldPwdShow ? "text" : "password"}
                  {...register("oldPassword", {
                    required: "Old Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must have at least 6 characters",
                    },
                  })}
                  id="oldPassword"
                  placeholder="Enter your old password"
                  className="input input-bordered w-full border-primary focus:border-primary h-10"
                />
                <span
                  className="cursor-pointer absolute right-3 top-3"
                  onClick={() => setOldPwdShow((prev) => !prev)}
                >
                  {oldPwdShow ? <BsEyeSlash /> : <BsEye />}
                </span>
              </div>
              {errors.oldPassword && (
                <span className="text-red-500 text-sm">
                  {(errors as any).oldPassword.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 mt-3">
              <label htmlFor="newPassword">
                New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={oldNewShow ? "text" : "password"}
                  {...register("newPassword", {
                    required: "New Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must have at least 6 characters",
                    },
                  })}
                  id="newPassword"
                  placeholder="Enter your new password"
                  className="input input-bordered w-full border-primary focus:border-primary h-10"
                />
                <span
                  className="cursor-pointer absolute right-3 top-3"
                  onClick={() => setNewPwdShow((prev) => !prev)}
                >
                  {oldNewShow ? <BsEyeSlash /> : <BsEye />}
                </span>
              </div>
              {errors.newPassword && (
                <span className="text-red-500 text-sm">
                  {(errors as any).newPassword.message}
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
                onClick={() => setPasswordChangeModalOpen(null)}
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
