import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  users: null,
  bannedUsers:null,

};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addUsers: (state, { payload }) => {
      (state.users = payload.users),
        Cookies.set("users", JSON.stringify(state.users));
    },
    addBannedUsers: (state, { payload }) => {
      (state.bannedUsers = payload.bannedUsers),
        Cookies.set("bannedUsers", JSON.stringify(state.bannedUsers));
    },
  },
});

export const { addUsers,addBannedUsers } = userSlice.actions;
export default userSlice.reducer;
