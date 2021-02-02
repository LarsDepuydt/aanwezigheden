import Datum from "../Datum/Datum";

import classes from "./Month.module.scss";

const maandtext = (month) => {
  switch (month) {
    case 0:
      return "januari";
    case 1:
      return "februari";
    case 2:
      return "maart";
    case 3:
      return "april";
    case 4:
      return "mei";
    case 5:
      return "juni";
    case 6:
      return "juli";
    case 7:
      return "augustus";
    case 8:
      return "september";
    case 9:
      return "oktober";
    case 10:
      return "november";
    case 11:
      return "december";
    default:
      return "";
  }
};

const Month = (props) => {
  console.log(props.dates);
  const dates = props.dates.map((item) => (
    <Datum key={props.month + "-" + props.dates.indexOf(item)} date={item} />
  ));
  return (
    <div className={classes.MonthDiv}>
      {props.dates.length !== 0 && (
        <h3 className={classes.h3}>{maandtext(props.month)}</h3>
      )}
      {dates}
    </div>
  );
};

export default Month;
