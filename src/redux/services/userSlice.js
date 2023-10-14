import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
searchBannedUser:'',
  users: null,
  singleUser: null,
  bannedUsers: null,
  editUser: {
    name: null,
    email: null,
    phone_number: null,
    address: null,
    gender: null,
    date_of_birth: null,
    photo: null,
  },
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addUsers: (state, { payload }) => {
      state.users = payload;
      // Cookies.set("users", JSON.stringify(state.users));
    },
    addSingleUser: (state, { payload }) => {
      state.singleUser = payload;
    },
    editUserName: (state, { payload }) => {
      state.editUser.name = payload;
    },
    editUserAddress: (state, { payload }) => {
      state.editUser.address = payload;
    },
    editUserGender: (state, { payload }) => {
      state.editUser.gender = payload;
    },
    editUserDOB: (state, { payload }) => {
      state.editUser.date_of_birth = payload;
    },
    editUserEmail: (state, { payload }) => {
      state.editUser.email = payload;
    },
    editUserPhone: (state, { payload }) => {
      state.editUser.phone_number = payload;
    },
    editUserPhoto: (state, { payload }) => {
      state.editUser.photo = payload;
    },
    clearEditUserPhoto: (state) => {
      state.editUser.photo = "";
    },
    addBannedUsers: (state, { payload }) => {
      state.bannedUsers = payload;
    },
    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
    },
    clearSearchTerm: (state) => {
      state.searchTerm = "";
    },
    setSearchBannedUser: (state, { payload }) => {
      state.searchBannedUser = payload;
    },
    clearSearchBannedUser: (state) => {
      state.searchBannedUser = "";
    },
  },
});

export const {
  setSearchTerm,
  clearSearchTerm,setSearchBannedUser,clearSearchBannedUser,
  editUserName,
  editUserAddress,
  editUserGender,
  editUserDOB,
  editUserEmail,
  editUserPhone,
  editUserPhoto,
  clearEditUserPhoto,
  addUsers,
  addSingleUser,
  addBannedUsers,
} = userSlice.actions;
export default userSlice.reducer;
