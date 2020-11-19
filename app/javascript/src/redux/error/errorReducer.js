import { SET_ERROR, HIDE_ERROR } from "./errorTypes";
const initialErrorState = {
  errors: [],
  isOpen: false,
};

const errorExtractor = (errorObject) => {
  let errorArray = [];
  for (let key in errorObject) {
    let msg = `${key} ${errorObject[key]}`;
    errorArray.push(msg);
  }
  return errorArray;
};

const errorReducer = (state = initialErrorState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        errors: errorExtractor(action.errors),
        isOpen: true,
      };
    case HIDE_ERROR:
      return {
        errors: [],
        isOpen: false,
      };
    default:
      return state;
  }
};

export default errorReducer;
