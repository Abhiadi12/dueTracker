import {
  hasNumber,
  hasSpecial,
  hasUpperCase,
} from "./password-strength-checker";

export const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
export const validNameRegex = RegExp(/^[A-Za-z]+(?:[ _-][A-Za-z0-9]+)*$/);
export const validPhnNumRegex = RegExp(/\b\d{10}\b/g);

export const userFormRules = {
  userNameRule: {
    test: (val) => validNameRegex.test(val),
    message: () => `Username is not valid please try again`,
  },
  emailRule: {
    test: (val) => validEmailRegex.test(val),
    message: () => `Email is not valid`,
  },
  removeTrailingSpace: {
    test: (val) => !/(^\s+)|(\s+$)/.test(val),
    message: () => `Trailing spaces not allowed`,
  },
  phnNumRule: {
    test: (val) => validPhnNumRegex.test(val),
    message: () => `Phone number is not correct`,
  },
  hasNumberRule: {
    test: (val) => hasNumber(val),
    message: () => `Password must contain a number`,
  },
  hasUpperCaseRule: {
    test: (val) => hasUpperCase(val),
    message: () => `Password must contain a upper case`,
  },
  hasSpecialRule: {
    test: (val) => hasSpecial(val),
    message: () => `Password must contain a special character`,
  },
  amountMustGreaterThanZero: {
    test: (val) => val > 0,
    message: () => `Amount must be greater than zero`,
  },

  required: {
    message: (field) =>
      `${
        field === "confirm_password"
          ? "Confirm Password"
          : field.charAt(0).toUpperCase() + field.slice(1)
      } can't blank`,
  },
};
