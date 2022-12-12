import React, { useState, useEffect } from "react";
import { Box, Stepper, Step, Button, Typography, TextField, MenuItem, StepButton, Input, Select, FormControl, InputLabel, FormHelperText, OutlinedInput, Grid, Container, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeState } from "../ThemeContext";
import { UserState } from "../UserContext";

const steps = ["Main Details", "Pricing", "Misc"];

export default function CreateAnEvent() {
  const { user } = UserState();
  const [categoryData, setCategoryData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    category_id: "",
    title: "",
    event_start_date: "",
    event_end_date: "",
    ticket_format: "",
    early_booking_end_date: "",
    early_booking_price_regular: "",
    early_booking_price_vip: "",
    location: "",
    regular_price: "",
    vip_price: "",
    vip_no_of_tickets: "",
    regular_no_of_tickets: "",
    description: "",
    banner_img: "",
    image_url1: "",
    image_url2: "",
    user_id: user.id,
  });

  const {
    formBg,
    btnHover,
    btnColor,
    btnTextColor,
    mainHeading,
    textColor,
    formAccent,
    formTextC,
  } = ThemeState();

  useEffect(() => {
    fetch(`http://localhost:3000/api/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategoryData(data);
      });
  }, []);

  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep = isLastStep() ? steps.findIndex(0) : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    submitToApi(data);
  }

  function submitToApi(data) {
    const token = JSON.parse(localStorage.getItem("token"));

    fetch(`https://events-bomboclat-api.herokuapp.com/api/events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: data,
    }).then((res) => {
      if (res.ok) {
        res.json().then(() => {
          navigate("/");
        });
      } else {
        res.json().then((err) => setErrors(err.errors));
      }
    }) 
  }

  return (
    <Grid container spacing={2} sx={{ bgcolor: formBg }} columns={12}>
      <Grid item xs={12} md={12}>
        <Box>
          <div style={{ textAlign: "center" }}>
            <h1
              style={{ fontWeight: "bolder", color: mainHeading, fontSize: 15 }}
            >
              <i>Register your Event</i>
            </h1>
          </div>
        </Box>
      </Grid>

      <Grid item xs={12} md={12}>
        <Box sx={{ width: "100%", height: "100vh" }}>
          <Container>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepButton
                    sx={{ color: textColor }}
                    onClick={handleStep(index)}
                  >
                    <Typography sx={{ color: textColor }}>{label}</Typography>
                  </StepButton>
                </Step>
              ))}
            </Stepper>
          </Container>

          <form>
            <br />

            <Box
              sx={{
                justifyContent: "center",
                display: "inline-flex",
                width: "100%",
                textAlign: "center",
              }}
            >
              {activeStep === 0 && (
                <Box
                  sx={{
                    width: { xs: "80%", md: "35%" },
                    "& fieldset.MuiOutlinedInput-notchedOutline": {
                      borderColor: formAccent,
                    },
                    color: formTextC,
                  }}
                >
                  <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel
                      sx={{ color: formTextC }}
                      id="outlined-required"
                    >
                      <span style={{ color: "red" }}>*</span> Event Category
                    </InputLabel>
                    <Select
                      labelId="EventCategory"
                      name="category_id"
                      sx={{ color: formTextC }}
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
                    <FormHelperText
                      sx={{ color: formTextC }}
                      id="my-helper-text"
                    >
                      Please select a category
                    </FormHelperText>
                  </FormControl>

                  <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel sx={{ color: formAccent }}>
                      <span style={{ color: "red" }}>*</span> Event Title
                    </InputLabel>
                    <OutlinedInput
                      sx={{
                        input: { color: formAccent },
                        label: { color: formTextC },
                      }}
                      onChange={handleChange}
                      value={formData.title}
                      name="title"
                      label="Event Title"
                      required
                      placeholder="eg. BDO tournament"
                    />
                    <FormHelperText
                      sx={{ color: formTextC }}
                      id="my-helper-text"
                    >
                      Please enter the title of the event
                    </FormHelperText>
                  </FormControl>

                  <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel sx={{ color: formAccent }}>
                      <span style={{ color: "red" }}>*</span> Location
                    </InputLabel>
                    <OutlinedInput
                      sx={{
                        input: { color: formAccent },
                        label: { color: formTextC },
                      }}
                      name="location"
                      onChange={handleChange}
                      value={formData.location}
                      label="Location"
                      required
                      placeholder="eg. Westlands, Nairobi"
                    />
                    <FormHelperText
                      sx={{ color: formTextC }}
                      id="my-helper-text"
                    >
                      Please enter the location of the event
                    </FormHelperText>
                  </FormControl>

                  <FormControl fullWidth sx={{ m: 1 }}>
                    <Typography sx={{ color: formAccent }}>
                      <span style={{ color: "red" }}>*</span> Event Start Date
                    </Typography>
                    <Input
                      sx={{
                        input: { color: formAccent },
                        label: { color: formTextC },
                      }}
                      required
                      type="datetime-local"
                      name="event_start_date"
                      onChange={handleChange}
                      value={formData.event_start_date}
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ m: 1 }}>
                    <Typography sx={{ color: formAccent }}>
                      <span style={{ color: "red" }}>*</span> Event End Date
                    </Typography>
                    <Input
                      sx={{
                        input: { color: formAccent },
                        label: { color: formTextC },
                      }}
                      required
                      type="datetime-local"
                      name="event_end_date"
                      onChange={handleChange}
                      value={formData.event_end_date}
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ m: 1 }}>
                    <Typography sx={{ color: formAccent }}>
                      <span style={{ color: "red" }}>*</span> Early Booking End
                      Date
                    </Typography>
                    <Input
                      sx={{
                        input: { color: formAccent },
                        label: { color: formTextC },
                      }}
                      required
                      type="datetime-local"
                      name="early_booking_end_date"
                      onChange={handleChange}
                      value={formData.early_booking_end_date}
                    />
                  </FormControl>
                </Box>
              )}
              {activeStep === 1 && (
                <Box
                  sx={{
                    width: { xs: "80%", md: "35%" },
                    "& fieldset.MuiOutlinedInput-notchedOutline": {
                      borderColor: formAccent,
                    },
                    color: formTextC,
                  }}
                >
                  <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel sx={{ color: formAccent }}>
                      <span style={{ color: "red" }}>*</span> Early Regular
                      Booking Ticket Price ($)
                    </InputLabel>
                    <OutlinedInput
                      sx={{
                        input: { color: formAccent },
                        label: { color: formTextC },
                      }}
                      label="Early Regular Booking Ticket Price ($)"
                      required
                      min={0}
                      name="early_booking_price_regular"
                      onChange={handleChange}
                      value={formData.early_booking_price_regular}
                      type="number"
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel sx={{ color: formAccent }}>
                      <span style={{ color: "red" }}>*</span> Early Vip Booking
                      Ticket Price ($)
                    </InputLabel>
                    <OutlinedInput
                      sx={{
                        input: { color: formAccent },
                        label: { color: formTextC },
                      }}
                      label="Early Vip Booking Ticket Price ($)"
                      required
                      min={0}
                      name="early_booking_price_vip"
                      onChange={handleChange}
                      value={formData.early_booking_price_vip}
                      type="number"
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel sx={{ color: formAccent }}>
                      <span style={{ color: "red" }}>*</span> Regular Price ($)
                    </InputLabel>
                    <OutlinedInput
                      sx={{
                        input: { color: formAccent },
                        label: { color: formTextC },
                      }}
                      label="Regular Price ($)"
                      required
                      min={0}
                      name="regular_price"
                      onChange={handleChange}
                      value={formData.regular_price}
                      type="number"
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel sx={{ color: formAccent }}>
                      <span style={{ color: "red" }}>*</span> Vip Price ($)
                    </InputLabel>
                    <OutlinedInput
                      sx={{
                        input: { color: formAccent },
                        label: { color: formTextC },
                      }}
                      label="Vip Price ($)"
                      required
                      min={0}
                      name="vip_price"
                      onChange={handleChange}
                      value={formData.vip_price}
                      type="number"
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel sx={{ color: formAccent }}>
                      <span style={{ color: "red" }}>*</span> Number of Vip
                      Tickets
                    </InputLabel>
                    <OutlinedInput
                      sx={{
                        input: { color: formAccent },
                        label: { color: formTextC },
                      }}
                      label="Number of Vip Tickets"
                      required
                      min={0}
                      name="vip_no_of_tickets"
                      onChange={handleChange}
                      value={formData.vip_no_of_tickets}
                      type="number"
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel sx={{ color: formAccent }}>
                      <span style={{ color: "red" }}>*</span> Number of Regular
                      Tickets
                    </InputLabel>
                    <OutlinedInput
                      sx={{
                        input: { color: formAccent },
                        label: { color: formTextC },
                      }}
                      label="Number of Regular Tickets"
                      required
                      min={0}
                      name="regular_no_of_tickets"
                      onChange={handleChange}
                      value={formData.regular_no_of_tickets}
                      type="number"
                    />
                  </FormControl>
                </Box>
              )}
              {activeStep === 2 && (
                <Box
                  sx={{
                    width: { xs: "80%", md: "35%" },
                    "& fieldset.MuiOutlinedInput-notchedOutline": {
                      borderColor: formAccent,
                    },
                    color: formTextC,
                  }}
                >
                  <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel sx={{ color: formAccent }}>
                      <span style={{ color: "red" }}>*</span> Ticket Format
                    </InputLabel>
                    <OutlinedInput
                      sx={{
                        input: { color: formAccent },
                        label: { color: formTextC },
                      }}
                      label="Ticket Format"
                      required
                      name="ticket_format"
                      onChange={handleChange}
                      value={formData.ticket_format}
                      placeholder="eg. BDOTourney"
                      type="text"
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField
                      sx={{
                        input: { color: formAccent },
                        label: { color: formTextC },
                      }}
                      inputProps={{ style: { color: formTextC } }}
                      label="Description"
                      required
                      name="description"
                      onChange={handleChange}
                      value={formData.description}
                      multiline={true}
                      rows={4}
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel sx={{ color: formAccent }}>
                      <span style={{ color: "red" }}>*</span> Banner Image Url
                    </InputLabel>
                    <OutlinedInput
                      sx={{
                        input: { color: formAccent },
                        label: { color: formTextC },
                      }}
                      label="Banner Image Url"
                      required
                      name="banner_img"
                      onChange={handleChange}
                      value={formData.banner_img}
                      type="text"
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel sx={{ color: formAccent }}>
                      <span style={{ color: "red" }}>*</span> First Event Image
                      Url
                    </InputLabel>
                    <OutlinedInput
                      sx={{
                        input: { color: formAccent },
                        label: { color: formTextC },
                      }}
                      label="First Event Image Url"
                      required
                      name="image_url1"
                      onChange={handleChange}
                      value={formData.image_url1}
                      type="text"
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel sx={{ color: formAccent }}>
                      <span style={{ color: "red" }}>*</span> Second Event Image
                      Url
                    </InputLabel>
                    <OutlinedInput
                      sx={{
                        input: { color: formAccent },
                        label: { color: formTextC },
                      }}
                      label="Second Event Image Url"
                      required
                      name="image_url2"
                      onChange={handleChange}
                      value={formData.image_url2}
                      type="text"
                    />
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
                                    Submit
                                  </Button>
                                </FormControl>
                              </Box>
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
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      onClick={handleBack}
                      sx={{ 
                        width: "20%",
                        height: "50%",
                        mr: 4,
                        ml: 4,
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
                        width: "20%",
                        height: "50%",
                        mr: 4,
                        ml: 4,
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
