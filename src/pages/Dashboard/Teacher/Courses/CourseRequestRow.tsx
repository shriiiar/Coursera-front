import React, { useEffect } from "react";
import {
  useDeleteCourseRequestMutation,
  useGiveAccessToStudentMutation,
} from "../../../../features/coursesSlice/courseApi";
import { toast } from "react-hot-toast";

type Props = { singleCourse: any; index: number };

export default function CourseRequestRow({ singleCourse, index }: Props) {
  const [GiveAccess, { isSuccess, isError, isLoading }] =
    useGiveAccessToStudentMutation<any>({});
  const [
    deleteCourseRequest,
    { isSuccess: deleteCourseSuccess, isLoading: deleteCourseLoading },
  ] = useDeleteCourseRequestMutation();
  const handleGiveAccess = async () => {
    if (window.confirm("Are you sure wanna give him/her access?")) {
      await GiveAccess({
        id: singleCourse?.course?._id,
        body: {
          students: singleCourse?.user?._id,
          multiple: false,
        },
      });
    }
  };

  const handleDeleteCourseRequest = () => {
    deleteCourseRequest(singleCourse?._id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully granted access");
      handleDeleteCourseRequest();
    }
  }, [isSuccess]);

  return (
    <tr key={singleCourse?._id} className="hover">
      <th>{index}</th>
      <td>{singleCourse?.course?.courseName}</td>
      <td>{singleCourse?.user?.name}</td>
      <td>
        <div className="dropdown dropdown-left">
          <button
            tabIndex={0}
            className="cursor-pointer bg-blue-500 text-white font-medium px-3 py-1 rounded-md text-sm"
          >
            Action
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-32"
          >
            <li className="my-1 text-center">
              <span
                onClick={handleGiveAccess}
                className="p-1.5 text-white bg-violet-500 text-center block text-sm font-medium"
              >
                Approve
              </span>
            </li>
            <li className="my-1">
              <span
                onClick={handleDeleteCourseRequest}
                className="bg-red-500 p-1.5 text-white text-center block text-sm font-medium"
              >
                Decline
              </span>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
}
