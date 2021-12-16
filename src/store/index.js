import { configureStore } from "@reduxjs/toolkit";

import contentsSlice from "./contents-slice";
import uiSlice from "./ui-slice";
import rewardSlice from "./rewards-slice";
import cimsSlice from "./cims-slice";
import employeeSlice from "./employees-slice";
import POSOW_Slice from "./CMS/POSOW-slice";
import invoice_Slice from "./CMS/INVOICE-slice";

export default configureStore({
  reducer: {
    contents: contentsSlice.reducer,
    ui: uiSlice.reducer,
    reward: rewardSlice.reducer,
    cims: cimsSlice.reducer,
    employee: employeeSlice.reducer,
    CMS_state: POSOW_Slice.reducer,
    INVOICE_state: invoice_Slice.reducer,
  },
});
