import {
  REQUEST_FOR_CURRENT_USER,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_FAILURE,
  AUTO_LOGIN_USER,
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
      localStorage.setItem("token", action.token);
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
    case AUTO_LOGIN_USER:
      return {
        ...state,
        user: action.current_user,
      };
    case LOGOUT:
      localStorage.removeItem("token");
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
