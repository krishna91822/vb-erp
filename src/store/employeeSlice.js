import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  currentEmployee: null,
  inEditMode: true,
  createEmployee: null,
  employees: [],
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentEmployee: (state, action) => {
      state.currentEmployee = action.payload;
    },
    toggleEditMode: (state) => {
      state.inEditMode = !state.inEditMode;
    },
    createEmployee: (state, action) => {
      state.createEmployee = action.payload;
    },
    addEmployees: (state, action) => {
      state.employees = action.payload.employees;
    },
  },
});

export const {
  setCurrentEmployee,
  toggleEditMode,
  createEmployee,
  addEmployees,
} = employeeSlice.actions;

export default employeeSlice.reducer;
