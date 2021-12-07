import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  currentEmployee: null,
  inEditMode: false,
  createEmployee: null,
};

export const employeeSlice = createSlice({
  name: 'employee',
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
  },
});

export const { setCurrentEmployee, toggleEditMode, createEmployee } =
  employeeSlice.actions;

export default employeeSlice.reducer;
