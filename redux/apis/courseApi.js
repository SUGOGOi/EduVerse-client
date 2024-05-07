import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/",
  }),
  endpoints: (builder) => ({
    allCourses: builder.query({
      query: () => ({
        url: `course/all-courses`,
        method: "GET",
        credentials: "include",
      }),
    }),

    createCourse: builder.mutation({
      query: ({ id, formData }) => ({
        url: `course/create-course?id=${id}`,
        method: "POST",
        credentials: "include",
        body: formData,
      }),
    }),
    getCourseById: builder.query({
      query: ({ id }) => ({
        url: `course/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetCourseByIdQuery,
  useAllCoursesQuery,
  useCreateCourseMutation,
} = courseApi;
