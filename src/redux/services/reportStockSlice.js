import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stockReport:null,
  weekelyBestBrands: null,
  brandReport:null,
};

export const reportStockSlice = createSlice({
  name: "reportStockSlice",
  initialState,
  reducers: {
    addStockReport: (state, { payload }) => {
      state.stockReport = payload.stockReport;
    },
    addWeekelyBestBrands: (state, { payload }) => {
      state.weekelyBestBrands = payload;
    },
    addBrandReport: (state, { payload }) => {
      state.brandReport = payload.brandReportData;
    },
  },
});

export const { addWeekelyBestBrands,addBrandReport,addStockReport } = reportStockSlice.actions;
export default reportStockSlice.reducer;
