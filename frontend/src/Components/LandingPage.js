import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const GradientBackground = styled('div')({
  minHeight: '60vh',
  background: 'linear-gradient(to bottom, #1e3c72, #2a5298)',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
});

const StyledTypography = styled(Typography)({
  color: '#ffffff',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  fontWeight: 500,
});



const LandingPage = ({ onUpload }) => {
  return (
    <GradientBackground>
      <Box sx={{ p: 2 }}>
        <StyledTypography variant="h2" sx={{ mb: 2 }}>
         AudioSpark 🎤
        </StyledTypography>
        <StyledTypography variant="body1" sx={{ mb: 2 }}>
          Ignite your presentations! 🔥
        </StyledTypography> 
        <Button variant="contained" component="label" sx={{ mb: 2, background: 'linear-gradient(45deg, #ff7300, #fffb00 #48ff00, #002bff,#ff00c8' }}   >
          Upload an Audio File
          <input type="file" accept="audio/*" hidden onChange={onUpload} />
        </Button>
      </Box>
    </GradientBackground>
  );
};

export default LandingPage;

