import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
const server = `${process.env.SERVER}api/v1/`;
import {
  getCourseByIdFailReducer,
  getCourseByIdReducer,
  loadChapterMaterialsFailReducer,
  loadChapterMaterialsReducer,
  loadCoursesFailReducer,
  loadCoursesReducer,
} from "../reducers/courseReducer";
import toast from "react-hot-toast";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.SERVER}api/v1/`,
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

    addPdf: builder.mutation({
      query: ({ mid, id, formData }) => ({
        url: `module/add-pdf?mid=${mid}&id=${id}`,
        method: "POST",
        credentials: "include",
        body: formData,
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

    deletePdf: builder.mutation({
      query: ({ id, pid, mid }) => ({
        url: `module/delete-pdf?mid=${mid}&id=${id}&pid=${pid}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),

    deleteCourse: builder.mutation({
      query: ({ id, cid }) => ({
        url: `course/${cid}?id=${id}`,
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

export const getCourseById =
  ({ id, token }) =>
  async (dispatch) => {
    try {
      // dispatch({ type: "loadUserRequest" });

      const { data } = await axios.get(`${server}course/${id}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
        withCredentials: true,
      });

      dispatch(getCourseByIdReducer(data));
      // console.log(data);
    } catch (error) {
      dispatch(getCourseByIdFailReducer(error));
      toast.error(`${error.message}`);
    }
  };

export const getAllCourses = (token) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${server}course/all-courses`, {
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      withCredentials: true,
    });

    // console.log(data);

    dispatch(loadCoursesReducer(data));
    // console.log(data);
  } catch (error) {
    dispatch(loadCoursesFailReducer(error));
    toast.error(`${error.message}`);
  }
};

export const getChapterMaterials =
  ({ mid }) =>
  async (dispatch) => {
    try {
      // dispatch({ type: "loadUserRequest" });

      const { data } = await axios.get(
        `${server}module/all-materials?mid=${mid}`,
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(loadChapterMaterialsReducer(data));
      // console.log(data);
    } catch (error) {
      dispatch(loadChapterMaterialsFailReducer(error));
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
  useDeletePdfMutation,
  useAddPdfMutation,
  useDeleteCourseMutation,
} = courseApi;
