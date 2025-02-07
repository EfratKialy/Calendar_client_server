import React, { useState, useContext, createContext, useEffect } from "react";
import * as moment from "moment";
import Day from "../components/Day";
import { userContext, userNameContext } from "../App";
import axios from "axios";
import Event from "../components/Event";
import ButtonAppBar from "../components/AppBar";
import { Style } from "@material-ui/icons";


export const eventsArray = createContext([]);

const Calendar = () => {
  const [stateDay, setStateDay] = useState(moment().startOf("week"));
  const [contextMenu, setContextMenu] = useState(null);
  const [events, setEvents] = useState([]);
  const { userId } = useContext(userContext);

  const getEvents = async () => {
    try {
      const url = `http://localhost:5102/Event/${userId}`;
      const res = await axios.get(url);
      if (res.data.value) setEvents(res.data.value);
    } catch (err) {
      console.log(err);
    }
  }
  const nextWeek = () => {
    const newDay = moment(stateDay).add(7, "days");
    setStateDay(newDay);
  };

  useEffect(() => {
    getEvents()
  }, []);

  const lastWeek = () => {
    const newDay = moment(stateDay).add(-7, "days");
    setStateDay(newDay);
  };

  const goToday = () => { setStateDay(moment()); }

  return (
    <eventsArray.Provider value={events}>
      <ButtonAppBar getEvents={getEvents} nextWeek={nextWeek} lastWeek={lastWeek} goToday={goToday}> </ButtonAppBar>
      {/* <h2>Calendar </h2>
      <button onClick={nextWeek}>{"---->"}</button>
      <button onClick={lastWeek}> {"<----"}</button>
      <button onClick={goToday}>תאריך נוכחי</button>
      <Event getEvents={getEvents} /> */}
      <h1 style={{ color: "red",textAlign:"center",fontSize:"50px"} }> Calendar </h1>
      <br></br>
      {new Array(7).fill("0").map((item, index) => (
        <Day key={index} date={stateDay.day(index).format("dddd YYYY-MM-DD")} goToToday={goToday} getEvents={getEvents} />
      ))}
      
    </eventsArray.Provider>
  );
};

export default Calendar;
