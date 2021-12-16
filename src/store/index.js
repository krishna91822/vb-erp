import { configureStore } from "@reduxjs/toolkit";

import contentsSlice from "./contents-slice";
import uiSlice from "./ui-slice";
<<<<<<< HEAD
import rewardSlice from "./rewards-slice";
=======
import cimsSlice from "./cims-slice";
>>>>>>> 0b937c344a6a2b5a5056ed5728d478ed1401364d

export default configureStore({
  reducer: {
    contents: contentsSlice.reducer,
    ui: uiSlice.reducer,
<<<<<<< HEAD
    reward: rewardSlice.reducer,
=======
    cims: cimsSlice.reducer,
>>>>>>> 0b937c344a6a2b5a5056ed5728d478ed1401364d
  },
});
