import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import {
  useCreateAssignmentMarkMutation,
  useGetAssignmentMarkByIdQuery,
} from "../../../../features/coursesSlice/teacherApi";
import { toast } from "react-hot-toast";

type Props = { assignmentUpdate: any; setAssignmentUpdate: any };

export default function AssignmentMarkUpdateModal({
  setAssignmentUpdate,
  assignmentUpdate,
}: Props) {
  const [createAssignmentMark, { isSuccess, isLoading }] =
    useCreateAssignmentMarkMutation();

  const { data: assignmentMark, refetch } = useGetAssignmentMarkByIdQuery(
    assignmentUpdate?.assignmentId?._id
  );
  const [defaultMark, setDefaultMark] = useState(assignmentMark?.data?.mark);
  const [defaultFullMark, setDefaultFullMark] = useState(
    assignmentMark?.data?.fullMark
  );

  useEffect(() => {
    setDefaultMark(assignmentMark?.data?.mark);
    setDefaultFullMark(assignmentMark?.data?.fullMark);
  }, [assignmentMark]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async () => {
    if (!defaultMark && !defaultFullMark) {
      toast.error("Enter the mark");
      return;
    }
    const finalData = {
      courseId: assignmentUpdate?.courseId?._id,
      assignmentId: assignmentUpdate?.assignmentId?._id,
      submissionId: assignmentUpdate?._id,
      userId: assignmentUpdate?.userId?._id,
      mark: defaultMark,
      fullMark: defaultFullMark,
    };
    createAssignmentMark(finalData);
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully updated assignment marks", {
        id: "update-assignment-mark",
      });
      setAssignmentUpdate(null);
      refetch();
    }
  }, [isSuccess]);

  return (
    <div className="fixed w-full h-full inset-0 z-50 bg-black/50 poppins">
      <div className="rounded-lg w-full max-w-lg space-y-5 bg-[#F2F3F8] p-7 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <span
          onClick={() => setAssignmentUpdate(null)}
          className="absolute -right-4 -top-4 cursor-pointer font-semibold text-lg bg-violet-600 h-9 w-9 text-white rounded-full flex items-center justify-center"
        >
          X
        </span>
        <div className="">
          <h3 className="text-center text-xl font-semibold">Assignment Mark</h3>
          <div className="flex flex-col gap-2">
            <label htmlFor="mark">
              Mark <span className="text-red-500">*</span>
            </label>
            <input
              value={defaultMark}
              onChange={(e) => setDefaultMark(e.target.value)}
              type="number"
              id="mark"
              placeholder="Enter assignment mark"
              className="input input-bordered w-full border-primary focus:border-primary h-10"
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="mark">
              Full Mark <span className="text-red-500">*</span>
            </label>
            <input
              value={defaultFullMark}
              onChange={(e) => setDefaultFullMark(e.target.value)}
              type="number"
              id="fullMark"
              placeholder="Enter assignment Full Mark"
              className="input input-bordered w-full border-primary focus:border-primary h-10"
            />
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
              onClick={onSubmit}
              className="btn mt-6 text-white btn-primary w-full bg-gradient-to-tr from-blue-500 to-purple-600"
            >
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
