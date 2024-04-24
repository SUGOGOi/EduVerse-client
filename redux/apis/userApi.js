import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: ({ formData }) => ({
        url: `auth/register`,
        method: "POST",
        credentials: "include",
        body: formData,
      }),
    }),

    getMyProfile: builder.query({
      query: () => ({
        url: `user/myprofile`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useGetMyProfileQuery } = userApi;
