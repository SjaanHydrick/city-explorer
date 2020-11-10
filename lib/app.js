require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const request = require('superagent');
const { mungeLocation, mungeWeather } = require('../utils.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
// app.get('/api/test', (req, res) => {
//   res.json({
//     message: `in this proctected route, we get the user's id like so: ${req.userId}`
//   });
// });

app.get('/location', async(req, res) => {
  try {
    const URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_KEY}&q=${req.query.search}&format=json`;

    const response = await request.get(URL);

    const newResponse = mungeLocation(response.body);

    res.json(newResponse);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.get('/weather', async(req, res) => {
  try {
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${req.query.latitude}&lon=${req.query.longitude}&key=${process.env.WEATHER_KEY}`;

    const response = await request.get(URL);

    const newResponse = mungeWeather(response.body);

    res.json(newResponse);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
