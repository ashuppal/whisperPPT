import React from 'react';

const LandingPage = ({ onUpload }) => {
  return (
    <div>
      <h1>Audio to Text Converter</h1>
      <p>Upload an audio file and get it transcribed using OpenAI's Whisper API.</p>
      <input type="file" accept="audio/*" onChange={onUpload} />
    </div>
  );
};

export default LandingPage;
