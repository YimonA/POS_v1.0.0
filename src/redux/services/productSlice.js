import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  products: null,
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    addProducts: (state, { payload }) => {
      (state.products = payload.products)
        // Cookies.set("products", JSON.stringify(state.products));
    },
  },
});

export const { addProducts } = productSlice.actions;
export default productSlice.reducer;
