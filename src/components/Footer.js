import React from 'react'
import { Container } from "@mui/system";
import { Box, Divider, Grid, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import { ThemeState } from "../ThemeContext";
import { UserState } from "../UserContext";

const Footer = () => {
    const navigate = useNavigate();

    const { user, } = UserState();
    const { accent, textColor, bgColor } = ThemeState();
    
  return (
    <div>
        <br />
        <Divider variant='middle' sx={{borderColor: accent, color: textColor, textAlign: "center"}}>MORE</Divider>
        <Box 
        px={{ xs: 3, sm:10}} 
        py={{ xs: 2, sm:6}} 
        bgcolor={bgColor} 
        color={textColor}
        >
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>

                        <Box borderBottom={1}>Navigate</Box>
                        &nbsp;
                        <Box>
                            <Link onClick={() => navigate(`/`)} style={{cursor: 'pointer'}} color="inherit" underline='none'>Home</Link>
                        </Box>
                        &nbsp;
                        <Box>
                            <Link onClick={() => navigate(`/about-us`)} style={{cursor: 'pointer'}} color="inherit" underline='none'>About Us</Link>
                        </Box>
                        &nbsp;
                        <Box>
                            {"role" in user && (
                            <>
                                <Link
                                style={{cursor: 'pointer'}} 
                                color="inherit" 
                                underline='none'
                                onClick={() => {
                                    navigate(`/user-profiles/${user.id}`);
                                }}
                                >
                                Profile
                                </Link>
                            </>
                            )}
                        </Box>
                        &nbsp;
                        <Box>
                            {user?.role === ("admin" || "organizer") && (
                            <>
                                <Link
                                style={{cursor: 'pointer'}} 
                                color="inherit" 
                                underline='none'
                                onClick={() => {
                                    navigate("/create-an-event");
                                }}
                                >
                                Create An Event
                                </Link>
                            </>
                            )}
                        </Box>

                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1}>Socials</Box>
                        &nbsp;
                        <Box>
                            <Link href='https://github.com/KeithWesley254' color="inherit" target="_blank" underline='none'><i className="fa-brands fa-github"></i> Github</Link>
                        </Box>
                        &nbsp;
                        <Box>
                            <Link href='https://www.linkedin.com/in/keith-wesley-707802215/' color="inherit" target="_blank" underline='none'><i className="fa-brands fa-linkedin"></i> LinkedIn</Link>
                        </Box>
                        &nbsp;
                        <Box>
                            <Link href='https://twitter.com/Keith_wesley_' color="inherit" target="_blank" underline='none'><i className="fa-brands fa-twitter"></i> Twitter</Link>
                        </Box>
                        &nbsp;
                        <Box>
                            <Link href='https://www.youtube.com/channel/UCZ-MKtsBjTD4glktrbEYFXw' target="_blank" color="inherit" underline='none'><i className="fa-brands fa-youtube"></i> Youtube</Link>
                        </Box>
                        &nbsp;
                        <Box>
                            <Link href='https://www.instagram.com/keith_wesley_/' target="_blank" color="inherit" underline='none'><i className="fa-brands fa-instagram"></i> Instagram</Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box>
                            <Typography
                            sx={{
                            mr: 2,
                            fontFamily: 'nunito',
                            fontSize: '18px',
                            fontWeight: 700,
                            color: textColor,
                            textDecoration: 'none',
                            cursor: 'pointer',
                            }}
                            onClick={() => navigate(`/`)}
                            >
                                <TheaterComedyIcon
                                    sx={{
                                    color: accent,
                                    mr: 1,
                                    }}
                                />
                            &nbsp;
                            &nbsp;
                                Events Bomboclat
                            </Typography>
                        </Box>
                        <br />
                        <Box>
                            <Typography>
                                Like you, the unstoppable entrepreneurs and passionate social ringleaders, we 
                                thrive at the intersection of culture, community, and commerce. 
                                We take on the complex world of ticketing—making.
                                It's fast and easy for anyone to sell tickets and share their passion. 
                                Everything we build empowers creators, founders, and trendsetters to 
                                build thriving brands and communities through live experiences. 
                                Do more of what you love and grow eventfully
                            </Typography>
                            &nbsp;
                            <Typography>
                            © 2022 Events Bomboclat. All Rights Reserved.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </div>
  )
}

export default Footer;