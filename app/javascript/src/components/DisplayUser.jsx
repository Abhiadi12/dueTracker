import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Icon, Header, Segment, Loader, Dimmer } from "semantic-ui-react";
import { getLoggedUser } from "../redux/auth/authActions";
import axios from "axios";

function DisplayUser() {
  console.log(" display user ");
  const token = localStorage.getItem("token");
  const { name } = useParams();
  const [searchedUser, setSearchedUser] = useState({});
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserByName = async () => {
      try {
        const response = await axios.get(`/api/v1/find_user/${name}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSearchedUser(response.data.user);
      } catch (error) {
        setSearchedUser({ status: error.response.status });
      }
    };
    fetchUserByName();
    if (!user.id) dispatch(getLoggedUser(token));
  }, [name]);

  const { username, email, phone, country, status } = searchedUser;
  console.log(status);
  if (status !== 404) {
    return (
      <Card centered>
        <Card.Content>
          {!username && (
            <Dimmer active inverted>
              <Loader inverted content="Loading" />
            </Dimmer>
          )}
          <Card.Header>
            <pre>
              <Icon name="user" />
              {email === user.email ? "Your Derails" : username}
            </pre>
          </Card.Header>
          <Card.Meta>
            <pre>
              <Icon name="home" /> From {country}
            </pre>
          </Card.Meta>
          <Card.Description>
            <pre>
              <Icon name="user" /> {email}
            </pre>
            <pre>
              <Icon name="phone" /> {phone}
            </pre>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  } else {
    return (
      <Segment>
        <Header as="h2" icon textAlign="center" color="red">
          <Icon name="exclamation circle" />
          Not exist
          <Header.Subheader>
            It seems that your request is unprocessable.
          </Header.Subheader>
        </Header>
      </Segment>
    );
  }
}
export default DisplayUser;
