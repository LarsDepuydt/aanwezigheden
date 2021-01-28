import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Input from "../../shared/components/InputWithState/InputWithState";
import Button from "../../shared/components/Button/Button";

import classes from "./SignUp.module.scss";

const SignUp = () => {
  const usernameChangeHandler = () => {};

  const date = new Date();
  const currentYear = date.getFullYear();
  let yearOptions = [];
  for (let i = 6; i < 18; i++) {
    const afdelingen = [
      "sloeber",
      "speelclub",
      "rakwi",
      "tito",
      "keti",
      "aspi",
    ];
    const afdeling = afdelingen[Math.floor(i / 2 - 3)];
    yearOptions.push({
      value: currentYear - i,
      text: currentYear - i + " - " + afdeling,
    });
  }

  return (
    <form className={classes.signupDiv}>
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
        type={"select"}
        onInput={usernameChangeHandler}
        validators={[]}
        options={yearOptions}
        initialValue={2003}
        touched
      >
        Geboortejaar
      </Input>
      <Input
        type={"password"}
        onInput={usernameChangeHandler}
        validators={[VALIDATOR_REQUIRE()]}
        errorMessage={"Kies een wachtwoord van minstens 6 tekens"}
      >
        Wachtwoord
      </Input>
      <Button btnType={"primary"}>Account aanmaken</Button>
    </form>
  );
};

export default SignUp;
