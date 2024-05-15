import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
};

export const otpReducer = createSlice({
  name: "otpReducer",
  initialState,
  reducers: {
    otpSendReducer: (state, action) => {
      state.message = action.payload.message;
      state.success = action.payload.success;
      state.email = action.payload.email;
    },
    otpNotSendReducer: (state, action) => {
      state.error = action.payload.error;
      state.success = action.payload.success;
      state.message = null;
    },

    //=================================CONTACT MESSAGES================================//
    contactMessageReducer: (state, action) => {
      state.success = action.payload.success;
      state.messages = action.payload.messages;
    },

    sendContactMessageReducer: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    sendContactMessageFailReducer: (state, action) => {
      state.error = action.payload.error;
      state.success = action.payload.success;
      state.messages = null;
    },

    otpVerifyReducer: (state, action) => {
      state.message = action.payload.message;
      state.success = action.payload.success;
    },
    otpNotVerifyReducer: (state, action) => {
      state.error = action.payload.error;
      state.success = action.payload.success;
      state.message = null;
    },
    clearErrorReducer: (state) => {
      state.error = null;
      state.success = null;
    },
    clearMessageReducer: (state) => {
      state.message = null;
      state.success = null;
    },
  },
});

export const {
  otpSendReducer,
  otpNotSendReducer,
  clearErrorReducer,
  clearMessageReducer,
  otpVerifyReducer,
  otpNotVerifyReducer,
  contactMessageReducer,
  sendContactMessageReducer,
} = otpReducer.actions;
