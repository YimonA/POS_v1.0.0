import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pData: null,
  bData: null,
  wData: null,
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
    addWeekelySaleReport: (state, { payload }) => {
      state.wData = payload.wdata;
    },
    addTodaySaleReport: (state, { payload }) => {
      state.tData = payload.tdata;
    },
  },
});

export const { addProductSaleReport,addBrandSaleReport,addWeekelySaleReport,addTodaySaleReport } = reportSaleSlice.actions;
export default reportSaleSlice.reducer;
