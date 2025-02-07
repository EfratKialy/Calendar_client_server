import React, { useContext, useEffect, useState } from "react";
import ContextMenu from "./ContextMenu";
import { eventsArray } from "../pages/Calendar";
import moment from 'moment/moment';
import ShowEvent from "./ShowEvent";
import { filledInputClasses } from "@mui/material";




const Day = (props) => {
    const events = useContext(eventsArray);
    const date = new moment(props.date)

    const filteredEvents2 = events.filter((event) =>
        moment(event.startDate).format("dddd YYYY-MM-DD") === date._i)
        .map(event => event);

    const componentToSetMenu = () => {
        return (
            <div style={{ borderStyle: 'groove', width: '260px', height: "700px", borderRadius: 45 ,backgroundColor:"black"}}>
                <h3 style={{ textAlign: 'center', fontFamily: "fantasy",marginBottom:"30px",color:"red" }}>{props.date}</h3>
                <br></br>
            </div>
        )
    }

    return (
        <div style={{ display: "inline-block" }}>
            <br></br>
            {filteredEvents2.length > 0 && <ShowEvent event={filteredEvents2} getEvents={props.getEvents}></ShowEvent>}
            <ContextMenu contextComponent={componentToSetMenu} date={props.date} goTo={props.goToToday} getEvents={props.getEvents}></ContextMenu>
        </div>)
}
export default Day



