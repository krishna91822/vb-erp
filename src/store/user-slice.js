import { createSlice } from "@reduxjs/toolkit";

const userFields = {
  name: "",
  email: "",
  roles: [""],
  permissions: [],
  has_permission: false,
};

const initialState = {
  user: JSON.parse(JSON.stringify(userFields)),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetForm(state, action) {
      state.user = initialState.user;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
