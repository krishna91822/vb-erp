import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  roles: [],
};

const userAccountSlice = createSlice({
  name: "userAccount",
  initialState,
  reducers: {
    resetForm(state, action) {
      state.employees = initialState.employees;
    },
    setUserAccount(state, action) {
      state.employees = action.payload;
    },
    setUserRole(state, action) {
      state.roles = action.payload;
    },
  },
});

export const userAccountActions = userAccountSlice.actions;

export default userAccountSlice;
