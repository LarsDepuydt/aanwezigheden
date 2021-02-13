import { useHistory } from "react-router";

import Button from "../../UI/Button/Button";
import classes from "./PageError.module.scss";

const PageError = (props) => {
  const history = useHistory();
  const loadAgainHandler = () => {
    props.clearError();

    history.go(0);
  };

  return (
    <>
      <h2>Oeps, er ging iets fout</h2>
      <p className={classes.errorText}>{props.error}</p>
      <Button small btnType={"secondary"} clicked={loadAgainHandler}>
        Probeer opnieuw
      </Button>
    </>
  );
};

export default PageError;
