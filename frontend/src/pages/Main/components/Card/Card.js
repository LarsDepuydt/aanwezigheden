import Button from "../../../../shared/components/Button/Button";
import Status from "../Status/Status";

const Card = () => {
  return (
    <div>
      <Status />
      <h3>Zondag 31 januari</h3>
      <Button>Aanwezig</Button>
      <Button>Afwezig</Button>
    </div>
  );
};

export default Card;
