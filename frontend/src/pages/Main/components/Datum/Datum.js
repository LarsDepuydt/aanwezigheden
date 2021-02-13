import Card from "../Card/Card";

import classes from "./Datum.module.scss";

const getDay = (date) => {
  const day = date.getDay();

  switch (day) {
    case 0:
      return "zo";
    case 1:
      return "ma";
    case 2:
      return "di";
    case 3:
      return "woe";
    case 4:
      return "do";
    case 5:
      return "vr";
    case 6:
      return "za";
    default:
      return "";
  }
};

const Datum = (props) => {
  const { event } = props;

  const { changeState } = props;
  const { _id } = event;
  const changeStateHandler = (value) => {
    changeState(value, _id);
  };

  const text =
    event.name +
    " om " +
    event.date.getHours() +
    " uur " +
    event.date.getMinutes();
  return (
    <div className={classes.DatumDiv}>
      <div>
        <p className={classes.day}>{getDay(event.date)}</p>
        <p className={classes.date}>{event.date.getDate()}</p>
      </div>
      <Card text={text} state={event.state} changeState={changeStateHandler} />
    </div>
  );
};

export default Datum;
