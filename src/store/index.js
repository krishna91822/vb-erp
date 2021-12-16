import { configureStore } from "@reduxjs/toolkit";

import contentsSlice from "./contents-slice";
import uiSlice from "./ui-slice";
import rewardSlice from "./rewards-slice";
import cimsSlice from "./cims-slice";
import employeeSlice from "./employees-slice";

export default configureStore({
  reducer: {
    contents: contentsSlice.reducer,
    ui: uiSlice.reducer,
    reward: rewardSlice.reducer,
    cims: cimsSlice.reducer,
    employee: employeeSlice.reducer,
  },
});
