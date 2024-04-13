import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/auth/" }),
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
