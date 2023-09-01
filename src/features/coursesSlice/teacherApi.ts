import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { SERVER_URL } from "../../config/config";
import Cookies from "universal-cookie";
const cookie = new Cookies();
const prepareHeaders = (headers: any) => {
  const token = cookie.get("token") as string | undefined;
  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }
  return headers;
};

const teacherApi = createApi({
  reducerPath: "teacherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/teacher`,
    prepareHeaders,
  }),
  tagTypes: ["Teacher", "Quiz", "Assignment"],
  endpoints: (builder) => ({
    getCoursesForTeacher: builder.query({
      query: (id) => `/teacher/${id}`,
      providesTags: ["Teacher"],
    }),
    getCourseByTeacher: builder.query({
      query: (id) => `/teacher/course/${id}`,
      providesTags: ["Teacher"],
    }),
    createCourse: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Teacher"],
    }),
    editCourse: builder.mutation({
      query: (body) => ({
        url: `/course/edit/${body.courseId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Teacher"],
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/course/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teacher"],
    }),

    getCourseById: builder.query({
      query: (id) => `/course/${id}`,
      providesTags: ["Teacher"],
    }),

    // add milestone
    addMilestone: builder.mutation({
      query: (data) => ({
        url: `/add-milestone/${data?.id}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["Teacher"],
    }),
    // get milestones by course id
    getMilestoneByCourse: builder.query({
      query: (id) => `/milestone/${id}`,
      providesTags: ["Teacher"],
    }),

    // add module to milestone
    addModuleToMilestone: builder.mutation({
      query: (data) => ({
        url: `/add-module/${data?.id}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["Teacher"],
    }),
    // get module by milestone
    getModuleByMilestone: builder.query({
      query: (id) => `/module/${id}`,
      providesTags: ["Teacher"],
    }),
    // get modules by course id
    getModulesByCourse: builder.query({
      query: (id) => `/module/course/${id}`,
      providesTags: ["Teacher"],
    }),

    // add videos to the modules
    addVideoToModule: builder.mutation({
      query: (body) => ({
        url: `/add-video/${body?.id}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Teacher"],
    }),
    // update videos to the modules
    // updateVideoToModule: builder.mutation({
    //   query: (body) => ({
    //     url: `/course/video/update/${body.id}`,
    //     method: "PATCH",
    //     body: body,
    //   }),
    //   invalidatesTags: ["Teacher"],
    // }),
    // addAssignmentToModule to the modules
    addAssignmentToModule: builder.mutation({
      query: (data) => ({
        url: `/add-assignment`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["Teacher"],
    }),
    // get videos by module id

    getVideosByModule: builder.query({
      query: (id) => `/course/video/${id}`,
      providesTags: ["Teacher"],
    }),

    /////////////////////////////////
    updateVideosById: builder.mutation({
      query: (body) => ({
        url: `/course/video/update/${body._id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Teacher"],
    }),

    // get all students who are not enrolled yet
    getNotEnrolledStudentsInCourse: builder.query({
      query: (data: any) =>
        `/courses/not-enrolled-student/${data?.id}?q=${data?.keyword}`,
      providesTags: ["Teacher"],
    }),

    // give access to the student
    giveAccessToStudent: builder.mutation({
      query: (data: any) => ({
        url: `/student/access/${data?.id}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["Teacher"],
    }),

    // get all the enrolled students for particular course
    getEnrolledStudentsInCourse: builder.query({
      query: (data: any) => `/enrolled-students/${data?.id}?q=${data?.keyword}`,
      providesTags: ["Teacher"],
    }),

    // remove student from course
    removeStudentFromCourse: builder.mutation({
      query: (data: any) => ({
        url: `/remove-student-from-course/${data?.courseId}/${data?.studentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teacher"],
    }),

    // for student

    // get all courses for student
    getEnrolledCoursesForStudent: builder.query({
      query: (id?: any) => `/enrolled-courses/student`,
      providesTags: ["Teacher"],
    }),

    // for teacher
    getAllEnrolledStudents: builder.query({
      query: (data?: any) =>
        `/all-enrolled-students?q=${data?.keyword}&courseId=${data?.courseId}&batchName=${data?.batchName}&sectionName=${data?.sectionName}`,
      providesTags: ["Teacher"],
    }),

    ///get assignment by id

    getAssignmentById: builder.query({
      query: (assignmentId?: any) => `/course/get-assignment/${assignmentId}`,
      providesTags: ["Teacher", "Assignment"],
    }),
    ///get assignment by id

    addAssignmentToVideo: builder.mutation({
      query: (data) => ({
        url: `/add-assignment`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Teacher", "Assignment"],
    }),
    updateAssignment: builder.mutation({
      query: (body) => ({
        url: `/course/update-assignment/${body._id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Teacher"],
    }),
    getAllAssignments: builder.query({
      query: (id) => ({
        url: `get-all-assignment/${id}`,
      }),
    }),

    addQuiz: builder.mutation({
      query: (data: any) => ({
        url: `/add-quiz`,
        method: "POST",
        body: data,
      }),
    }),
    addQuizMark: builder.mutation({
      query: (data: any) => ({
        url: `/add-quiz-mark`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Quiz"],
    }),
    getQuizMarkByStudent: builder.query({
      query: (studentId: any) => ({
        url: `/get-quiz-mark/${studentId}`,
      }),
      providesTags: ["Quiz"],
    }),
    getAllQuiz: builder.query({
      query: (id: any) => ({
        url: `/get-all-quiz/${id}`,
      }),
    }),
    getAllSubmittedQuiz: builder.query({
      query: (id: any) => ({
        url: `/get-all-submitted-quiz/${id}`,
      }),
    }),
    getAllSubmittedAssignment: builder.query({
      query: () => ({
        url: `/get-all-submitted-assignment`,
      }),
      providesTags: ["Assignment"],
    }),
    createNotification: builder.mutation({
      query: (data: any) => ({
        url: `/addNotification`,
        method: "POST",
        body: data,
      }),
    }),
    getNotification: builder.query({
      query: ({ teacher, student }) => ({
        url: `/getNotification?student=${student}&teacher=${teacher}`,
      }),
    }),
    createAssignmentMark: builder.mutation({
      query: (data: any) => ({
        url: `/assignment/add-marks/${data?.submissionId}`,
        method: "POST",
        body: data,
      }),
    }),
    getAssignmentMarkById: builder.query({
      query: (id: any) => ({
        url: `/assignment/get-marks/${id}`,
      }),
    }),
    deleteSubmittedAssignment: builder.mutation({
      query: (id) => ({
        url: `/delete-submitted-assignment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Assignment"],
    }),
  }),
});

export const {
  useGetCoursesForTeacherQuery,
  useGetCourseByTeacherQuery,
  useCreateCourseMutation,
  useEditCourseMutation,
  useDeleteCourseMutation,
  useAddMilestoneMutation,
  useGetMilestoneByCourseQuery,
  useAddModuleToMilestoneMutation,
  useGetModuleByMilestoneQuery,
  useGetModulesByCourseQuery,
  useAddVideoToModuleMutation,
  useUpdateVideosByIdMutation,
  useAddAssignmentToModuleMutation,
  useGetVideosByModuleQuery,
  useGetNotEnrolledStudentsInCourseQuery,
  useGiveAccessToStudentMutation,
  useGetEnrolledStudentsInCourseQuery,
  useRemoveStudentFromCourseMutation,
  useGetEnrolledCoursesForStudentQuery,
  useGetCourseByIdQuery,
  useGetAllEnrolledStudentsQuery,
  useGetAssignmentByIdQuery,
  useAddAssignmentToVideoMutation,
  useUpdateAssignmentMutation,
  useAddQuizMutation,
  useAddQuizMarkMutation,
  useGetQuizMarkByStudentQuery,
  useGetAllQuizQuery,
  useGetAllAssignmentsQuery,
  useGetAllSubmittedQuizQuery,
  useGetAllSubmittedAssignmentQuery,
  useCreateNotificationMutation,
  useGetNotificationQuery,
  useCreateAssignmentMarkMutation,
  useGetAssignmentMarkByIdQuery,
  useDeleteSubmittedAssignmentMutation
} = teacherApi;
export default teacherApi;
