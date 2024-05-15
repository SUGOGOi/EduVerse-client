import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import {
  loadSpecificUserFailReducer,
  loadSpecificUserReducer,
  loadUserFailReducer,
  loadUserReducer,
  loadUsersFailReducer,
  loadUsersReducer,
} from "../reducers/userReducer";
import { loadCoursesFailReducer } from "../reducers/courseReducer";
import toast from "react-hot-toast";
const server = `${process.env.SERVER}api/v1/`;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.SERVER}api/v1/`,
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

    approveUser: builder.mutation({
      query: ({ uid, id }) => ({
        url: `user/approve?id=${id}&uid=${uid}`,
        method: "PUT",
        credentials: "include",
      }),
    }),

    forgetPassword: builder.mutation({
      query: ({ ...body }) => ({
        url: `auth/forget-password`,
        method: "POST",
        credentials: "include",
        body: body,
      }),
    }),

    // getMyProfile: builder.query({
    //   query: () => ({
    //     url: `user/myprofile`,
    //     method: "GET",
    //     credentials: "include",
    //   }),
    // }),
  }),
});

export const getMyProfile = () => async (dispatch) => {
  try {
    // dispatch({ type: "loadUserRequest" });

    const { data } = await axios.get(`${server}user/myprofile`, {
      withCredentials: true,
    });

    dispatch(loadUserReducer(data));
    // console.log(data);
  } catch (error) {
    dispatch(loadUserFailReducer(error));
    toast.error(`${error.message}`);
  }
};

export const getSpecificUser =
  ({ uid, id }) =>
  async (dispatch) => {
    try {
      // dispatch({ type: "loadUserRequest" });

      const { data } = await axios.get(`${server}user/${uid}?id=${id}`, {
        withCredentials: true,
      });

      dispatch(loadSpecificUserReducer(data));
      // console.log(data);
    } catch (error) {
      dispatch(loadSpecificUserFailReducer(error));
      toast.error(`${error.message}`);
    }
  };

export const getAllUsers =
  ({ id }) =>
  async (dispatch) => {
    try {
      // dispatch({ type: "loadUserRequest" });

      const { data } = await axios.get(`${server}user/all-users?id=${id}`, {
        withCredentials: true,
      });

      dispatch(loadUsersReducer(data));
      // console.log(data);
    } catch (error) {
      dispatch(loadUsersFailReducer(error));
      toast.error(`${error.message}`);
    }
  };

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useApproveUserMutation,
  useForgetPasswordMutation,
} = userApi;
