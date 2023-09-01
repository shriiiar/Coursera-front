import React, { useEffect } from "react";
import { useGiveAccessToStudentMutation } from "../../../features/coursesSlice/courseApi";
import { toast } from "react-hot-toast";

type Props = {
  student: any;
  courseId: string | undefined;
  refetch: any;
};

const StudentAccessRow = ({ student, courseId, refetch }: Props) => {
  // get form using hook form
  const [GiveAccess, { isSuccess, isError, isLoading }] =
    useGiveAccessToStudentMutation<any>({});

  // handle give access
  const handleGiveAccess = async () => {
    if (window.confirm("Are you sure wanna give him/her access?")) {
      await GiveAccess({
        id: courseId,
        body: {
          students: student?._id,
          multiple: false,
        },
      });
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error("something went wrong");
    }
    if (isSuccess) {
      toast.success("Successfully given access");
      refetch();
    }
  }, [isSuccess, isError]);
  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="">
            <div className=" w-12 h-12 grid place-items-center border bg-gray-50 text-xl font-bold">
              <span>{student?.name?.at(0)}</span>
            </div>
          </div>
          <div>
            <div className="font-bold">{student?.name}</div>
            <div className="text-sm opacity-50">{student?.email}</div>
          </div>
        </div>
      </td>
      <td>
        {student?.isVerified ? (
          <span className="badge badge-success">Verified</span>
        ) : (
          <span className="badge badge-error">Not Verified</span>
        )}
      </td>

      <th>
        <div className="flex items-center gap-2">
          <button
            onClick={handleGiveAccess}
            className={`btn btn-xs btn-outline btn-secondary ${
              isLoading ? "opacity-50" : " "
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Giving..." : " Give Access"}
          </button>
          <button className="btn btn-xs btn-outline btn-error">Suspend</button>
        </div>
      </th>
    </tr>
  );
};

export default StudentAccessRow;
