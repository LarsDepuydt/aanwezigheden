import Month from "./components/Month/Month";

const info = [
  new Date(2021, 0, 31, 14),
  new Date(2021, 1, 7, 13),
  new Date(2021, 1, 14, 14),
];

let infoMonth = [
  { month: 0, dates: [] },
  { month: 1, dates: [] },
  { month: 2, dates: [] },
  { month: 3, dates: [] },
  { month: 4, dates: [] },
  { month: 5, dates: [] },
  { month: 6, dates: [] },
  { month: 7, dates: [] },
  { month: 8, dates: [] },
  { month: 9, dates: [] },
  { month: 10, dates: [] },
  { month: 11, dates: [] },
];
info.map((item) => infoMonth[item.getMonth()].dates.push(item));
console.log(infoMonth);

const Main = () => {
  const months = infoMonth.map((item) => (
    <Month key={item.month} dates={item.dates} month={item.month} />
  ));
  return <>{months}</>;
};

export default Main;
