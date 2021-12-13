import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contentIsVisible: false,
  notification: null,
  loading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggle(state) {
      state.contentIsVisible = !state.contentIsVisible;
    },
    showNotification(state, action) {
      if (action.payload) {
        state.notification = {
          status: action.payload.status,
          title: action.payload.title,
          message: action.payload.message,
        };
      } else {
        state.notification = null;
      }
    },
    toggleLoader(state, action) {
      state.loading = !state.loading;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
