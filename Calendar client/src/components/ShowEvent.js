import React, { useContext, useEffect, useState } from "react";
import ContextMenuEvent from "./ContextMenuEvent";
import { eventsArray } from "../pages/Calendar";
import { logDOM } from "@testing-library/react";


const ShowEvent = (props) => {

    return (
        <div style={{ position: "fixed" }} >
            {props.event.length && props.event.map((e, index) =>
                <ContextMenuEvent contextComponentEvent={e.title} event={e} getEvents={props.getEvents}></ContextMenuEvent>
                )
            } </div>)
}
export default ShowEvent



