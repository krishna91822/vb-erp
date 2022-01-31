import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  roles: [],
  userDetails: {},
  user: [],
};

const userAccountSlice = createSlice({
  name: "userAccount",
  initialState,
  reducers: {
    resetForm(state, action) {
      state.employees = initialState.employees;
      state.user = initialState.user;
    },
    setUserAccount(state, action) {
      state.employees = action.payload;
    },
    setUserRole(state, action) {
      state.roles = action.payload;
    },
    setUserDetails(state, action) {
      state.userDetails = action.payload;
    },
    setuser(state, action) {
      state.user = action.payload;
    },
  },
});

export const userAccountActions = userAccountSlice.actions;

export default userAccountSlice;
