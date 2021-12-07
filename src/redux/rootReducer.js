import { combineReducers } from 'redux';

import employeeReducer from './employee/employee.reducer';
import uiReducer from './ui/ui.reducer';

export default combineReducers({
  employee: employeeReducer,
  ui: uiReducer,
});
