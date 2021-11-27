import { createSlice } from "@reduxjs/toolkit";
const pmoSlice = createSlice({
  name: "createProject",
  initialState: {
    projects: [],
    redirect: false,
    projectById: [],
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
        empId: "JWFK5",
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
        percentAllocated: "25%",
      },
      {
        id: 2,
        empId: "AFFE5",
        associateName: "Saitama Uzuki",
        lastAllocatedProject: "Web-Sever",
        primaryCapabilities: "web-frontEnd",
        lastallocationDate: "2020-05-27",
        percentAllocated: "100%",
      },
      {
        id: 3,
        empId: "ADCB8",
        associateName: "Kirigaya",
        lastAllocatedProject: "Eshops",
        primaryCapabilities: "PHP",
        lastallocationDate: "2020-05-27",
        percentAllocated: "75%",
      },
      {
        id: 4,
        empId: "JWFK5",
        associateName: "Daijiro",
        lastAllocatedProject: "Eshops",
        primaryCapabilities: "Javascipt",
        lastallocationDate: "2020-05-27",
        percentAllocated: "50%",
      },
    ],
  },
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
    SortById: (state, action) => {
      state.projects = action.payload;
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
  },
});
export const pmoActions = pmoSlice.actions;
export default pmoSlice;
