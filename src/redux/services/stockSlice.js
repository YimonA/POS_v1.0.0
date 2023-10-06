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
    addSingleStock: (state, { payload }) => {
      (state.singleStock = payload)
    },
  },
});

export const { addStocks,addSingleStock } = stockSlice.actions;
export default stockSlice.reducer;
