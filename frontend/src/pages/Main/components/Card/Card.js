import { useState } from "react";

import Button from "../../../../shared/components/Button/Button";
import Status from "../Status/Status";
import classes from "./Card.module.scss";

const Card = (props) => {
  const [value, setValue] = useState(0);

  const statusChangeHandler = () => {
    value === 1 && setValue(2);
    value === 2 && setValue(1);
  };

  return (
    <div className={classes.CardDiv}>
      <h4>{props.text}</h4>
      {value !== 0 && <Status value={value} clicked={statusChangeHandler} />}
      {value === 0 && (
        <div className={classes.BtnDiv}>
          <Button btnType={"positive"} clicked={() => setValue(1)}>
            Aanwezig
          </Button>
          <Button btnType={"negative"} clicked={() => setValue(2)}>
            Afwezig
          </Button>
        </div>
      )}
    </div>
  );
};

export default Card;
