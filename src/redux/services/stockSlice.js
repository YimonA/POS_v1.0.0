import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stocks: null,
  singleStock:null,
};

export const stockSlice = createSlice({
  name: "stockSlice",
  initialState,
  reducers: {
    addStocks: (state, { payload }) => {
      (state.stocks = payload.stocks)
    },
    addSingleStocks: (state, { payload }) => {
      (state.singleStock = payload.singleStock)
    },
  },
});

export const { addStocks,addSingleStocks } = stockSlice.actions;
export default stockSlice.reducer;
