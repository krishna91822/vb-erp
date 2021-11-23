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
    SetSpecific(state, action) {
      state.dataByID = [...action.payload];
    },
  },
});

export const PoSowActions = POSOW_Slice.actions;

export default POSOW_Slice;
