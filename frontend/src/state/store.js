import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileSlice.js";

export const store = configureStore({
  reducer: {
    profiles: profileReducer,
  },
});
