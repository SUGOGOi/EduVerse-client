import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const otpApi = createApi({
  reducerPath: "otpApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/otp/" }),
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
  }),
});

export const { useOtpSendMutation, useOtpVerifyMutation } = otpApi;
