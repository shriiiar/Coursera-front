import React, { useEffect } from "react";
import Navbar from "../../shared/Navbar";
import {
  useCreateCourseRequestMutation,
  useDeleteCourseRequestMutation,
  useGetAllCoursesQuery,
  useGetAllRequestedCourseQuery,
} from "../../features/coursesSlice/courseApi";
import ComponentLoader from "../../components/ComponentLoader";
import { useAppContext } from "../../context/AppContext";
import { TbCurrencyTaka } from "react-icons/tb";
import { SiLevelsdotfyi } from "react-icons/si";
import { BiTimeFive, BiCategoryAlt } from "react-icons/bi";
import { HiUser } from "react-icons/hi";
import { IoLanguageOutline } from "react-icons/io5";
import { toast } from "react-hot-toast";
type Props = {};

export default function Courses({}: Props) {
  useEffect(() => {
    scroll(0, 0);
  });

  const { currentUser } = useAppContext();
  const { data, isLoading, isSuccess, isError } =
    useGetAllCoursesQuery(undefined);
  const { data: allCourses } = data || {};
  const {
    data: requestedCourse,
    isLoading: getRequestedLoading,
    isSuccess: getRequestedSuccess,
  } = useGetAllRequestedCourseQuery(undefined);
  
  const { data: allRequestedCourse } = requestedCourse || {};

  const [
    createCourseRequest,
    { isLoading: requestLoading, isSuccess: requestSuccess },
  ] = useCreateCourseRequestMutation();

  const [
    deleteCourseRequest,
    { isSuccess: deleteCourseSuccess, isLoading: deleteCourseLoading },
  ] = useDeleteCourseRequestMutation();

  useEffect(() => {
    if (requestSuccess) {
      toast.success("Course requested successfully", { id: "course-request" });
    }
  }, [requestSuccess]);

  let content = null;

  if (isLoading) {
    content = <ComponentLoader />;
  } else if (!isLoading && isError) {
    content = (
      <p className="text-center mt-5 text-red-500">Something went wrong!</p>
    );
  } else if (!isLoading && !isError && allCourses?.length === 0) {
    content = (
      <div className="text-center mt-5 text-red-500 text-xl font-medium">
        No course found!
      </div>
    );
  } else if (!isLoading && !isError && allCourses?.length > 0) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 my-10">
        {allCourses?.map((course: any, index: number) => (
          <div className="">
            <div className="max-w-xs h-full flex flex-col gap-2 justify-between bg-[#F2F7FF] shadow-md shadow-gray-200 rounded-md ring-1 ring-gray-200">
              <div>
                <img
                  src={
                    course.image
                      ? course.image
                      : "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  }
                  alt={course.courseName}
                  className="w-full h-52 object-cover rounded-t-md"
                />
                <div>
                  <h3 className="font-medium text-xl p-3 mt-2">
                    {course.courseName}
                  </h3>
                </div>
              </div>

              <div className="flex items-center justify-between px-3 mt-2 text-sm">
                <p className="flex items-center gap-2">
                  <span className="bg-slate-200 p-1 rounded-full">
                    <BiCategoryAlt size={19} className="" />
                  </span>
                  <span className="font-medium">{course.category}</span>
                </p>
              </div>
              <div className="px-3 flex items-center justify-between pb-3 mt-2 text-sm">
                <p className="flex items-center gap-2">
                  <span className="bg-slate-200 p-2 rounded-full">
                    <SiLevelsdotfyi size={12} className="" />
                  </span>
                  <span className="font-medium">{course.level}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">
                    {course.students?.length} Students
                  </span>
                  <span className="bg-slate-200 p-1 rounded-full">
                    <HiUser size={19} className="" />
                  </span>
                </p>
              </div>
              <div className="px-3 flex items-center justify-between pb-3 text-sm">
                <p className="flex items-center gap-2">
                  <span className="bg-slate-200 p-1 rounded-full">
                    <IoLanguageOutline size={18} className="" />
                  </span>
                  <span className="font-medium">{course.language}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">{course.duration}</span>
                  <span className="bg-slate-200 p-1 rounded-full">
                    <BiTimeFive size={20} className="" />
                  </span>
                </p>
              </div>
              <div className="px-3 pb-3">
                {course?.students?.includes(currentUser?._id) && (
                  <p className="bg-purple-600 w-full text-white py-2 rounded-md font-medium cursor-not-allowed text-center">
                    Enrolled
                  </p>
                )}
                {allRequestedCourse?.some(
                  (obj: any) => obj.user?._id === currentUser?._id
                ) &&
                  allRequestedCourse?.some(
                    (obj: any) => obj.course?._id === course?._id
                  ) && (
                    <button
                      onClick={() => deleteCourseRequest(currentUser?._id)}
                      className="bg-orange-500 w-full text-white py-2 rounded-md font-medium text-center"
                    >
                      Cancel Request
                    </button>
                  )}
                {!course?.students?.includes(currentUser?._id) &&
                  !(
                    allRequestedCourse?.some(
                      (obj: any) => obj.user?._id === currentUser?._id
                    ) &&
                    allRequestedCourse?.some(
                      (obj: any) => obj.course?._id === course?._id
                    )
                  ) && (
                    <button
                      disabled={requestLoading}
                      onClick={() =>
                        createCourseRequest({ course: course?._id })
                      }
                      className="bg-gradient-to-tr from-violet-500 to-blue-500 w-full text-white py-2 rounded-md font-medium"
                    >
                      Enroll
                    </button>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <>
      <Navbar />

      <div className="container mx-auto mt-10">
        {currentUser?.role !== "student" ? (
          <p className="text-center font-medium text-lg uppercase">
            This page only for student
          </p>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-12 pl-3">Our Courses</h2>
            <div>{content}</div>
          </>
        )}
      </div>
    </>
  );
}
