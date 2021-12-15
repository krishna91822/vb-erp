import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import uiSlice from "./ui-slice";
import employeeSlice from "./employeeSlice";

import contentsSlice from "./contents-slice";
import rewardSlice from "./rewards-slice";

const middleware = [logger];

export default configureStore({
  reducer: {
    contents: contentsSlice.reducer,
    ui: uiSlice.reducer,
    reward: rewardSlice.reducer,
    employee: employeeSlice,
  },
  middleware: [...middleware],
});
