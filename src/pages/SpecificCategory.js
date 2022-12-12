import { CardMedia, Grid, Typography, Card, CardContent, Box, TextField, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeState } from "../ThemeContext";

const SpecificCategory = () => {
  const [categoryData, setCategoryData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [eventPage, setEventPage] = useState(1);
  const [search, setSearch] = useState("");
  
  const { cardBg, accent, formAccent, formTextC, categoryBtns, cardHover } = ThemeState();

  const params = useParams();

  const navigate = useNavigate();

  function handleSearch(){
    return filteredDates.filter((event) => 
        event.title.toLowerCase().includes(search)
    )
  }

  useEffect(()=>{
  fetch(`http://localhost:3000/api/categories/${params.id}`)
  .then(response => response.json())
  .then((data)=> {
    setCategoryData(data)
    setIsLoading(false)
  })
  },[params])

  if(isLoading === true) return (
    <Grid container spacing={2} columns={12}>
      <Grid item xs={12} md={12}>
        <Box sx={{ borderRadius: 20, display: "inline-flex", position: "relative", width: "100%", justifyContent: "center", flexDirection: 'row' }}>
          <div style={{marginTop: "25%", display: "inline-flex", justifyContent: "center"}}>
            <div className="loader"></div>
          </div>
        </Box>
      </Grid>
    </Grid>
  )

  const filteredDates = categoryData?.events.filter((event) => parseInt(event.time_diff) > 0);

  return (
    <main>
      <Grid container columns={12}>
       
        
          <Grid item xs={6} md={6}>
            
            <Box sx={{textAlign: {xs: "center", md: "center" } }}>
              <Box sx={{height: {xs: "200px", md: "450px"}, backgroundColor: "#d1410a", width: "100%", display: "inline-flex", justifyContent: "center", textAlign: "center" }}>
                <Typography sx={{ pt: {xs: 8, md: 20}, color: "#fff", fontWeight: "bolder", fontSize: {xs: 40, md: 60} }}>
                  {categoryData?.title}
                </Typography>
              </Box>
              
            </Box>
            
          </Grid>

          <Grid item xs={6} md={6}>

            <Box sx={{textAlign: {xs: "center", md: "center" } }}>
              <Box sx={{height: {xs: "200px", md: "450px"}, width: "100%", display: "inline-flex", justifyContent: "center", textAlign: "center" }}>
                <Typography>
                    <CardMedia
                      component="img"
                      alt={categoryData?.title}
                      sx={{height: {xs: "200px", md: "450px"} }}
                      image={categoryData?.banner_img}
                    />
                </Typography>
              </Box>
              
            </Box>
          </Grid>
        
      </Grid>

      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} md={12}>
          <Box sx={{ display: "flex", justifyContent: "center",
          '& fieldset.MuiOutlinedInput-notchedOutline': {
            borderColor: formAccent,
          }, color: formTextC
          }}>
            <TextField 
            label="First page full search..."
            sx={{ input: { color: formAccent }, "label": {color: formTextC}, m: 2, width: "70%", borderRadius: 20 }}
            onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
            />
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} md={12}>
          <br />
          <Box sx={{ borderRadius: 20, display: "inline-flex", position: "relative", width: "100%", justifyContent: "center", flexDirection: 'row'  }}>
            <div style={{ marginRight: 10, marginLeft: 10, borderRadius: 20, gap: 20, justifyContent: "center", flexWrap: "wrap", display: "inline-flex", flexDirection: 'row' }}>
            {categoryData.events ?
            (
              handleSearch()
              .slice((eventPage - 1) * 8, (eventPage - 1) * 8 + 8)
              .sort((a, b) => new Date(a.event_start_date) - new Date(b.event_start_date))
              .map((event) => {

                return (
                  
                  <div key={event.id}>
                    <Card
                      className="homeCard"
                      sx={{
                        textAlign: "left",
                        width: 280,
                        bgcolor: cardBg,
                        height: 380,
                        cursor: "pointer",
                        overflowY: "scroll",
                        "&:hover": {boxShadow: cardHover, }
                      }}
                      onClick={() => navigate(`/specific-event/${event.id}`)}
                    >
                      <CardMedia
                        component="img"
                        height="150px"
                        image={event.banner_img}
                        alt={event.title}
                      />
                      <CardContent>
                        
                        <Typography variant="h1" sx={{ color: categoryBtns, fontFamily: "nunito", fontWeight: "bolder", fontSize: 20 }}>
                          {event.title}
                        </Typography>
                        <br />
                          
                        <Typography variant="body1" sx={{ fontSize: 15, fontWeight: "bold", color: accent}}>
                          {new Date(event.event_start_date).toUTCString()}
                        </Typography>
                        <br />
                        
                        <Typography variant="body1" sx={{ fontSize: 15, fontWeight: "regular", color: categoryBtns}}>
                          {event.location}
                        </Typography>
                        <br />
                        
                        <Typography variant="body1" sx={{ fontSize: 15, fontWeight: "bold", color: categoryBtns}}>
                          {event.time_diff < 0 ? (
                            <p>Event has passed</p>
                          ) : (
                            <i>{event.time_diff + " days remaining"}</i>
                          )}
                        </Typography>
        
                      </CardContent>
                    </Card>
                    &nbsp;
                  </div>
                  );
                })
              ) : (
                  <Grid container spacing={2} columns={12}>
                    <Grid item xs={12} md={12}>
                      <div>
                        <Typography>There are no available events currently</Typography>
                      </div>
                    </Grid>
                  </Grid>
              )
              }
              
            </div>
          </Box>
        </Grid>

        <Grid item xs={12} md={12}>
          <Box >
            <Pagination 
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                mb: 2,
                "& .MuiPaginationItem-root": {
                  color: accent
                }
            }}
            count={parseInt( (handleSearch().length/8).toFixed(0) )}
            onChange={(_, value) => {
                setEventPage(value);
            }}
            />
          </Box>
      </Grid>

      </Grid>
    </main>
  )
}

export default SpecificCategory