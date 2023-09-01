import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { SERVER_URL } from "../../config/config";
import Cookies from "universal-cookie";
import { io } from "socket.io-client";
const cookie = new Cookies();
const prepareHeaders = (headers: any) => {
  const token = cookie.get("token") as string | undefined;
  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }
  return headers;
};

const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/chat`,
    prepareHeaders,
  }),
  tagTypes: ["Chat", "Message"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (searchText) => ({
        url: `/users?searchText=${searchText}`,
      }),
    }),
    accessChat: builder.mutation({
      query: (userId) => ({
        url: `/`,
        method: "POST",
        body: userId,
      }),
      invalidatesTags: ["Chat"],
    }),
    getChat: builder.query({
      query: () => ({
        url: `/`,
      }),
      providesTags: ["Chat"],
    }),
    createMessage: builder.mutation({
      query: (data) => ({
        url: `/message`,
        method: "POST",
        body: data,
      }),
       invalidatesTags: ["Chat"],
    }),
    getAllMessage: builder.query({
      query: (id) => ({
        url: `/message/${id}`,
      }),
      // providesTags: ["Message"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useAccessChatMutation,
  useGetChatQuery,
  useCreateMessageMutation,
  useGetAllMessageQuery,
} = chatApi;
export default chatApi;
