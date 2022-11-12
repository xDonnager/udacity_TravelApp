// OpenWeatherMap current weather endpoint and credentials
const curWeatherBaseurl = "https://api.openweathermap.org/data/2.5/weather";
const apikey = "b0ee36e0047885d7c6521223abcf5abe";

/// Geocoding for lat&lon given zipcode
//https://openweathermap.org/api/geocoding-api#direct_zip
const geocodingUrl = "http://api.openweathermap.org/geo/1.0/zip";
const countryCode = "ES";

// Server endpoints
const serverAddEndpoint = "http://localhost:3000/add";
const serverGetEndpoint = "http://localhost:3000/data";

export {
  curWeatherBaseurl,
  apikey,
  geocodingUrl,
  countryCode,
  serverAddEndpoint,
  serverGetEndpoint,
};
