import Button from "../../../../shared/components/Button/Button";
import Status from "../Status/Status";
import classes from "./Card.module.scss";

// 0: aanwezig
// 1: afwezig
// 2: onbepaald

const Card = (props) => {
  const value = props.state;
  const { changeState } = props;

  const changeValueHandler = () => {
    if (value === 1) {
      changeState(0);
    } else if (value === 0) {
      changeState(1);
    }
  };

  return (
    <div className={classes.CardDiv}>
      <h4>{props.text}</h4>
      {value !== 2 && <Status value={value} clicked={changeValueHandler} />}
      {value === 2 && (
        <div className={classes.BtnDiv}>
          <Button btnType={"positive"} clicked={() => changeState(1)}>
            Aanwezig
          </Button>
          <Button btnType={"negative"} clicked={() => changeState(0)}>
            Afwezig
          </Button>
        </div>
      )}
    </div>
  );
};

export default Card;
