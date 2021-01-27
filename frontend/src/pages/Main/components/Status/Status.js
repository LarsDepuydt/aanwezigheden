const Status = (props) => {
  let text;
  switch (props.value) {
    case 1:
      text = "aanwezig";
      break;
    case 2:
      text = "afwezig";
      break;
    case 3:
      text = "onbepaald";
      break;
    default:
      text = "er ging iets mis";
  }

  return <div>{text}</div>;
};

export default Status;
