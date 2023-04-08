import React from 'react';
import { Typography, Box } from '@mui/material';

const AboutPage = () => {
  return (
    <Box mt={4}>
      <Typography variant="h4">About</Typography>
      <Typography variant="body1">
        This application uses OpenAI's Whisper API to convert audio files into text. After transcribing the audio, it
        generates a PowerPoint presentation based on the content of the transcription.
      </Typography>
    </Box>
  );
};

export default AboutPage;
