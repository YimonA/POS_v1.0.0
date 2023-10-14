import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  products: null,
  singleProduct: null,
  editProduct: {
    name: null,
    actual_price: null,
    sale_price: null,
    unit: null,
    more_information: null,
    brand_id: null,
    photo: null,
    total_stock: null,
  },
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    addProducts: (state, { payload }) => {
      state.products = payload.products;
      // Cookies.set("products", JSON.stringify(state.products));
    },
    addSingleProduct: (state, { payload }) => {
      state.singleProduct = payload;
    },
    editProductName: (state, { payload }) => {
      state.editProduct.name = payload;
    },
    editProductAPrice: (state, { payload }) => {
      state.editProduct.actual_price = payload;
    },
    editProductSPrice: (state, { payload }) => {
      state.editProduct.sale_price = payload;
    },
    editProductUnit: (state, { payload }) => {
      state.editProduct.unit = payload;
    },
    editProductInfo: (state, { payload }) => {
      state.editProduct.more_information = payload;
    },
    editProductBrandID: (state, { payload }) => {
      state.editProduct.brand_id = payload;
    },
    editProductPhoto: (state, { payload }) => {
      state.editProduct.photo = payload;
    },
    editProductTStock: (state, { payload }) => {
      state.editProduct.total_stock = payload;
    },
    clearEditProductPhoto: (state) => {
      state.editProduct.photo = null;
    },
    setSearchTerm:(state,{payload})=>{
      state.searchTerm=payload;
  },clearSearchTerm:(state)=>{
    state.searchTerm='';
}
  },
});

export const {setSearchTerm,clearSearchTerm,
  editProductName,
  editProductAPrice,
  editProductSPrice,
  editProductUnit,
  editProductInfo,
  editProductBrandID,
  editProductPhoto,
  editProductTStock,clearEditProductPhoto,
  addProducts,
  addSingleProduct,
} = productSlice.actions;
export default productSlice.reducer;
