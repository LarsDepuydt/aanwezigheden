import Card from "../Card/Card";

import classes from "./Datum.module.scss";

const getDay = (date) => {
  const day = date.getDay();

  switch (day) {
    case 0:
      return "zondag";
    case 1:
      return "maandag";
    case 2:
      return "dinsdag";
    case 3:
      return "woensdag";
    case 4:
      return "donderdag";
    case 5:
      return "vrijdag";
    case 6:
      return "zaterdag";
    default:
      return "";
  }
};

const Datum = (props) => {
  const { event } = props;

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
      <Card text={text} />
    </div>
  );
};

export default Datum;
