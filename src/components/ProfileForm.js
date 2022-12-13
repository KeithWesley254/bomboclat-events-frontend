import { Box, Button, Card, CardActions, CardContent, FormControl, FormControlLabel, FormHelperText, Grid, OutlinedInput, Radio, RadioGroup, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { ThemeState } from '../ThemeContext';
import PhoneInput from 'react-phone-number-input';

const ProfileForm = ({ setIsProfile, user, userProfile, setUserProfile }) => {
  const { btnColor, btnTextColor, btnHover, cardBg, cardHover, formAccent, formTextC, textColor } = ThemeState();
  const nameRef = useRef();
  const ageRef = useRef();
  const bioRef = useRef();

  const [imgsUpload, setImgsUpload] = useState({});

  useEffect(() => {
    const fileUpload = document.getElementById('image_upload');

    const myImage = new File([userProfile?.the_blob], userProfile?.full_name, {
      type: "image/jpeg",
      lastModified: new Date(),
    });

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(myImage);
    fileUpload.files = dataTransfer.files;

    setImgsUpload({image_upload: dataTransfer.files[0]})

  }, [])

  const [formData, setFormData] = useState({
    full_name: userProfile?.full_name,
    age: userProfile?.age,
    gender: userProfile?.gender,
    bio: userProfile?.bio,
    mobile_no: userProfile?.mobile_no,
    image_upload: userProfile?.image_upload
  })

  function handleImages(e){
    setImgsUpload({
      ...imgsUpload, [e.target.name]: e.target.files[0],
    });
  }

  function handleSubmit(e){
    e.preventDefault();
    const data = new FormData();
    
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key])
    });

    Object.keys(imgsUpload).forEach(key => {
      data.append(key, imgsUpload[key])
    });
    
    submitToApi(data);
  }

  function submitToApi(data){

    const token = JSON.parse(localStorage.getItem("token"));

    fetch(`http://localhost:3000/api/user_profiles/${user?.id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "PATCH",
        body: data
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setUserProfile(data)
          setIsProfile(true)
        });
      }})
  }

  const radios = ["male", "female", "other"]

  return (
    <Grid container spacing={2} columns={12}>
      <Grid item xs={12} md={12}>
        <Box sx={{display: "flex", justifyContent: "center"}}>
          <Card
            sx={{
              mt: 15,
              width: {md: "60%", xs: "90%"},
              height: 500,
              textAlign: "center",
              bgcolor: cardBg,
              cursor: "pointer",
              overflowY: "scroll",
              "&:hover": {boxShadow: cardHover, }
            }}
            className="homeCard"
          >
            <CardContent>
              <form>
                <Box sx={{ width: {xs: "100%", md: "100%"}, 
                '& fieldset.MuiOutlinedInput-notchedOutline': {
                borderColor: formAccent,
                }, color: formTextC, }}>

                  <FormControl fullWidth sx={{ mb: 1}}>
                    <OutlinedInput defaultValue={userProfile?.full_name} inputRef={nameRef} onChange={() => setFormData({...formData, full_name: nameRef.current.value})} size="small" sx={{ input: { color: formAccent }, "label": {color: formTextC} }} name="full_name" />
                    <FormHelperText sx={{color: formTextC}} id="my-helper-text">Please enter your full name</FormHelperText>
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 1}}>
                    <OutlinedInput defaultValue={userProfile?.age} inputRef={ageRef} onChange={() => setFormData({...formData, age: ageRef.current.value})} size="small" type="number" sx={{ input: { color: formAccent }, "label": {color: formTextC} }} name="age" />
                    <FormHelperText sx={{color: formTextC}} id="my-helper-text">Please enter your age</FormHelperText>
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 1}}>
                    <RadioGroup
                      name="gender"
                      defaultValue={userProfile?.gender}
                      onChange={(e) => { 
                        setFormData({...formData, gender: e.target.value})
                      }}
                      sx={{ input: { color: formAccent }, "label": {color: formTextC}, 
                    }}
                    size="small"
                    
                    >
                      {radios.map((radio) => {
                        return (
                          <FormControlLabel key={radio} value={radio} control={<Radio sx={{ '&, &.Mui-checked': { color: textColor} }}/>} label={(radio).charAt(0).toUpperCase() + radio.slice(1)} />
                        )
                      })}
                      
                    </RadioGroup>
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 1}}>
                  <PhoneInput
                  international
                  defaultCountry="KE"
                  style={{marginBottom: 2, height: 50, width: "60%"}}
                  value={formData.mobile_no}
                  onChange={(value) => setFormData({...formData, mobile_no: value})}
                  />
                    <FormHelperText sx={{color: formTextC}} id="my-helper-text">Please enter your phone number</FormHelperText>
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 1}}>
                    <TextField defaultValue={userProfile?.bio} size="small" sx={{ input: { color: formAccent }, "label": {color: formTextC} }} inputProps={{ style: { color: formTextC } }} label="Bio" name="bio" inputRef={bioRef} onChange={() => setFormData({...formData, bio: bioRef.current.value})} multiline={true} rows={4} />
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 1, mt: 1}}>
                    <input type="file" accept='image/*' onChange={handleImages} name="image_upload" id="image_upload" />
                    <FormHelperText sx={{color: formTextC}} id="my-helper-text">Upload your image</FormHelperText>
                  </FormControl>

                </Box>

              </form>
            </CardContent>
            
            <CardActions sx={{ display: "flex", justifyContent: "start" }}>
              <Button
              sx={{
                  color: btnTextColor,
                  backgroundColor: btnColor,
                  "&:hover": {backgroundColor: btnHover, }
              }}
              onClick={() => {
                  setIsProfile(true)
              }}
              >
                  Close
              </Button>
              <Button
              sx={{
                  color: btnTextColor,
                  backgroundColor: btnColor,
                  "&:hover": {backgroundColor: btnHover, }
              }}
              onClick={(e) => {
                handleSubmit(e)     
              }}
              >
                  Save
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Grid>      
    </Grid>
  )
}

export default ProfileForm