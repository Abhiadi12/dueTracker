import {
  REQUEST_FOR_CURRENT_USER,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_FAILURE,
  LOGOUT,
} from "./authTypes";

const initialUserState = {
  loading: false,
  user: {},
  token: "",
};

const authReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case REQUEST_FOR_CURRENT_USER:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: action.current_user,
        token: action.token,
        loading: false,
      };
    case FETCH_CURRENT_USER_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case LOGOUT:
      return {
        loading: false,
        user: {},
        token: "",
      };
    default:
      return state;
  }
};
export default authReducer;
