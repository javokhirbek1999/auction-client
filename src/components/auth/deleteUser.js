import React, { useState } from 'react';
import axiosInstance from '../../axios';
import {useLocation, useNavigate} from 'react-router-dom';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
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


export default function DeleteUser() {
    const classes = useStyles();
    const location = useLocation().pathname.split('/')
    const history = useNavigate();
    const initialFormData = Object.freeze({
        old_password: '',
        new_password: ''
    });

    const username = location[location.length-1] 

    const [formData, updateFormDate] = useState(initialFormData);
    const [showPassword, setShowPassword] = useState(false);
    const [statusData, setStatusData] = useState({data: {message: ''}});

    const handleChange = (e) => {
        updateFormDate({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData);

        axiosInstance.delete(`users/user/${username}`, {
            'Authorization': `Token ${localStorage.getItem('token')}`
        })

        .catch(function (error) {
            if(error.message) {
                setStatusData({data: {message: error.response.data.old_password}});
                history({
                    pathname: '/status',
                    hash: `${error.response.data.old_password}`,
                })
            }
        })
        .then((res) => {
            if(res) {
                setStatusData({data: {message: "User Deleted Successfully"}});
                localStorage.clear()
                history({
                    pathname: '/logout',
                    hash: `${statusData.data.message}`
                });
            }
        })
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                    <Avatar className={classes.avatar}></Avatar>
                    <Typography component="h2" variant="h6">
                        Are you sure to delete your account ?
                    </Typography>
                    <h3>{statusData.data.message}</h3>
                    <form className={classes.form} noValidate>
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSubmit}
                        >
                            Yes
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSubmit}
                        >
                            No
                        </Button>
                    </form>
            </div>
        </Container>
    );
}