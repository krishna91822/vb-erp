import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import uiSlice from "./ui-slice";
import employeeSlice from "./employeeSlice";

import contentsSlice from "./contents-slice";
import rewardSlice from "./rewards-slice";
import cimsSlice from "./cims-slice";
import employeeSlice from "./employees-slice";
import POSOW_Slice from "./CMS/POSOW-slice";
import invoice_Slice from "./CMS/INVOICE-slice";

const middleware = [logger];

export default configureStore({
  reducer: {
    contents: contentsSlice.reducer,
    ui: uiSlice.reducer,
    reward: rewardSlice.reducer,
    cims: cimsSlice.reducer,
    CMS_state: POSOW_Slice.reducer,
    INVOICE_state: invoice_Slice.reducer,
    employee: employeeSlice,
  },
  middleware: [...middleware],
});
