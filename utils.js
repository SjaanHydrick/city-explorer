function mungeLocation(location) {
  return {
    formatted_query: location[0].display_name,
    latitude: location[0].lat,
    longitude: location[0].lon
  };
}

function mungeWeather(weather) {
  return {
    forecast: weather.description,
    time: weather.datetime,
  };
}

module.exports = {
  mungeLocation, mungeWeather
};
