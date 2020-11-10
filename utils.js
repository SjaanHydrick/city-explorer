function mungeLocation(location) {
  return {
    formatted_query: location[0].display_name,
    latitude: location[0].lat,
    longitude: location[0].lon
  };
}

function mungeWeather(weatherObj) {
  let retArr = weatherObj.data.map(weather => {
    return {
      forecast: weather.weather.description,
      time: weather.datetime,
    };
  });
  return retArr;
}

function mungeYelp(reviewObj) {
  let retArr = reviewObj.data.map(review => {
    return {
      name: review.name,
      image_url: review.image_url,
      price: review.price,
      rating: review.rating,
      url: review.url
    };
});
console.log(retArr);
  for(let i = 0; i < 20; i++) {
    return retArr[i];
  }
}

module.exports = {
  mungeLocation, mungeWeather, mungeYelp
};
