import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { useUpdateTeacherMutation } from "../../../features/api/userApi";

type Props = { editTeacherData: any; setEditTeacherData: any };

export default function EditTeacherModal({
  editTeacherData,
  setEditTeacherData,
}: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [updateTeacher, { isLoading, isError, error, isSuccess, data }] =
    useUpdateTeacherMutation<any>();

  const onSubmit = handleSubmit(async (data) => {
    await updateTeacher({ id: editTeacherData?._id, data });
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully teacher data updated", {
        id: "edit-teacher",
      });
      setEditTeacherData(null);
    }
  }, [isSuccess]);

  return (
    <div className="fixed w-full h-full inset-0 z-50 bg-black/50 poppins">
      <div className="rounded-lg w-full max-w-lg space-y-5 bg-[#F2F3F8] p-7 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <span
          onClick={() => setEditTeacherData(null)}
          className="absolute -right-4 -top-4 cursor-pointer font-semibold text-lg bg-violet-600 h-9 w-9 text-white rounded-full flex items-center justify-center"
        >
          X
        </span>
        <div className="">
          <h3 className="text-center text-xl font-semibold">Edit Teacher</h3>

          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                defaultValue={editTeacherData?.name}
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
                className="input input-bordered w-full border-primary focus:border-primary h-10"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {(errors as any).name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 mt-3">
              <label htmlFor="phone">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                defaultValue={editTeacherData?.phone}
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
                className="input input-bordered w-full border-primary focus:border-primary h-10"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm ">
                  {(errors as any).phone.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 mt-3">
              <label htmlFor="specialist">
                Specialist <span className="text-red-500">*</span>
              </label>
              <input
                defaultValue={editTeacherData?.specialist}
                type="text"
                {...register("specialist", {
                  required: "Specialist is required",
                  minLength: {
                    value: 3,
                    message: "Specialist must be at least 3 characters",
                  },
                })}
                id="specialist"
                placeholder="Enter your specialist"
                className="input input-bordered w-full border-primary focus:border-primary h-10"
              />
              {errors.specialist && (
                <span className="text-red-500 text-sm ">
                  {(errors as any).specialist.message}
                </span>
              )}
            </div>
            {isLoading ? (
              <button className="btn btn-primary w-full mt-3" disabled>
                <div className="flex items-center justify-center gap-2">
                  <span className="animate-spin">
                    <FaSpinner />
                  </span>
                  <span>Updating...</span>
                </div>
              </button>
            ) : (
              <button
                type="submit"
                className="btn mt-6 text-white btn-primary w-full bg-gradient-to-tr from-blue-500 to-purple-600"
              >
                Update
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
