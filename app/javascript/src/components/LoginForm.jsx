import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import LoaderPage from "./LoaderPage";
import { fetchUser } from "../redux/auth/authActions";
import {
  Button,
  Header,
  Icon,
  Segment,
  Label,
  Input,
  Form,
} from "semantic-ui-react";
/*
1. user login success -> profile + flash message
2. error then show flash message
*/
const LoginForm = () => {
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [loginFormObject, setLoginFormObject] = useState({
    email: "",
    password: "",
  });
  const changeVisibilityOfPassword = () => setHiddenPassword(!hiddenPassword);

  const loading = useSelector((state) => state.auth.loading);
  const token = localStorage.getItem("token");

  //const current_user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginFormObject((state) => ({ ...state, [name]: value }));
  };

  const loginHandler = (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    dispatch(fetchUser(loginFormObject.email, loginFormObject.password));
  };

  if (token) {
    return <Redirect to="/profile" />;
  } else {
    return (
      <Segment placeholder>
        {loading === true && token === "" && <LoaderPage />}
        <Label color="blue" ribbon>
          Welcome please login to access your account
        </Label>
        <Header icon>
          <Icon name="user outline" />
        </Header>
        <Form onSubmit={loginHandler}>
          <Form.Field>
            <label>Email</label>
            <Input
              placeholder="Your Email"
              name="email"
              type="email"
              value={loginFormObject.email}
              onChange={handleChange}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Input
              placeholder="Password"
              name="password"
              type={hiddenPassword ? "password" : "text"}
              icon={{
                name: hiddenPassword ? "eye slash" : "eye",
                circular: true,
                link: true,
                onClick: changeVisibilityOfPassword,
              }}
              value={loginFormObject.password}
              onChange={handleChange}
              required
            />
          </Form.Field>

          <Button primary type="submit">
            login
          </Button>
        </Form>
      </Segment>
    );
  }
};

export default LoginForm;
