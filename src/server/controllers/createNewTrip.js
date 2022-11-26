const { getCountryData } = require("../api/countries");
const { getCoordinates } = require("../api/geonames");
const { getProjectedWeather } = require("../api/weatherbit");
const { getImage } = require("../api/pixabay");

async function createNewTrip(newTripData) {
  try {
    const newTripParams = {
      city: newTripData.city,
      country: newTripData.country,
      countryCode: null,
      startDate: newTripData.startDate,
      countdownTime: newTripData.countdownTime,
      officialName: null,
      flag: null,
      lat: null,
      lng: null,
      weather: null,
      images: null,
    };

    const countryData = await getCountryData(newTripParams.country);
    extractProps(countryData, newTripParams);
    console.log("----------tripParams!", newTripParams);

    const geolocalization = await getCoordinates(newTripParams);
    extractProps(geolocalization, newTripParams);
    console.log("----------tripParams!", newTripParams);

    const expectedWeather = await getProjectedWeather(newTripParams);
    newTripParams.weather = expectedWeather;
    console.log("----------tripParams!", newTripParams);

    const images = await getImage(newTripParams);
    newTripParams.images = images;
    console.log("----------tripParams!", newTripParams);

    return newTripParams;
  } catch (e) {
    console.log(e);
    throw e;
    //res.status(0).json({ error: { ...e } });
  }
}

function extractProps(origin, destiny) {
  for (const prop in origin) {
    destiny[prop] = origin[prop];
  }
}
module.exports = { createNewTrip };
