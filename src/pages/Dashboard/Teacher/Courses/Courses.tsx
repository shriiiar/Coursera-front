import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import CourseCard from "../../../../components/Teacher/Courses/CourseCard";
import AddCourseModal from "./AddCourseModal";
import { useGetCoursesForTeacherQuery } from "../../../../features/coursesSlice/courseApi";
import { useAppContext } from "../../../../context/AppContext";
import ComponentLoader from "../../../../components/ComponentLoader";
import NoDataFound from "../../../../components/ui/NoDataFound";

type Props = {};

function Courses(Props: any) {
  const colorClasses = ["card-color-1", "card-color-2", "card-color-3"]; // Add more class names as needed

  const navigate = useNavigate();
  const { currentUser } = useAppContext();
  // get all the course
  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useGetCoursesForTeacherQuery(currentUser?._id, { skip: !currentUser });

  return (
    <>
      <AddCourseModal />
      <div>
        <div className="title flex items-center justify-between py-1 my-1">
          <h1 className="text-xl font-medium">All Courses</h1>
          <label htmlFor="add-course-modal" className="btn btn-primary btn-sm">
            Add New Course
          </label>
        </div>
        <div className="">
          {isLoading ? (
            <ComponentLoader />
          ) : isError ? (
            <div>Something went wrong Sir.</div>
          ) : (
            <>
              {courses?.courses?.length > 0 ? (
                <div className="mt-6 grid w-11/12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto">
                  {courses?.courses?.map(
                    (item: any, index: number, className: any) => (
                      <CourseCard
                        key={item?._id}
                        item={item}
                        className={colorClasses[index % colorClasses.length]}
                      />
                    )
                  )}
                </div>
              ) : (
                <NoDataFound title={"No Courses Found."} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Courses;
