import React, { useEffect } from "react";

import { BiTrashAlt, BiVolumeMute } from "react-icons/bi";
import { BsCreditCard, BsEye, BsSend } from "react-icons/bs";
import { useRemoveStudentFromCourseMutation } from "../../../../../../features/coursesSlice/courseApi";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
type Props = {
  student: any;
  courseId: string | undefined;
};

const EnrolledStudentRow = ({ student, courseId }: Props) => {
  const [removeStudent, { isLoading, isSuccess, isError, error }] =
    useRemoveStudentFromCourseMutation();

  // handle remove student
  const handleRemoveStudent = async () => {
    if (window.confirm("Are you sure you wanna remove this student?")) {
      await removeStudent({
        courseId: courseId,
        studentId: student?._id,
      }).unwrap();
    }
  };

  // handle error and success
  useEffect(() => {
    if (isSuccess) {
      toast.success("Student removed successfully");
    }
    if (isError) {
      toast.error("Something went wrong");
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
        Course Progress <span className="badge badge-ghost">70%</span>
        <br />
        <progress
          className="progress progress-primary w-56"
          value="70"
          max="100"
        ></progress>
      </td>

      <td>
        <div className="flex items-center gap-1">
        <Link
            to={`/teacher/dashboard/students/${student?._id}`}
            data-tip="View"
            className="btn btn-primary btn-outline btn-sm btn-circle tooltip grid place-items-center tooltip-primary"
          >
            <BsEye />
          </Link>
          
          <button
            data-tip="Remove"
            onClick={handleRemoveStudent}
            className="btn btn-error btn-outline btn-sm btn-circle tooltip grid place-items-center tooltip-primary"
          >
            <BiTrashAlt />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default EnrolledStudentRow;
