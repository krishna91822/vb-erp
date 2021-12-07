import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import uiSlice from './ui-slice';
import employeeSlice from './employeeSlice';

const middleware = [logger];

export default configureStore({
  reducer: {
    ui: uiSlice.reducer,
    employee: employeeSlice,
  },
  middleware: [...middleware],
});
