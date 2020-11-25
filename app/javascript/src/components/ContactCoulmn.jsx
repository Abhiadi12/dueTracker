import React from "react";
import { useDispatch } from "react-redux";
import { deleteContact } from "../redux/contact/contactActions";
import { Link } from "react-router-dom";
import {
  Image,
  Reveal,
  Grid,
  Segment,
  Button,
  Icon,
  Modal,
} from "semantic-ui-react";
function ContactCoulmn(props) {
  console.log(props.attributes);
  const id = props.id;
  const {
    name,
    email,
    phone,
    user_id,
    amount,
    duestatus,
    timeperiod,
  } = props.attributes ? props.attributes : props;
  const token = localStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  return (
    <Grid.Column>
      <Reveal animated="move up">
        <Reveal.Content visible>
          <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
          <Segment className="text-style">{name}</Segment>
        </Reveal.Content>
        <Reveal.Content hidden>
          <Segment size="small">
            <Button.Group floated="right">
              <Button
                icon="edit outline"
                basic
                color="orange"
                as={Link}
                to={`/contacts/edit/${id}`}
              ></Button>
              <Modal
                size="small"
                dimmer="blurring"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                size="small"
                trigger={<Button icon="user delete" basic color="red"></Button>}
              >
                <Modal.Header>Delete this contact</Modal.Header>
                <Modal.Content>
                  <p>Are you sure you want to delete {name} due entry</p>
                </Modal.Content>
                <Modal.Actions>
                  <Button negative onClick={() => setOpen(false)}>
                    No
                  </Button>
                  <Button
                    positive
                    onClick={() => {
                      dispatch(deleteContact(user_id, id, token));
                      setOpen(false);
                    }}
                  >
                    Yes
                  </Button>
                </Modal.Actions>
              </Modal>
            </Button.Group>
            <p>
              <Icon name="phone" />
              {phone}
            </p>
            <p>
              <Icon name="mail" /> {email}
            </p>
            <p>
              <Icon name="rupee sign" /> {amount}
            </p>
            <p>
              <Icon name="amazon pay" /> {duestatus}&nbsp;
              <Icon
                name="payment"
                color={duestatus === "pay" ? "red" : "green"}
              />
            </p>
            <p>
              <Icon name="calendar" /> {timeperiod}
            </p>
          </Segment>
        </Reveal.Content>
      </Reveal>
    </Grid.Column>
  );
}

export default ContactCoulmn;
