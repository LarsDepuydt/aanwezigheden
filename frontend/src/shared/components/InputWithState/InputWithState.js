import { useReducer, useEffect } from "react";
import { updateObject } from "../../util/utility";
import { validate } from "../../util/validators";

import Input from "./Input/Input";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      console.log(action.value);
      return updateObject(state, {
        value: action.value,
        isValid: validate(action.value, action.validators),
        touched: true,
      });
    default:
      return state;
  }
};

const InputWithState = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    touched: props.touched || false,
    isValid: validate(props.initialValue, props.validators) || false,
  });

  const { onInput } = props;
  const { value, isValid, touched } = inputState;
  useEffect(() => {
    onInput(value, isValid, touched);
  }, [onInput, value, isValid, touched]);

  const inputChangeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      value: event.target.value,
      validators: props.validators,
    });
  };

  return (
    <Input
      value={inputState.value}
      isValid={inputState.isValid}
      touched={inputState.touched}
      change={inputChangeHandler}
      {...props}
    >
      {props.children}
    </Input>
  );
};

export default InputWithState;
