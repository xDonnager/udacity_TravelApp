const fetch = require("node-fetch");
const dotenv = require("dotenv").config();
const { encodeParams } = require("./utils");

const formatDate = (date) => {
  console.log(date);
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  return m < 10 ? `${y}-0${m}-${d}` : `${y}-${m}-${d}`;
};

const getProjectedWeather = async (req) => {
  console.log("getting weather..");
  const startDate = new Date(req.startDate);
  const endDate = new Date().setDate(startDate.getDate() + 1);
  const reqParams = {
    lat: req.lat,
    lon: req.lng,
    key: process.env.WEATHERBIT_APIKEY,
    start_date: formatDate(startDate),
    end_date: formatDate(endDate),
  };
  console.log("reqParams", reqParams);
  const url = `http://api.weatherbit.io/v2.0/history/daily?`;
  const postalCodeUrl = url + encodeParams(reqParams);
  console.log("postalCodeUrl", postalCodeUrl);
  try {
    const res = await fetch(postalCodeUrl);
    console.log(res);
    if (res.status !== 200) {
      throw res.error;
    }
    const data = await res.json();
    console.log(data);
    if (data.postalCodes.length === 0) {
      throw new Error("Coordinates where not found ");
    }

    return {};
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = { getProjectedWeather };
