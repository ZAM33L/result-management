import { createSlice } from "@reduxjs/toolkit";
export const facultySlice = createSlice({
  name: "faculty",
  initialState: {
    faculty: null,
  },
  reducers: {
    SetFaculty: (state, action) => {
      state.faculty = action.payload;
    },
  },
});
export const { SetFaculty } = facultySlice.actions;
