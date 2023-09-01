import React, { useEffect } from "react";

import { BsBook, BsQuestionLg } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { MdOutlineAssignment } from "react-icons/md";
import {
  useGetAllSubmittedAssignmentQuery,
  useGetQuizMarkByStudentQuery,
} from "../../../../features/coursesSlice/teacherApi";
import { useAppContext } from "../../../../context/AppContext";
type Props = {
  enrolledCourses: any;
  enrollCourseLoading: any;
  enrollCourseError: any;
  studentQuizMarks: any;
  quizMarkLoading: any;
  quizMarkError: any;
};

export default function Stats({
  enrolledCourses,
  enrollCourseLoading,
  enrollCourseError,
  studentQuizMarks,
  quizMarkLoading,
  quizMarkError,
}: Props) {
  const { currentUser } = useAppContext();
  let { data } = enrolledCourses || {};
  let quizCount = 0;

  if (Array.isArray(data)) {
    for (const course of data) {
      if (course && Array.isArray(course.videos)) {
        for (const video of course.videos) {
          if (
            video &&
            Array.isArray(video.quizzes) &&
            video.quizzes.length > 0
          ) {
            quizCount++;
          }
        }
      }
    }
  }

  let assignmentCount = 0;
  if (Array.isArray(data)) {
    for (const course of data) {
      if (course && Array.isArray(course.videos)) {
        for (const video of course.videos) {
          if (
            video &&
            Array.isArray(video.assignments) &&
            video.assignments.length > 0
          ) {
            assignmentCount++;
          }
        }
      }
    }
  }

  let submittedQuizCount = 0;
  const uniqueVideoIds = new Set();

  studentQuizMarks?.data?.forEach((item: any) => {
    if (!uniqueVideoIds.has(item.videoId._id)) {
      uniqueVideoIds.add(item.videoId._id);
      submittedQuizCount++;
    }
  });

  const {
    data: allSubmittedAssignment,
    isLoading: allSubmittedAssignmentLoading,
    isError: allSubmittedAssignmentError,
  } = useGetAllSubmittedAssignmentQuery(undefined);

  return (
    <div className="poppins my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
      <div className="flex items-center gap-5 bg-white p-3 py-5 rounded-md shadow-lg shadow-gray-200 border border-gray-200">
        <div className="bg-blue-500 h-10 w-10 ml-3 flex items-center justify-center rounded-full text-white ring-8 ring-blue-200/70">
          <BsBook size={18} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-500">Total Courses</h2>
          {enrollCourseLoading && <p>Loading...</p>}
          {!enrollCourseError && !enrollCourseLoading && (
            <p className="flex items-center">{enrolledCourses?.total}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-5 bg-white p-3 py-5 rounded-md shadow-lg shadow-gray-200 border border-gray-200">
        <div className="bg-violet-500 h-10 w-10 ml-3 flex items-center justify-center rounded-full text-white ring-8 ring-violet-200/70">
          <BsQuestionLg size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-500">Total Quizzes</h2>
          {enrollCourseLoading && <p>Loading...</p>}
          {!enrollCourseLoading && !enrollCourseLoading && (
            <p className="flex items-center">{quizCount}</p>
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
          {enrollCourseLoading && <p>Loading...</p>}
          {!enrollCourseLoading && !enrollCourseLoading && (
            <p className="flex items-center">{assignmentCount}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-5 bg-white p-3 py-5 rounded-md shadow-lg shadow-gray-200 border border-gray-200">
        <div className="bg-green-500 h-10 w-10 ml-3 flex items-center justify-center rounded-full text-white ring-8 ring-green-200/70">
          <BsQuestionLg size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-500">Quiz Submit</h2>
          {quizMarkLoading && <p>Loading...</p>}
          {!quizMarkError && !quizMarkLoading && (
            <p className="flex items-center">{submittedQuizCount}</p>
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
            <p className="flex items-center">
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
          {(enrollCourseLoading || quizMarkLoading) && <p>Loading...</p>}
          {!(enrollCourseError || quizMarkError) &&
            !(enrollCourseLoading || quizMarkLoading) && (
              <p className="flex items-center">
                {quizCount - submittedQuizCount}
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
          {(enrollCourseLoading || allSubmittedAssignmentLoading) && (
            <p>Loading...</p>
          )}
          {!(enrollCourseError || allSubmittedAssignmentError) &&
            !(enrollCourseLoading || allSubmittedAssignmentLoading) && (
              <p className="flex items-center">
                {assignmentCount - allSubmittedAssignment?.data?.length}
              </p>
            )}
        </div>
      </div>
    </div>
  );
}
