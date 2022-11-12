//js
import {
  zipcode,
  feelings,
  generate,
  progressBar,
  recentEntry,
} from "./js/elements";
import {
  curWeatherBaseurl,
  apikey,
  geocodingUrl,
  countryCode,
  serverAddEndpoint,
  serverGetEndpoint,
} from "./js/constants";
import { validZipcode, validFeelings } from "./js/validators";
import { createNewEntry, getEntryData, createRecentEntry } from "./js/app";
import {
  addAlertInvalidField,
  resetInputs,
  fillProgressBar,
  resetProgressBar,
  handleError,
} from "./js/domVisuals";

import { addEventListeners } from "./js/eventListeners";

//styles
import "./styles/app.scss";

export {
  zipcode,
  feelings,
  generate,
  progressBar,
  recentEntry,
  curWeatherBaseurl,
  apikey,
  geocodingUrl,
  countryCode,
  serverAddEndpoint,
  serverGetEndpoint,
  validZipcode,
  validFeelings,
  createNewEntry,
  getEntryData,
  createRecentEntry,
  addAlertInvalidField,
  resetInputs,
  fillProgressBar,
  resetProgressBar,
  handleError,
addEventListeners
};

document.addEventListener("DOMContentLoaded", addEventListeners());
