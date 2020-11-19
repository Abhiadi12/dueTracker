import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import EditUserForm from "./components/EditUserForm";
import ChangePasswordForm from "./components/ChangePassword";
import NotFound from "./components/NotFound";
import { Provider } from "react-redux";
import store from "./redux/store";

import "../stylesheets/index.css";
import "semantic-ui-css/semantic.min.css";

function App() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const toggleFormState = () => {
    setIsLoginForm(!isLoginForm);
    console.log("clicked");
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavMenu
            title="Tracker"
            color="teal"
            toggleFormState={toggleFormState}
            isLoginForm={isLoginForm}
          />
        </div>
        <div className="container">
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/" component={LoginForm} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/users/edit/:id" component={EditUserForm} />
            <Route
              exact
              path="/signup"
              render={() => (
                <SignupForm
                  isLoginForm={isLoginForm}
                  setIsLoginForm={setIsLoginForm}
                />
              )}
            />
            <Route
              exact
              path="/change_password"
              component={ChangePasswordForm}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
