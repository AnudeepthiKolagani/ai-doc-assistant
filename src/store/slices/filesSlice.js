import { createSlice } from "@reduxjs/toolkit";

const filesSlice = createSlice({
  name: "Files",
  initialState: {
    files: [],
  },
  reducers: {
    addFile: (state, action) => {
      console.log("---Inside addFile slice ---");
      state.push(action.payload);
    },
  },
});

export const { addFile } = filesSlice.actions;
export default filesSlice.reducer;
