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
  let retArr = reviewObj.businesses.map(review => {

    return {
      name: review.name,
      image_url: review.image_url,
      price: review.price,
      rating: review.rating,
      url: review.url
    };
  });
  return retArr.slice(0, 20);
}

module.exports = {
  mungeLocation, mungeWeather, mungeYelp
};
