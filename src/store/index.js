import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";

import uiSlice from "./ui-slice";
import employeeSlice from "./employeeSlice";

import contentsSlice from "./contents-slice";
import pmoSlice from "./pmo-slice";
import rewardSlice from "./rewards-slice";
import cimsSlice from "./cims-slice";
import userSlice from "./user-slice";
import POSOW_Slice from "./CMS/POSOW-slice";
import invoice_Slice from "./CMS/INVOICE-slice";
import userAccountSlice from "./userAccount-slice";

const middleware = [logger, thunk];

export default configureStore({
  reducer: {
    contents: contentsSlice.reducer,
    ui: uiSlice.reducer,
    pmo: pmoSlice.reducer,
    reward: rewardSlice.reducer,
    cims: cimsSlice.reducer,
    user: userSlice.reducer,
    CMS_state: POSOW_Slice.reducer,
    INVOICE_state: invoice_Slice.reducer,
    employee: employeeSlice,
    createUser: userAccountSlice.reducer,
  },
  middleware: [...middleware],
});
