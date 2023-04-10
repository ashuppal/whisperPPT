##AudioSpark

## Author: Ashwini Uppal

AudioSpark is a web application that provides a unique solution for individuals and businesses who need to create PowerPoint presentations but have limited time to do so. The application is designed to convert audio files to text, and then use that text to automatically generate a PowerPoint presentation.

To use AudioSpark, simply upload an audio file in a supported format, such as MP3 or WAV, and the application will transcribe the audio into text. Once the transcription is complete, AudioSpark uses Whisper and OpenAI to analyze the text and create a PowerPoint presentation that is both informative and engaging.

Users can then edit the presentation as needed, adding or removing slides, modifying the text, or changing the design.

AudioSpark is an ideal tool for anyone who needs to create PowerPoint presentations quickly and efficiently. Whether you're a business professional giving a presentation at work, a student preparing a class project, or someone who simply wants to share their ideas with others, AudioSpark can help you save time and produce high-quality presentations with minimal effort.


It uses the following APIs:

1. Whisper: Converts audio to text
2. OpenAI: Summarizes text into slides.
3. PptxGenJS: Converts slides into a PowerPoint presentation.

## How to use it?

- Open a terminal window and run the following command to clone the repository:
    `git clone https://github.com/ashuppal/whisperPPT.git`
- Create a `.env` file for Backend and add the following variables:
    - `WHISPER_API_KEY`
    - `OPENAI_API_KEY`
    - `PORT`
- Create a `.env` file for Frontend and add the following variables:
    - `REACT_APP_API_URL`, example 'http://localhost:5000' (replace 5000 with the port you have set in the backend .env file)
- Open a terminal window and run the following commands to start the backend:
    `cd api`  
    `npm start` 
- Open a terminal window and run the following commands to start the frontend:
    `cd frontend`
    `npm start`
- Enjoy! 


## Tech Stack:

- React
- Material UI
- Express JS (Node JS)
- OpenAI - GPT-3
- OpenAI - Whisper
- PptxGenJS
- Multer, Form Data, Axios



