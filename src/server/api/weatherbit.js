const fetch = require("node-fetch");
const dotenv = require("dotenv").config();
const { encodeParams } = require("./utils");
const dayjs = require("dayjs");

const getProjectedWeather = async (req) => {
  console.log("getting weather..");
  const startDate = dayjs(req.startDate).subtract(1, "year");
  const endDate = startDate.add(1, "day");
  const reqParams = {
    lat: req.lat,
    lon: req.lng,
    key: process.env.WEATHERBIT_APIKEY,
    start_date: startDate.format("YYYY-MM-DD"),
    end_date: endDate.format("YYYY-MM-DD"),
  };
  console.log("reqParams", reqParams);
  const url = `http://api.weatherbit.io/v2.0/history/daily?`;
  const weatherUrl = url + encodeParams(reqParams);
  try {
    const res = await fetch(weatherUrl);
    if (res.status !== 200) {
      throw res.error;
    }
    const data = await res.json();
    if (data.code === 0) {
      throw new Error("Weather for location was not found ");
    }
    const w = data.data[0];
    return {
      maxTemp: w.max_temp,
      minTemp: w.min_temp,
      temp: w.temp,
      clouds: w.clouds,
      windSpd: w.wind_spd,
      precip: w.precip,
      snow: w.snow,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = { getProjectedWeather };
