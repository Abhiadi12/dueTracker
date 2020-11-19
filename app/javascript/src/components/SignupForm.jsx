import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import Validate from "react-validate-form";
import CreateAccountInstruction from "./CreateAccountInstruction";
import ErrorComponent from "./ErrorComponent";
import { strengthDecider } from "../js-code/password-strength-checker"; // password strength
import { userFormRules } from "../js-code/user-validator"; // validation form
import { displayErrors, numberOfErrors } from "../js-code/error-helper"; // error helper

import { createUser } from "../redux/auth/authActions";
import { setFlashMessage } from "../redux/flash/flashActions";
import contries from "../countries";
import {
  Button,
  Input,
  Segment,
  Label,
  Checkbox,
  Form,
  List,
  Divider,
  Progress,
} from "semantic-ui-react";

/*const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validNameRegex = RegExp(/^[A-Za-z]+(?:[ _-][A-Za-z0-9]+)*$/);
const validPhnNumRegex = RegExp(/\b\d{10}\b/g);

const displayErrors = (errorMessage) => {
  const errorMessageArray = errorMessage.map((val) => (
    <li key={val}>{`${val}`}</li>
  ));
  return <ul>{errorMessageArray}</ul>;
};

const numberOfErrors = (errorMessage) =>
  errorMessage === undefined ? 0 : errorMessage.length;
*/
const SignupForm = ({ isLoginForm, setIsLoginForm }) => {
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [hiddenConfirmPassword, setHiddenConfirmPassword] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const changeVisibilityOfPassword = () => setHiddenPassword(!hiddenPassword);
  const changeVisibilityOfConfirmPassword = () =>
    setHiddenConfirmPassword(!hiddenConfirmPassword);

  const [signupFormObject, setSignupFormObject] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
  });

  const [dynamicInput, setDynamicInput] = useState({
    suggestions: [],
    text: "",
  });

  const extraRule = {
    confirmPasswordRule: {
      test: (val) => val === signupFormObject.password,
      message: () => `Confirm Password must match with password`,
    },
  };

  const token = useSelector((state) => state.auth.token);
  const isOpen = useSelector((state) => state.error.isOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoginForm) setIsLoginForm(false);
  }, []);

  const rules = { ...userFormRules, ...extraRule };

  const validations = {
    username: ["required", "userNameRule"],
    email: ["required", "emailRule"],
    password: [
      "required",
      "min:6",
      "removeTrailingSpace",
      "hasNumberRule",
      "hasUpperCaseRule",
      "hasSpecialRule",
    ],
    confirm_password: ["required", "confirmPasswordRule"],
    phone: ["required", "phnNumRule"],
    country: ["required"],
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setSignupFormObject((state) => ({ ...state, [name]: value }));
  };

  const manageAutoComplete = (event) => {
    const value = event.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = contries.sort().filter((v) => regex.test(v));
    }
    setDynamicInput({ suggestions: suggestions, text: value });
  };

  const selectCountry = (value) => {
    setDynamicInput({ suggestions: [], text: value });
  };

  const loadAllCountry = () => {
    return dynamicInput.suggestions.length === 0 ? null : (
      <List divided selection>
        {dynamicInput.suggestions.map((item, index) => (
          <List.Item
            key={index}
            onClick={() => {
              selectCountry(item);
            }}
          >
            {item}
          </List.Item>
        ))}
      </List>
    );
  };

  const handleCreateUser = (event) => {
    event.preventDefault();
    if (agreeTerms)
      dispatch(
        createUser({
          username: signupFormObject.username,
          email: signupFormObject.email,
          password: signupFormObject.password,
          phone: signupFormObject.phone,
          country: dynamicInput.text,
        })
      );
    else {
      window.scrollTo(0, 0);
      dispatch(
        setFlashMessage(" Please accept the terms and conditions ", "orange")
      );
    }
  };

  const [progressColor, progressText, progressPercentage] = strengthDecider(
    signupFormObject.password
  );
  if (token) return <Redirect to="/profile" />;
  else {
    return (
      <Segment placeholder>
        <CreateAccountInstruction />
        <Divider />
        <Label color="blue" ribbon>
          Create your account and join with us
        </Label>
        {isOpen && <ErrorComponent />}
        <Validate validations={validations} rules={rules}>
          {({ validate, errorMessages, allValid }) => (
            <Form onSubmit={handleCreateUser}>
              <Form.Field
                error={
                  numberOfErrors(errorMessages.username) > 0 ? true : false
                }
              >
                <label>Username</label>
                <Input
                  placeholder="Username"
                  name="username"
                  type="text"
                  value={signupFormObject.username}
                  onChange={onChangeHandler}
                  onBlur={validate}
                  required
                />
                <div className="error-message">
                  {errorMessages.username
                    ? displayErrors(errorMessages.username)
                    : ""}
                </div>
              </Form.Field>

              <Form.Field
                error={numberOfErrors(errorMessages.email) ? true : false}
              >
                <label>Email</label>
                <Input
                  placeholder="Your Email"
                  name="email"
                  type="email"
                  value={signupFormObject.email}
                  onChange={onChangeHandler}
                  onBlur={validate}
                  required
                />
                <div className="error-message">
                  {errorMessages.email
                    ? displayErrors(errorMessages.email)
                    : ""}
                </div>
              </Form.Field>

              <Form.Field
                error={numberOfErrors(errorMessages.password) ? true : false}
              >
                <label>Password</label>
                <Input
                  placeholder="Password"
                  name="password"
                  type={hiddenPassword ? "password" : "text"}
                  value={signupFormObject.password}
                  icon={{
                    name: hiddenPassword ? "eye slash" : "eye",
                    circular: true,
                    link: true,
                    onClick: changeVisibilityOfPassword,
                  }}
                  onChange={onChangeHandler}
                  onBlur={validate}
                  required
                />
                {progressText && signupFormObject.password.length > 0 && (
                  <Progress
                    color={progressColor}
                    percent={progressPercentage}
                    size="tiny"
                  >
                    {progressText}
                  </Progress>
                )}
                <div className="error-message">
                  {errorMessages.password
                    ? displayErrors(errorMessages.password)
                    : ""}
                </div>
              </Form.Field>

              <Form.Field
                error={
                  numberOfErrors(errorMessages.confirm_password) ? true : false
                }
              >
                <label>Confirm Password</label>
                <Input
                  placeholder="Confirm Password"
                  name="confirm_password"
                  type={hiddenConfirmPassword ? "password" : "text"}
                  value={signupFormObject.confirm_password}
                  icon={{
                    name: hiddenConfirmPassword ? "eye slash" : "eye",
                    circular: true,
                    link: true,
                    onClick: changeVisibilityOfConfirmPassword,
                  }}
                  onChange={onChangeHandler}
                  onBlur={validate}
                  required
                />
                <div className="error-message">
                  {errorMessages.confirm_password
                    ? displayErrors(errorMessages.confirm_password)
                    : ""}
                </div>
              </Form.Field>

              <Form.Field
                error={numberOfErrors(errorMessages.phone) ? true : false}
              >
                <label>Phone</label>
                <Input
                  placeholder="10-digit number"
                  name="phone"
                  type="text"
                  value={signupFormObject.phone}
                  onChange={onChangeHandler}
                  onBlur={validate}
                  autoComplete="off"
                  required
                />
                <div className="error-message">
                  {errorMessages.phone
                    ? displayErrors(errorMessages.phone)
                    : ""}
                </div>
              </Form.Field>

              <Form.Field
                error={numberOfErrors(errorMessages.country) ? true : false}
              >
                <label>Country</label>
                <Input
                  placeholder="Select"
                  name="country"
                  type="text"
                  value={dynamicInput.text}
                  onChange={manageAutoComplete}
                  onBlur={validate}
                  autoComplete="off"
                  required
                />
                {loadAllCountry()}
                <div className="error-message">
                  {errorMessages.country
                    ? displayErrors(errorMessages.country)
                    : ""}
                </div>
              </Form.Field>

              <Form.Field>
                <Checkbox
                  label="I agree to the Terms and Conditions"
                  onChange={() => setAgreeTerms(!agreeTerms)}
                />
                <Label pointing>Must accept the terms and conditions!</Label>
              </Form.Field>
              <Button type="submit" disabled={allValid ? false : true}>
                Create
              </Button>
            </Form>
          )}
        </Validate>
      </Segment>
    );
  }
};

export default SignupForm;
