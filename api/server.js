const express = require('express');
const axios = require('axios');
const multer = require('multer');
const cors = require('cors');
const FormData = require('form-data');
const { getSlidesFromTranscription } = require('./slideGenerator');

const app = express();
app.use(cors());

// Set up multer for handling file uploads and storing them in memory
const upload = multer({ storage: multer.memoryStorage() });

const WHISPER_API_URL = 'https://api.openai.com/v1/audio/transcriptions';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Add a handler for / for health-check
app.get('/', (req, res) => {
  res.send('Whisper API is running');
});

// Route for handling POST requests to /whisper
app.post('/whisper', upload.single('audio'), async (req, res) => {
  try {
    // Set max file size limits for uploaded files
    const MAX_FILE_SIZE_MB = process.env.MAX_FILE_SIZE_MB || 25;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

    // If the uploaded file is too large, return an error
    if (req.file.size > MAX_FILE_SIZE_BYTES) {
      return res.status(400).json({ error: `File size must be less than ${MAX_FILE_SIZE_MB}MB` });
    }
    //print the length of the file
    console.log(req.file.size);
    // Get the audio file from the request
    const audioFile = req.file.buffer;

    // Create a FormData object to send the audio file to the API
    const formData = new FormData();
    formData.append('file', audioFile, req.file.originalname);
    formData.append('model', 'whisper-1');

    // Send the audio file to the transcription API
    const response = await axios.post(WHISPER_API_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
    });

    // Call the slide generator function to convert the transcription into slides
    const slides = await getSlidesFromTranscription(response.data.text);

    // Return the transcription and generated slides as JSON
    res.json({ transcription: response.data.text, slides: slides });

  } catch (error) {
    console.error('Error getting transcription:', error);
    res.status(500).json({ error: 'Error getting transcription' });
  }
});

const PORT = process.env.PORT || 3001;

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
