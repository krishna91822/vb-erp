import { createSlice } from "@reduxjs/toolkit";

const tabViewInitialState = {
  poSowData: [],
  specificPOSOWdata: [
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

const mainSlice = createSlice({
  name: "poSOWTabViewState",
  initialState: tabViewInitialState,
  reducers: {
    setTabViewData(state, action) {
      state.poSowData = action.payload;
    },
    setspecificPOSOWdata(state, action) {
      state.specificPOSOWdata = [...action.payload];
    },
  },
});

export const tabViewActions = mainSlice.actions;

export default mainSlice;
