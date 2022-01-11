import { createSlice } from "@reduxjs/toolkit";

const userFields = {
  name: "rupesh",
  email: "rahul@valuebound.com",
  roles: ["super_admin"],
  permissions: [
    "view_employee_dashboard",
    "edit_employee_dashboard",
    "create_employee_dashboard",
    "download_employee_profile",
    "search_employee",
    "approve_employee_edit_request",
    "view_CIMS_module",
    "update_on_CIMS_module",
    "create_CIMS_module",
    "view_PMO_module",
    "create_project_in_PMO",
    "update_project_in_PMO",
    "view_bench_strength",
    "project_information_table",
    "view_CMS",
    "upload_PO/SOW/contract",
    "view_invoice",
    "upload_invoice",
  ],
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
