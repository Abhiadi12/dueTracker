import React from "react";
import { Message } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { hideError } from "../redux/error/errorActions";
function ErrorComponent() {
  const errors = useSelector((state) => state.error.errors);
  const dispatch = useDispatch();

  return (
    <div style={{ margin: "10px auto", maxWidth: "500px" }}>
      <Message
        error
        header="There was some errors with your submission"
        list={errors}
        onDismiss={() => {
          dispatch(hideError());
        }}
      />
    </div>
  );
}

export default ErrorComponent;
