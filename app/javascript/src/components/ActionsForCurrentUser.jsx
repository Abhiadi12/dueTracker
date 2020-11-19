import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Header, Icon, Modal, Button } from "semantic-ui-react";
import { setFlashMessage } from "../redux/flash/flashActions";
import { deleteUser } from "../redux/auth/authActions";

function ActionsForCurrentUser(props) {
  const [open, setOpen] = React.useState(false);
  const { color, handleItemClick, activeItem, logout, user, token } = props;
  const dispatch = useDispatch();
  return (
    <>
      <Menu.Item
        name="Add"
        icon="plus"
        color={color}
        active={activeItem === "Add"}
        onClick={handleItemClick}
      />

      <Menu.Item
        name="About"
        icon="bolt"
        color={color}
        active={activeItem === "About"}
        onClick={handleItemClick}
      />

      <Dropdown text="Settings" pointing className="link item">
        <Dropdown.Menu>
          <Dropdown.Header>Options</Dropdown.Header>

          <Dropdown.Item as={Link} to={`/users/edit/${user.id}`}>
            Edit
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/change_password">
            Change Password
          </Dropdown.Item>
          <Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size="small"
            trigger={<Dropdown.Item>Delete</Dropdown.Item>}
          >
            <Header>
              <Icon name="trash" />
              Do you want to delete your account
            </Header>
            <Modal.Content>
              <p>
                If you delete your account then all of your data will get lose .
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button basic color="red" inverted onClick={() => setOpen(false)}>
                <Icon name="remove" /> No
              </Button>
              <Button
                color="green"
                inverted
                onClick={() => {
                  dispatch(deleteUser(user, token));
                  setOpen(false);
                }}
              >
                <Icon name="checkmark" /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={() => {
              logout();
              dispatch(setFlashMessage("Logout successfully", "green"));
            }}
          >
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default ActionsForCurrentUser;
