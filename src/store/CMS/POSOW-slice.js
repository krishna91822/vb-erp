import { createSlice } from "@reduxjs/toolkit";

const names = [
  "Nasdaq",
  "VMware",
  "CYPRESS",
  "Clarivate",
  "EVERSANA",
  "LORD",
  "FarmJournalMEDIA",
  "AMERICAN HERITAGE",
  "TimeInc.",
];
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
  {
    Employee_Name: "David",
    Employee_Id: 1972,
    Start_Date: "11 / 25 / 2021",
    End_Date: "12 / 15 / 2021",
    Allocation_Rate: 15,
  },
  {
    Employee_Name: "yusuf",
    Employee_Id: 1974,
    Start_Date: "11 / 25 / 2021",
    End_Date: "11 / 25 / 2021",
    Allocation_Rate: 20,
  },
  {
    Employee_Name: "Aquib",
    Employee_Id: 2008,
    Start_Date: "11 / 25 / 2021",
    End_Date: "11 / 25 / 2021",
    Allocation_Rate: 30,
  },
  {
    Employee_Name: "yash DY",
    Employee_Id: 1957,
    Start_Date: "11 / 25 / 2021",
    End_Date: "11 / 25 / 2021",
    Allocation_Rate: 10,
  },
  {
    Employee_Name: "Ayushi",
    Employee_Id: 1993,
    Start_Date: "11 / 25 / 2021",
    End_Date: "11 / 25 / 2021",
    Allocation_Rate: 5,
  },
  {
    Employee_Name: "Tanmay",
    Employee_Id: 1994,
    Start_Date: "11 / 25 / 2021",
    End_Date: "11 / 25 / 2021",
    Allocation_Rate: 5,
  },
];
const projects = [
  "xyz23",
  "asd34",
  "abc56",
  "project y",
  "project x",
  "project delta",
  "project omicron",
  "project lemda",
  "project alpha",
  "project theta",
];
const clientFinController = ["ABC", "XYZ", "EFG"];
const targetedResources = ["ABC", "XYZ", "EFG", "ZZZ"];
const clientSponsors = ["ABC", "XYZ"];
const types = ["PO", "SOW"];
const currencies = ["INR", "USD"];
const DocumentTypes = [".docx", ".pdf", ".excel"];

export const SOW_init_state = {
  inputFieldsData: {
    names: names,
    projects: projects,
    clientFinController: clientFinController,
    targetedResources: targetedResources,
    clientSponsors: clientSponsors,
    types: types,
    currencies: currencies,
    DocumentTypes: DocumentTypes,
  },
  popup: false,
  redirect: false,
  response_message: "",
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
    setPOEmpTabData(state, action) {
      state.employees = [...action.payload].filter((emp) => {
        return emp.Status === "assign";
      });
    },
    SetSpecific(state, action) {
      state.dataByID = [...action.payload];
    },
    setDefaultEmpDataOnedit(state, action) {
      console.log("reached setDefaultEmpDataOnedit");
      state.specificEmpData = state.employees.filter((employee) => {
        return employee._id === action.payload;
      });
    },
  },
});

export const PoSowActions = POSOW_Slice.actions;

export default POSOW_Slice;
