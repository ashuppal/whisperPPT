const axios = require('axios');

async function getSlidesFromTranscription(transcription) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const OPENAI_API_URL = 'https://api.openai.com/v1/completions';

  const prompt = `You are an AI that converts text into slides with headers and bullet points. Turn the following text into slides:

${transcription}

EXAMPLE:

[
{
"Header": "Seattle, Washington",
"BulletPoints": [
"Seat of King County, Washington",
"Population of 737,015 (2020)",
"Largest city in Washington and the Pacific Northwest"
]
},
{
"Header": "Geography and Trade",
"BulletPoints": [
"Located between Puget Sound & Lake Washington",
"Major gateway for trade with East Asia"
]
}
]

YOUR RESPONSE:`;

  try {
    const response = await axios.post(OPENAI_API_URL, {
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 1297,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('response.data.choices[0].text:', response.data.choices[0].text);

    const parsedResponse = JSON.parse(response.data.choices[0].text.trim());
    return parsedResponse;
  } catch (error) {
    console.error('Error getting slides:', error);
    throw new Error('Error getting slides');
  }
}

module.exports = {
  getSlidesFromTranscription,
};
