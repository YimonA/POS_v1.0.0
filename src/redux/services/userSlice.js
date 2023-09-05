import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  users: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addUsers: (state, { payload }) => {
      (state.users = payload.users),
        Cookies.set("users", JSON.stringify(state.users));
    },
  },
});

export const { addUsers } = userSlice.actions;
export default userSlice.reducer;
