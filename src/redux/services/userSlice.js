import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  users: null,
  singleUser:null,
  bannedUsers:null,

};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addUsers: (state, { payload }) => {
      (state.users = payload.users)
        // Cookies.set("users", JSON.stringify(state.users));
    },
    addSingleUser: (state, { payload }) => {
      (state.singleUser = payload.singleUser)
    },
    addBannedUsers: (state, { payload }) => {
      (state.bannedUsers = payload.bannedUsers)
    },
  },
});

export const { addUsers,addSingleUser,addBannedUsers } = userSlice.actions;
export default userSlice.reducer;
