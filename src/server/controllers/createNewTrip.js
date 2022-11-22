const { getCountryData } = require("../api/countries");
const { getCoordinates } = require("../api/geonames");
const { getProjectedWeather } = require("../api/weatherbit");
const { getImage } = require("../api/pixabay");

async function createNewTrip(newTripData) {
  try {
    const newTripParams = {
      city: newTripData.city,
      country: newTripData.country,
      countryCode: "",
      startDate: newTripData.startDate,
      countdownTime: newTripData.countdownTime,
      officialName: "",
      lat: null,
      lng: null,
      weather: null,
    };

    const countryData = await getCountryData(newTripParams.country);
    // if (countryData === null) {
    //   return res.status(404).json({ created: "NOK" });
    // }
    newTripParams.officialName = countryData.officialName;
    newTripParams.countryCode = countryData.countryCode;

    console.log("----------tripParams!", newTripParams);
    const geolocalization = await getCoordinates(newTripParams);
    console.log(geolocalization);
    // if (geolocalization === null) {
    //   return res.status(404).json({ created: "NOK" });
    // }
    newTripParams.lat = geolocalization.lat;
    newTripParams.lng = geolocalization.lng;
    console.log("----------tripParams!", newTripParams);

    const expectedWeather = await getProjectedWeather(newTripParams);
    console.log(expectedWeather);
    // if (expectedWeather === null) {
    //   return res.status(404).json({ created: "NOK" });
    // }
    newTripParams.weather = expectedWeather;
    console.log("----------tripParams!", newTripParams);

    const images = await getImage(newTripParams);
    console.log(images);
    // if (images === null) {
    //   return res.status(404).json({ created: "NOK" });
    // }
    newTripParams.images = images;
    console.log("----------tripParams!", newTripParams);
  } catch (e) {
    console.log(e);
    throw e;
    //res.status(0).json({ error: { ...e } });
  }
}

module.exports = { createNewTrip };
