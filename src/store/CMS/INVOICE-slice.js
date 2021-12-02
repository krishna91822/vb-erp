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
const invoiceRaised = ["2567", "8743", "3753"];
const invoiceAmount = ["9349", "8243", "9753"];
const VbBankAcc = ["0987", "7654", "2958"];

export const invoice_init_state = {
  inputFieldsData: {
    names: names,
    projects: projects,
    clientFinController: clientFinController,
    targetedResources: targetedResources,
    clientSponsors: clientSponsors,
    invoiceRaised: invoiceRaised,
    invoiceAmount: invoiceAmount,
    VbBankAcc: VbBankAcc,
  },
  popup: false,
  response_message: "",
  invoiceData: [],
  dataByID: [
    {
      Client_Name: "",
      Project_Name: "",
      Client_Sponser: [""],
      Client_Finance_Controller: [""],
      Targetted_Resources: ["", ""],
      PO_Number: "",
      PO_Amount: "",
      invoiceRaised: "",
      invoiceAmount: "",
      VbBankAcc: "",
      Date: "",
    },
  ],
};

const invoice_Slice = createSlice({
  name: "invoice_state",
  initialState: invoice_init_state,
  reducers: {
    PopUpON(state, action) {
      state.popup = !state.popup;
      state.response_message = action.payload;
    },
    PopUpOF(state, action) {
      state.popup = !state.popup;
    },
    setTabViewData(state, action) {
      state.invoiceData = action.payload;
    },
    SetSpecific(state, action) {
      state.dataByID = [...action.payload];
    },
  },
});

export const invoiceActions = invoice_Slice.actions;

export default invoice_Slice;
