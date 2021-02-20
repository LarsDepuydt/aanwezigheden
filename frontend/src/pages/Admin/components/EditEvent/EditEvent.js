import { useState, useEffect, useContext } from "react";
import { useHttpClient } from "../../../../shared/hooks/http-hook";
import { AuthContext } from "../../../../shared/hooks/auth-context";

import EventShow from "../EventShow/EventShow";

const EditEvent = (props) => {
  const [values, setValues] = useState({
    id: props.id,
  });
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { id } = props;
  const { token } = auth;
  useEffect(() => {
    const fetchEvent = async () => {
      const response = await sendRequest(`/api/${id}`, "get", null, {
        Authorization: "Bearer " + token,
      });

      const dateObj = new Date(response.date);
      const date =
        dateObj.getFullYear() +
        "-" +
        dateObj.getMonth() +
        "-" +
        dateObj.getDate();
      const time = dateObj.getHours() + ":" + dateObj.getMinutes();
      setValues({ name: response.name, date, time });
    };
    fetchEvent();
  }, [sendRequest, id, token]);

  return (
    <>
      {!isLoading && (
        <EventShow
          method="patch"
          initialValue={values}
          isLoading={isLoading}
          error={error}
          clearError={clearError}
        />
      )}
    </>
  );
};

export default EditEvent;
