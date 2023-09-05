import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  photos: [],
};

export const mediaSlice = createSlice({
  name: "mediaSlice",
  initialState,
  reducers: {
    addPhotos: (state, { payload }) => {
      (state.photos =payload.photos), 
      Cookies.set("photos", JSON.stringify(state.photos));
    },
    // removePhoto: (state) => {
    //   (state.photo = null), 
    //   Cookies.remove("photo");
    // },
  },
});

export const { addPhotos } = mediaSlice.actions;
export default mediaSlice.reducer;
