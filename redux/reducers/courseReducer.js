import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
};

export const courseReducer = createSlice({
  name: "courseReducer",
  initialState,
  reducers: {
    createCourseReducer: (state, action) => {
      state.message = action.payload.message;
      state.success = action.payload.success;
      state.course = action.payload.course;
    },
    createCourseFailReducer: (state, action) => {
      state.message = null;
      state.error = action.payload.error;
      state.success = action.payload.success;
    },
    loadCoursesReducer: (state, action) => {
      state.message = action.payload.message;
      state.success = action.payload.success;
      state.courses = action.payload.courses;
    },
    loadCoursesFailReducer: (state, action) => {
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
  createCourseReducer,
  createCourseFailReducer,
  loadCoursesReducer,
  loadCoursesFailReducer,
  clearErrorReducer,
  clearMessageReducer,
} = courseReducer.actions;
