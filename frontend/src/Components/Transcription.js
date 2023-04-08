import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { saveAs } from 'file-saver';
import PptxGenJS from 'pptxgenjs';

const Transcription = ({ audioFile }) => {
  const [transcription, setTranscription] = useState(null);
  //const [slides, setSlides] = useState(null);

  const generatePPT = (slides) => {
    const pptx = new PptxGenJS();
  
    slides.forEach((slideData) => {
      const slide = pptx.addSlide();
      slide.addText(slideData.Header, { x: 1, y: 1, w: 8, h: 1, fontSize: 24, bold: true });
  
      slideData.BulletPoints.forEach((bulletPoint, index) => {
        slide.addText(bulletPoint, { x: 1, y: 1.5 + index * 0.5, w: 8, h: 0.5, fontSize: 14, bullet: true });
      });
    });
  
    pptx.writeFile('Generated_Presentation.pptx');
  };
  
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
        generatePPT(response.data.slides); // Generate PowerPoint presentation from the slides
      } catch (error) {
        console.error('Error getting transcription:', error);
      }
    };
  
    if (audioFile) {
      getTranscription();
    }
  }, [audioFile]);
  
  // const savePPT = (pptBlob) => {
  //   const blob = new Blob([pptBlob], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });
  //   saveAs(blob, 'generated_presentation.pptx');
  // };

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
