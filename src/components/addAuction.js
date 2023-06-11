import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import {useNavigate} from 'react-router-dom'
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

	const initialFormData = Object.freeze({
		owner: localStorage.getItem('userID'),
		name: '',
		description: '',
		thumbnail: '',
		category: 2,
		price: 0,
		currency: 'USD',
		endDate: '',
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
		console.log(formData);

		axiosInstance
			.post(`auction/`, {
				owner: localStorage.getItem('userID'),
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

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Add Auction
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
						Add
					</Button>
				</form>
			</div>
		</Container>
	);
} 