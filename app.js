const express = require('express');
const moment = require('moment-timezone');
const app = express();
const port = process.env.PORT || 3000;

// Define your API endpoint
app.get('/api', (req, res) => {
  const { slack_name, track } = req.query;

  // Validate slack_name and track query parameters
  if (!slack_name || !track) {
    return res.status(400).json({ error: 'Missing required query parameters.' });
  }

  // Get current day of the week
  const now = new Date();
  const current_day = now.toLocaleDateString('en-US', { weekday: 'long' });

   // Get current UTC time as a string 
   const utc_time = now.toISOString();

   // Validate UTC time (+/-2) 
   const currentTimeUTC = moment.utc(utc_time);
   const isValidUTC = currentTimeUTC.isBetween(
    moment().subtract(2, 'hours'),
    moment().add(2, 'hours')
   );
 
   if (!isValidUTC) {
    return res.status(400).json({ error: 'UTC time is not within +/-2 hours.' });
   }

  // Get GitHub URL of the file being run
  const github_file_url = 'https://github.com/Iheanacho-ai/nodejs-endpoint/blob/main/app.js';

  // Get GitHub URL of the full source code
  const github_repo_url = 'https://github.com/Iheanacho-ai/nodejs-endpoint';

  // Return the information in JSON format
  res.status(200).json({
    slack_name,
    current_day,
    utc_time,
    track,
    github_file_url,
    github_repo_url,
    status_code: 'Success',
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
