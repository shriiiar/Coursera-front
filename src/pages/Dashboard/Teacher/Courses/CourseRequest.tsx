import React from "react";
import CourseRequestRow from "./CourseRequestRow";

type Props = { myCourseRequest: any };

export default function CourseRequest({ myCourseRequest }: Props) {
  return (
    <div className="mt-3">
      <h3 className="text-xl font-bold">Requested course</h3>

      {myCourseRequest?.length > 0 ? (
        <div className="mt-5">
          <div className="overflow-x-auto  pb-20">
            <table className="table w-full">
              {/* head */}
              <thead className="">
                <tr>
                  <th className="py-5">SL</th>
                  <th className="py-5">Course Name</th>
                  <th className="py-5">Student Name</th>
                  <th className="py-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {myCourseRequest?.map((singleCourse: any, index: number) => (
                  <CourseRequestRow singleCourse={singleCourse} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-center font-medium text-lg mt-20">
          No Course Request Found
        </p>
      )}
    </div>
  );
}
