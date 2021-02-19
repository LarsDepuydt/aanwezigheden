import { useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { AuthContext } from "../../../hooks/auth-context";
import { useHttpClient } from "../../../hooks/http-hook";

import LoadingSpinner from "../../HttpHandling/Spinners/LoadinsSpinnerCenter/LoadingSpinnerCenter";
import PageError from "../../HttpHandling/PageError/PageError";

const GetVid = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { verenigingNaam } = useParams();

  const setVid = auth.setVid;
  useEffect(() => {
    const fetchVid = async () => {
      try {
        const responseData = await sendRequest("api/vereniging", "get", {
          name: verenigingNaam.replace("-", " "),
        });

        setVid(responseData.vid);
      } catch (err) {}
    };
    fetchVid();
  }, [sendRequest, verenigingNaam, setVid]);

  const history = useHistory();
  const redirectToVerenigingHandler = () => {
    clearError();
    history.push("/nieuwe-vereniging");
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && error && (
        <PageError
          error="Vereniging niet gevonden"
          btnText="Maak een vereniging"
          btnClicked={redirectToVerenigingHandler}
        />
      )}
      {!isLoading && !error && props.children}
    </>
  );
};

export default GetVid;
