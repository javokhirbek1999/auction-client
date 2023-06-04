import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import {useLocation, useNavigate} from 'react-router-dom'
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom';




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
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function AddAuction() {
	const history = useNavigate();

    const location = useLocation()

    const path = location.pathname.split('/')

    const currentAuctionItemID = path[path.length-1].split('-')[0]

    const [auctionItemData, setAuctionItemData] = useState({
        loading: false,
        data: []
    })


    useEffect(() => {
        axiosInstance.get('auction/')
        .then((res) => {
            res.data.map((item) => {
                if (parseInt(item['id']) == parseInt(currentAuctionItemID)) {
                    setAuctionItemData({
                        loading: false,
                        data: item
                    })
                }
            })
        }).catch((err) => {
            console.log(err)
        })
    },[])

    console.log(auctionItemData)

	const initialFormData = Object.freeze({
		auctioneer: localStorage.getItem('userID'),
		name: auctionItemData.loading === true ? '' : auctionItemData.data['name'],
		description: auctionItemData.loading === true ? '' : auctionItemData.data['description'],
		thumbnail: auctionItemData.loading === true ? '' : auctionItemData.data['thumbnail'],
		category: 2,
		price: auctionItemData.loading === true ? '' : auctionItemData.data['price'],
		currency: 'USD',
		endDate: auctionItemData.loading === true ? '' : auctionItemData.data['endDate'],
		end_time: ''
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		axiosInstance
			.put(`auction/users/${localStorage.getItem('username')}/${currentAuctionItemID}`, {
				auctioneer: localStorage.getItem('userID'),
				name: formData.name,
				description: formData.description,
				thumbnail: formData.thumbnail,
				category: 2,
				price: formData.price,
				currency: 'USD',
				endDate: formData.endDate,
			}).catch((err) => {
				console.log(err)
			})
			.then((res) => {
				history('/profile/' + localStorage.getItem('username'));
			});
	};

    const removeItem = (e) => {
        e.preventDefault();

        axiosInstance.delete(`auction/users/${localStorage.getItem('username')}/${currentAuctionItemID}`)
        .catch((error) => {
            console.log(error)
        })
        .then((res) => {
            history('/profile/' + localStorage.getItem('username'))
        })
    }

	const classes = useStyles();
    console.log(auctionItemData.data)
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
            {auctionItemData.loading === true ? <></> : 
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Edit your Auction
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="name"
								label="Name"
								name="name"
								autoComplete="name"
                                defaultValue={auctionItemData.data['name']}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="description"
								label="Description"
								name="description"
								autoComplete="description"
                                defaultValue={auctionItemData.data['description']}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
						<TextField
								variant="outlined"
								required
								fullWidth
								id="thumbnail"
								label="Product Image URL"
								name="thumbnail"
                                defaultValue={auctionItemData.data['thumbnail']}
								autoComplete="thumbnail"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="price"
								label="Price"
								name="price"
                                defaultValue={auctionItemData.data['price']}
								autoComplete="price"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="endDate"
								helperText="YYYY-MM-DD"
								label="End Date"
								id="endDate"
                                defaultValue={auctionItemData.data['endDate']}
								autoComplete="endDate"
								onChange={handleChange}
							/>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="end-time"
								helperText="HH-MM"
								label="End Time"
								id="end-time"
                                defaultValue={auctionItemData.data['endDate']}
								autoComplete="end-time"
								onChange={handleChange}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Submit
					</Button>
                    <Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
                        style={{backgroundColor: 'green'}}
					>
						Sell
					</Button>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                        onClick={removeItem}
                        style={{backgroundColor: 'red'}}
                        >
                        Delete
                    </Button>
				</form>
			</div>
}
		</Container>
	);
} 