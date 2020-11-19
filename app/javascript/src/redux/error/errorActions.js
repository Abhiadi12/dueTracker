// backend error while create or update
import { SET_ERROR, HIDE_ERROR } from "./errorTypes";

export const setError = (errorMsgs) => {
  return {
    type: SET_ERROR,
    errors: errorMsgs,
  };
};

export const hideError = () => {
  return {
    type: HIDE_ERROR,
  };
};
