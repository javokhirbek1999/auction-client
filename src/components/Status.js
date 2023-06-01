import React from "react";
import { useLocation } from "react-router";
import {Button} from '@material-ui/core'
import { Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import '../App.css'


const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    toolbarTitle: {
        flexGrow: 1,
    },
}));


const Status = ({props}) => {
    const location = useLocation();
    const message = location.hash.replace("#","").split("%20").join(" ");
    const classes = useStyles();
    return <div className="App"> 
    {message === "We have sent you password reset link to your email" ?
    <Typography variant="h5">{message}</Typography>:
    <Typography variant="h3">{message === "" ? "Password Changed Successfully" : message}</Typography>
    }
    <Button 
            href="#"
            color="primary"
            variant="outlined"
            className={classes.link}
            component={NavLink}
            to="/">
        Home
    </Button>
    </div>;
}

export default Status