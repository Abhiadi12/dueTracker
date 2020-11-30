import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import Validate from "react-validate-form";
import ErrorComponent from "./ErrorComponent";
import { userFormRules } from "../js-code/user-validator"; // validation form
import { displayErrors, numberOfErrors } from "../js-code/error-helper"; // error helper
import contries from "../countries";
import { updateUser, autoLoginUser } from "../redux/auth/authActions";
import axios from "axios";
import {
  Button,
  Input,
  Segment,
  Label,
  Form,
  List,
  Divider,
  Header,
  Icon,
} from "semantic-ui-react";

function EditUserForm(props) {
  const token = localStorage.getItem("token");
  const current_user = useSelector((state) => state.auth.user);
  const { id } = props.match.params;
  const isOpen = useSelector((state) => state.error.isOpen);
  const dispatch = useDispatch();
  const [hiddenPassword, setHiddenPassword] = useState(true);

  const changeVisibilityOfPassword = () => setHiddenPassword(!hiddenPassword);
  const [editUserFormObject, setEditUserFormFormObject] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const [dynamicInput, setDynamicInput] = useState({
    suggestions: [],
    text: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get("/api/v1/auto_login", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { username, email, phone, country } = response.data.current_user;
      setEditUserFormFormObject((state) => ({
        ...state,
        username,
        email,
        phone,
      }));
      setDynamicInput({ suggestions: [], text: country });
      dispatch(autoLoginUser(response.data));
    };
    if (token) {
      fetchUser();
    }
  }, []);

  if (token) {
    const rules = userFormRules;

    const validations = {
      username: ["required", "userNameRule"],
      email: ["required", "emailRule"],
      password: ["required"],
      phone: ["required", "phnNumRule"],
      country: ["required"],
    };

    const onChangeHandler = (event) => {
      const { name, value } = event.target;
      setEditUserFormFormObject((state) => ({ ...state, [name]: value }));
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

    const handleEditUser = (event) => {
      event.preventDefault();
      dispatch(
        updateUser(
          id,
          { ...editUserFormObject, country: dynamicInput.text },
          token
        )
      );
      window.scrollTo(0, 0);
    };

    if (current_user.id && current_user.id != id) {
      return (
        <Segment>
          <Header as="h2" icon textAlign="center" color="red">
            <Icon name="exclamation circle" />
            Error!!!
            <Header.Subheader>
              It seems that you are trying to access wrong page
              <p>
                <span style={{ fontSize: "20px" }}>
                  &#128557;&#128557;&#128557;
                </span>
              </p>
            </Header.Subheader>
          </Header>
        </Segment>
      );
    }
    return (
      <Segment placeholder>
        <Divider />
        <Label color="pink" ribbon>
          edit your account
        </Label>
        {isOpen && <ErrorComponent />}
        <Validate validations={validations} rules={rules}>
          {({ validate, errorMessages, allValid }) => (
            <Form onSubmit={handleEditUser}>
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
                  value={editUserFormObject.username}
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
                  value={editUserFormObject.email}
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
                error={numberOfErrors(errorMessages.phone) ? true : false}
              >
                <label>Phone</label>
                <Input
                  placeholder="10-digit number"
                  name="phone"
                  type="text"
                  value={editUserFormObject.phone}
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
              <Divider />
              <Form.Field
                error={numberOfErrors(errorMessages.password) ? true : false}
              >
                <label>Password</label>
                <Input
                  placeholder="Password"
                  name="password"
                  type={hiddenPassword ? "password" : "text"}
                  value={editUserFormObject.password}
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
                <div className="error-message">
                  {errorMessages.password
                    ? displayErrors(errorMessages.password)
                    : ""}
                </div>
                {"* Please enter your password to save the changes "}
              </Form.Field>

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

export default EditUserForm;
