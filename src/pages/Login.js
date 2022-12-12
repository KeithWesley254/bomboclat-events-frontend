import React, { useEffect, useState } from 'react'
import { Grid, Box, Button } from '@mui/material';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import Carousel from "react-material-ui-carousel";
import { ThemeState } from '../ThemeContext';

const Login = () => {

  const [showLogin, setShowLogin] = useState(true);
  const [loginSlides, setLoginSlides] = useState([]);
  const { accent, formTextC, } = ThemeState();

  useEffect(() => {
    fetch("http://localhost:3000/api/login_slides")
    .then(r => r.json())
    .then(data => {
        setLoginSlides(data)
    })
  }, []);
  
  return (
    <>
      <main>
        <Box >
          <Grid container spacing={2} columns={12}>
            <Grid item xs={12} sx={{color: formTextC}} md={6}>

              {showLogin ? (
                <>
                <div className='loginForm'>
                  <LoginForm />
                </div>
                <div className='loginForm'>
                  <p>
                    Don't have an account? &nbsp;
                    <Button disableRipple sx={{bgcolor: "transparent", color: accent, "&:hover": {backgroundColor: "transparent"}, fontFamily: "nunito", fontWeight: "bold", fontSize: 14, textTransform: "none" }} onClick={() => setShowLogin(false)}>
                      Sign Up
                    </Button>
                  </p>
                </div>
                </>
              ): (
                <>
                <div className='loginForm'>
                  <SignUpForm />
                </div>
               
                <div className='loginForm'>
                  <p>
                    Already have an account? &nbsp;
                    <Button disableRipple sx={{bgcolor: "transparent", "&:hover": {backgroundColor: "transparent"}, color: accent, fontFamily: "nunito", fontWeight: "bold", fontSize: 14, textTransform: "none" }} onClick={() => setShowLogin(true)}>
                      Log In
                    </Button>
                  </p>
                </div>
                </>
              )}

            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Carousel
                  autoPlay={true}
                  interval={6000}
                  animation="slide"
                  duration={1000}
                  indicators={false}
                  swipe={true}
                >
                    {(Array.isArray(loginSlides) ? loginSlides : []).map((slide) => {
                      return(
                        <div key={slide?.id}>
                          <img 
                            src={slide?.image_url}
                            alt={slide?.title}
                            style={{
                              width: "100%",
                              height: "800px",
                            }}
                          />
                        </div>
                      )
                    })}                   
                </Carousel>
              </Box>
            </Grid>
          </Grid> 
        </Box>
      </main>
    </>
  )
}

export default Login;