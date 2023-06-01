import React, { useEffect, useState } from "react";
import { AppBar, Button, Link, makeStyles } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import { NavLink } from "react-router-dom";
// import { Avatar } from "@material-ui/core";
// import MenuListComposition from "./Profile";

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


function Header() {
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const classes = useStyles();
    
    useEffect(() => {
        if(localStorage.getItem('token') === "") {
            setUsername(null);
        }
    },[username]);

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar
                position='static'
                color='white'
                elevation={0}
                className={classes.appBar}
            >
                <Toolbar className={classes.toolbar}>
                    <Typography 
                        variant='h6'
                        color='inherit'
                        noWrap
                        className={classes.toolbarTitle}
                    >
                        <Link
                            component={NavLink}
                            to='/'
                            underline='none'
                            color='textPrimary'
                        >
                            EasyAuction
                        </Link>
                    </Typography>
                    { username === null ?
                        <Button 
                        href="#"
                        color="primary"
                        variant="outlined"
                        className={classes.link}
                        component={NavLink}
                        to="/register">
                            Register
                    </Button>:
                    <Button
                    href="#"
                    color="primary"
                    variant="outlined"
                    className={classes.link}
                    component={NavLink}
                    to={"/profile/"+localStorage.getItem('username')}>
                            {username}
                    </Button>
}
            { username === null ?
                <Button
                    href="#"
                    color="primary"
                    variant="outlined"
                    className={classes.link}
                    component={NavLink}
                    to="/login">
                            Login
                    </Button>:
                    <Button
                            href="#"
                            color="primary"
                            variant="outlined"
                            className={classes.link}
                            component={NavLink}
                            to="/logout">
                                Logout
                    </Button>}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export default Header;