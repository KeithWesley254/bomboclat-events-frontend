import { Box, Card, CardContent, Grid, Pagination, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeState } from "../ThemeContext";

const OrganizerEvents = ({ userProfile }) => {
  const [search, setSearch] = useState("");
  const [eventPage, setEventPage] = useState(1);

  const navigate = useNavigate();

  const { mainHeading, cardBg, formAccent, formTextC, accent, categoryBtns, cardHover } = ThemeState();

  const filteredDates = userProfile?.events

  function handleSearch(){
    return filteredDates?.filter((event) => 
        event.title?.toLowerCase().includes(search)
    )
  }

  return (
    <Box>
      <br />

      <Grid item xs={12} md={12}>
        <div style={{ color: mainHeading, textAlign: "center", fontSize: 30, fontFamily: "nunito", fontWeight: "bolder"}}>
            <Typography>
              <i>Events you have Created</i>
            </Typography>
        </div>
      </Grid>

      <br />
      <Grid item xs={12} md={12}>
        <Box sx={{ display: "flex", justifyContent: "center",
        '& fieldset.MuiOutlinedInput-notchedOutline': {
          borderColor: formAccent,
        }, color: formTextC
        }}>
          <TextField 
          label="First page full search..."
          size="small"
          sx={{ input: { color: formAccent }, "label": {color: formTextC}, mb: 2, width: "70%", borderRadius: 20 }}
          onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
          />
        </Box>
      </Grid>

      <Grid container spacing={2} columns={12} sx={{textAlign: "center", width: "100%", pr:4, justifyContent: "center", alignItems: "center", fontSize: 14 }}>
        <Grid item xs={12} md={12}>
          <Box className='heroScroll' sx={{ mr: 1, ml: 1, maxHeight: 400, gap: 1, justifyContent: "center", flexWrap: "wrap", display: "inline-flex", flexDirection: 'row', overflowX: "auto" }} >
            {handleSearch()
            .slice((eventPage - 1) * 8, (eventPage - 1) * 8 + 8)
            .sort((a, b) => new Date(a.event_start_date) - new Date(b.event_start_date))
            .map((event) => {
              return (
                <div key={event.id}>
                  <Card
                    className="homeCard"
                    sx={{
                      textAlign: "left",
                      width: 200, 
                      height: 260, 
                      p: 2,
                      bgcolor: cardBg,
                      cursor: "pointer",
                      overflowY: "scroll",
                      "&:hover": {boxShadow: cardHover, }
                    }}
                    onClick={() => navigate(`/update-specific-event/${event.id}`, { state: event })}
                  >
                    <CardContent>
                      
                      <Typography variant="h1" sx={{ color: categoryBtns, fontFamily: "nunito", fontWeight: "bolder", fontSize: 15 }}>
                        {event.title}
                      </Typography>
                      <br />
                        
                      <Typography variant="body1" sx={{ fontSize: 13, fontWeight: "bold", color: accent}}>
                        {new Date(event.event_start_date).toUTCString()}
                      </Typography>
                      <br />
                      
                      <Typography variant="body1" sx={{ fontSize: 13, fontWeight: "regular", color: categoryBtns}}>
                        {event.location}
                      </Typography>
                      <br />
                      
                      <Typography variant="body1" sx={{ fontSize: 13, fontWeight: "bold", color: categoryBtns}}>
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
            })}
          </Box>
        </Grid>
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
      
    </Box>
  )
}

export default OrganizerEvents