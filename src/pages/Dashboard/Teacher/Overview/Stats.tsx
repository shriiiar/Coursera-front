import React from "react";
import { FaUser } from "react-icons/fa";
import { BsBook, BsQuestionLg } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { MdOutlineAssignment } from "react-icons/md";
import { useGetAllEnrolledStudentsQuery } from "../../../../features/coursesSlice/courseApi";
type Props = {
  students: any;
  studentsLoading: any;
  studentsError: any;
  courses: any;
  coursesLoading: any;
  coursesError: any;
  allQuizzes: any;
  allQuizLoading: any;
  allQuizError: any;
  allAssignments: any;
  allAssignmentLoading: any;
  allAssignmentError: any;
  allSubmittedQuizzes: any;
  allSubmittedQuizLoading: any;
  allSubmittedQuizError: any;
  allSubmittedAssignment: any;
  allSubmittedAssignmentLoading: any;
  allSubmittedAssignmentError: any;
};

export default function Stats({
  students,
  studentsLoading,
  studentsError,
  courses,
  coursesLoading,
  coursesError,
  allQuizzes,
  allQuizLoading,
  allQuizError,
  allAssignments,
  allAssignmentLoading,
  allAssignmentError,
  allSubmittedQuizzes,
  allSubmittedQuizLoading,
  allSubmittedQuizError,
  allSubmittedAssignment,
  allSubmittedAssignmentLoading,
  allSubmittedAssignmentError,
}: Props) {
  let quizCount = 0;
  const uniqueVideoIds = new Set();
  allQuizzes?.data?.forEach((item: any) => {
    if (!uniqueVideoIds.has(item.videos._id)) {
      uniqueVideoIds.add(item.videos._id);
      quizCount++;
    }
  });

  return (
    <div className="poppins my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
      <div className="flex items-center gap-5 bg-white p-3 py-5 rounded-md shadow-lg shadow-gray-200 border border-gray-200">
        <div className="bg-purple-500 h-10 w-10 ml-3 flex items-center justify-center rounded-full text-white ring-8 ring-purple-200/70">
          <FaUser size={18} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-500">Total Students</h2>
          {studentsLoading && <p>Loading...</p>}
          {!studentsError && !studentsLoading && (
            <p className="flex items-center">{students?.data?.length}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-5 bg-white p-3 py-5 rounded-md shadow-lg shadow-gray-200 border border-gray-200">
        <div className="bg-blue-500 h-10 w-10 ml-3 flex items-center justify-center rounded-full text-white ring-8 ring-blue-200/70">
          <BsBook size={18} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-500">Total Courses</h2>
          {coursesLoading && <p>Loading...</p>}
          {!coursesError && !coursesLoading && (
            <p className="flex items-center">{courses?.courses?.length}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-5 bg-white p-3 py-5 rounded-md shadow-lg shadow-gray-200 border border-gray-200">
        <div className="bg-violet-500 h-10 w-10 ml-3 flex items-center justify-center rounded-full text-white ring-8 ring-violet-200/70">
          <BsQuestionLg size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-500">Total Quizzes</h2>
          {allQuizLoading && <p>Loading...</p>}
          {!allQuizError && !allQuizLoading && (
            <p className="flex items-center ">{quizCount}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-5 bg-white p-3 py-5 rounded-md shadow-lg shadow-gray-200 border border-gray-200">
        <div className="bg-pink-500 h-10 w-10 ml-3 flex items-center justify-center rounded-full text-white ring-8 ring-pink-200/70">
          <MdOutlineAssignment size={18} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-500">
            Total Assignments
          </h2>
          {allAssignmentLoading && <p>Loading...</p>}
          {!allAssignmentError && !allAssignmentLoading && (
            <p className="flex items-center">{allAssignments?.data?.length}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-5 bg-white p-3 py-5 rounded-md shadow-lg shadow-gray-200 border border-gray-200">
        <div className="bg-green-500 h-10 w-10 ml-3 flex items-center justify-center rounded-full text-white ring-8 ring-green-200/70">
          <BsQuestionLg size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-500">Quiz Submit</h2>
          {allSubmittedQuizLoading && <p>Loading...</p>}
          {!allSubmittedQuizError && !allSubmittedQuizLoading && (
            <p className="flex items-center">
              {allSubmittedQuizzes?.data?.length}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-5 bg-white p-3 py-5 rounded-md shadow-lg shadow-gray-200 border border-gray-200">
        <div className="bg-green-500 h-10 w-10 ml-3 flex items-center justify-center rounded-full text-white ring-8 ring-green-200/70">
          <MdOutlineAssignment size={18} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-500">
            Assignment Submit
          </h2>
          {allSubmittedAssignmentLoading && <p>Loading...</p>}
          {!allSubmittedAssignmentError && !allSubmittedAssignmentLoading && (
            <p className="flex items-center ">
              {allSubmittedAssignment?.data?.length}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-5 bg-white p-3 py-5 rounded-md shadow-lg shadow-gray-200 border border-gray-200">
        <div className="bg-red-500 h-10 w-10 ml-3 flex items-center justify-center rounded-full text-white ring-8 ring-red-200/70">
          <IoClose size={18} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-500">Unsubmitted Quiz</h2>
          {(studentsLoading || allSubmittedQuizLoading) && <p>Loading...</p>}
          {!(studentsError || allSubmittedQuizError) &&
            !(studentsLoading || allSubmittedQuizLoading) && (
              <p className="flex items-center">
                {students?.data?.length * quizCount -
                  allSubmittedQuizzes?.data?.length}
              </p>
            )}
        </div>
      </div>
      <div className="flex items-center gap-5 bg-white p-3 py-5 rounded-md shadow-lg shadow-gray-200 border border-gray-200">
        <div className="bg-red-500 h-10 w-10 ml-3 flex items-center justify-center rounded-full text-white ring-8 ring-red-200/70">
          <IoClose size={18} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-500">
            Unsubmitted Assignment
          </h2>
          {(studentsLoading || allSubmittedAssignmentLoading) && (
            <p>Loading...</p>
          )}
          {!(studentsError || allSubmittedAssignmentError) &&
            !(studentsLoading || allSubmittedAssignmentLoading) && (
              <p className="flex items-center">
                {students?.data?.length * allAssignments?.data?.length -
                  allSubmittedAssignment?.data?.length}
              </p>
            )}
        </div>
      </div>
    </div>
  );
}
