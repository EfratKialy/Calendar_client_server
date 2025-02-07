import * as React from 'react';
import { useState, useContext } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { userContext } from "../App";
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function Event(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(props.date ? new moment(props.date) : new moment());
  const [open, setOpen] = useState(false);
  const { userId } = useContext(userContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const SaveEvent = () => {
    const e = {
      "eventId": Math.floor(Math.random() * 10000),
      "userId": userId,
      "title": title,
      "description": description,
      "startDate": date,
      "endDate": date
    };
    try {
      axios.post(`http://localhost:5102/Event`, e)
        .then(res => res.data.statusCode === 200 ? (props && props.getEvents()||<></>) : alert("Try again :("))
    } catch (err) {
      console.log(err);
    }
    props.handleClose2 ? props.handleClose2() : <></>
  }


  return (
    <React.Fragment>
      <Button variant="outlined" onClick={() => { handleClickOpen(); }}>
        New Event
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Create new event
        </DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <TextField
              sx={{ mt: 2, mr: 1 }}
              required
              id="title"
              label="title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              sx={{ mt: 2 }}
              id="desc"
              value={props.event ? props.event.description : null}
              label="description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <DatePicker sx={{ mt: 2 }} label="Uncontrolled picker"
              value={props.date ? new moment(props.date) : new moment(date)}
              onChange={(e) => {
                console.log(e.value);
                setDate(e._d)
              }} />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Dont Save</Button>
          <Button onClick={() => { handleClose(); SaveEvent() }} autoFocus>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>

  );
}