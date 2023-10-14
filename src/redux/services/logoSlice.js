import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: null,
  brandsPerPage:null,
  singleBrand:null,
  searchTerm: "",
};

export const logoSlice = createSlice({
  name: "logoSlice",
  initialState,
  reducers: {
    addBrands: (state, { payload }) => {
      state.brands = payload.brands;
    },
    addBrandsPerPage: (state, { payload }) => {
      state.brandsPerPage = payload.brandsPerPage;
    },
    addSingleBrand: (state, { payload }) => {
      state.singleBrand = payload;
    },
    setSearchTerm:(state,{payload})=>{
      state.searchTerm=payload;
  },
  clearSearchTerm:(state)=>{
    state.searchTerm='';
}
  },
});

export const {setSearchTerm,clearSearchTerm, addBrands,addBrandsPerPage,addSingleBrand } = logoSlice.actions;
export default logoSlice.reducer;
