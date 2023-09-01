import React, { useEffect, useState } from "react";
import { BiTrashAlt, BiVolumeMute } from "react-icons/bi";
import { BsCreditCard, BsEye, BsSend } from "react-icons/bs";
import AddStudentModal from "../modals/AddStudentModal";
import EnrolledStudentRow from "./EnrolledStudentRow";
import { useGetEnrolledStudentsInCourseQuery } from "../../../../../../features/coursesSlice/courseApi";
import { toast } from "react-hot-toast";
import ComponentLoader from "../../../../../../components/ComponentLoader";
import NoDataFound from "../../../../../../components/ui/NoDataFound";

type Props = {
  course: any;
};

const EnrolledStudents = ({ course }: Props) => {
  // search student state
  const [keyword, setKeyword] = useState<string>("");
  // get all the enrolled students
  const {
    data: enrolledStudents,
    isLoading: studentLoading,
    error: studentError,
    isSuccess,
  } = useGetEnrolledStudentsInCourseQuery({ id: course?._id, keyword });

  // handle error and success
  useEffect(() => {
    if (isSuccess) {
      // toast.success(`module added successfully to this milestone.`);
    }
    if (studentError) {
      toast.error(`Something went wrong.`);
    }
  }, [isSuccess, studentError, enrolledStudents?.data?.length]);

  return (
    <div>
      <AddStudentModal course={course} />
      {studentLoading ? (
        <ComponentLoader />
      ) : (
        <>
          <div className="title flex items-center justify-between my-3">
            <h3 className="text-xl font-bold">Enrolled Students</h3>
            <div className="flex items-center gap-2">
              {enrolledStudents?.total > 0 && (
                <input
                  type="text"
                  className="input  input-bordered input-sm w-56"
                  placeholder="Search By Student Name"
                  value={keyword}
                  onInput={(e) => setKeyword(e.currentTarget.value)}
                />
              )}
              <label
                htmlFor="add-student-modal"
                className="btn btn-ghost btn-outline btn-sm"
              >
                Add Student
              </label>
            </div>
          </div>
          {enrolledStudents?.total > 0 && (
            <>
              {/* students list */}
              {enrolledStudents?.data?.length === 0 && (
                <div className="flex items-center justify-center">
                  <div className="">
                    No Student Enrolled by this <b>{keyword}</b>.
                  </div>
                </div>
              )}
              {enrolledStudents?.data?.length > 0 && (
                <div className="overflow-x-auto w-full">
                  <table className="table w-full">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>
                          <label>
                            <input type="checkbox" className="checkbox" />
                          </label>
                        </th>
                        <th>Name</th>
                        <th> Progress</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      {enrolledStudents?.data?.map((student: any) => (
                        <EnrolledStudentRow
                          student={student}
                          key={student?._id}
                          courseId={course?._id}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
          {enrolledStudents?.total === 0 && (
            <NoDataFound title={"Enrolled Students not yet."} />
          )}
        </>
      )}
    </div>
  );
};

export default EnrolledStudents;
