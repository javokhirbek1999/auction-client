import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../axios';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const currencyConverter = Object.freeze({
    'USD': '$',
    'EUR': '€',
    'PLN': 'zł'
})

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

export default function SignInSide() {

    const classes = useStyles()

    const location = useLocation()

    const path = location.pathname.split('/')

    const id = parseInt(path[path.length-1].split('-')[0])

    const [auctionItemData, setAuctionItemData] = useState({
        loading: true,
        data: []
    })

    const [bidsData, setBidsData] = useState({
        loading: true,
        data: []
    })

    useEffect(() => {
        axiosInstance.get('auction/').then((res) => {
            res.data.map((item) => {
                if (item['id'] == id) {
                    setAuctionItemData({
                        loading: false,
                        data: item,
                        bidPrice: item['price']
                    })
                }
            })
        }).catch((err) => {
          console.log(err);
        });
    },[]);

    useEffect(() => {
        axiosInstance.get('auction/bids/' + id).then((res) => {
            setBidsData({
                loading: false,
                data: res.data,
            })
        }).catch((err) => {
            console.log(err);
        })
    },[]);


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  const updateBidPrice = (e) => {
    setAuctionItemData({...auctionItemData, bidPrice:e.target.value.trim()})
  }



  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        {auctionItemData.loading == true ? <CircularProgress />:<>
        <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
            backgroundImage: `url(${auctionItemData.data['thumbnail']})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              {auctionItemData.data['get_auctioneer_details']['first_name'].slice(0,1) + auctionItemData.data['get_auctioneer_details']['last_name'].slice(0,1)}
            </Avatar>
            <Typography component="h1" variant="h5">
              {auctionItemData.data['name']}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="bid-price"
                label="Bid Price"
                name="bid-price"
                autoComplete="email"
                autoFocus
                onChange={updateBidPrice}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Confirm"
                />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className={classes.link}
                          component={NavLink}
                          to={"/auction/" + auctionItemData.data['id'] + '-' + auctionItemData.data['name'].split(' ').join('-') + '/pay/' + auctionItemData.bidPrice}
                >
                Place a bid
              </Button>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid></>}
      </Grid>

       <TableContainer component={Paper}>
        <Table sx={{midWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center">Bidder</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bidsData.data.map(item => {
              const {bidDate, bidPrice, get_bidder_details, get_item_details, bidID, status} = item
              return ( <>
              <TableRow 
                key={bidID}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{}</TableCell>
                  <TableCell component="th" scope="row" align="center"><NavLink to={"/profile/"+get_bidder_details['user_name']}>{get_bidder_details['user_name']}</NavLink></TableCell>
                  <TableCell align="center">{get_item_details['currency'] != 'PLN' ? currencyConverter[get_item_details['currency']] + bidPrice : bidPrice + ' PLN'}</TableCell>
                  <TableCell align="center">{`${new Date(bidDate)}`}</TableCell>
              </TableRow>
              </>)
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}