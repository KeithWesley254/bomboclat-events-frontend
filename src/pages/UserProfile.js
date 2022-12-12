import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import { UserState } from '../UserContext';
import ProfileForm from '../components/ProfileForm';
import UserEvents from './UserEvents';
import OrganizerEvents from './OrganizerEvents';

const UserProfile = () => {
  const [isProfile, setIsProfile] = useState(true);

  const { user, userProfile, setUserProfile } = UserState();

  if (userProfile && userProfile.user_id){
    return (
        <Grid container spacing={2} columns={12}>

          <Grid item xs={12} md={6}>
            {isProfile ?
            (
              <ProfileCard setIsProfile={setIsProfile} userProfile={userProfile}/>
            ) : (
              <ProfileForm user={user} setUserProfile={setUserProfile} setIsProfile={setIsProfile} userProfile={userProfile}/>
            )
            }
            

          </Grid>

          <Grid item xs={12} md={6}>

            {user?.role === ('admin' || 'organizer') &&
            (
              <OrganizerEvents userProfile={userProfile}/>
            ) 
            }
              <UserEvents userProfile={userProfile}/>

          </Grid>

        </Grid>
    )
  } else {
    return (
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
  }
}

export default UserProfile;