const INITIAL_STATE = {
  currentEmployee: null,
  inEditMode: false,
  allEmployees: [],
  createEmployee: null,
};

const employeeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_EMPLOYEE":
      return {
        ...state,
        currentEmployee: action.payload,
      };

    case "TOGGLE_EDIT_MODE":
      return {
        ...state,
        inEditMode: !state.inEditMode,
      };

    case "SET_ALL_EMPLOYEES":
      return {
        ...state,
        allEmployees: [...state.allEmployees, action.payload],
      };

    case "CREATE_EMPLOYEE":
      return {
        ...state,
        createEmployee: action.payload,
      };

    default:
      return state;
  }
};

export default employeeReducer;
