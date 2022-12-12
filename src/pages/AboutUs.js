import { Grid, Box, Card, CardMedia, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { ThemeState } from '../ThemeContext';

const AboutUs = () => {
  const [communityData, setCommunityData] = useState([]);
  const [aboutUsData, setAboutUsData] = useState([]);
  const [randomIndexCommunity, setRandomIndex] = useState();
  const [randomIndexAbout, setRandomIndexAbout] = useState();
  const { btnColor, mainHeading, textColor, btnTextColor, btnHover } = ThemeState();

  useEffect(() => {
    changeCommunityImage()
  }, []);

  useEffect(() => {
    changeAboutImage()
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/api/communities`)
    .then(r => r.json())
    .then(data => setCommunityData(data))
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/api/abouts`)
    .then(r => r.json())
    .then(data => setAboutUsData(data))
  }, []);

  function changeAboutImage(){
    const randomNumber = Math.floor(Math.random() * aboutUsData.length);
    setRandomIndexAbout(randomNumber)
  }

  function changeCommunityImage(){
    const randomNumber = Math.floor(Math.random() * communityData.length);
    setRandomIndex(randomNumber)
  }

  return (
    <>
      <Box>
      <br />
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={6}>
            <div style={{
              display: "flex", color: mainHeading, justifyContent: "center", alignItems: "center", fontSize: 30, fontFamily: "nunito", fontWeight: "bolder"
              }}>
                <p>
                  About Us
                </p>
            </div>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={6}>
            <Box sx={{ml: 4, mr: 4}}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Card sx={{ maxWidth: 400 }}>
                  <CardMedia
                  component="img"
                  height="350"
                  image= {aboutUsData[randomIndexAbout]?.about_img}
                  alt= "about-content"
                  loading="lazy"
                  />
                </Card>
              </div>
            </Box> 
          </Grid>
          <br />
          <Grid item xs={12} md={6}>
            <Box sx={{ml: 4, mr: 4}}>
              <div>
                <Box>
                  <Typography sx={{color: textColor}}>
                    {aboutUsData[randomIndexAbout]?.about_description}
                  </Typography>
                </Box>
                <br />  
                <Box sx={{display: "flex", justifyContent: "center"}}>
                  <Button
                  sx={{mt: 3, 
                  color: btnTextColor,
                  backgroundColor: btnColor,
                  width: "50%",
                  height: "50%",
                  borderRadius: 2,
                  ml: {xs: 2, md: 2}, 
                  mr: {xs: 2, md: 2},
                  "&:hover": {backgroundColor: btnHover, }
                  }}
                  onClick={changeAboutImage}
                  >
                    More Stories About Us
                  </Button>
                </Box>
              </div>
            </Box> 
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={6}>
            <div style={{
              display: "flex", color: mainHeading, justifyContent: "center", alignItems: "center", fontSize: 30, fontFamily: "nunito", fontWeight: "bolder"
              }}>
                <p>
                  Community Impact
                </p>
            </div>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={6}>
            <Box sx={{ml: 4, mr: 4}}>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Card sx={{ maxWidth: 400 }}>
                  <CardMedia
                  component="img"
                  height="350"
                  image= {communityData[randomIndexCommunity]?.community_img}
                  alt= "community-content"
                  loading="lazy"
                  />
                </Card>
              </div>
            </Box> 
          </Grid>
          <br />
          <Grid item xs={12} md={6}>
            <Box sx={{ml: 4, mr: 4}}>
              <div>
                <Box>
                  <Typography sx={{color: textColor}}>
                    {communityData[randomIndexCommunity]?.community_description}
                  </Typography>
                </Box>
                <br />  
                <Box sx={{display: "flex", justifyContent: "center"}}>
                  
                  <Button
                  sx={{mt: 3, 
                  backgroundColor: btnColor, 
                  color: btnTextColor,
                  width: "50%",
                  height: "50%",
                  borderRadius: 2,
                  ml: {xs: 2, md: 2}, 
                  mr: {xs: 2, md: 2},
                  "&:hover": {backgroundColor: btnHover, }
                  }}
                  onClick={changeCommunityImage}
                  >
                    More Community Impact Stories
                  </Button>
                 
                </Box>  
              </div>
            </Box> 
          </Grid>
        </Grid>
        <br />
      </Box>
    </>
  )
}

export default AboutUs