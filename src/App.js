import React, { useEffect, useState } from 'react'
import './App.css';
import axiosInstance from './axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardActions } from '@material-ui/core';
import { Link as MatUIlink, Container, Box, Grid, makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { Button, TextField, CircularProgress } from '@material-ui/core';
import ImgMediaCard from './components/Item';
import { CardContent, CardMedia, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';


function App() {

  const cards = [1,2,3,4,5]
  const [statsData, setStatsData] = useState({
    loading: true,
    data: [],
  });

  const initialData = Object.freeze({
    url: null,
  });

  const [formData, updateFormData] = useState(initialData);
  const [shortURL, setShortURL] = useState("")
  const [allAuctions, setAllAuctions] = useState({
    loading: true,
    data: [],
  })

  const handleChange = (e) => {
    updateFormData({
      url: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance.post('auction/', {
      url: formData.url,
    }).then((res) => {
      setShortURL(res.data.shortURL)
    });
  }
  
  useEffect(() => {
    axiosInstance.get('auction/').then((res) => {
      setAllAuctions({loading: false, data: res.data})
    }).catch((err) => {
      console.log(err);
    });
  },[]);


  return (
    <div className="App">
                    <> 
                    <h1>On-going auctions</h1>
                    <TextField id="outlined-basic" label="Search Items" variant="outlined" onChange={handleChange}/>
                    <Button 
                      href="#"
                      color="primary"
                      variant="contained"
                      id="url-button"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      <Search />
                    </Button>
                    </>
                    <div id='results-container' component={Paper}>
                      <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {allAuctions.data.map((auction) => (
              
              <Grid item key={auction.id} xs={12} sm={6} md={4} >
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {new Date(auction['endDate']) > new Date() && auction['status'] === 'In-auction' ? <ImgMediaCard auctionData={auction}/>:<></>}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>              
        </div>
    </div>
  );
}

export default App;