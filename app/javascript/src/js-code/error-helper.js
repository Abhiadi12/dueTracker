import React from "react";
export const displayErrors = (errorMessage) => {
  const errorMessageArray = errorMessage.map((val) => (
    <li key={val}>{`${val}`}</li>
  ));
  return <ul>{errorMessageArray}</ul>;
};

export const numberOfErrors = (errorMessage) =>
  errorMessage === undefined ? 0 : errorMessage.length;
