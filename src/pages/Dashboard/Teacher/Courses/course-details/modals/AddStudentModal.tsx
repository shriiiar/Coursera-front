import React, { useEffect, useState } from "react";
import {
  useAddModuleToMilestoneMutation,
  useGetMilestoneByCourseQuery,
  useGetNotEnrolledStudentsInCourseQuery,
  useGiveAccessToStudentMutation,
} from "../../../../../../features/coursesSlice/courseApi";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useGetAllUserByTeacherQuery } from "../../../../../../features/api/userApi";
import StudentAccessRow from "../../../../../../components/Teacher/EnroledStudent/StudentAccessRow";

type Props = {
  course: any;
};

const AddStudentModal = ({ course }: Props) => {
  // select student type
  const [selectType, setSelectType] = useState<string>("all");
  const [keyword, setKeyword] = useState<string>("");
  // get all the student
  const {
    data: students,
    isLoading: stuLoading,
    refetch,
  } = useGetNotEnrolledStudentsInCourseQuery({ id: course?._id, keyword });

  // get form using hook form
  const [GiveAccess, { isSuccess, isError, isLoading }] =
    useGiveAccessToStudentMutation<any>({});

  const giveAccessToAllStudent = async () => {
    if (
      window.confirm(
        "Are you sure to give access to all the students in course?"
      )
    ) {
      await GiveAccess({
        id: course?._id,
        body: {
          students: students?.data?.map((item: any) => item._id),
          multiple: true,
        },
      });
    }
  };

  // handle error and success
  useEffect(() => {
    if (isSuccess) {
      toast.success(`module added successfully to this milestone.`);
    }
    if (isError) {
      toast.error(`Something went wrong.`);
    }
  }, [isSuccess, isError]);

  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="add-student-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative w-11/12 max-w-3xl">
          <label
            htmlFor="add-student-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2 btn-primary"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            <span className="text-base">Add Student to this course</span>
          </h3>

          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Student type.</span>
              </label>

              <select
                className="select select-bordered w-full"
                onChange={(e) => setSelectType(e.target.value)}
                value={selectType}
              >
                <option value={""} hidden>
                  select type
                </option>
                <option value={"all"}>All Student</option>
                <option value={"single"}>Specific Student </option>
              </select>
            </div>

            {/* all student list */}
            {selectType === "single" && (
              <>
                {stuLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="loader">Students are Loading...</div>
                  </div>
                ) : (
                  <>
                    <div className="form-control">
                      <div className="flex items-center justify-between py-3">
                        <label className="label">
                          <span className="label-text">All Student List.</span>
                        </label>
                        {/* search  */}
                        <div className="relative text-gray-600">
                          <input
                            type="search"
                            name="search"
                            placeholder="Search"
                            className="input input-ghost input-sm"
                            onInput={(e) => setKeyword(e.currentTarget.value)}
                            value={keyword}
                          />
                        </div>
                      </div>
                      {students?.data?.length > 0 ? (
                        <>
                          <div className="overflow-x-auto w-full max-h-80">
                            <table className="table w-full table-compact">
                              {/* head */}
                              <thead>
                                <tr>
                                  <th>
                                    <label htmlFor="">
                                      <input
                                        type="checkbox"
                                        className="checkbox"
                                      />
                                    </label>
                                  </th>
                                  <th>Name</th>
                                  <th>Verified</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {/* row 1 */}
                                {students?.data?.map((student: any) => (
                                  <StudentAccessRow
                                    courseId={course?._id}
                                    student={student}
                                    key={student?._id}
                                    refetch={refetch}
                                  />
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-center py-4">
                            No One Yet for Enrolled
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          {selectType === "all" &&
            (isLoading ? (
              <button className="btn btn-primary mt-5 w-full  opacity-40 cursor-not-allowed pointer-events-none">
                Loading..
              </button>
            ) : students?.data?.length > 0 ? (
              <button
                className="btn btn-primary mt-5 w-full "
                onClick={giveAccessToAllStudent}
              >
                Add {students?.data?.length} Students to this course
              </button>
            ) : (
              <button className="btn btn-primary mt-5 w-full  opacity-70 cursor-not-allowed pointer-events-none">
                You don't have enough students for add
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AddStudentModal;
