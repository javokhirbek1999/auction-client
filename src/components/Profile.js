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
import { Link as MatUIlink, Box, Grid, Paper, Card} from '@material-ui/core';
import ImgMediaCard from './Item';

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

    const [userAuctionItems, setUserAuctionItems] = useState({
        loading: true,
        data: [],
    })

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
    },[])

    useEffect(() => {
        axiosInstance.get(`auction/users/` + username).then((res) => {
            setUserAuctionItems({
                loading: false,
                data: res.data
            })
        }).catch((error) => {
            console.log(error)
        })
    },[])

    
    return (user.loading == true ? <></> : <><Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>
                    <Avatar className={classes.avatar}></Avatar>
                    <Typography component="h1" variant="h5">
                        {user !== null ? user.user_name:""}
                    </Typography>
                        <p><span style={{fontFamily:'monospace', marginRight: 5}}>First name:</span>{user.user['first_name']}</p>
                        <p><span style={{fontFamily:'monospace', marginRight: 5}}>Last name:</span>{user.user['last_name']}</p>                
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
                                    style={{marginLeft: '22%', borderColor: 'red', textDecorationColor: 'red'}}>
                                        Delete Account
                        </Button>:""
                        }
                        { localStorage.getItem('username') === username ?
                        <Button
                        href="#"
                        color="primary"
                        variant="outlined"
                        className={classes.link}
                                    component={NavLink}
                                    to={"/edit-user/"+username}
                                    style={{marginLeft: '5%'}}>
                                        Edit Profile
                        </Button>:""
                        }
                                                { localStorage.getItem('username') === username ?
                        <Button
                        href="#"
                        color="primary"
                        variant="outlined"
                        className={classes.link}
                                    component={NavLink}
                                    to={"/add-auction/" + username}
                                    style={{marginLeft: '5%'}}>
                                        Add Auction
                        </Button>:""
                        }
        </Container>
        <div className='App' style={{marginTop: '5%'}}>
            <Typography component="h1" variant="h5" style={{position: 'center'}}>Your Auctions</Typography>
        </div>
        <div id='results-container' component={Paper}>
                      <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {userAuctionItems.data.map((auction) => (
                <Grid item key={auction.id} xs={12} sm={6} md={4} >
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {new Date(auction['endDate']) > new Date() && auction['status'] === "In-auction" ? <ImgMediaCard auctionData={auction}/>:<></>}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>              
        </div>
        </>
        
);
        
}