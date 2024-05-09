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
      state.message = action.payload.message;
    },

    loadUsersReducer: (state, action) => {
      state.success = action.payload.success;
      state.users = action.payload.users;
    },
    loadUsersFailReducer: (state, action) => {
      state.message = action.payload.message;
      // state.error = action.payload.error;
      // state.success = action.payload.success;
    },

    loadSpecificUserReducer: (state, action) => {
      state.success = action.payload.success;
      state.userDetail = action.payload.userDetail;
    },
    loadSpecificUserFailReducer: (state, action) => {
      state.message = action.payload.message;
      // state.error = action.payload.error;
      // state.success = action.payload.success;
    },
    logoutReducer: (state) => {
      state.user = null;
    },
    logoutFailReducer: (state, action) => {
      state.error = action.payload.error;
      state.success = action.payload.success;
    },
    roleReducer: (state, action) => {
      state.role = action.payload.role;
    },
    roleClearReducer: (state) => {
      state.role = null;
    },

    emailReducer: (state, action) => {
      state.email = action.payload.email;
    },
    emailClearReducer: (state) => {
      state.email = null;
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
  logoutReducer,
  logoutFailReducer,
  loadUsersReducer,
  loadUsersFailReducer,
  roleReducer,
  roleClearReducer,
  emailClearReducer,
  emailReducer,
  loadSpecificUserFailReducer,
  loadSpecificUserReducer,
} = userReducer.actions;
