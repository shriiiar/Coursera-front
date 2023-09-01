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

const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/student`,
    prepareHeaders,
  }),
  tagTypes: ["Student"],
  endpoints: (builder) => ({
    getCourseById: builder.query({
      query: (id) => `/course/${id}`,
      providesTags: ["Student"],
    }),

    // get milestones by course id
    getMilestoneByCourse: builder.query({
      query: (id) => `/milestone/${id}`,
      providesTags: ["Student"],
    }),

    // get module by milestone
    getModuleByMilestone: builder.query({
      query: (id) => `/module/${id}`,
      providesTags: ["Student"],
    }),
    // get modules by course id
    getModulesByCourse: builder.query({
      query: (id) => `/module/course/${id}`,
      providesTags: ["Student"],
    }),

    // get videos by module id
    getVideosByModule: builder.query({
      query: (id) => `/video/${id}`,
      providesTags: ["Student"],
    }),

    // get all courses for student
    getEnrolledCoursesForStudent: builder.query({
      query: (id?: any) => `/enrolled-courses/student`,
      providesTags: ["Student"],
    }),

    // for teacher
    getAllEnrolledStudents: builder.query({
      query: (data?: any) =>
        `/all-enrolled-students?q=${data?.keyword}&courseId=${data?.courseId}&batchName=${data?.batchName}&sectionName=${data?.sectionName}`,
      providesTags: ["Student"],
    }),

    ///get assignment for student
    getAssignmentByVideoId: builder.query({
      query: (data?: any) => `/get-assignment/${data}`,
      providesTags: ["Student"],
    }),
    getQuizByVideoId: builder.query({
      query: (data?: any) => `/get-quiz/${data}`,
      providesTags: ["Student"],
    }),

    addAssignment: builder.mutation({
      query: ({ data, id }) => ({
        url: `/upload-assignment/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Student"],
    }),
  }),
});

export const {
  useGetMilestoneByCourseQuery,
  useGetModuleByMilestoneQuery,
  useGetModulesByCourseQuery,
  useGetVideosByModuleQuery,
  useGetEnrolledCoursesForStudentQuery,
  useGetCourseByIdQuery,
  useGetAllEnrolledStudentsQuery,
  useGetAssignmentByVideoIdQuery,
  useAddAssignmentMutation,
  useGetQuizByVideoIdQuery,
} = studentApi;
export default studentApi;
