import { useReducer, useCallback } from "react";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_DATE,
  VALIDATOR_HOUR,
} from "../../../../shared/util/validators";
import { updateObject } from "../../../../shared/util/utility";

import Input from "../../../../shared/components/UI/InputWithState/InputWithState";
import Button from "../../../../shared/components/UI/Button/Button";
import classes from "./NewEvent.module.scss";

const eventReducer = (state, action) => {
  switch (action.type) {
    case "STATE_CHANGE":
      return updateObject(state, {
        [action.stateName]: { value: action.value, isValid: action.isValid },
      });
    case "CHECK_VALID":
      const isValid =
        state.name.isValid && state.date.isValid && state.hour.isValid;
      return updateObject(state, { isValid: isValid });
    default:
      return state;
  }
};

const NewEvent = () => {
  const [eventState, dispatch] = useReducer(eventReducer, {
    name: { value: "", isValid: false },
    date: { value: "", isValid: false },
    hour: { value: "", isValid: false },
    isValid: false,
  });

  const stateChangeHandler = (stateName, value, isValid) => {
    dispatch({ type: "STATE_CHANGE", stateName, value, isValid });
    dispatch({ type: "CHECK_VALID" });
  };

  const btnClickedHandler = (event) => {
    event.preventDefault();

    if (eventState.isValid) {
      const dateObj = new Date();
    }
  };

  return (
    <form className={classes.EventDiv}>
      <h2 className={classes.h2}>Maak een nieuw event</h2>
      <Input
        type="text"
        onInput={useCallback(
          (value, isValid) => stateChangeHandler("name", value, isValid),
          []
        )}
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage="Geef een eventnaam in"
        autoFocus
      >
        Naam event
      </Input>
      <div className={classes.timeDiv}>
        <div className={classes.dateDiv}>
          <Input
            type="date"
            onInput={useCallback(
              (value, isValid) => stateChangeHandler("date", value, isValid),
              []
            )}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_DATE()]}
            errorMessage="Geen geldige datum"
            center
          >
            Datum event
          </Input>
        </div>
        <div className={classes.hourDiv}>
          <Input
            type="time"
            onInput={useCallback(
              (value, isValid) => stateChangeHandler("hour", value, isValid),
              []
            )}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_HOUR()]}
            errorMessage="Geen geldig tijdstip"
            center
          >
            Uur event
          </Input>
        </div>
      </div>
      <Button btnType="primary" clicked={btnClickedHandler}>
        Maak event
      </Button>
    </form>
  );
};

export default NewEvent;
