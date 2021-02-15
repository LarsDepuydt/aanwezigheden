import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../../hooks/auth-context";
import { useHttpClient } from "../../../hooks/http-hook";

const GetVid = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { verenigingNaam } = useParams();

  const setVid = auth.setVid;
  useEffect(() => {
    const fetchVid = async () => {
      const responseData = await sendRequest("api/vereniging", "get", {
        name: verenigingNaam.replace("-", " "),
      });

      setVid(responseData.vid);
    };
    fetchVid();
  }, [sendRequest, verenigingNaam, setVid]);

  return <>{props.children}</>;
};

export default GetVid;
