const fetch = require("node-fetch");
const { encodeParams } = require("./utils");
const dotenv = require("dotenv").config();

const getCoordinates = async (req) => {
  console.log("getting coordinates..");
  const reqParams = {
    placename: req.city,
    maxRows: 1,
    username: process.env.GEONAMES_USERNAME,
    country: req.countryCode,
  };
  const url = `http://api.geonames.org/postalCodeSearchJSON?`;
  const postalCodeUrl = url + encodeParams(reqParams);

  try {
    const res = await fetch(postalCodeUrl);
    if (res.status !== 200) {
      throw res.error;
    }
    const data = await res.json();
    if (data.postalCodes.length === 0) {
      throw new Error("Coordinates where not found ");
    }

    return {
      lat: data.postalCodes[0].lat,
      lng: data.postalCodes[0].lng,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = { getCoordinates };
