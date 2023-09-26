import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weekelyBestBrands: null,
  brandReport:null,
};

export const reportStockSlice = createSlice({
  name: "reportStockSlice",
  initialState,
  reducers: {
    addWeekelyBestBrands: (state, { payload }) => {
      state.weekelyBestBrands = payload.bBData;
    },
    addBrandReport: (state, { payload }) => {
      state.brandReport = payload.brandReportData;
    },
  },
});

export const { addWeekelyBestBrands,addBrandReport } = reportStockSlice.actions;
export default reportStockSlice.reducer;
