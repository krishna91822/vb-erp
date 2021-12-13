import { configureStore } from "@reduxjs/toolkit";

import contentsSlice from "./contents-slice";
import uiSlice from "./ui-slice";
import pmoSlice from "./pmo-slice";
import rewardSlice from "./rewards-slice";

export default configureStore({
  reducer: {
    contents: contentsSlice.reducer,
    ui: uiSlice.reducer,
    pmo: pmoSlice.reducer,
    reward: rewardSlice.reducer,
  },
});
