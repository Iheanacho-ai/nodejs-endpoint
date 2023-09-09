const express = require('express');
const moment = require('moment-timezone');
const app = express();
const port = process.env.PORT || 3000;

// Define your API endpoint
app.get('/api', (req, res) => {
  const { slackName, track } = req.query;

  // Validate slackName and track query parameters
  if (!slackName || !track) {
    return res.status(400).json({ error: 'Missing required query parameters.' });
  }

  // Get current day of the week
  const currentDayOfWeek = moment().tz('UTC').format('dddd');

  // Get current UTC time with validation of +/-2
  const currentTimeUTC = moment().tz('UTC');
  const isValidUTC = currentTimeUTC.isBetween(moment().subtract(2, 'hours'), moment().add(2, 'hours'));

  if (!isValidUTC) {
    return res.status(400).json({ error: 'UTC time is not within +/-2 hours.' });
  }

  // Get GitHub URL of the file being run
  const fileURL = 'https://github.com/Iheanacho-ai/nodejs-endpoint/blob/main/app.js';

  // Get GitHub URL of the full source code
  const sourceCodeURL = 'https://github.com/Iheanacho-ai/nodejs-endpoint';

  // Return the information in JSON format
  res.status(200).json({
    slackName,
    currentDayOfWeek,
    currentTimeUTC: currentTimeUTC.format('HH:mm:ss'),
    track,
    fileURL,
    sourceCodeURL,
    statusCode: 'Success',
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
