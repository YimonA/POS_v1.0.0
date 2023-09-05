import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  brands: [],
};

export const brandSlice = createSlice({
  name: "brandSlice",
  initialState,
  reducers: {
    addBrands: (state, { payload }) => {
      (state.brands = payload.brands),
        Cookies.set("brands", JSON.stringify(state.brands));
    },
  },
});

export const { addBrands } = brandSlice.actions;
export default brandSlice.reducer;
