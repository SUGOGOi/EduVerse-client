import { configureStore } from "@reduxjs/toolkit";
import { otpApi } from "./apis/otpApi";
import { otpReducer } from "./reducers/otpReducer";
import { userReducer } from "./reducers/userReducer";
import { userApi } from "./apis/userApi";
import { courseReducer } from "./reducers/courseReducer";
import { courseApi } from "./apis/courseApi";

export const store = configureStore({
  reducer: {
    [otpApi.reducerPath]: otpApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [otpReducer.name]: otpReducer.reducer,
    [userReducer.name]: userReducer.reducer,
    [courseReducer.name]: courseReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(otpApi.middleware)
      .concat(userApi.middleware)
      .concat(courseApi.middleware),
});

export const server = "http://localhost:8000/api/v1";
