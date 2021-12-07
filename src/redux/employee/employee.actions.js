export const setCurrentEmployee = (employee) => ({
  type: 'SET_CURRENT_EMPLOYEE',
  payload: employee,
});

export const setAllEmployees = (employees) => ({
  type: 'SET_ALL_EMPLOYEES',
  payload: employees,
});

export const createEmployee = (employee) => ({
  type: 'CREATE_EMPLOYEE',
  payload: employee,
});

export const toggleEditMode = () => ({
  type: 'TOGGLE_EDIT_MODE',
});
