import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const GradientBackground = styled('div')({
  minHeight: '100vh',
  background: 'radial-gradient(circle at center, #1e88e5 10%, #42a5f5 40%, #81d4fa 80%)',
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
  const handleUpload = (event) => {
    onUpload(event.target.files[0]);
  };

  return (
    <GradientBackground>
      <Box mb={2}>
        <StyledTypography variant="h3">Audio to Text Converter</StyledTypography>
      </Box>
      <Box mb={4}>
        <StyledTypography variant="h6">
          Upload an audio file and get it transcribed using OpenAI's Whisper API.
        </StyledTypography>
      </Box>
      <Button variant="contained" component="label">
        Upload File
        <input type="file" accept="audio/*" onChange={handleUpload} style={{ display: 'none' }} />
      </Button>
    </GradientBackground>
  );
};

export default LandingPage;
