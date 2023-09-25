import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: null,
  brandsPerPage:null,
  singleBrand:null,
};

export const brandSlice = createSlice({
  name: "brandSlice",
  initialState,
  reducers: {
    addBrands: (state, { payload }) => {
      state.brands = payload.brands;
    },
    addBrandsPerPage: (state, { payload }) => {
      state.brandsPerPage = payload.brandsPerPage;
    },
    addSingleBrand: (state, { payload }) => {
      state.singleBrand = payload.singleBrand;
    },
  },
});

export const { addBrands,addBrandsPerPage,addSingleBrand } = brandSlice.actions;
export default brandSlice.reducer;
