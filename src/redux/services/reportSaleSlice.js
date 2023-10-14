import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pData: null,
  bData: null,
  wData: null,
  mdata:null,
  ydata:null,
  tData: null,
};

export const reportSaleSlice = createSlice({
  name: "reportSaleSlice",
  initialState,
  reducers: {
    addProductSaleReport: (state, { payload }) => {
      state.pData = payload.pdata;
    },
    addBrandSaleReport: (state, { payload }) => {
      state.bData = payload.bdata;
    },
    addWeeklySaleReport: (state, { payload }) => {
      state.wData = payload.wdata;
    },
    addMonthlySaleReport: (state, { payload }) => {
      state.mData = payload.mdata;
    },
    addYearlySaleReport: (state, { payload }) => {
      state.yData = payload.ydata;
    },
    addTodaySaleReport: (state, { payload }) => {
      state.tData = payload.tdata;
    },
  },
});

export const { addProductSaleReport,addBrandSaleReport,addWeeklySaleReport,addMonthlySaleReport,addYearlySaleReport,addTodaySaleReport } = reportSaleSlice.actions;
export default reportSaleSlice.reducer;
