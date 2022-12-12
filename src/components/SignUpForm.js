import React, { useState } from 'react';
import { Grid, Box, FormControl, FormHelperText, TextField, Alert, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { ThemeState } from '../ThemeContext';
import { UserState } from '../UserContext';

const SignUpForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { errors, isLoading, handleSubmitSignUp} = UserState();
  const { btnHover, btnColor, subTitles, btnTextColor, mainHeading, formAccent, formTextC, } = ThemeState();
  
  const { state } = useLocation();

  function handleSubmit(e){
    const data = {
      email,
      password,
      password_confirmation: passwordConfirmation,
    }
    handleSubmitSignUp(e, data, state)
  }

  return (
   <Box>
    <p style={{fontWeight: "bolder", color: mainHeading, fontSize: 50}}>Sign Up</p>
    <p style={{fontWeight: "bold", color: subTitles, fontSize: 14}}>Join us to add your own events and participate</p>
      <Box sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },
      '& fieldset.MuiOutlinedInput-notchedOutline': {
        borderColor: formAccent,
       }, color: formTextC
      }}>
        <form  onSubmit={handleSubmit}>
          <Box>
            <Grid container spacing={2} columns={12}>
               <Grid item xs={12} md={6}>

              <FormControl>
                <TextField 
                type="email"
                variant="outlined"
                label="Email"
                id="email"
                autoComplete="on"
                value={email}
                sx={{ input: { color: formAccent }, "label": {color: formTextC} }}
                onChange={(e) => setEmail(e.target.value)} 
                />
                <FormHelperText sx={{color: formTextC}} id="my-helper-text">name@example.com</FormHelperText>
              </FormControl>
              <br />
              <FormControl>
                <TextField 
                type="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                value={password}
                sx={{ input: { color: formAccent }, "label": {color: formTextC} }}
                onChange={(e) => setPassword(e.target.value)}
                />
                <FormHelperText sx={{color: formTextC}} id="my-helper-text">min. 8 characters</FormHelperText>
              </FormControl>
              <br />
              <FormControl>
                <TextField 
                type="password"
                label="Password Confirmation"
                id="passwordConfirmation"
                autoComplete="current-password"
                value={passwordConfirmation}
                sx={{ input: { color: formAccent }, "label": {color: formTextC} }}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                <FormHelperText sx={{color: formTextC}} id="my-helper-text">Please Confirm Your Password</FormHelperText>
              </FormControl>
               </Grid>
            </Grid>
            <div>
              <div>
                <FormControl sx={{width: "50%"}}>
                  <Button 
                  sx={{ 
                    width: "100%",
                    height: "50%",
                    my: 2,
                    backgroundColor: btnColor,
                    color: btnTextColor,
                    "&:hover": {backgroundColor: btnHover, }
                  }}
                  type='submit'
                  >
                    {isLoading ? "Loading..." : "Sign Up"}
                  </Button>
                </FormControl>
                <div>
                  {errors.map((err) => (
                  <div key={err}>
                      <Alert severity="error" sx={{ width: '100%' }}>
                        {err}
                      </Alert>
                  </div>
                  ))}
                </div>
              </div>
            </div>
            </Box>
          </form>
      </Box>
   </Box>
  )
}

export default SignUpForm;