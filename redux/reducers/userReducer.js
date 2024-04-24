import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  message: null,
};

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    registerReducer: (state, action) => {
      state.message = action.payload.message;
      state.success = action.payload.success;
      state.user = action.payload.user;
    },
    registerFailReducer: (state, action) => {
      state.message = null;
      state.error = action.payload.error;
      state.success = action.payload.success;
    },

    loadUserReducer: (state, action) => {
      state.success = action.payload.success;
      state.user = action.payload.user;
    },
    loadUserFailReducer: (state, action) => {
      state.message = null;
      state.error = action.payload.error;
      state.success = action.payload.success;
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
  registerReducer,
  registerFailReducer,
  loadUserReducer,
  loadUserFailReducer,
  clearErrorReducer,
  clearMessageReducer,
} = userReducer.actions;
