import { Box, Card, CardContent, CardMedia, Grid, Pagination, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeState } from "../ThemeContext";

const HomePageEvents = ({ events }) => {
  const filteredDates = events.filter((event) => parseInt(event.time_diff) > 0);
  const [eventPage, setEventPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { cardBg, formAccent, formTextC, accent, categoryBtns, cardHover } = ThemeState();

  function handleSearch(){
    return filteredDates.filter((event) => 
        event.title.toLowerCase().includes(search)
    )
  }

  return (
    <div
      style={{
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 20,
        gap: 20,
        justifyContent: "center",
        flexWrap: "wrap",
        display: "inline-flex",
        flexDirection: "row",
      }}
    >
      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} md={12}>
          <Box sx={{ display: "flex", justifyContent: "center",
          '& fieldset.MuiOutlinedInput-notchedOutline': {
            borderColor: formAccent,
          }, color: formTextC
          }}>
            <TextField 
            label="First page full search..."
            sx={{ input: { color: formAccent }, "label": {color: formTextC}, mb: 2, width: "70%", borderRadius: 20 }}
            onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
            />
          </Box>
        </Grid>
      </Grid>

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
      })}

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
    </div>
  );
};

export default HomePageEvents;
