import { useState, useReducer, useCallback, useRef } from "react";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { updateObject } from "../../shared/util/utility";
import Input from "../../shared/components/InputWithState/InputWithState";
import Button from "../../shared/components/Button/Button";

import classes from "./SignUp.module.scss";

const date = new Date();
const currentYear = date.getFullYear();
let yearOptions = [];
for (let i = 6; i < 18; i++) {
  const afdelingen = ["sloeber", "speelclub", "rakwi", "tito", "keti", "aspi"];
  const afdeling = afdelingen[Math.floor(i / 2 - 3)];
  yearOptions.push({
    value: currentYear - i,
    text: currentYear - i + " - " + afdeling,
  });
}

const signinReducer = (state, action) => {
  switch (action.type) {
    case "CHECK_VALID":
      const isValid =
        state.voornaam.isValid &&
        state.achternaam.isValid &&
        state.wachtwoord.isValid;
      return updateObject(state, { isValid: isValid });
    case "UPDATE_ELEMENT":
      return updateObject(state, {
        [action.stateName]: { value: action.value, isValid: action.isValid },
      });
    default:
      return state;
  }
};

const SignUp = () => {
  const [signinInfo, dispatch] = useReducer(signinReducer, {
    voornaam: { value: "", isValid: false },
    achternaam: { value: "", isValid: false },
    geboortejaar: { value: yearOptions[0].value, isValid: true },
    wachtwoord: { value: "", isValid: false },
    isValid: false,
  });
  const [touchedState, setTouchedState] = useState(false);

  const stateChangeHandler = (stateName, value, isValid) => {
    dispatch({
      type: "UPDATE_ELEMENT",
      stateName,
      value,
      isValid,
    });
    dispatch({
      type: "CHECK_VALID",
    });
  };

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const buttonClickedHandler = (event) => {
    event.preventDefault();
    if (signinInfo.isValid) {
      // route
    } else {
      setTouchedState(true);
      if (!signinInfo.voornaam.isValid) {
        ref1.current.focus();
      } else if (!signinInfo.achternaam.isValid) {
        ref2.current.focus();
      } else if (!signinInfo.wachtwoord.isValid) {
        ref3.current.focus();
      }
    }
  };

  return (
    <form className={classes.signupDiv}>
      <h2>Maak je account</h2>
      <div className={classes.naamDiv}>
        <div className={classes.halfDiv}>
          <Input
            type={"text"}
            onInput={useCallback(
              (value, isValid) =>
                stateChangeHandler("voornaam", value, isValid),
              []
            )}
            validators={[VALIDATOR_REQUIRE()]}
            errorMessage={"Geef een voornaam in"}
            autoFocus
            half
            childRef={ref1}
            {...(touchedState && { touched: true })}
          >
            Voornaam lid
          </Input>
        </div>
        <div className={classes.halfDiv}>
          <Input
            type={"text"}
            onInput={useCallback(
              (value, isValid) =>
                stateChangeHandler("achternaam", value, isValid),
              []
            )}
            validators={[VALIDATOR_REQUIRE()]}
            errorMessage={"Geef een achternaam in"}
            half
            childRef={ref2}
            {...(touchedState && { touched: true })}
          >
            Naam lid
          </Input>
        </div>
      </div>
      <Input
        type={"select"}
        onInput={useCallback(
          (value, isValid) =>
            stateChangeHandler("geboortejaar", value, isValid),
          []
        )}
        validators={[]}
        options={yearOptions}
        initialValue={signinInfo.geboortejaar.value}
        touched
      >
        Geboortejaar
      </Input>
      <Input
        type={"password"}
        onInput={useCallback(
          (value, isValid) => stateChangeHandler("wachtwoord", value, isValid),
          []
        )}
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
        errorMessage={"Kies een wachtwoord van minstens 6 tekens"}
        {...(touchedState && { touched: true })}
        childRef={ref3}
      >
        Wachtwoord
      </Input>
      <Button
        clicked={buttonClickedHandler}
        btnType={"primary"}
        disabledS={!signinInfo.isValid}
      >
        Account aanmaken
      </Button>
    </form>
  );
};

export default SignUp;
