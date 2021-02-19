import { useReducer, useEffect } from "react";
import { updateObject } from "../../../util/utility";
import { validate } from "../../../util/validators";

import Input from "./Input/Input";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return updateObject(state, {
        value: action.value,
        isValid: validate(action.value, action.validators),
        touched: true,
      });
    case "TOUCHED":
      return updateObject(state, {
        touched: true,
      });
    default:
      return state;
  }
};

const InputWithState = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    touched: props.touched || false,
    isValid: false,
  });

  const { initialValue, validators } = props;
  useEffect(() => {
    if (initialValue) {
      dispatch({
        type: "CHANGE",
        value: initialValue,
        isValid: validate(initialValue, validators),
      });
    }
  }, [initialValue, validators]);

  const { onInput } = props;
  const { value, isValid } = inputState;
  useEffect(() => {
    onInput(value, isValid);
  }, [onInput, value, isValid]);

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
