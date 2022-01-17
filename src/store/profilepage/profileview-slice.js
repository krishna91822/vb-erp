import { createSlice } from "@reduxjs/toolkit";

const initialState = { cardview: true };

const profileviewSlice = createSlice({
  name: "profileview",
  initialState,
  reducers: {
    changeprofileview(state, action) {
      state.cardview = !state.cardview;
    },
  },
});

export const profileviewActions = profileviewSlice.actions;

export default profileviewSlice;
