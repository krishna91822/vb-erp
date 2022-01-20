import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
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
  },
});

export const userAccountActions = userAccountSlice.actions;

export default userAccountSlice;
