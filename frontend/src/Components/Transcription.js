
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PptxGenJS from 'pptxgenjs';


const Transcription = ({ audioFile }) => {
  const [transcription, setTranscription] = useState(null);

  // Function to generate a PowerPoint presentation from an array of slides
  const generatePPT = (slides) => {
    const pptx = new PptxGenJS(); // Create a new PowerPoint object
  
    slides.forEach((slideData) => {
      const slide = pptx.addSlide(); // Add a new slide to the presentation
      // Add the slide header as a text object
      slide.addText(slideData.Header, { x: 1, y: 1, w: 8, h: 1, fontSize: 24, bold: true });
  
      // Add the bullet points as text objects
      slideData.BulletPoints.forEach((bulletPoint, index) => {
        slide.addText(bulletPoint, { x: 1, y: 1.5 + index * 0.5, w: 8, h: 0.5, fontSize: 14, bullet: true });
      });
    });
  
    // Save the generated PowerPoint presentation as a file
    pptx.writeFile('Generated_Presentation.pptx');
  };
  
  // useEffect hook to handle side effect of getting transcription when audioFile is updated
  useEffect(() => {
    let isMounted = true;

    if (!audioFile) return;

    const getTranscription = async () => {
      try {
        const formData = new FormData();
        formData.append('audio', audioFile);
  
        const response = await axios.post('http://localhost:3001/whisper', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });

        if (isMounted && !transcription) {
       
          setTranscription(response.data.transcription);
          generatePPT(response.data.slides);
        }
      } catch (error) {
        console.error('Error getting transcription:', error);
      }
    };

    getTranscription();

    // Clean up function
    return () => {
      isMounted = false;
    };

  }, [audioFile, transcription]);
 
  return (
    <div>
      {transcription ? (
        // Show the transcription when it's available
        <div>
          <h2>Transcription:</h2>
          <p>{transcription}</p>
        </div>
      ) : (
        // Show a processing message while waiting for the transcription
        <p>Processing your audio file...</p>
      )}
    </div>
  );
};

export default Transcription;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import PptxGenJS from 'pptxgenjs';


// const Transcription = ({ audioFile }) => {
//   const [transcription, setTranscription] = useState(null);

//   // Function to generate a PowerPoint presentation from an array of slides
//   const generatePPT = (slides) => {
//     const pptx = new PptxGenJS(); // Create a new PowerPoint object
  
//     slides.forEach((slideData) => {
//       const slide = pptx.addSlide(); // Add a new slide to the presentation
//       // Add the slide header as a text object
//       slide.addText(slideData.Header, { x: 1, y: 1, w: 8, h: 1, fontSize: 24, bold: true });
  
//       // Add the bullet points as text objects
//       slideData.BulletPoints.forEach((bulletPoint, index) => {
//         slide.addText(bulletPoint, { x: 1, y: 1.5 + index * 0.5, w: 8, h: 0.5, fontSize: 14, bullet: true });
//       });
//     });
  
//     // Save the generated PowerPoint presentation as a file
//     pptx.writeFile('Generated_Presentation.pptx');
//   };
  
//   // useEffect hook to handle side effect of getting transcription when audioFile is updated
//   useEffect(() => {
//     if (!audioFile) return;
  
//     const getTranscription = async () => {
//       try {
//         const formData = new FormData();
//         formData.append('audio', audioFile);
  
//         const response = await axios.post('http://localhost:3001/whisper', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           }
//         });
  
//         if (!transcription) {
//           // log the transcription
//           console.log(response.data.transcription);
//           console.log(audioFile);
//           setTranscription(response.data.transcription);
//           generatePPT(response.data.slides);
//         }
//       } catch (error) {
//         console.error('Error getting transcription:', error);
//       }
//     };
  
//     getTranscription();
//   }, [audioFile, transcription]);
 


//   return (
//     <div>
//       {transcription ? (
//         // Show the transcription when it's available
//         <div>
//           <h2>Transcription:</h2>
//           <p>{transcription}</p>
//         </div>
//       ) : (
//         // Show a processing message while waiting for the transcription
//         <p>Processing your audio file...</p>
//       )}
//     </div>
//   );
// };

// export default Transcription;
