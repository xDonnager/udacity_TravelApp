/* --- Main functions --- */
// gets info from api and posts to server
async function createNewEntry() {
  try {
    const userZipInput = Client.zipcode.value.trim();
    const userFeelingsInput = Client.feelings.value;

    // get latitude and longitude
    const geocodingResponse = await getLatitudLongitude(
      userZipInput,
      Client.geocodingUrl,
      Client.apikey
    );
    const { lat, lon } = geocodingResponse;

    // get weaether for current latitude and longitude
    const weatherResponse = await getWeatherForCurrentLocation(
      lat,
      lon,
      curWeatherBaseurl,
      apikey
    );
    const { temp } = weatherResponse.main;
    // throw new Error("error forced");

    // construct data object
    const newEntryData = {
      temperature: temp,
      date: new Date().toLocaleString(),
      userResponse: userFeelingsInput,
    };

    //add entry
    await addNewEntry(Client.serverAddEndpoint, newEntryData);
  } catch (error) {
    Client.handleError(error);
  }
}

async function addNewEntry(url, data) {
  try {
    const res = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      return;
    } else {
      throw new Error("Failed to add new entry");
    }
  } catch (error) {
    Client.handleError(error);
  }
}

async function getEntryData(url) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    Client.handleError(error);
  }
}

async function createRecentEntry(entryData) {
  const { temperature, date, userResponse } = entryData;
  const { date: entryDate, temp, content } = Client.recentEntry;

  entryDate.innerHTML = `<span><b>Entry date:</b> ${date}</span>`;
  temp.innerHTML = `<span><b>Temperature(ºC):</b> ${Math.round(
    temperature
  )}</span>`;
  content.innerHTML = `<span><b>Feelings:</b> ${userResponse}</span>`;
}

async function getLatitudLongitude(zipValue, url, key) {
  const endpoint = `${url}?zip=${zipValue},${countryCode}&appid=${key}`;
  try {
    const res = await fetch(endpoint);
    return await res.json();
  } catch (error) {
    Client.handleError(error);
  }
}

async function getWeatherForCurrentLocation(lat, lon, url, key) {
  const endpoint = `${url}?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  try {
    const res = await fetch(endpoint);
    return await res.json();
  } catch (error) {
    handleError(error);
  }
}
/* --- END Main functions --- */

export { createNewEntry, getEntryData, createRecentEntry };
