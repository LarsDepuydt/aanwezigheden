import { useState, useEffect, useContext } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/hooks/auth-context";
import { sortArrayByDate } from "../../shared/util/sortArrayByDate";

import Year from "./components/Year/Year";
import Spinner from "../../shared/components/HttpHandling/LoadingSpinner/LoadingSpinner";
import PageError from "../../shared/components/HttpHandling/PageError/PageError";
import classes from "./Main.module.scss";

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
            event.touched = false;
            eventsArray.push(event);
          }
        }
        if (responseData.events.afwezig.length !== 0) {
          for (const event of responseData.events.afwezig) {
            event.state = 0;
            event.touched = false;
            eventsArray.push(event);
          }
        }
        if (responseData.events.onbepaald.length !== 0) {
          for (const event of responseData.events.onbepaald) {
            event.state = 2;
            event.touched = false;
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

  const cardStateChangeHandler = (value, id, number, month, year) => {
    if (events[year][month][number].value !== value) {
      const newEvent = {
        ...events[year][month][number],
        touched: true,
        state: value,
      };

      const newMonthArray = events[year][month];
      newMonthArray[number] = newEvent;
      const newEvents = {
        ...events,
        [year]: { ...events[year], [month]: newMonthArray },
      };
      setEvents(newEvents);

      let name;
      if (value === 1) {
        name = "aanwezig";
      } else {
        name = "afwezig";
      }

      sendUpdateRequestHandler(name, [id]);
    }
  };

  const sendUpdateRequestHandler = async (name, idList) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/users`,
        "PATCH",
        JSON.stringify({
          [name]: idList,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  let years;
  if (events.length !== 0) {
    const keys = Object.keys(events);
    years = keys.map((year, index) => (
      <Year
        key={year}
        year={year}
        months={events[year]}
        changeState={cardStateChangeHandler}
      />
    ));
  }

  return (
    <>
      {isLoading && !years && (
        <>
          <div className={classes.spinnerDiv}>
            <Spinner />
          </div>
          <p>Even geduld, uw evenementen worden geladen</p>
        </>
      )}
      {error && <PageError error={error} clearError={clearError} />}
      {years && years}
    </>
  );
};

export default Main;
