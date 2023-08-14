const PORT = 8000;
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.json('hi');
})

app.get('/initial', (req, res) => {
    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `client_id=${encodeURIComponent(process.env.REACT_APP_CLIENT_ID)}&client_secret=${encodeURIComponent(process.env.REACT_APP_CLIENT_SECRET)}&grant_type=client_credentials`
    })
      .then((response) => response.json())
      .then((token) => {
        res.json(token);
          
      })
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
