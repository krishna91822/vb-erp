import { configureStore } from "@reduxjs/toolkit";

import contentsSlice from "./contents-slice";
import uiSlice from "./ui-slice";
import POSOW_Slice from "./CMS/POSOW-slice";

export default configureStore({
  reducer: {
    contents: contentsSlice.reducer,
    ui: uiSlice.reducer,
    CMS_state: POSOW_Slice.reducer,
  },
});
