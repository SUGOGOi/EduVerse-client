import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { loadUserFailReducer, loadUserReducer } from "../reducers/userReducer";
import { loadCoursesFailReducer } from "../reducers/courseReducer";
import toast from "react-hot-toast";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/",
    // refetchOnFocus: true,
    // refetchOnReconnect: true,
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

    loginUser: builder.mutation({
      query: ({ ...body }) => ({
        url: `auth/login`,
        method: "POST",
        credentials: "include",
        body: body,
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: `auth/logout`,
        method: "GET",
        credentials: "include",
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

export const getMyProfile = () => async (dispatch) => {
  try {
    // dispatch({ type: "loadUserRequest" });

    const { data } = await axios.get(
      `http://localhost:8000/api/v1/user/myprofile`,
      {
        withCredentials: true,
      }
    );

    dispatch(loadUserReducer(data));
    console.log(data);
  } catch (error) {
    dispatch(loadUserFailReducer(error));
    toast.error(`${error.message}`);
  }
};

export const {
  useRegisterUserMutation,
  useGetMyProfileQuery,
  useLoginUserMutation,
  useLogoutUserMutation,
} = userApi;
