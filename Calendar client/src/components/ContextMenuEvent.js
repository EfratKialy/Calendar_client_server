import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import Event from './Event'
import ShowEvent from './ShowEvent';
import EditEvent from './EditEvent';
import { createContext } from 'react';



export default function ContextMenuEvent(props) {
    const [contextMenu, setContextMenu] = React.useState(null);
    const [renderEvent, setRenderEvent] = React.useState(false);

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 7,
                }
                :
                null,
        );
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    const deleteEvent = async () => {
        try {
            const url = `http://localhost:5102/Event/${props.event.eventId}`;
            const res = await axios.delete(url);
            res.data.statusCode === 200 ? props.getEvents() : alert("Something were wrong...");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div onContextMenu={handleContextMenu} style={{ cursor: 'context-menu' }}>
            <br></br>
            <div style={{ textAlign: "center",marginTop:"30px", marginLeft:"20px",color:"aqua",fontSize:"40px",backgroundColor:"black" }}>{props.contextComponentEvent}</div>

            <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
            >
                <MenuItem onClick={() => { handleClose(); deleteEvent() }} style={{ color: "red" }}>Delete</MenuItem>
                <EditEvent event={props.event} delete={deleteEvent} getEvents={props.getEvents}></EditEvent>
            </Menu>
        </div>
    );
}
