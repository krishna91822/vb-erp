import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dropDownName: [],
  selectedValue: [],
};

const dropDownSlice = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    dropDownList(state, action) {
      state.dropDownName = action.payload;
    },
    selectedDropDown(state, action) {
      state.selectedValue = action.payload;
    },
  },
});

export const dropDownActions = dropDownSlice.actions;

export default dropDownSlice;
