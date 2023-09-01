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

const coursesApi = createApi({
  reducerPath: "coursesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/courses`,
    prepareHeaders,
  }),
  tagTypes: ["Course", "CourseRequest"],
  endpoints: (builder) => ({
    getCoursesForTeacher: builder.query({
      query: (id) => `/teacher/${id}`,
      providesTags: ["Course"],
    }),
    getCourseByTeacher: builder.query({
      query: (id) => `/teacher/course/${id}`,
      providesTags: ["Course"],
    }),
    createCourse: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Course"],
    }),
    editCourse: builder.mutation({
      query: (body) => ({
        url: `/edit/${body.courseId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Course"],
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),

    getCourseById: builder.query({
      query: (id) => `/course/${id}`,
      providesTags: ["Course"],
    }),

    // add milestone
    addMilestone: builder.mutation({
      query: (data) => ({
        url: `/add-milestone/${data?.id}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["Course"],
    }),
    // get milestones by course id
    getMilestoneByCourse: builder.query({
      query: (id) => `/milestone/${id}`,
      providesTags: ["Course"],
    }),

    // add module to milestone
    addModuleToMilestone: builder.mutation({
      query: (data) => ({
        url: `/add-module/${data?.id}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["Course"],
    }),
    // get module by milestone
    getModuleByMilestone: builder.query({
      query: (id) => `/module/${id}`,
      providesTags: ["Course"],
    }),
    // get modules by course id
    getModulesByCourse: builder.query({
      query: (id) => `/module/course/${id}`,
      providesTags: ["Course"],
    }),

    // add videos to the modules
    addVideoToModule: builder.mutation({
      query: (data) => ({
        url: `/add-video/${data?.id}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["Course"],
    }),
    // addAssignmentToModule to the modules
    addAssignmentToModule: builder.mutation({
      query: (data) => ({
        url: `/add-assignment`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["Course"],
    }),
    // get videos by module id
    getVideosByModule: builder.query({
      query: (id) => `/video/${id}`,
      providesTags: ["Course",],
    }),
    updateVideosById: builder.query({
      query: (body) => ({
        url: `/video/update/${body._id}`,
        method: "POST",
        body: body,
      }),

      providesTags: ["Course"],
    }),

    // get all students who are not enrolled yet
    getNotEnrolledStudentsInCourse: builder.query({
      query: (data: any) =>
        `/courses/not-enrolled-student/${data?.id}?q=${data?.keyword}`,
      providesTags: ["Course"],
    }),

    // give access to the student
    giveAccessToStudent: builder.mutation({
      query: (data: any) => ({
        url: `/student/access/${data?.id}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["Course", "CourseRequest"],
    }),

    // get all the enrolled students for particular course
    getEnrolledStudentsInCourse: builder.query({
      query: (data: any) => `/enrolled-students/${data?.id}?q=${data?.keyword}`,
      providesTags: ["Course"],
    }),

    // remove student from course
    removeStudentFromCourse: builder.mutation({
      query: (data: any) => ({
        url: `/remove-student-from-course/${data?.courseId}/${data?.studentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),

    // for student

    // get all courses for student
    getEnrolledCoursesForStudent: builder.query({
      query: (id?: any) => `/enrolled-courses/student`,
      providesTags: ["Course"],
    }),

    // for teacher
    getAllEnrolledStudents: builder.query({
      query: (data?: any) =>
        `/all-enrolled-students?q=${data?.keyword}&courseId=${data?.courseId}&batchName=${data?.batchName}&sectionName=${data?.sectionName}`,
      providesTags: ["Course"],
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: "all-courses",
      }),
      providesTags: ["CourseRequest"],
    }),
    getAllRequestedCourse: builder.query({
      query: () => ({
        url: "all-requested-course",
      }),
      providesTags: ["CourseRequest"],
    }),
    createCourseRequest: builder.mutation({
      query: (course) => ({
        url: "course-request",
        method: "POST",
        body: course,
      }),
      invalidatesTags: ["CourseRequest"],
    }),
    deleteCourseRequest: builder.mutation({
      query: (id) => ({
        url: `delete-course-request/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CourseRequest"],
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
  useAddAssignmentToModuleMutation,
  useGetVideosByModuleQuery,
  useUpdateVideosByIdQuery,
  useGetNotEnrolledStudentsInCourseQuery,
  useGiveAccessToStudentMutation,
  useGetEnrolledStudentsInCourseQuery,
  useRemoveStudentFromCourseMutation,
  useGetEnrolledCoursesForStudentQuery,
  useGetCourseByIdQuery,
  useGetAllEnrolledStudentsQuery,
  useGetAllCoursesQuery,
  useCreateCourseRequestMutation,
  useGetAllRequestedCourseQuery,
  useDeleteCourseRequestMutation,
} = coursesApi;
export default coursesApi;
