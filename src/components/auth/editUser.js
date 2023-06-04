import React, { useState } from 'react';
import axiosInstance from '../../axios';
import {useNavigate, useLocation} from 'react-router-dom';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useEffect } from 'react';


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


export default function EditUser() {
    let location = useLocation();
    const history = useNavigate();
    const initialFormData = Object.freeze({
        email: '',
        first_name: '',
        last_name: '',
        password: ''
    });

    const [formData, updateFormDate] = useState(initialFormData);


    const [errorMessage, setErrorMessage] = useState({message: ''});

    const [userData, setUserData] = useState({
        loading: true,
        data: null
    })


    useEffect(() => {
        axiosInstance.get('users/user/' + localStorage.getItem('username')).
        then((res) => {
            setUserData({
                loading: false,
                data: res.data
            })
        }).catch((error) => {
            console.log(error)
        })
    },[])

    const handleChange = (e) => {
        updateFormDate({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });


    };
    let path = location.pathname.split('/');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setErrorMessage({message: ''})
        
        let update_url = 'users/user/'+path[path.length-1];
        
        axiosInstance.put(update_url, {
            email: formData.email !== '' ? formData.email : userData.data['email'],
            first_name: formData.first_name !== '' ? formData.first_name : userData.data['first_name'],
            last_name: formData.last_name !== '' ? formData.last_name : userData.data['last_name'],
            password: formData.password
        }).catch(function (error) {
            if(error.message) {
                setErrorMessage({message: "Make sure all the fields are filled"});
            }
        });

      if(errorMessage.message === '') {

        axiosInstance.put(update_url, {
            email: formData.email !== '' ? formData.email : userData.data['email'],
            first_name: formData.first_name !== '' ? formData.first_name : userData.data['first_name'],
            last_name: formData.last_name !== '' ? formData.last_name : userData.data['last_name'],
            password: formData.password
        }).then((res) => {
            history('/profile/' + localStorage.getItem('username'));
            window.location.reload();
        });
      }
    };

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {userData.loading == true ? <></> : <div className={classes.paper}>
                    <Avatar className={classes.avatar}></Avatar>
                    <Typography component="h1" variant="h5">
                        Edit your profile
                    </Typography>
                    <h4 style={{color: 'red'}}>{errorMessage.message}</h4>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="first_name"
                            label="First Name"
                            name="first_name"
                            autoComplete="email"
                            defaultValue={userData.data['first_name']}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="last_name"
                            label="Last Name"
                            name="last_name"
                            autoComplete="email"
                            defaultValue={userData.data['last_name']}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            defaultValue={userData.data['email']}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            autoComplete="password"
                            type='password'
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
}
        </Container>
    );
}