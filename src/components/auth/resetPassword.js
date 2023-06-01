import React, { useState } from 'react';
import axiosInstance from '../axios/login';
import {useNavigate, useLocation} from 'react-router-dom';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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


export default function ResetPassword() {
    let location = useLocation();
    const history = useNavigate();
    const initialFormData = Object.freeze({
        new_password: '',
        confirm_password: ''
    });

    const [formData, updateFormDate] = useState(initialFormData);


    const [errorMessage, setErrorMessage] = useState({message: ''});

    const handleChange = (e) => {
        updateFormDate({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };
    let path = location.pathname.split('/');
    console.log(`This is location: ${path[path.length-1]}`);

    const handleSubmit = (e) => {
        e.preventDefault();

        
        setErrorMessage({message: ''})
        
        //Set new password endpoint
        let update_url = 'api/user/password-reset/'+path[path.length-1]+'/';
        
        console.log(`This is updated URL: ${update_url}`);

        axiosInstance.put(update_url, {
            grant_type: 'password',
            new_password: formData.new_password,
            confirm_password: formData.confirm_password,
        }).catch(function (error) {
            if(error.message) {
                setErrorMessage({message: "Passwords did not match"});
            }
        });

      if(errorMessage.message === '') {
        
        console.log('Yes, credentails are correct')

        axiosInstance.put(update_url, {
            grant_type: 'password',
            new_password: formData.new_password,
            confirm_password: formData.confirm_password,
        }).then((res) => {
            history('/login');
            window.location.reload();
        });
      }  
    };

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                    <Avatar className={classes.avatar}></Avatar>
                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>
                    <h4 style={{color: 'red'}}>{errorMessage.message}</h4>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="new_password"
                            label="New Password"
                            name="new_password"
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="confirm_password"
                            label="Confirm Password"
                            name="confirm_password"
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </form>
            </div>
        </Container>
    );
}