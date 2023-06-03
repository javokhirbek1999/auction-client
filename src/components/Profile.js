import React, { useEffect, useState} from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Button} from '@material-ui/core'
import { NavLink } from 'react-router-dom';
import axiosInstance from '../axios';
import { red } from '@mui/material/colors';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(2),
        width: 150,
        height: 150,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function Profile() {
    let location = useLocation();

    const [user, setUser] = useState({
        loading: true,
        user: null,
    });

    const classes = useStyles();

    const path = location.pathname.split('/');

    const username = path[path.length-1];
    
    useEffect(() => {
        axiosInstance.get(`users/user/` + username).then((res) => {
            setUser({
                loading: false,
                user: res.data
            });
        })
    },[setUser, username])
    console.log(user.user);

    
    return (user.loading == true ? <></> : <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                    <Avatar className={classes.avatar}></Avatar>
                    <Typography component="h1" variant="h5">
                        {user !== null ? user.user_name:""}
                    </Typography>
                        <p><span style={{fontFamily:'monospace', marginRight: 5}}>Email:</span> <a href={user !== null ? "mailto:"+user.user['email']:""}>{user.user['email']}</a></p>
                        <p><span style={{fontFamily:'monospace', marginRight: 5}}>Joined:</span> <span style={{fontStyle: 'italic'}}>{`${months[new Date(user.user['date_joined']).getMonth()]} ${new Date(user.user['date_joined']).getDate()}, ${new Date(user.user['date_joined']).getFullYear()}`}</span></p>
                        <p><span style={{fontFamily:'monospace', marginRight: 5}}>Last Updated:</span> <span style={{fontStyle: 'italic'}}>{`${months[new Date(user.user['date_updated']).getMonth()]} ${new Date(user.user['date_updated']).getDate()}, ${new Date(user.user['date_updated']).getFullYear()}`}</span></p>
                        </div>
                        { localStorage.getItem('username') === username ?
                <Button
                href="#"
                color="primary"
                variant="outlined"
                className={classes.link}
                            component={NavLink}
                            to={"/delete-user-confirmation/"+username}
                            style={{marginLeft: '30%', borderColor: 'red', textDecorationColor: 'red'}}>
                                Delete Account
            </Button>:""
        }
        </Container>
);
        
}