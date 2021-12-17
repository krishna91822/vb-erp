import { createSlice } from "@reduxjs/toolkit";

const clients = [];

const AllAvailableEmp = [
  { emp_name: "dave", emp_id: "VB1990" },
  { emp_name: "Alex", emp_id: "VB1972" },
  { emp_name: "Josh", emp_id: "VB1974" },
  { emp_name: "Ryan", emp_id: "VB2008" },
  { emp_name: "Scott", emp_id: "VB1957" },
  { emp_name: "Patt", emp_id: "VB1993" },
  { emp_name: "Mandy", emp_id: "VB1994" },
  { emp_name: "", emp_id: "" },
];
const employees = [
  {
    Employee_Name: "Alex",
    Employee_Id: 1990,
    Start_Date: "11 / 15 / 2021",
    End_Date: "11 / 25 / 2021",
    Allocation_Rate: 15,
  },
];
const projects = [];
const clientFinController = "";
const targetedResources = [];
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
  popup: false,
  redirect: false,
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
  AllAvailableEmp: AllAvailableEmp,
  employees: employees,
  specificEmpData: [
    {
      Employee_Name: "",
      Employee_Id: "",
      Start_Date: "",
      End_Date: "",
      Allocation_Rate: null,
    },
  ],
};

const POSOW_Slice = createSlice({
  name: "SOW_state",
  initialState: SOW_init_state,
  reducers: {
    PopUpON(state, action) {
      state.popup = !state.popup;
      state.response_message = action.payload;
    },
    PopUpOF(state, action) {
      state.popup = !state.popup;
    },
    setRedirect(state, action) {
      state.redirect = action.payload;
    },
    setTabViewData(state, action) {
      state.poSowData = action.payload;
    },
    setTotalCount(state, action) {
      state.totalCount = action.payload;
    },
    setPOEmpTabData(state, action) {
      state.employees = [...action.payload].filter((emp) => {
        return emp.Status === "assign";
      });
    },
    SetSpecific(state, action) {
      state.dataByID = [...action.payload];
    },
    setDefaultEmpDataOnedit(state, action) {
      state.specificEmpData = state.employees.filter((employee) => {
        return employee._id === action.payload;
      });
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
          return obj.empId.empName;
        }
      );
    },
    setTargetedResourcesOnReadPage(state, action) {
      state.inputFieldsData.targetedResources = action.payload;
    },
  },
});

export const PoSowActions = POSOW_Slice.actions;

export default POSOW_Slice;
