import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    oData: null,
    oRecords:null,
};

export const overviewSlice = createSlice({
  name: "overviewSlice",
  initialState,
  reducers: {
    addOverview: (state, { payload }) => {
      state.oData = payload.oData;
    },
    addORecords: (state, { payload }) => {
      state.oRecords = payload;
    },
  },
});

export const { addOverview,addORecords } = overviewSlice.actions;
export default overviewSlice.reducer;
