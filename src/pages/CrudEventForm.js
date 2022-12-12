import React, { useState, useEffect } from "react";
import { Box, Stepper, Step, Button, Typography, TextField, MenuItem, StepButton, Input, Select, FormControl, InputLabel, FormHelperText, OutlinedInput, Grid, Container, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle, Alert } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeState } from '../ThemeContext';
import { UserState } from '../UserContext';

const steps = ["Main Details", "Pricing", "Misc"];

export default function CreateAnEvent() {
  const { user } = UserState();
  const [categoryData, setCategoryData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [maStory, setMaStory] = useState(false);
  const { state } = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  Date.prototype.toDatetimeLocal =
  function toDatetimeLocal() {
    var
      date = this,
      ten = function (i) {
        return (i < 10 ? '0' : '') + i;
      },
      YYYY = date.getFullYear(),
      MM = ten(date.getMonth() + 1),
      DD = ten(date.getDate()),
      HH = ten(date.getHours()),
      II = ten(date.getMinutes()),
      SS = ten(date.getSeconds())
    ;
    return YYYY + '-' + MM + '-' + DD + 'T' +
             HH + ':' + II + ':' + SS;
  };
  
  const [formData, setFormData] = useState({
    category_id: state?.category_id,
    title: state?.title,
    event_start_date: new Date(state?.event_start_date).toDatetimeLocal(),
    event_end_date: new Date(state?.event_end_date).toDatetimeLocal(),
    ticket_format: state?.ticket_format,
    early_booking_end_date: new Date(state?.early_booking_end_date).toDatetimeLocal(),
    early_booking_price_regular: state?.early_booking_price_regular,
    early_booking_price_vip: state?.early_booking_price_vip,
    location: state?.location,
    regular_price: state?.regular_price,
    vip_price: state?.vip_price,
    vip_no_of_tickets: state?.vip_no_of_tickets,
    regular_no_of_tickets: state?.regular_no_of_tickets,
    description: state?.description,
    banner_img: state?.banner_img,
    image_url1: state?.image_url1,
    image_url2: state?.image_url2,
  });

  const { formBg, bgColor, btnHover, btnColor, btnTextColor, mainHeading, textColor, formAccent, formTextC, } = ThemeState();

  useEffect(() => {
    fetch(`http://localhost:3000/api/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategoryData(data);
        setIsLoading(false);
    });

  }, [state]);

  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep()
        ? 
          steps.findIndex(0)
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  function handleChange(e){
    setFormData({
        ...formData, [e.target.name]: e.target.value,
    });
  }
  
  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));

    fetch(`http://localhost:3000/api/events/${state.id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
            category_id: formData.category_id,
            title: formData.title,
            event_start_date: formData.event_start_date,
            event_end_date: formData.event_end_date,
            ticket_format: formData.ticket_format,
            early_booking_end_date: formData.early_booking_end_date,
            early_booking_price_regular: formData.early_booking_price_regular,
            early_booking_price_vip: formData.early_booking_price_vip,
            location: formData.location,
            regular_price: formData.regular_price,
            vip_price: formData.vip_price,
            vip_no_of_tickets: formData.vip_no_of_tickets,
            regular_no_of_tickets: formData.regular_no_of_tickets,
            description: formData.description,
            banner_img: formData.banner_img,
            image_url1: formData.image_url1,
            image_url2: formData.image_url2,
        })
    }).then((res) => {
      if (res.ok) {
        res.json().then(() => {
          navigate(`/user-profiles/${user.id}`);
          window.location.reload();
        });
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
    }) 
  }
  
  function handleDelete(){
    const token = JSON.parse(localStorage.getItem("token"));

    fetch(`http://localhost:3000/api/events/${state.id}`,{
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    navigate(`/user-profiles/${user.id}`);
    window.location.reload();
  }

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
  );

  return (

    <Grid container spacing={2} sx={{bgcolor: formBg,}} columns={12}>

      <Grid item xs={12} md={12}>
        <Box >
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontWeight: "bolder", color: mainHeading, fontSize: 15 }}>
              <i>Update Your Event</i>
            </h1>
          </div>
        </Box>
      </Grid>

      <Grid item xs={12} md={12}>
        <Box sx={{ width: "100%", height: "100vh" }}>
          
          <Container>

            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={index} >
                    <StepButton sx={{color: textColor, }} onClick={handleStep(index)}>
                      <Typography sx={{color: textColor, }}>
                        {label}
                      </Typography> 
                    </StepButton>
                  </Step>
                ))}
            </Stepper>

          </Container>
              
                  <form>
                    <br />

                    <Box sx={{justifyContent: "center", display: "inline-flex", width: "100%", textAlign: "center"}}>
                    {activeStep === 0 && (
                        
                          <Box sx={{ width: {xs: "80%", md: "35%"}, 
                            '& fieldset.MuiOutlinedInput-notchedOutline': {
                            borderColor: formAccent,
                           }, color: formTextC }}>                           

                              <FormControl fullWidth sx={{ m: 1 }} >
                                <InputLabel sx={{ color: formTextC }} id="outlined-required"><span style={{color: "red"}}>*</span> Event Category</InputLabel>
                                <Select 
                                labelId="EventCategory"
                                defaultValue={formData.category_id}
                                name='category_id'
                                sx={{color: formTextC}}
                                onChange={handleChange}
                                required
                                label="Event Category"
                                >
                                  <MenuItem value="">--Please choose a category--</MenuItem>
                                  {categoryData.map((category) => {
                                    return (
                                      <MenuItem key={category.id} value={category.id}>
                                        {category.title}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                                <FormHelperText sx={{color: formTextC}} id="my-helper-text">Please select a category</FormHelperText>
                              </FormControl>
                              
                              <FormControl fullWidth sx={{ m: 1}}>
                                <InputLabel sx={{color: formAccent}} ><span style={{color: "red"}}>*</span> Event Title</InputLabel>
                                <OutlinedInput sx={{ input: { color: formAccent }, "label": {color: formTextC} }} onChange={handleChange} value={formData.title} name="title" label="Event Title" required placeholder="eg. BDO tournament"/>
                                <FormHelperText sx={{color: formTextC}} id="my-helper-text">Please enter the title of the event</FormHelperText>
                              </FormControl>

                              <FormControl fullWidth sx={{ m: 1}}>
                                <InputLabel sx={{color: formAccent}}><span style={{color: "red"}}>*</span> Location</InputLabel>
                                <OutlinedInput sx={{ input: { color: formAccent }, "label": {color: formTextC} }} name="location" onChange={handleChange} value={formData.location} label="Location" required placeholder="eg. Westlands, Nairobi"/>
                                <FormHelperText sx={{color: formTextC}} id="my-helper-text">Please enter the location of the event</FormHelperText>
                              </FormControl>

                              <FormControl fullWidth sx={{ m: 1}}>
                                <Typography sx={{color: formAccent}}><span style={{color: "red"}}>*</span> Event Start Date</Typography>
                                <Input sx={{ input: { color: formAccent }, "label": {color: formTextC} }} required type='datetime-local' name="event_start_date" onChange={handleChange} value={formData.event_start_date}/>
                              </FormControl>

                              <FormControl fullWidth sx={{ m: 1}}>
                                <Typography sx={{color: formAccent}}><span style={{color: "red"}}>*</span> Event End Date</Typography>
                                <Input sx={{ input: { color: formAccent }, "label": {color: formTextC} }} required type='datetime-local' name="event_end_date" onChange={handleChange} value={formData.event_end_date}/>
                              </FormControl>

                              <FormControl fullWidth sx={{ m: 1}}>
                                <Typography sx={{color: formAccent}}><span style={{color: "red"}}>*</span> Early Booking End Date</Typography>
                                <Input sx={{ input: { color: formAccent }, "label": {color: formTextC} }} required type='datetime-local' name="early_booking_end_date" onChange={handleChange} value={formData.early_booking_end_date}/>
                              </FormControl>
                            
                          </Box>                        
                      )}
                      {activeStep === 1 && (
                        
                          <Box sx={{ width: {xs: "80%", md: "35%"},
                            '& fieldset.MuiOutlinedInput-notchedOutline': {
                              borderColor: formAccent,
                            }, color: formTextC }}>                          

                              <FormControl fullWidth sx={{ m: 1}}>
                                <InputLabel sx={{color: formAccent}}><span style={{color: "red"}}>*</span> Early Regular Booking Ticket Price ($)</InputLabel>
                                <OutlinedInput sx={{ input: { color: formAccent }, "label": {color: formTextC} }} label="Early Regular Booking Ticket Price ($)" required min={0} name="early_booking_price_regular" onChange={handleChange} value={formData.early_booking_price_regular} type='number'/>
                              </FormControl>

                              <FormControl fullWidth sx={{ m: 1}}>
                                <InputLabel sx={{color: formAccent}}><span style={{color: "red"}}>*</span> Early Vip Booking Ticket Price ($)</InputLabel>
                                <OutlinedInput sx={{ input: { color: formAccent }, "label": {color: formTextC} }} label="Early Vip Booking Ticket Price ($)" required min={0} name="early_booking_price_vip" onChange={handleChange} value={formData.early_booking_price_vip} type='number'/>
                              </FormControl>

                              <FormControl fullWidth sx={{ m: 1}}>
                                <InputLabel sx={{color: formAccent}}><span style={{color: "red"}}>*</span> Regular Price ($)</InputLabel>
                                <OutlinedInput sx={{ input: { color: formAccent }, "label": {color: formTextC} }} label="Regular Price ($)" required min={0} name="regular_price" onChange={handleChange} value={formData.regular_price} type='number'/>
                              </FormControl>

                              <FormControl fullWidth sx={{ m: 1}}>
                                <InputLabel sx={{color: formAccent}}><span style={{color: "red"}}>*</span> Vip Price ($)</InputLabel>
                                <OutlinedInput sx={{ input: { color: formAccent }, "label": {color: formTextC} }} label="Vip Price ($)" required min={0} name="vip_price" onChange={handleChange} value={formData.vip_price} type='number'/>
                              </FormControl>

                              <FormControl fullWidth sx={{ m: 1}}>
                                <InputLabel sx={{color: formAccent}}><span style={{color: "red"}}>*</span> Number of Vip Tickets</InputLabel>
                                <OutlinedInput sx={{ input: { color: formAccent }, "label": {color: formTextC} }} label="Number of Vip Tickets" required min={0} name="vip_no_of_tickets" onChange={handleChange} value={formData.vip_no_of_tickets} type='number'/>
                              </FormControl>

                              <FormControl fullWidth sx={{ m: 1}}>
                                <InputLabel sx={{color: formAccent}}><span style={{color: "red"}}>*</span> Number of Regular Tickets</InputLabel>
                                <OutlinedInput sx={{ input: { color: formAccent }, "label": {color: formTextC} }} label="Number of Regular Tickets" required min={0} name="regular_no_of_tickets" onChange={handleChange} value={formData.regular_no_of_tickets} type='number'/>
                              </FormControl>
                          
                          </Box>
                        
                      )}
                      {activeStep === 2 && (
                        
                          <Box sx={{ width: {xs: "80%", md: "35%"}, 
                          '& fieldset.MuiOutlinedInput-notchedOutline': {
                            borderColor: formAccent,
                          }, color: formTextC }}>      

                              <FormControl fullWidth sx={{ m: 1}}>
                                <InputLabel sx={{color: formAccent}}><span style={{color: "red"}}>*</span> Ticket Format</InputLabel>
                                <OutlinedInput sx={{ input: { color: formAccent }, "label": {color: formTextC} }} label="Ticket Format" required name="ticket_format" onChange={handleChange} value={formData.ticket_format} placeholder='eg. BDOTourney' type='text'/>
                              </FormControl>

                              <FormControl fullWidth sx={{ m: 1 }}>
                                <TextField sx={{ input: { color: formAccent }, "label": {color: formTextC} }} inputProps={{ style: { color: formTextC } }} label="Description" required name="description" onChange={handleChange} value={formData.description} multiline={true} rows={4} />
                              </FormControl>

                              <FormControl fullWidth sx={{ m: 1}}>
                                <InputLabel sx={{color: formAccent}}><span style={{color: "red"}}>*</span> Banner Image Url</InputLabel>
                                <OutlinedInput sx={{ input: { color: formAccent }, "label": {color: formTextC} }} label="Banner Image Url" required name="banner_img" onChange={handleChange} value={formData.banner_img} type='text'/>
                              </FormControl>

                              <FormControl fullWidth sx={{ m: 1}}>
                                <InputLabel sx={{color: formAccent}}><span style={{color: "red"}}>*</span> First Event Image Url</InputLabel>
                                <OutlinedInput sx={{ input: { color: formAccent }, "label": {color: formTextC} }} label="First Event Image Url" required name="image_url1" onChange={handleChange} value={formData.image_url1} type='text'/>
                              </FormControl>

                              <FormControl fullWidth sx={{ m: 1}}>
                                <InputLabel sx={{color: formAccent}}><span style={{color: "red"}}>*</span> Second Event Image Url</InputLabel>
                                <OutlinedInput sx={{ input: { color: formAccent }, "label": {color: formTextC} }} label="Second Event Image Url" required name="image_url2" onChange={handleChange} value={formData.image_url2} type='text'/>
                              </FormControl>

                              <Box >
                                <FormControl sx={{ m: 1, width: "50%"}}>
                                  <Button
                                  type='submit'
                                  onClick={(e) => {
                                    handleSubmit(e)
                                  }}
                                  sx={{  
                                    width: "100%",
                                    height: "50%",
                                    backgroundColor: btnColor,
                                    color: btnTextColor,
                                    "&:hover": {backgroundColor: btnHover, }
                                  }}
                                  >
                                    Update
                                  </Button>
                                </FormControl>
                              </Box>
                              <Box >
                                <FormControl sx={{ m: 1, width: "50%"}}>
                                  <Button
                                  onClick={() => {
                                    setMaStory(true)
                                  }}
                                  sx={{  
                                    width: "100%",
                                    height: "50%",
                                    backgroundColor: "red",
                                    color: "#fff",
                                    "&:hover": {backgroundColor: "black", }
                                  }}
                                  >
                                    Delete Event
                                  </Button>
                                </FormControl>
                              </Box>
                              <Dialog 
                              open={maStory}
                              >
                                <Box sx={{bgcolor: bgColor}}>
                                  <DialogTitle sx={{color: "red", textAlign: "center", fontSize: 20}}>
                                    WARNING
                                  </DialogTitle>
                                  <DialogContent>
                                    <DialogContentText sx={{color: textColor}}>
                                      <b>Are You Sure you want to DELETE this event? This Action cannot be undone!</b>
                                    </DialogContentText>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button
                                        onClick={() => {
                                          setMaStory(false)
                                        }}
                                        sx={{  
                                          width: "100%",
                                          height: "50%",
                                          backgroundColor: btnColor,
                                          color: btnTextColor,
                                          "&:hover": {backgroundColor: btnHover, }
                                        }}
                                        >
                                          Go Back
                                    </Button>
                                    <Button
                                      onClick={(e) => {
                                        handleDelete(e)
                                        setMaStory(false)
                                      }}
                                      sx={{  
                                        width: "100%",
                                        height: "50%",
                                        backgroundColor: "red",
                                        color: "#fff",
                                        "&:hover": {backgroundColor: "black", }
                                      }}
                                      >
                                        Delete Event
                                    </Button>
                                  </DialogActions>
                                </Box>
                                
                              </Dialog>
                          </Box>
                        )}
                    </Box>

                    <Grid item xs={12} md={12} sx={{textAlign: "center", width: "100%", pr:4, justifyContent: "center", alignItems: "center", fontSize: 14 }}>
                      <Box sx={{ mr: 1, ml: 1, maxHeight: 400, gap: 1, justifyContent: "center", flexWrap: "wrap", display: "inline-flex", flexDirection: 'row', overflowX: "auto" }}>
                        {errors.map((err) => (
                        <div key={err}>
                            <Alert severity="error" sx={{ width: '100%', }}>
                              {err}
                            </Alert>
                        </div>
                        ))}
                      </Box>
                    </Grid>

                  </form>
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Button
                      onClick={handleBack}
                      sx={{ 
                        width: "10%",
                        mx: 4,
                        height: "50%",
                        my: 3,
                        backgroundColor: btnColor,
                        color: btnTextColor,
                        "&:hover": {backgroundColor: btnHover, }
                      }}
                    >
                      Back
                    </Button>
                    
                    <Button onClick={handleNext} 
                    variant="outlined"
                      sx={{ 
                        width: "10%",
                        mx: 4,
                        height: "50%",
                        my: 3,
                        backgroundColor: btnColor,
                        color: btnTextColor,
                        "&:hover": {backgroundColor: btnHover, }
                      }}>
                      Next
                    </Button>
                  </Box>
        </Box>

      </Grid>

    </Grid>
       
  );
}
