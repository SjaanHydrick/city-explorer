require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const request = require('superagent');
const { mungeLocation, mungeWeather, mungeYelp, mungeHiking } = require('../utils.js');

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
    
    res.status(500).json({ error: 'Sorry, something went wrong.' });
  }
});

app.get('/weather', async(req, res) => {
  try {
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${req.query.latitude}&lon=${req.query.longitude}&key=${process.env.WEATHER_KEY}`;

    const response = await request.get(URL);

    const newResponse = mungeWeather(response.body);

    res.json(newResponse);
  } catch(e) {
    
    res.status(500).json({ error: 'Sorry, something went wrong.' });
  }
});

app.get('/reviews', async(req, res) => {
  try {
    const URL = `https://api.yelp.com/v3/businesses/search?latitude=${req.query.latitude}&longitude=${req.query.longitude}`;

    const response = await request.get(URL).set({ 'Authorization': `Bearer ${process.env.YELP_KEY}` });

    const newResponse = mungeYelp(response.body);

    res.json(newResponse);
  } catch(e) {
    
    res.status(500).json({ error: 'Sorry, something went wrong.' });
  }
});

app.get('/trails', async(req, res) => {
  try {
    const URL = `https://www.hikingproject.com/data/get-trails?lat=${req.query.latitude}&lon=${req.query.longitude}&maxDistance=200&key=${process.env.HIKING_KEY}`;

    const response = await request.get(URL);

    const newResponse = mungeHiking(response.body);

    res.json(newResponse);
  } catch(e) {
    
    res.status(500).json({ error: 'Sorry, something went wrong.' });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
