import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import Cookies from "universal-cookie";
import { SERVER_URL } from "../../config/config";
import teacherApi from "./teacherApi";

const cookie = new Cookies();
const prepareHeaders = (headers: any) => {
  const token = cookie.get("token") as string | undefined;
  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }
  return headers;
};
const googleDriveApi = createApi({
  reducerPath: "googleDriveApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/google-drive`,
    prepareHeaders,
  }),
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (data) => ({
        url: `/upload`,
        method: "POST",
        body: data,
      }),
    }),
    downloadFile: builder.query({
      query: (id) => ({
        url: `/download/${id}`,
      }),
    }),
  }),
});

export const { useUploadFileMutation, useDownloadFileQuery } = googleDriveApi;
export default googleDriveApi;
