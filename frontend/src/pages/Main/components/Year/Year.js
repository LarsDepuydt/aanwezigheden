import Month from "../Month/Month";

const Year = (props) => {
  let months;
  if (props.months.length !== 0) {
    const keys = Object.keys(props.months);
    months = keys.map((month, index) => (
      <Month
        key={props.year + "-" + month}
        year={props.year}
        monthNumber={month}
        events={props.months[month]}
      />
    ));
  }
  return (
    <>
      <h3>{props.year}</h3>
      {months}
    </>
  );
};

export default Year;
