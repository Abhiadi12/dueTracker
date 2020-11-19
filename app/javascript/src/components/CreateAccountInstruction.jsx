import React from "react";

import { Message } from "semantic-ui-react";

const CreateAccountInstruction = () => (
  <Message info>
    <Message.Header>Instruction for account creation ?</Message.Header>
    <p>
      (username) must starts with letter and ends with either letter or number.
      you can use special character between( _ and - ) them.
    </p>
    <p>(password) must contains atleast six character</p>
    <p>(password) must contains atleast one uppercase letter</p>
    <p>(password) must contains atleast one digit</p>
    <p>(password) must contains atleast one special character</p>
    <p>(phone number) must contains ten digit</p>
    <p>(country) must selected from the suggestion list</p>
    <p style={{ color: "red" }}> All fields are mandetory</p>
  </Message>
);

export default CreateAccountInstruction;
