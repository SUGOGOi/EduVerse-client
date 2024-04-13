import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://eduverse-server-d6nq.onrender.com/api/v1/auth/",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: ({ formData }) => ({
        url: `register`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = userApi;
