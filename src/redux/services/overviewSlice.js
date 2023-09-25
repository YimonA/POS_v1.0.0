import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    oData: null,
};

export const overviewSlice = createSlice({
  name: "overviewSlice",
  initialState,
  reducers: {
    addOverview: (state, { payload }) => {
      state.oData = payload.oData;
    },
  },
});

export const { addOverview } = overviewSlice.actions;
export default overviewSlice.reducer;
