import { REQUEST_FOR_CURRENT_USER } from "../auth/authTypes";
import { SET_FLASH_MESSAGE, REMOVE_FLASH_MESSAGE } from "./flashTypes";
export const setFlashMessage = (message, color) => {
  return {
    type: SET_FLASH_MESSAGE,
    message: message,
    color: color,
  };
};

export const removeFlashMessage = () => {
  return {
    type: REMOVE_FLASH_MESSAGE,
  };
};
