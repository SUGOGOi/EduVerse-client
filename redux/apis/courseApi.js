import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
const server = `http://localhost:8000/api/v1/`;
import {
  getCourseByIdFailReducer,
  getCourseByIdReducer,
  loadChapterVideosFailReducer,
  loadChapterVideosReducer,
  loadCoursesFailReducer,
  loadCoursesReducer,
} from "../reducers/courseReducer";

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
    createChapter: builder.mutation({
      query: ({ id, cid, ...body }) => ({
        url: `module/create-module?id=${id}&cid=${cid}`,
        method: "POST",
        credentials: "include",
        body: body,
      }),
    }),
    addVideo: builder.mutation({
      query: ({ mid, id, ...body }) => ({
        url: `module/add-video?mid=${mid}&id=${id}`,
        method: "POST",
        credentials: "include",
        body: body,
      }),
    }),

    deleteChapter: builder.mutation({
      query: ({ id, cid, mid }) => ({
        url: `module/delete-module?mid=${mid}&id=${id}&cid=${cid}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    deleteVideo: builder.mutation({
      query: ({ id, vid, mid }) => ({
        url: `module/delete-video?mid=${mid}&id=${id}&vid=${vid}`,
        method: "DELETE",
        credentials: "include",
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

export const getCourseById = (id) => async (dispatch) => {
  try {
    // dispatch({ type: "loadUserRequest" });

    const { data } = await axios.get(`${server}course/${id}`, {
      withCredentials: true,
    });

    dispatch(getCourseByIdReducer(data));
    // console.log(data);
  } catch (error) {
    dispatch(getCourseByIdFailReducer(error));
    toast.error(`${error.message}`);
  }
};

export const getAllCourses = () => async (dispatch) => {
  try {
    // dispatch({ type: "loadUserRequest" });

    const { data } = await axios.get(`${server}course/all-courses`, {
      withCredentials: true,
    });

    dispatch(loadCoursesReducer(data));
    // console.log(data);
  } catch (error) {
    dispatch(loadCoursesFailReducer(error));
    toast.error(`${error.message}`);
  }
};

export const getChapterVideos =
  ({ id, mid }) =>
  async (dispatch) => {
    try {
      // dispatch({ type: "loadUserRequest" });

      const { data } = await axios.get(
        `${server}module/all-videos?mid=${mid}&id=${id}`,
        {
          withCredentials: true,
        }
      );

      dispatch(loadChapterVideosReducer(data));
      // console.log(data);
    } catch (error) {
      dispatch(loadChapterVideosFailReducer(error));
      toast.error(`${error.message}`);
    }
  };

export const {
  useGetCourseByIdQuery,
  useAllCoursesQuery,
  useCreateCourseMutation,
  useCreateChapterMutation,
  useDeleteChapterMutation,
  useAddVideoMutation,
  useDeleteVideoMutation,
} = courseApi;
