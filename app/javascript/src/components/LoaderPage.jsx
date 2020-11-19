import { Dimmer, Loader } from "semantic-ui-react";
import React from "react";
const LoaderPage = () => (
  <Dimmer active>
    <Loader content="Loading" />
  </Dimmer>
);

export default LoaderPage;
