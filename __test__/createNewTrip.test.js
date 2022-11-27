import { createNewTrip } from "../src/client/js/api";

describe("Testing the Create new trip api function", () => {
  test("createNewTrip Function exists", () => {
    expect(createNewTrip).toBeDefined();
  });

  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 200,
      json: () =>
        Promise.resolve({
          id: "16695",
          city: "Tokyo",
          country: "Japan",
          countryCode: "JP",
          startDate: "2022-11-28T00:00:00.000Z",
          countdownTime: 0,
          officialName: "Japan",
          flag: "https://flagcdn.com/w320/jp.png",
          lat: 35.67376583663964,
          lng: 139.76157142278385,
          weather: {
            predicted: true,
            maxTemp: 18.8,
            minTemp: 11.8,
            temp: 15.6,
            clouds: 53,
            windSpd: 3.4,
            precip: 1.2,
            snow: 0,
          },
          imageUrl:
            "https://pixabay.com/get/gdad6911170aeeda40907d925f144c89af345aa9f13099407e35534cb3f6470a47b643d0672b92bae3848be61de386b5c_640.jpg",
        }),
    })
  );

  test("Runs fine for Tokyo, Japan, day 28th of november 2022", async () => {
    try {
      const tripFakeData = {
        city: "Tokyo",
        country: "Japan",
        startDate: "2022-11-28T00:00:00.000Z",
        countdownTime: 0,
      };
      const res = await createNewTrip(tripFakeData);
      expect(res).toBeDefined();
      expect(res.city).toBeDefined();
      expect(res.city).toEqual(tripFakeData.city);
      expect(res.country).toBeDefined();
      expect(res.country).toEqual(tripFakeData.country);
      expect(res.weather).toBeDefined();
      expect(res.countdownTime).toBeDefined();
      expect(res.countdownTime).toEqual(tripFakeData.countdownTime);
    } catch (e) {
      expect(e).toMatch("error");
    }
  });
});
