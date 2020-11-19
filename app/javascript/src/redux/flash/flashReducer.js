import { SET_FLASH_MESSAGE, REMOVE_FLASH_MESSAGE } from "./flashTypes";
const initialFlashMessageState = {
  message: "",
  color: "",
};

const flashReducer = (state = initialFlashMessageState, action) => {
  switch (action.type) {
    case SET_FLASH_MESSAGE:
      return {
        message: action.message,
        color: action.color,
      };
    case REMOVE_FLASH_MESSAGE:
      return {
        message: "",
        color: "",
      };
    default:
      return state;
  }
};
export default flashReducer;
