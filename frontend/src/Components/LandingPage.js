import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const GradientBackground = styled('div')({
  minHeight: '70vh',
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
        <Button variant="contained" component="label" sx={{ mb: 2 }}>
          Upload File
          <input type="file" accept="audio/*" hidden onChange={onUpload} />
        </Button>
      </Box>
    </GradientBackground>
  );
};

export default LandingPage;


// import React from 'react';
// import { Typography, Box, Button } from '@mui/material';

// const LandingPage = ({ onUpload }) => {
//   return (
//     <Box height="60vh" display="flex" alignItems="center" justifyContent="center">
//       <Box maxWidth={400} textAlign="center" p={4}>
//         <Typography variant="h3" gutterBottom>
//           Audio to Text Converter
//         </Typography>
//         <Typography variant="subtitle1" color="textSecondary" gutterBottom>
//           Upload an audio file and get it transcribed using OpenAI's Whisper API.
//         </Typography>
//         <Button variant="contained" component="label">
//           Upload File
//           <input type="file" accept="audio/*" hidden onChange={onUpload} />
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default LandingPage;





// import React from 'react';

// const LandingPage = ({ onUpload }) => {
//   return (
//     <div>
//       <h1>Audio to Text Converter</h1>
//       <p>Upload an audio file and get it transcribed using OpenAI's Whisper API.</p>
//       <input type="file" accept="audio/*" onChange={onUpload} />
//     </div>
//   );
// };

// export default LandingPage;
