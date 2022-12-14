const fetch = require("node-fetch");

const getCountryData = async (country) => {
  console.log("getting country data");
  const url = `https://restcountries.com/v3.1/name/${country}`;
  try {
    const res = await fetch(url);
    if (res.status !== 200) {
      throw new Error("Response error from restcountries");
    }
    const data = await res.json();
    // console.log("---------", data);
    if (data.length === 0 || data === undefined) {
      throw new Error("Country was not found in restCountries");
    }

    return {
      officialName: data[0].name.official,
      countryCode: data[0].cca2,
      flag: data[0].flags.png,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = { getCountryData };
