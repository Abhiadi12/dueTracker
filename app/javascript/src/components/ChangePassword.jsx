import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import Validate from "react-validate-form";
import { strengthDecider } from "../js-code/password-strength-checker"; // password strength
import { userFormRules } from "../js-code/user-validator"; // validation form
import { displayErrors, numberOfErrors } from "../js-code/error-helper"; // error helper
import { setFlashMessage } from "../redux/flash/flashActions";
import axios from "axios";
import {
  Button,
  Input,
  Segment,
  Label,
  Form,
  Divider,
  Progress,
} from "semantic-ui-react";

function ChangePassword() {
  const token = useSelector((state) => state.auth.token);
  const [changePasswordForm, setChangePasswordForm] = useState({
    password: "",
    confirm_password: "",
  });

  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [hiddenConfirmPassword, setHiddenConfirmPassword] = useState(true);
  const changeVisibilityOfPassword = () => setHiddenPassword(!hiddenPassword);
  const changeVisibilityOfConfirmPassword = () =>
    setHiddenConfirmPassword(!hiddenConfirmPassword);
  const dispatch = useDispatch();
  let history = useHistory();
  if (token) {
    const extraRule = {
      confirmPasswordRule: {
        test: (val) => val === changePasswordForm.password,
        message: () => `Confirm Password must match with password`,
      },
    };
    const rules = { ...userFormRules, ...extraRule };
    const validations = {
      password: [
        "required",
        "min:6",
        "removeTrailingSpace",
        "hasNumberRule",
        "hasUpperCaseRule",
        "hasSpecialRule",
      ],
      confirm_password: ["required", "confirmPasswordRule"],
    };

    const onChangeHandler = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      setChangePasswordForm((state) => ({ ...state, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
      event.preventDefault();
      /*const requestOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        password: changePasswordForm.password,
      };*/
      /*fetch("/api/v1/change_password", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: changePasswordForm.password }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));*/
      try {
        const response = await axios.put(
          "/api/v1/change_password",
          { password: changePasswordForm.password },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(setFlashMessage(response.data.message, "green"));
      } catch (error) {
        dispatch(setFlashMessage("Unable to process try again", "red"));
      }
      history.push("/profile");
    };

    const [progressColor, progressText, progressPercentage] = strengthDecider(
      changePasswordForm.password
    );

    return (
      <Segment placeholder>
        <Label color="blue" ribbon>
          Change your password
        </Label>

        <Validate validations={validations} rules={rules}>
          {({ validate, errorMessages, allValid }) => (
            <Form onSubmit={onSubmitHandler}>
              <Form.Field
                error={numberOfErrors(errorMessages.password) ? true : false}
              >
                <label>Password</label>
                <Input
                  placeholder="Password"
                  name="password"
                  type={hiddenPassword ? "password" : "text"}
                  value={changePasswordForm.password}
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
                {progressText && changePasswordForm.password.length > 0 && (
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
                  value={changePasswordForm.confirm_password}
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
              <Divider color="blue" />
              <Button primary type="submit" disabled={allValid ? false : true}>
                Update
              </Button>
            </Form>
          )}
        </Validate>
      </Segment>
    );
  } else return <Redirect to="/login" />;
}

export default ChangePassword;
