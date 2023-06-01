import React, { useState } from 'react';
import axiosInstance from '../axios/login';
import {useNavigate} from 'react-router-dom';
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


export default function RequestPasswordReset() {
    const history = useNavigate();
    const initialFormData = Object.freeze({
        email: '',
    });

    const [formData, updateFormDate] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormDate({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        axiosInstance.post(`api/user/password-reset-request/`, {
            email: formData.email,
        })
        .then((res) => {
            history({
                pathname: '/status',
                hash: `${res.data.message}`,
            })
        });
    };

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                    <Avatar className={classes.avatar}></Avatar>
                    <Typography component="h1" variant="h5">
                        Request Password Reset
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
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