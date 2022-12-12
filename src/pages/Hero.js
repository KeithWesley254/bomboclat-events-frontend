import React, { useEffect, useState } from 'react'
import { Box, Grid, LinearProgress, Stack, Snackbar } from '@mui/material';
import Carousel from "react-material-ui-carousel";
import Categories from '../components/Categories';
import HomePageEvents from '../components/HomePageEvents';
import { ThemeState } from "../ThemeContext";
import mainBanner from '../assets/banners/main banner.png';
import progamer from '../assets/banners/progamer banner.png';
import natureBanner from '../assets/banners/nature banner.png';
import techBanner from '../assets/banners/tech banner.png';
import fitnessBanner from '../assets/banners/fitness banner.png';
import { useLocation } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';

const Hero = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { mainHeading } = ThemeState();
  const [open, setOpen] = useState(false);
  const { state } = useLocation();

  useEffect(() => {

    setOpen(state)
  }, [])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const banners = [
    {id: 1, img_url: mainBanner, title: "main banner"},
    {id: 2, img_url: progamer, title: "pro gamer"},
    {id: 3, img_url: natureBanner, title: "nature banner"},
    {id: 4, img_url: techBanner, title: "tech banner"},
    {id: 5, img_url: fitnessBanner, title: "fitness banner"}
  ]

  useEffect(() => {
    fetch("http://localhost:3000/api/events").then(r => r.json()).then(data => setEvents(data));
    fetch("http://localhost:3000/api/categories").then(r => r.json()).then(data => setCategories(data));
    setIsLoading(false)
  }, []);

  if(isLoading === true) return <LinearProgress style={{backgroundColor: "#d1410a"}} />

  return (
    <main>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} md={12}>
          <Box>
            <Carousel
              autoPlay={true}
              interval={6000}
              animation="slide"
              duration={1000}
              indicators={false}
              swipe={true}
            >
                {(Array.isArray(banners) ? banners : []).map((banner) => {
                  return(
                    <div key={banner.id}>
                      <img 
                        src={banner.img_url}
                        alt={banner.title}
                        style={{
                          width: "100%",
                          height: "auto",
                          maxHeight: "600px",
                        }}
                      />
                    </div>
                  )
                })}
                
            </Carousel>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} md={12}>
          <Box>
            <div style={{color: mainHeading, fontWeight: "bolder", marginLeft: 40, fontSize: "30px"}}>
              <p>Check out trending categories</p>
            </div>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} md={12}>
          <Box>
            <Categories categories={categories}/>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} md={12}>
          <div style={{ color: mainHeading, fontWeight: "bolder", marginLeft: 40, fontSize: "30px"}}>
            <p>Events available</p>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} md={12}>
          <Box sx={{ borderRadius: 20, display: "inline-flex", position: "relative", width: "100%", justifyContent: "center", flexDirection: 'row'  }}>
            <HomePageEvents events={events}/>
          </Box>
        </Grid>
      </Grid>

      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} autoHideDuration={6000} severity="success" sx={{ width: '100%' }}>
            Payment Recorded. On Success, event will be added to your profile!
          </Alert>
        </Snackbar>
      </Stack>

    </main>
  )
}

export default Hero