import { createSlice } from "@reduxjs/toolkit";

const names = [
  "Harsha Bendi",
  "John dave",
  "Vimal K",
  "Aquib",
  "yash DY",
  "tanmay k",
  "Yussuf Sh",
  "Ayushi S",
];
const AllAvailableEmp = [
  { emp_name: "Alex", emp_id: 1990 },
  { emp_name: "David", emp_id: 1972 },
  { emp_name: "yusuf", emp_id: 1974 },
  { emp_name: "Aquib", emp_id: 2008 },
  { emp_name: "yash DY", emp_id: 1957 },
  { emp_name: "Ayushi", emp_id: 1993 },
  { emp_name: "Tanmay", emp_id: 1994 },
  { emp_name: "", emp_id: "" },
];
const employees = [
  {
    Employee_Name: "Alex",
    Employee_Id: 1990,
    // emp: { emp_name: "Alex", emp_id: 1994 },
    Start_Date: "11 / 15 / 2021",
    End_Date: "11 / 25 / 2021",
    Allocation_Rate: 15,
  },
  {
    Employee_Name: "David",
    Employee_Id: 1972,
    // emp: { emp_name: "David", emp_id: 1972 },
    Start_Date: "11 / 25 / 2021",
    End_Date: "12 / 15 / 2021",
    Allocation_Rate: 15,
  },
  {
    Employee_Name: "yusuf",
    Employee_Id: 1974,
    // emp: { emp_name: "yusuf", emp_id: 1974 },
    Start_Date: "11 / 25 / 2021",
    End_Date: "11 / 25 / 2021",
    Allocation_Rate: 20,
  },
  {
    Employee_Name: "Aquib",
    Employee_Id: 2008,
    // emp: { emp_name: "Aquib", emp_id: 2008 },
    Start_Date: "11 / 25 / 2021",
    End_Date: "11 / 25 / 2021",
    Allocation_Rate: 30,
  },
  {
    Employee_Name: "yash DY",
    Employee_Id: 1957,
    // emp: { emp_name: "yash DY", emp_id: 1957 },
    Start_Date: "11 / 25 / 2021",
    End_Date: "11 / 25 / 2021",
    Allocation_Rate: 10,
  },
  {
    Employee_Name: "Ayushi",
    Employee_Id: 1993,
    // emp: { emp_name: "Ayushi", emp_id: 1993 },
    Start_Date: "11 / 25 / 2021",
    End_Date: "11 / 25 / 2021",
    Allocation_Rate: 5,
  },
  {
    Employee_Name: "Tanmay",
    Employee_Id: 1994,
    // emp: { emp_name: "Tanmay", emp_id: 1994 },
    Start_Date: "11 / 25 / 2021",
    End_Date: "11 / 25 / 2021",
    Allocation_Rate: 5,
  },
];
const projects = ["xyz23", "asd34", "abc56", "yusah98", "ydy APPs"];
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
  response_message: "",
  poSowData: [],
  dataByID: [
    {
      Client_Name: "",
      Project_Name: "",
      Client_Sponser: [""],
      Client_Finance_Controller: [""],
      Targetted_Resources: ["", ""],
      Status: "",
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
      // emp: { emp_name: "Tanmay", emp_id: 1994 },
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
    setTabViewData(state, action) {
      state.poSowData = action.payload;
    },
    setPOEmpTabData(state, action) {
      state.employees = action.payload;
    },
    SetSpecific(state, action) {
      state.dataByID = [...action.payload];
    },
    setDefaultEmpDataOnedit(state, action) {
      console.log("reached setDefaultEmpDataOnedit");
      state.specificEmpData = state.employees.filter((employee) => {
        return employee.Employee_Id == action.payload;
      });
    },
  },
});

export const PoSowActions = POSOW_Slice.actions;

export default POSOW_Slice;
