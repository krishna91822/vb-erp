import { createSlice } from "@reduxjs/toolkit";

const clients = [];
const projects = [];
const clientFinController = "";
const targetedResources = [];
const initAllocationRate = [];
const clientSponsor = "";
const types = ["PO", "SOW"];
const currencies = ["INR", "USD"];
const DocumentTypes = [".docx", ".pdf", ".excel"];

export const SOW_init_state = {
  inputFieldsData: {
    clients: clients,
    projects: projects,
    clientFinController: clientFinController,
    targetedResources: targetedResources,
    clientSponsor: clientSponsor,
    types: types,
    currencies: currencies,
    DocumentTypes: DocumentTypes,
  },
  clone: false,
  redirect: false,
  allocationRate: initAllocationRate,
  response_message: "",
  totalCount: 0,
  poSowData: [],
  dataByID: [
    {
      Client_Name: "",
      Project_Name: "",
      Client_Sponser: [""],
      Client_Finance_Controller: [""],
      Targetted_Resources: ["", ""],
      Status: "Drafted",
      Type: "",
      PO_Number: "",
      PO_Amount: 0,
      Currency: "",
      Document_Name: "",
      Document_Type: "",
      Remarks: "",
    },
  ],
};

const POSOW_Slice = createSlice({
  name: "SOW_state",
  initialState: SOW_init_state,
  reducers: {
    setRedirect(state, action) {
      state.redirect = action.payload;
    },
    setClone(state, action) {
      state.clone = action.payload;
    },
    setTabViewData(state, action) {
      state.poSowData = action.payload;
    },
    setTotalCount(state, action) {
      state.totalCount = action.payload;
    },
    SetSpecific(state, action) {
      state.dataByID = [...action.payload];
      state.allocationRate = Object.values(
        state.dataByID[0].Targeted_Res_AllocationRate
      );
    },
    setClientsOptions(state, action) {
      state.inputFieldsData.clients = action.payload;
    },
    setClientProjects(state, action) {
      state.inputFieldsData.projects = action.payload;
    },
    setClientProjectSponsor(state, action) {
      state.inputFieldsData.clientSponsor = action.payload;
    },
    setClientFinanceController(state, action) {
      state.inputFieldsData.clientFinController = action.payload;
    },
    setTargetedResources(state, action) {
      state.inputFieldsData.targetedResources = [...action.payload].map(
        (obj) => {
          return obj.empId.empName + " (" + obj.empId.empId + ")";
        }
      );
    },
    setAllocationRate(state, action) {
      state.allocationRate = [...action.payload].map((obj) => {
        return obj.allocationPercentage;
      });
    },
    setTargetedResourcesOnReadPage(state, action) {
      state.inputFieldsData.targetedResources = action.payload;
    },
    clearData(state) {
      state.inputFieldsData.clientFinController = "";
      state.inputFieldsData.clientSponsor = "";
      state.inputFieldsData.targetedResources = [];
    },
  },
});

export const PoSowActions = POSOW_Slice.actions;

export default POSOW_Slice;
