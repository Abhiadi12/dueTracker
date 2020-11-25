import { useState } from "react";

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const bind = {
    value,
    onChange: (event) => {
      setValue(event.target.value);
    },
  };
  const reset = () => {
    setValue(initialValue);
  };

  const setInputValue = (value) => {
    setValue(value);
  };

  return [value, bind, reset, setInputValue];
}

export default useInput;
