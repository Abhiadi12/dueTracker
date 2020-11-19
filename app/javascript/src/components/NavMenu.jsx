import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, Button, Label } from "semantic-ui-react";
import { logout } from "../redux/auth/authActions";
import ActionsForCurrentUser from "./ActionsForCurrentUser";
import AlertComponent from "./AlertComponent";
import PropTypes from "prop-types";
import { removeFlashMessage } from "../redux/flash/flashActions";

class NavMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: this.props.title };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const { title, color, toggleFormState, isLoginForm } = this.props;
    const { current_user, token, flashMessage, messageColor } = this.props;
    const { logout, removeFlashMessage } = this.props;
    if (flashMessage)
      setTimeout(function () {
        removeFlashMessage();
      }, 5000);

    return (
      <>
        <Menu inverted stackable>
          <Menu.Item
            name={title}
            color={color}
            active={activeItem === title}
            onClick={this.handleItemClick}
            icon="home"
          />

          <Menu.Item
            name="reviews"
            icon="heart"
            color={color}
            active={activeItem === "reviews"}
            onClick={this.handleItemClick}
          />

          {token && (
            <ActionsForCurrentUser
              color={color}
              handleItemClick={this.handleItemClick}
              activeItem={activeItem}
              logout={logout}
              user={current_user}
              token={token}
            />
          )}

          <Menu.Menu position="right">
            {token ? (
              <Label as="a" image>
                <img src="https://picsum.photos/200/300/?blur=2" />
                {` welcome ${current_user.username} `}
              </Label>
            ) : isLoginForm ? (
              <Menu.Item>
                <Button
                  inverted
                  color="green"
                  as={Link}
                  to="/signup"
                  onClick={toggleFormState}
                >
                  Sign up
                </Button>
              </Menu.Item>
            ) : (
              <Menu.Item>
                <Button
                  inverted
                  color="green"
                  as={Link}
                  to="/login"
                  onClick={toggleFormState}
                >
                  Login
                </Button>
              </Menu.Item>
            )}
          </Menu.Menu>
        </Menu>
        {flashMessage && (
          <div className="flash-message">
            <AlertComponent message={flashMessage} color={messageColor} />
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    current_user: state.auth.user,
    token: state.auth.token,
    flashMessage: state.flash.message,
    messageColor: state.flash.color,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    removeFlashMessage: () => dispatch(removeFlashMessage()),
  };
};

NavMenu.defaultProps = {
  title: "My App",
};

NavMenu.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  toggleFormState: PropTypes.func.isRequired,
  isLoginForm: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
