import React, { useState } from "react";
import StudentRow from "./StudentRow";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useGetAllEnrolledStudentsQuery } from "../../../../features/coursesSlice/courseApi";
import ComponentLoader from "../../../../components/ComponentLoader";
import NoDataFound from "../../../../components/ui/NoDataFound";
import ErrorComponent from "../../../../components/ui/ErrorComponent";
import PasswordChangeModal from "../../Profile/PasswordChangeModal";
import EmailChangeModal from "../../Profile/EmailChangeModal";

type Props = {};
const Students = (props: Props) => {
  const [isPasswordChangeModalOpen, setPasswordChangeModalOpen] =
    useState(null);
  const [isEmailChangeModalOpen, setEmailChangeModalOpen] = useState(null);
  // keyword state
  const [keyword, setKeyword] = useState("");
  // by course
  const [course, setCourse] = useState("");
  // by batch name
  const [batch, setBatch] = useState("");
  // by section name
  const [section, setSection] = useState("");
  const {
    data: students,
    isLoading,
    error,
  } = useGetAllEnrolledStudentsQuery({
    courseId: course,
    sectionName: section,
    batchName: batch,
    keyword,
  });


  if (isLoading) return <ComponentLoader />;
  if (error) return <ErrorComponent />;
  return (
    <div>
      <div className="flex items-center justify-between my-2 bg-slate-50 p-3">
        <h3 className="text-xl ml-4">All Enrolled Students</h3>
        <div className="filter-box flex items-center gap-3">
          {/* search box */}
          <div className="search-box flex items-start gap-1 flex-col">
            <label htmlFor="" className="text-sm">
              Search
            </label>
            <input
              type="search"
              name="search"
              id="search"
              title="Search by Name, Email, Phone, ID, Section, Batch"
              placeholder="Search by Name, Email, Phone, ID, Section, Batch"
              className="input input-bordered rounded-sm text-sm"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          {/* filter by course */}
          <div className="flex items-start gap-1 flex-col">
            <label htmlFor="" className="text-sm">
              Filter By Course
            </label>
            <select
              name=""
              id=""
              className="select select-bordered rounded-sm"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="">Select Course</option>
              {students?.filterData?.courses?.map((course: any) => (
                <option key={course?._id} value={course._id}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>
          {/* filter by batch */}
          <div className="flex items-start gap-1 flex-col">
            <label htmlFor="" className="text-sm">
              Filter By Batch
            </label>
            <select
              name=""
              id=""
              className="select select-bordered rounded-sm"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
            >
              <option value="">Select Batch</option>
              {students?.filterData?.batches?.map((batch: any) => (
                <option key={batch} value={batch}>
                  {batch}
                </option>
              ))}
            </select>
          </div>
          {/* filter by section */}
          <div className="flex items-start gap-1 flex-col">
            <label htmlFor="" className="text-sm">
              Filter By Section
            </label>
            <select
              name=""
              id=""
              className="select select-bordered rounded-sm"
              value={section}
              onChange={(e) => setSection(e.target.value)}
            >
              <option value="">Select Section</option>
              {students?.filterData?.sections?.map((section: any) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* All the Student List */}
      <div className="overflow-x-auto w-full my-3">
        {students?.total > 0 && (
          <>
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
                  <th>Student ID</th>
                  <th>Batch</th>
                  <th>Section</th>
                  <th>En Courses</th>
                  <th>Progress</th>
                  <th>Details</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students?.data?.map((student: any, index: number) => (
                  <StudentRow
                    ind={index}
                    key={student?._id}
                    student={student}
                    setPasswordChangeModalOpen={setPasswordChangeModalOpen}
                    setEmailChangeModalOpen={setEmailChangeModalOpen}
                  />
                ))}
              </tbody>
            </table>
            {/* pagination */}
            <div className="pagination flex items-center justify-between bg-slate-50 p-2 mt-4 my-3">
              <div>
                Show <strong>1</strong> items out of <strong>25</strong>
              </div>
              <ul className="flex items-center gap-1">
                <li className="p-2 px-4  cursor-pointer rounded bg-slate-50">
                  <BsChevronLeft />
                </li>
                <li className="p-2  px-4 cursor-pointer rounded bg-slate-300">
                  1
                </li>
                <li className="p-2 px-4  cursor-pointer rounded bg-slate-50">
                  2
                </li>
                <li className="p-2 px-4  cursor-pointer rounded bg-slate-50">
                  3
                </li>
                <li className="p-2 px-4  cursor-pointer rounded bg-slate-50">
                  <BsChevronRight />
                </li>
              </ul>
            </div>
          </>
        )}
        {
          // if no student found
          students?.total === 0 && (
            <div className="flex items-center justify-center bg-slate-50 p-3">
              <NoDataFound title={"No Student Found"} />
            </div>
          )
        }
      </div>
      {isPasswordChangeModalOpen && (
        <PasswordChangeModal
          setPasswordChangeModalOpen={setPasswordChangeModalOpen}
          userId={isPasswordChangeModalOpen}
        />
      )}
      {isEmailChangeModalOpen && (
        <EmailChangeModal
          userEmail={isEmailChangeModalOpen}
          setEmailChangeModalOpen={setEmailChangeModalOpen}
        />
      )}
    </div>
  );
};

export default Students;
