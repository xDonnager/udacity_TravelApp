import { getProjectedWeather } from "../src/server/api/weatherbit";

const tripFakeData = {
  id: "16695",
  city: "Tokyo",
  country: "Japan",
  countryCode: "JP",
  startDate: "",
  countdownTime: null,
  officialName: "Japan",
  flag: "https://flagcdn.com/w320/jp.png",
  lat: 35.67376583663964,
  lng: 139.76157142278385,
  weather: null,
  imageUrl:
    "https://pixabay.com/get/gdad6911170aeeda40907d925f144c89af345aa9f13099407e35534cb3f6470a47b643d0672b92bae3848be61de386b5c_640.jpg",
};

describe("Testing the Weather api functions", () => {
  test("getProjectedWeather Function exists", () => {
    expect(getProjectedWeather).toBeDefined();
  });

  test("It should return forecast if startdate is between today and 16 days ahead", async () => {
    tripFakeData.startDate = "2022-11-28T00:00:00.000Z";
    tripFakeData.countdownTime = 0;
    const weatherForecastResponse = {
      predicted: true,
    };
    try {
      const res = await getProjectedWeather(tripFakeData);
      expect(res).toMatchObject(weatherForecastResponse);
    } catch (e) {
      expect(e).toMatch("error");
    }
  });

  test("It should return historical based if startdate is more than 16 days ahead or before today", async () => {
    tripFakeData.startDate = "2022-11-25T00:00:00.000Z";
    tripFakeData.countdownTime = -3;
    const weatherForecastResponse = {
      predicted: false,
    };
    try {
      const res = await getProjectedWeather(tripFakeData);
      expect(res).toMatchObject(weatherForecastResponse);
    } catch (e) {
      expect(e).toMatch("error");
    }
  });
});
