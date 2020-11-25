import React from "react";
import { Header, Icon } from "semantic-ui-react";

const Unprocessable = ({ message }) => (
  <Header as="h2" icon color="red">
    <Icon name="hand point down" />

    <Header.Subheader>{message}</Header.Subheader>
  </Header>
);

export default Unprocessable;
