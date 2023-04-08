const express = require('express');
const axios = require('axios');
const multer = require('multer');
const cors = require('cors');
const FormData = require('form-data');
const { getSlidesFromTranscription } = require('./slideGenerator');


const app = express();
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

const WHISPER_API_URL = 'https://api.openai.com/v1/audio/transcriptions';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


app.post('/whisper', upload.single('audio'), async (req, res) => {
  try {
    const MAX_FILE_SIZE_MB = process.env.MAX_FILE_SIZE_MB || 25;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

    if (req.file.size > MAX_FILE_SIZE_BYTES) {
      return res.status(400).json({ error: `File size must be less than ${MAX_FILE_SIZE_MB}MB` });
    }

    const audioFile = req.file.buffer;
    const formData = new FormData();
    formData.append('file', audioFile, req.file.originalname);
    formData.append('model', 'whisper-1');

    const response = await axios.post(WHISPER_API_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
    });

    //call slide generator
    const slides = await getSlidesFromTranscription(response.data.text);
    res.json({ transcription: response.data.text, slides: slides });

  } catch (error) {
    console.error('Error getting transcription:', error);
    res.status(500).json({ error: 'Error getting transcription' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
