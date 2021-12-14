import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  redirect: false,
  updateModal: false,
  projectById: {},
  allEmployees: [],
  allocatedData: [],
  benchData: [],
  percentageAllocated: 0,
  clientNames: [],
  allClients: [],
};

const pmoSlice = createSlice({
  name: "createProject",
  initialState,
  reducers: {
    createProject: (state, action) => {
      state.projects = [...state.projects, action.payload];
    },
    updateProjectById: (state, action) => {
      state.projectById = action.payload;
    },
    updatePercentageAllocated: (state, action) => {
      state.percentageAllocated = action.payload;
    },
    updateProjectsList: (state, action) => {
      state.projects = action.payload;
    },
    updateEmployeeList: (state, action) => {
      state.allEmployees = action.payload;
    },
    updateClientList: (state, action) => {
      state.allClients = action.payload;
    },
    removeAllocation: (state, action) => {
      const filterResources = current(state).projectById.resources.filter(
        (resource) => resource._id !== action.payload._id
      );
      state.projectById.resources = filterResources;
    },
    SortByProductID: (state, action) => {
      state.projects = action.payload;
    },
    SortByStatus: (state, action) => {
      state.projects = action.payload;
    },
    redirectToProjectList: (state, action) => {
      state.redirect = !state.redirect;
    },
    setUpdateModal: (state, action) => {
      state.updateModal = !state.updateModal;
    },
    clearCreateProjectState: (state, action) => {
      state.redirect = initialState.redirect;
      state.updateModal = initialState.updateModal;
      state.projectById = initialState.projectById;
    },
    updateAllocatedData: (state, action) => {
      state.allocatedData = action.payload;
    },
    updatebenchData: (state, action) => {
      state.benchData = action.payload;
    },
    updateClientNames: (state, action) => {
      state.clientNames = [
        `${action.payload.primaryContact.firstName} ${action.payload.primaryContact.lastName}`,
        `${action.payload.secondaryContact.firstName} ${action.payload.secondaryContact.lastName}`,
        `${action.payload.tertiaryContact.firstName} ${action.payload.tertiaryContact.lastName}`,
      ];
    },
  },
});
export const pmoActions = pmoSlice.actions;
export default pmoSlice;
