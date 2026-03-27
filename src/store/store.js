import { configureStore } from "@reduxjs/toolkit";
import fileSlice from "./slices/filesSlice";

const store = configureStore({
  reducer: {
    File: fileSlice,
  },
});

export default store;
