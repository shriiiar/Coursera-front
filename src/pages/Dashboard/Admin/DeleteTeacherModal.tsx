import React, { useEffect } from "react";
import { useDeleteTeacherMutation } from "../../../features/api/userApi";
import { toast } from "react-hot-toast";

type Props = { setDeleteTeacherId: any; deleteTeacherId: any };

export default function DeleteTeacherModal({
  setDeleteTeacherId,
  deleteTeacherId,
}: Props) {
  const [deleteTeacher, { isLoading, isSuccess }] = useDeleteTeacherMutation();
  const handleDelete = () => {
    deleteTeacher(deleteTeacherId);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully deleted");
      setDeleteTeacherId(null);
    }
  }, [isSuccess]);

  return (
    <div className="fixed w-full h-full inset-0 z-50 bg-black/50 poppins">
      <div className="rounded-lg w-full max-w-lg space-y-8 bg-[#F2F3F8] p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div>
          <p className="text-red-500 font-semibold">
            Are you sure you want to delete this teacher ?
          </p>

          <p className="text-red-500 mt-3 text-sm">
            Once you delete it, you can,t bring it back.
          </p>

          <div className="mt-5 flex justify-end gap-5">
            <button
              onClick={handleDelete}
              className="py-2 px-4 bg-red-500 text-white rounded-md font-medium"
            >
              Delete
            </button>
            <button
              onClick={() => setDeleteTeacherId(null)}
              className="py-2 px-4 bg-slate-800 text-white rounded-md font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
