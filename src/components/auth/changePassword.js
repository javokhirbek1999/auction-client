import React, { useState } from 'react';
import axiosInstance from '../axios/login';
import {useNavigate} from 'react-router-dom';
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


export default function ChangePassword() {
    const classes = useStyles();
    const history = useNavigate();
    const initialFormData = Object.freeze({
        old_password: '',
        new_password: ''
    });

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

        axiosInstance.put(`api/user/change-password/${localStorage.getItem('username')}/`, {
            old_password: formData.old_password,
            new_password: formData.new_password,
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
                setStatusData({data: {message: "Password Changed Successfully"}});
                history({
                    pathname: '/status',
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
                    <Typography component="h1" variant="h5">
                        Change Password
                    </Typography>
                    <h3>{statusData.data.message}</h3>
                    <form className={classes.form} noValidate>
                        {showPassword ? <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="old_password"
                            label="Old Password"
                            name="old_password"
                            autoComplete="password"
                            autoFocus
                            onChange={handleChange}
                        />:
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="old_password"
                            label="Old Password"
                            type="password"
                            id="old_password"
                            autoComplete="old-password"
                            onChange={handleChange}
                        />}
                        {showPassword ? <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="new_password"
                            label="New Password"
                            name="new_password"
                            autoComplete="password"
                            autoFocus
                            onChange={handleChange}
                        />:
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="new_password"
                            label="New Password"
                            type="password"
                            id="new_password"
                            autoComplete="new-password"
                            onChange={handleChange}
                        />}
                        <FormControlLabel
                            control={<Checkbox value="show-password" color="primary" onClick={()=> setShowPassword(!showPassword)} />}
                            label="Show Password"
                            style={{marginRight: 5, marginLeft: 5}}
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

                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
            </div>
        </Container>
    );
}