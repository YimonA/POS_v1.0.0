import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  changePWData: null,
};

export const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    changePW: (state, { payload }) => {
      (state.changePWData = payload.changePWData)
    },
  },
});

export const { changePW } = profileSlice.actions;
export default profileSlice.reducer;
