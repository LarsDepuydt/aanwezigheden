import { useState, useEffect, useContext } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/hooks/auth-context";
import { sortArrayByDate } from "../../shared/util/sortArrayByDate";

import Year from "./components/Year/Year";

const Main = () => {
  const [events, setEvents] = useState([]);
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { token } = auth;
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/event`,
          "GET",
          null,
          {
            Authorization: "Bearer " + token,
          }
        );

        const eventsArray = [];
        if (responseData.events.aanwezig.length !== 0) {
          for (const event of responseData.events.aanwezig) {
            event.state = 1;
            eventsArray.push(event);
          }
        }
        if (responseData.events.afwezig.length !== 0) {
          for (const event of responseData.events.afwezig) {
            event.state = 0;
            eventsArray.push(event);
          }
        }
        if (responseData.events.onbepaald.length !== 0) {
          for (const event of responseData.events.onbepaald) {
            event.state = 2;
            eventsArray.push(event);
          }
        }

        const eventsSorted = sortArrayByDate(eventsArray);
        setEvents(eventsSorted);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvents();
  }, [sendRequest, token]);

  let years;
  if (events.length !== 0) {
    const keys = Object.keys(events);
    years = keys.map((year, index) => (
      <Year key={year} year={year} months={events[year]} />
    ));
  }

  return <>{years && years}</>;
};

export default Main;
