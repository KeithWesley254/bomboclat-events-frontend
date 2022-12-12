import { Alert, Box, Button, FormControl, FormHelperText, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { ThemeState } from '../ThemeContext';
import { UserState } from '../UserContext';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { errors, isLoading, handleSubmitLogin} = UserState();
  const { btnHover, btnColor, subTitles, btnTextColor, mainHeading, formAccent, formTextC, } = ThemeState();

  const { state } = useLocation();

  function handleSubmit(e){
    const data = {
      email,
      password
    }
    handleSubmitLogin(e, data, state)
  }

  return (
    <>
      <Box>
        <main>
        <form onSubmit = {handleSubmit}>
          <p style={{fontWeight: "bolder", color: mainHeading, fontSize: 60}}>Login</p>
          <p style={{fontWeight: "bold", color: subTitles, fontSize: 14}}>Sign in with the data you entered during your registration</p>
          <Box sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },
          '& fieldset.MuiOutlinedInput-notchedOutline': {
            borderColor: formAccent,
           }, color: formTextC
          }}>
          
            <div>
              
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
            </div>
          </Box>
          
          <br />
          <br />
          <div>
            <FormControl sx={{width: "50%"}}>
              <Button 
              sx={{ 
                width: "100%",
                height: "50%",
                backgroundColor: btnColor,
                color: btnTextColor,
                "&:hover": {backgroundColor: btnHover, }
              }}
              type="submit"
              >
                {isLoading ? "Loading..." : "Login"}
              </Button>
              <br />
            </FormControl>  
            <div>
              {errors.map((err) => (
              <div key={err}>
                <Alert key={err} severity="error" sx={{ width: '100%' }}>
                  {err}
                </Alert>
              </div>
              ))}
            </div>       
          </div>
          </form>
        </main>
      </Box>
    </>
  )
}

export default LoginForm;