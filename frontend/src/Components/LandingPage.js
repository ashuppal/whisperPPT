import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import MainContent from './MainContent';

const GradientBackground = styled('div')({
  minHeight: '60vh',
  background: 'offwhite',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
});

const StyledTypography = styled(Typography)({
    fontFamily: 'Righteous, sans-serif',
    background: 'linear-gradient(135deg, #FFCC33 0%, #E233FF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 500,
});

const StyledIconTypography = styled(Typography)({
  fontFamily: 'Righteous, sans-serif',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  fontWeight: 500,
});

const LandingPage = ({ onUpload }) => {
  return (
    <MainContent> 
    <GradientBackground>
      <Box sx={{ p: 2 }}>
        <StyledTypography variant="h2" sx={{ mb: 2, display: 'inline' }}>
          AudioSpark
        </StyledTypography>
        <StyledIconTypography variant="h2" sx={{ mb: 2, display: 'inline' }}>
          {' '}
          🎤
        </StyledIconTypography>
        <h2 fontFamily = 'Righteous'>
        Ignite your presentations! 🔥
        </h2>
        <Button
          variant="contained"
          
          component="label"
          sx={{
            mb: 2,
            background: 'linear-gradient(135deg, #FFCC33 0%, #E233FF 100%)'
           
          }}
        >
          Upload an Audio File
          <input type="file" accept="audio/*" hidden onChange={onUpload} />
        </Button>
        <h5>Instantly generate and download your PPT by simply uploading your audio file and letting our AI do the work!</h5>
      </Box>
    </GradientBackground>
    </MainContent>
  );
};

export default LandingPage;
