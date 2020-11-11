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

function mungeHiking(hikingObj) {
  let retArr = hikingObj.trails.map(hiking => {
    return {
      name: hiking.name,
      location: hiking.location,
      length: hiking.length,
      stars: hiking.stars,
      star_votes: hiking.starVotes,
      summary: hiking.summary,
      trail_url: hiking.url,
      conditions: hiking.conditionStatus,
      condition_date: hiking.conditionDate
    };
  });
  return retArr;
}

module.exports = {
  mungeLocation, mungeWeather, mungeYelp, mungeHiking
};
