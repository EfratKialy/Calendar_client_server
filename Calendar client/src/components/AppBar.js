import React, { useContext } from 'react';
import { withStyles } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { userContext, userNameContext } from "../App";
import Event from "./Event";
import Stack from '@mui/material/Stack';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 20,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 20,
    },
}));

export default function ButtonAppBar(props) {
    const classes = useStyles();
    const { userName } = useContext(userContext)

    return (
        <div style={{color:"green"}} className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        hello {userName}
                    </Typography>
                    <Event style={{backgroundColor:"red"}} getEvents={props.getEvents}></Event>
                    <Button  onClick={props.nextWeek}>{"---->"}</Button>
                    <Button onClick={props.lastWeek}> {"<----"}</Button>
                    <Button onClick={props.goToday}>תאריך נוכחי</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
