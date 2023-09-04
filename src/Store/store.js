import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./AuthSlice";

export const store = configureStore({
  reducer: {
    Auth: AuthSliceReducer,
  },
});
