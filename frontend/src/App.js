import React, { useState } from 'react';
import LandingPage from './Components/LandingPage';
import Transcription from './Components/Transcription';
import Footer from './Components/Footer';
import PageContainer from './Components/PageContainer';
// import { Container } from '@mui/material';

function App() {
  const [audioFile, setAudioFile] = useState(null);

  const handleFileUpload = (event) => {
    setAudioFile(event.target.files[0]);
  };

  return (
    <div>
  
    <PageContainer>
      <LandingPage onUpload={handleFileUpload} />
      {audioFile && <Transcription audioFile={audioFile} />}
      <Footer />
    </PageContainer>
    </div>
  );
}

export default App;
