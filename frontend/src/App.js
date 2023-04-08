import React, { useState } from 'react';
import LandingPage from './Components/LandingPage';
import Transcription from './Components/Transcription';
//import Footer from './Components/Footer';

function App() {
  const [audioFile, setAudioFile] = useState(null);

  const handleFileUpload = (event) => {
    setAudioFile(event.target.files[0]);
  };

  return (
    <div>
      <LandingPage onUpload={handleFileUpload} />
      {audioFile && <Transcription audioFile={audioFile} />}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
