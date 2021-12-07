const INITIAL_STATE = {
  contentIsVisible: false,
  notification: null,
  loading: false,
};

const uiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UI_TOGGLE':
      return {
        ...state,
        contentIsVisible: !state.contentIsVisible,
      };

    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        notification: {
          status: action.payload.status,
          title: action.payload.title,
          message: action.payload.message,
        },
      };

    case 'TOGGLE_LOADER':
      return {
        ...state,
        loading: !state.loading,
      };

    default:
      return state;
  }
};

export default uiReducer;
