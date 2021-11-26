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
const employees = [
  {
    emp_name: "Alex",
    emp_id: 1994,
    // emp: { emp_name: "Alex", emp_id: 1994 },
    start_date: "11 / 25 / 2021",
    end_date: "11 / 25 / 2021",
    percentage_alloc: 15,
  },
  {
    emp_name: "David",
    emp_id: 1972,
    // emp: { emp_name: "David", emp_id: 1972 },
    start_date: "11 / 25 / 2021",
    end_date: "11 / 25 / 2021",
    percentage_alloc: 15,
  },
  {
    emp_name: "yusuf",
    emp_id: 1974,
    // emp: { emp_name: "yusuf", emp_id: 1974 },
    start_date: "11 / 25 / 2021",
    end_date: "11 / 25 / 2021",
    percentage_alloc: 20,
  },
  {
    emp_name: "Aquib",
    emp_id: 2008,
    // emp: { emp_name: "Aquib", emp_id: 2008 },
    start_date: "11 / 25 / 2021",
    end_date: "11 / 25 / 2021",
    percentage_alloc: 30,
  },
  {
    emp_name: "yash DY",
    emp_id: 1957,
    // emp: { emp_name: "yash DY", emp_id: 1957 },
    start_date: "11 / 25 / 2021",
    end_date: "11 / 25 / 2021",
    percentage_alloc: 10,
  },
  {
    emp_name: "Ayushi",
    emp_id: 1993,
    // emp: { emp_name: "Ayushi", emp_id: 1993 },
    start_date: "11 / 25 / 2021",
    end_date: "11 / 25 / 2021",
    percentage_alloc: 5,
  },
  {
    emp_name: "Tanmay",
    emp_id: 1994,
    // emp: { emp_name: "Tanmay", emp_id: 1994 },
    start_date: "11 / 25 / 2021",
    end_date: "11 / 25 / 2021",
    percentage_alloc: 5,
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
  employees: employees,
  specificEmpData: [
    {
      // emp: { emp_name: "Tanmay", emp_id: 1994 },
      emp_name: "Tanmay",
      emp_id: 1994,
      start_date: "04 / 14 / 2021",
      end_date: "05 / 14 / 2021",
      percentage_alloc: 70,
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
    SetSpecific(state, action) {
      state.dataByID = [...action.payload];
    },
  },
});

export const PoSowActions = POSOW_Slice.actions;

export default POSOW_Slice;
