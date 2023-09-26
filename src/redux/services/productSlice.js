import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  products: null,
  singleProduct:null
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    addProducts: (state, { payload }) => {
      (state.products = payload.products)
        // Cookies.set("products", JSON.stringify(state.products));
    },
    addSingleProduct: (state, { payload }) => {
      (state.singleProduct = payload.singleProduct)
    },
  },
});

export const { addProducts,addSingleProduct } = productSlice.actions;
export default productSlice.reducer;
