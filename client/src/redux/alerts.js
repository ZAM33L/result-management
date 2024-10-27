import { createSlice } from "@reduxjs/toolkit";
export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    loading: false,
    name: "Malik",
  },
  reducers: {
    ShowLoading: (state, action) => {
      state.loading = true;
    },
    HideLoding: (state, action) => {
      state.loading = false;
    },
  },
});
export const { ShowLoading, HideLoding } = alertSlice.actions;
