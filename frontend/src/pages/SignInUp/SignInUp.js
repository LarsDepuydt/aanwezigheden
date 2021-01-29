import { useState, useReducer, useCallback, useRef } from "react";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { updateObject } from "../../shared/util/utility";
import Input from "../../shared/components/InputWithState/InputWithState";
import Button from "../../shared/components/Button/Button";
import yearOptions from "./chooseOptions/chooseOptions";

import classes from "./SignInUp.module.scss";

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
  const [signIn, setSignIn] = useState(true);
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

  const geboortejaarChangeHandler = useCallback((value, isValid) => {
    stateChangeHandler("geboortejaar", value, isValid);
  }, []);

  const changeSignInHandler = (event) => {
    event.preventDefault();
    setSignIn(!signIn);
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
      <h2>{signIn ? "Log in" : "Maak je account"}</h2>
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
      {!signIn && (
        <Input
          type={"select"}
          onInput={geboortejaarChangeHandler}
          validators={[]}
          options={yearOptions}
          initialValue={signinInfo.geboortejaar.value}
          touched
        >
          Geboortejaar
        </Input>
      )}
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
        {signIn ? "Inloggen" : "Registreren"}
      </Button>
      <Button clicked={changeSignInHandler} btnType={"link"}>
        {signIn ? "Nog geen account?" : "Al een account?"}
      </Button>
    </form>
  );
};

export default SignUp;
