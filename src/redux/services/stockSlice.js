import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  stocks: null,
};

export const stockSlice = createSlice({
  name: "stockSlice",
  initialState,
  reducers: {
    addStocks: (state, { payload }) => {
      (state.stocks = payload.stocks)
        // Cookies.set("stocks", JSON.stringify(state.stocks));
    },
  },
});

export const { addStocks } = stockSlice.actions;
export default stockSlice.reducer;
