import { createSlice } from "@reduxjs/toolkit";

const tabViewInitialState = {
  poSowData: [],
};

const mainSlice = createSlice({
  name: "poSOWTabViewState",
  initialState: tabViewInitialState,
  reducers: {
    setTabViewData(state, action) {
      state.poSowData = action.payload;
    },
  },
});

export const tabViewActions = mainSlice.actions;

export default mainSlice;
