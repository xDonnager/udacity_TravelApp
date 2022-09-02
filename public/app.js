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

//target UI elements
const zipcode = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const generate = document.getElementById("generate");
const progressBar = document.querySelector(".fill__bar");
const recentEntry = {
  date: document.getElementById("date"),
  temp: document.getElementById("temp"),
  content: document.getElementById("content"),
};

/* --- Aux functions for input validation --- */

const isEmptyField = (elementValue) => {
  if (!elementValue || elementValue.trim().length === 0) {
    return true;
  }
  return false;
};

function validZipcode() {
  const userZipInput = zipcode.value.trim();
  const spainZipRegex = /\b(0[1-9]|5[0-2]|[0-4][0-9])[0-9]{3}\b/;
  const validSpainZip = spainZipRegex.test(userZipInput);

  if (isEmptyField(userZipInput) || !validSpainZip) {
    return false;
  }
  return true;
}

function validFeelings() {
  const userFeelingsInput = feelings.value;

  if (isEmptyField(userFeelingsInput)) {
    return false;
  }
  return true;
}

/* ---  END Aux functions for input validation --- */

/* ---  Aux functions for UI --- */
function addAlertInvalidField(element) {
  if (element.id === "zip") {
    const zipHint = document.querySelector(".zip__hint");
    zipHint.style.display = "block";
  }
  element.classList.add("field__error");
}

function removeAlertInvalidField(element) {
  if (element.id === "zip") {
    const zipHint = document.querySelector(".zip__hint");
    zipHint.style.display = "none";
  }
  element.classList.remove("field__error");
}

function checkEnableButton() {
  if (validFeelings() && validZipcode()) {
    generate.removeAttribute("disabled");
    return;
  }
  generate.setAttribute("disabled", "");
}

function resetInputs() {
  feelings.value = "";
  removeAlertInvalidField(feelings);

  zipcode.value = "";
  removeAlertInvalidField(zipcode);

  checkEnableButton();
}

function fillProgressBar(percent) {
  let initialPercent;
  if (progressBar.style.width === "") {
    initialPercent = 0;
  } else {
    initialPercent = parseInt(progressBar.style.width.replace("%", ""), 10);
  }

  for (let i = 0; i <= percent; i++) {
    let currentPercent = initialPercent + i + "%";
    progressBar.style.width = currentPercent;
    progressBar.innerHTML = currentPercent;
  }
}

function resetProgressBar() {
  progressBar.style.width = "0%";
  progressBar.innerHTML = "";
}

function handleError(error) {
  const fragment = document.createDocumentFragment();
  const divError = document.createElement("div");

  divError.innerHTML =
    "Opps, a wire has been damaged, try refreshing the page!";
  divError.classList.add("error");
  fragment.appendChild(divError);

  document.querySelector(".progress__bar").appendChild(fragment);
}
/* ---  END Aux functions for UI --- */

/* --- Main functions --- */
// gets info from api and posts to server
async function createNewEntry() {
  try {
    const userZipInput = zipcode.value.trim();
    const userFeelingsInput = feelings.value;

    // get latitude and longitude
    const geocodingResponse = await getLatitudLongitude(
      userZipInput,
      geocodingUrl,
      apikey
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
    await addNewEntry(serverAddEndpoint, newEntryData);
  } catch (error) {
    handleError(error);
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
    handleError(error);
  }
}

async function getEntryData(url) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    handleError(error);
  }
}

async function createRecentEntry(entryData) {
  const { temperature, date, userResponse } = entryData;
  const { date: entryDate, temp, content } = recentEntry;

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
    handleError(error);
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

/* --- EVENT LISTENERS --- */

function addEventListeners() {
  zipcode.addEventListener("input", () => {
    const validatedZipcode = validZipcode();

    if (validatedZipcode) {
      removeAlertInvalidField(zipcode);
      checkEnableButton();
      return;
    }

    addAlertInvalidField(zipcode);
  });

  feelings.addEventListener("input", () => {
    const validatedFeelings = validFeelings();

    if (validatedFeelings) {
      removeAlertInvalidField(feelings);
      checkEnableButton();
      return;
    }

    addAlertInvalidField(feelings);
  });

  generate.addEventListener("click", () => {
    //add progress bar
    fillProgressBar(25);

    //create entry in backend
    createNewEntry()
      .then(() => {
        fillProgressBar(25);
        //clear inputs
        resetInputs();
        return getEntryData(serverGetEndpoint);
      })
      .then( result => {
        fillProgressBar(25);
        return createRecentEntry(result);
      })
      .then(() => {
        fillProgressBar(25);
        setTimeout(resetProgressBar, 3000);
      })
      .catch(error => console.log(error))
  });
}

//check func execution
document.addEventListener("DOMContentLoaded", addEventListeners());

/* --- END EVENT LISTENERS --- */
