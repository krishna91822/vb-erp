import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  redirect: false,
  updateModal: false,
  projectById: {},
  allEmployees: [],
  allClients: [],
  allClients: [],
  allocatedData: [
    {
      id: 1,
      empId: "FCDE5",
      associateName: "Sara Usano",
      projectAllocated: "Metaverse",
      startDate: "2020-12-02",
      endDate: "2020-05-27",
      percentAllocated: "25%",
    },
    {
      id: 2,
      empId: "AFFE5",
      associateName: "Saitama Uzuki",
      projectAllocated: "ERP sm's",
      startDate: "2020-12-02",
      endDate: "2020-05-27",
      percentAllocated: "50%",
    },
    {
      id: 3,
      empId: "ADCB8",
      associateName: "Kirigaya",
      projectAllocated: "Metaverse",
      startDate: "2020-02-13",
      endDate: "2020-05-27",
      percentAllocated: "75%",
    },
    {
      id: 4,
      empId: "AAAA1",
      associateName: "Daijiro",
      projectAllocated: "Eshops",
      startDate: "2020-04-12",
      endDate: "2020-05-27",
      percentAllocated: "100%",
    },
  ],
  benchData: [
    {
      id: 1,
      empId: "FCDE5",
      associateName: "Sara Usano",
      lastAllocatedProject: "Metaverse",
      primaryCapabilities: "backend",
      lastallocationDate: "2021-11-25",
      remainingBandwidth: "25%",
      startDate: "2020-12-02",
      endDate: "2020-05-27",
    },
    {
      id: 2,
      empId: "AFFE5",
      associateName: "Saitama Uzuki",
      lastAllocatedProject: "Web-Sever",
      primaryCapabilities: "web-frontEnd",
      lastallocationDate: "2020-05-27",
      remainingBandwidth: "100%",
      startDate: "2020-11-12",
      endDate: "2020-05-27",
    },
    {
      id: 3,
      empId: "ADCB8",
      associateName: "Kirigaya",
      lastAllocatedProject: "Eshops",
      primaryCapabilities: "PHP",
      lastallocationDate: "2020-05-27",
      remainingBandwidth: "75%",
      startDate: "2020-08-20",
      endDate: "2021-05-27",
    },
    {
      id: 4,
      empId: "JWFK5",
      associateName: "Daijiro",
      lastAllocatedProject: "Eshops",
      primaryCapabilities: "Javascipt",
      lastallocationDate: "2020-05-27",
      remainingBandwidth: "50%",
      startDate: "2020-12-02",
      endDate: "2020-05-27",
    },
  ],
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
      console.log(filterResources);
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
  },
});
export const pmoActions = pmoSlice.actions;
export default pmoSlice;
