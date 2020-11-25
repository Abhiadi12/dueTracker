import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import errorReducer from "./error/errorReducer";
import flashReducer from "./flash/flashReducer";
import contactReducer from "./contact/contactReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  flash: flashReducer,
  contact: contactReducer,
});

export default rootReducer;
