function mungeLocation(location) {
  return {
    formatted_query: location[0].display_name,
    latitude: location[0].latitude,
    longitude: location[0].longitude
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

module.exports = {
  mungeLocation, mungeWeather
};
