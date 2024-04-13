import { configureStore } from "@reduxjs/toolkit";
import { otpApi } from "./apis/otpApi";
import { otpReducer } from "./reducers/otpReducer";
import { userReducer } from "./reducers/userReducer";
import { userApi } from "./apis/userApi";

export const store = configureStore({
  reducer: {
    [otpApi.reducerPath]: otpApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [otpReducer.name]: otpReducer.reducer,
    [userReducer.name]: userReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(otpApi.middleware).concat(userApi.middleware),
});

export const server = "http://localhost:8000/api/v1";
