import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import errorReducer from "./error/errorReducer";
import flashReducer from "./flash/flashReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  flash: flashReducer,
});

export default rootReducer;
