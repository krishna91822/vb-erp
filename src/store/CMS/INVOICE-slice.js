import { createSlice } from "@reduxjs/toolkit";

const names = [];
const projects = [];
const clientFinController = [];
const targetedResources = [];
const clientSponsors = [];
const invoiceRaised = [];
const invoiceRecieved = [];

const invoiceAmount = [];
const VbBankAcc = [];

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
    invoice_received: invoiceRecieved,
  },

  popup: false,
  redirect: false,
  response_message: "",
  invoiceData: [],
  totalCount: 0,
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
      invoice_received: "",
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
    setTotalCount(state, action) {
      state.totalCount = action.payload;
    },
    setTabViewData(state, action) {
      state.invoiceData = action.payload;
    },
    SetSpecific(state, action) {
      state.dataByID = [...action.payload];
    },
    setRedirect(state, action) {
      state.redirect = action.payload;
    },
  },
});

export const invoiceActions = invoice_Slice.actions;

export default invoice_Slice;
