import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: "employees-list",
  initialState,
  reducers: {
    addEmployees: (state, action) => {
      state.employees = action.payload.employees;
    },
  },
});

export const employeesActions = employeeSlice.actions;
export default employeeSlice;
