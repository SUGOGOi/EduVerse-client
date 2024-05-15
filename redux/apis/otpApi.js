import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { contactMessageReducer } from "../reducers/otpReducer";
import toast from "react-hot-toast";
import axios from "axios";
const server = `${process.env.SERVER}api/v1/`;

export const otpApi = createApi({
  reducerPath: "otpApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.SERVER}api/v1/otp/`,
  }),
  endpoints: (builder) => ({
    otpSend: builder.mutation({
      query: ({ ...body }) => ({
        url: `send-otp`,
        method: "POST",
        body: body,
      }),
    }),
    otpVerify: builder.mutation({
      query: ({ email, ...body }) => ({
        url: `verify-otp?email=${email}`,
        method: "POST",
        body: body,
      }),
    }),

    sendContactMessage: builder.mutation({
      query: ({ ...body }) => ({
        url: `conact-us`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

//================================CONTACT API==================================//
export const getAllCOntactMessages =
  ({ id }) =>
  async (dispatch) => {
    try {
      // dispatch({ type: "loadUserRequest" });

      const { data } = await axios.get(`${server}otp/all-conacts?id=${id}`, {
        withCredentials: true,
      });

      dispatch(contactMessageReducer(data));
      // console.log(data);
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

export const {
  useOtpSendMutation,
  useOtpVerifyMutation,
  useSendContactMessageMutation,
} = otpApi;
