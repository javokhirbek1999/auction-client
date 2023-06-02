import React, { useState } from 'react';
import axiosInstance from '../../axios';
import {NavLink, useNavigate} from 'react-router-dom';
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


export default function SignIn() {
    const history = useNavigate();
    const initialFormData = Object.freeze({
        email: '',
        password: ''
    });

    const [formData, updateFormDate] = useState(initialFormData);
    const [errorMessage, setErrorMessage] = useState({message: ''});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        updateFormDate({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setErrorMessage({message: ''})

        axiosInstance.post('users/token/', {
            grant_type: 'password',
            email: formData.email,
            password: formData.password,
        }).catch(function (error) {
            if(error.message) {
                setErrorMessage({message: "Email or password is incorrect"});
            }
        });

      if(errorMessage.message === '') {
        console.log('Yes, credentails are correct')
        axiosInstance.post('users/token/', {
            grant_type: 'password',
            email: formData.email,
            password: formData.password,
        }).then((res) => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('email', res.data.email)
            history('/');
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
                        Sign In
                    </Typography>
                    <h4 style={{color: 'red'}}>{errorMessage.message}</h4>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange}
                        />
                        { showPassword ?
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                        :
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                        }
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" onClick={()=>setShowPassword(!showPassword)}/>}
                            label="Show password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>

                        <Grid container>
                            <Grid item xs>
                                <NavLink to="/request-password-reset" variant="body2">
                                    <Link>Forgot password?</Link>
                                </NavLink>
                            </Grid>
                            <Grid item>
                                <NavLink to="/register" variant="body2">
                                    <Link>{"Don't have an account? Sign Up"}</Link>
                                </NavLink>
                            </Grid>
                        </Grid>
                    </form>
            </div>
        </Container>
    );
}
