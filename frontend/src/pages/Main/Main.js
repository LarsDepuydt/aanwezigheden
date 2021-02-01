import Datum from "./components/Datum/Datum";

const info = ["31 januari", "7 februari", "14 februari"];

const Main = () => {
  const cards = info.map((item) => (
    <Datum key={info.indexOf(item)} text={item} />
  ));
  return <>{cards}</>;
};

export default Main;
