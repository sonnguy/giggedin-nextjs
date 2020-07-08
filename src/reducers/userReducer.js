const { SET_USER_DATA, REMOVE_USER_DATA } = require('../actions/userAction');

const initialState = {
  user: null,
  token: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    }
    case REMOVE_USER_DATA: {
      return {
        ...state,
        ...initialState
      };
    }
    default:
      return state;
  }
};
export default userReducer;
