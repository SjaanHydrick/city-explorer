require('dotenv').config();

const { execSync } = require('child_process');
const { mungeLocation, mungeWeather, mungeYelp, mungeHiking } = require('../utils.js');

// const fakeRequest = require('supertest');
// const app = require('../lib/app');
// const client = require('../lib/client');

// describe('app routes', () => {
//   describe('routes', () => {
//     let token;
  
//     beforeAll(async done => {
//       execSync('npm run setup-db');
  
//       client.connect();
  
//       const signInData = await fakeRequest(app)
//         .post('/auth/signup')
//         .send({
//           email: 'jon@user.com',
//           password: '1234'
//         });
      
//       token = signInData.body.token;
  
//       return done();
//     });
  
//     afterAll(done => {
//       return client.end(done);
//     });

test('mungeLocation', async() => {

  const expectation =  
  {
    formatted_query: 'Sibay, городской округ Сибай, Bashkortostan, Volga Federal District, UNDEFINED, Russia',
    latitude: '52.7206093188075',
    longitude: '58.6657536770277',
  };  
  
  const input = [    
    {      
      display_name: 'Sibay, городской округ Сибай, Bashkortostan, Volga Federal District, UNDEFINED, Russia',
      lat: '52.7206093188075',
      lon: '58.6657536770277',
    }];

  const output = mungeLocation(input);

  expect(output).toEqual(expectation);
});

test('mungeWeather', async() => {

  const expectation = [{
    forecast: 'Partly cloudy until afternoon',
    time: 'Mon Jan 01 2001'
  }];

  const weatherObj = { 
    data: [{
      weather: {
        description: 'Partly cloudy until afternoon'
      },
      datetime: 'Mon Jan 01 2001'
    }] };

  const output = mungeWeather(weatherObj);
  expect(output).toEqual(expectation);
});

test('mungeYelp', async() => {

  const expectation = [{
    name: 'Chicken Bucket',
    image_url: 'https://s3-media4.fl.yelpcdn.com/bphoto/qHrzQy5ih2Sjhn7MdsCASw/o.jpg',
    price: '$$$',
    rating: 3.5,
    url: 'https://www.yelp.com/biz/voodoo-doughnut-old-town-portland-2?adjust_creative=856d_pvrJZ2PjHaLkOZkDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=856d_pvrJZ2PjHaLkOZkDw'
  }];

  const reviewObj = { 
    businesses: [{
      name: 'Chicken Bucket',
      image_url: 'https://s3-media4.fl.yelpcdn.com/bphoto/qHrzQy5ih2Sjhn7MdsCASw/o.jpg',
      price: '$$$',
      rating: 3.5,
      url: 'https://www.yelp.com/biz/voodoo-doughnut-old-town-portland-2?adjust_creative=856d_pvrJZ2PjHaLkOZkDw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=856d_pvrJZ2PjHaLkOZkDw'
    }] };

  const output = mungeYelp(reviewObj);
  expect(output).toEqual(expectation);
});

test('mungeHiking', async() => {

  const expectation = [{
    name: 'Enchantments Traverse',
    location: 'Leavenworth, Washington',
    length: '19.1',
    stars: '4.9',
    star_votes: '77',
    summary: 'An extraordinary hike that takes you through all of the beauty that the Enchantments have to offer!',
    trail_url: 'https://www.hikingproject.com/trail/7005246/enchantments-traverse',
    conditions: 'All Clear',
    condition_date: '2020-10-13'
  }];

  const hikingObj = { 
    trails: [{
      name: 'Enchantments Traverse',
      location: 'Leavenworth, Washington',
      length: '19.1',
      stars: '4.9',
      starVotes: '77',
      summary: 'An extraordinary hike that takes you through all of the beauty that the Enchantments have to offer!',
      url: 'https://www.hikingproject.com/trail/7005246/enchantments-traverse',
      conditionStatus: 'All Clear',
      conditionDate: '2020-10-13'
    }] };

  const output = mungeHiking(hikingObj);
  expect(output).toEqual(expectation);
});