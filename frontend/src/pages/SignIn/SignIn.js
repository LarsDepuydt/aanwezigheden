import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Input from "../../shared/components/InputWithState/InputWithState";
import Button from "../../shared/components/Button/Button";

import classes from "./SignUp.module.scss";

const SignIn = () => {
  const usernameChangeHandler = () => {};

  return (
    <div className={classes.signinDiv}>
      <h2>Maak je account</h2>
      <div className={classes.naamDiv}>
        <div className={classes.halfDiv}>
          <Input
            type={"text"}
            onInput={usernameChangeHandler}
            validators={[VALIDATOR_REQUIRE()]}
            errorMessage={"Geef een voornaam in"}
            autoFocus
            half
          >
            Voornaam lid
          </Input>
        </div>
        <div className={classes.halfDiv}>
          <Input
            type={"text"}
            onInput={usernameChangeHandler}
            validators={[VALIDATOR_REQUIRE()]}
            errorMessage={"Geef een achternaam in"}
            half
          >
            Naam lid
          </Input>
        </div>
      </div>
      <Input
        type={"password"}
        onInput={usernameChangeHandler}
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage={"Kies een wachtwoord van minstens 6 tekens"}
      >
        Wachtwoord
      </Input>
      <Button btnType={"primary"}>Account aanmaken</Button>
    </div>
  );
};

export default SignIn;
