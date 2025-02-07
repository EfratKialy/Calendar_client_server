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

export default function EditEvent(props) {
  const [title, setTitle] = useState(props.event.title);
  const [description, setDescription] = useState(props.event.description);
  const [date, setDate] = useState(props.event.startDate);
  const [open, setOpen] = useState(false);
  const { userId } = useContext(userContext);

  const getEvents = props.getEvents;
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
        .then(res => res.data.statusCode === 200 ? getEvents() : alert("Try again :("))
    } catch (err) {
      console.log(err);
    }
  }
  const DeleteForEdit = props.delete;

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>
        Edit
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Edit event"}
        </DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <TextField
              sx={{ mt: 2, mr: 1 }}
              required
              id="title"
              label="title"
              value={props.event ? title : null}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              sx={{ mt: 2 }}
              id="desc"
              value={props.event ? description : null}
              label="description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <DatePicker sx={{ mt: 2 }}
              label="Uncontrolled picker"
              value={props.event ? moment(date) : null}
              onChange={(e) => setDate(e._d)}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Dont Save</Button>
          <Button onClick={async () => { handleClose(); await (DeleteForEdit()); SaveEvent() }} autoFocus>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>

  );
}