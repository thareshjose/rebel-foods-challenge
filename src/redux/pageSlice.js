import { createSlice } from "@reduxjs/toolkit";
import { CONSTANTS } from "../constants/constants";

export const pagesSlice = createSlice({
  name: "pages",
  initialState: {
    page: 1,
    brandsPerPage: 4,
  },
  reducers: {},
});

export const selectPage = (state) => state.pages;

export default pagesSlice.reducer;
