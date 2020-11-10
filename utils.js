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

function mungeYelp(review) {
  for(let i = 0; i < 20; i++){
    return {
      name: review[i].name,
      image_url: review[i].image_url,
      price: review[i].price,
      rating: review[i].rating,
      url: review[i].url
    };
  }
}

module.exports = {
  mungeLocation, mungeWeather, mungeYelp
};
