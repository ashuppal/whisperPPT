import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Transcription = ({ audioFile }) => {
  const [transcription, setTranscription] = useState(null);

  useEffect(() => {
    const getTranscription = async () => {
      try {
        const formData = new FormData();
        formData.append('audio', audioFile);

        const response = await axios.post('http://localhost:3001/whisper', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            
          }
        });

        setTranscription(response.data.transcription);
      } catch (error) {
        console.error('Error getting transcription:', error);
      }
    };

    if (audioFile) {
      getTranscription();
    }
  }, [audioFile]);

  return (
    <div>
      {transcription ? (
        <div>
          <h2>Transcription:</h2>
          <p>{transcription}</p>
        </div>
      ) : (
        <p>Processing your audio file...</p>
      )}
    </div>
  );
};

export default Transcription;
