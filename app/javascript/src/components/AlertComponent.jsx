import React from "react";
import { Message, Icon } from "semantic-ui-react";

const AlertComponent = ({ message, color }) => (
  <Message color={color}>
    <Message.Header Icon="info circle">{message}</Message.Header>
  </Message>
);

export default AlertComponent;
