import React from "react";
import { useGetEnrolledCoursesForStudentQuery } from "../../../../features/coursesSlice/courseApi";
import EnrolledCourseCard from "./EnrolledCourseCard";
import ComponentLoader from "../../../../components/ComponentLoader";
import CourseCard from "../../../../components/Teacher/Courses/CourseCard";

type Props = {};

const EnrolledCourses = (props: Props) => {
  const {
    data: enrolledCourseData,
    isLoading,
    isError,
  } = useGetEnrolledCoursesForStudentQuery({});
  const colorClasses = ["card-color-1", "card-color-2", "card-color-3"];
  return (
    <div>
      <div className="title flex items-center justify-between my-2 p-3 rounded">
        <h3 className="text-2xl flex items-center gap-2">
          <span className="text-xl">Enrolled Courses</span>
          <span className="text-lg  badge badge-primary badge-lg">
            {enrolledCourseData?.total}
          </span>
        </h3>
      </div>
      {isLoading ? (
        <ComponentLoader />
      ) : (
        <>
          {enrolledCourseData?.total === 0 ? (
            <div className="text-center text-2xl font-semibold">
              No course enrolled yet.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {enrolledCourseData?.data?.map((course: any, index: number) => (
                  <CourseCard
                    key={course._id}
                    item={course}
                    className={colorClasses[index % colorClasses.length]}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default EnrolledCourses;
