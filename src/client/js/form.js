import { isEmptyField, calcCountdown } from "./utils";
import * as HtmlElements from "./constants";
import { createNewTrip, getCreatedTrips } from "./api";
import {
  fillProgressBar,
  resetInputs,
  resetProgressBar,
  createCardTrips,
  resetTrips,
} from "./domVisuals";

const { generateBtn, destination, city, date } = HtmlElements;

/**
 * On submit calculates trip data
 * @param {*} e
 */

export async function generateButtonOnSubmitHandler(e) {
  e.preventDefault();
  fillProgressBar(25);
  const tripInputValues = {
    city: city.value.trim(),
    country: destination.value.trim(),
    startDate: new Date(date.value),
    countdownTime: calcCountdown(),
  };
  try {
    const newTripCreated = await createNewTrip(tripInputValues);
    fillProgressBar(25);
    resetInputs();
    fillProgressBar(25);
    //get trips
    await renderSavedTripsList();
    fillProgressBar(25);
    setTimeout(resetProgressBar, 3000);
  } catch (e) {
    console.log(e);
  }
}

export const renderSavedTripsList = async () => {
  try {
    //get trips
    resetTrips();
    const createdTripsList = await getCreatedTrips();
    createCardTrips(createdTripsList);
  } catch (e) {
    console.log(e);
  }
};

/**
 * checks input fields not empty, enables/disabled submit button
 * @returns boolean
 */
const validateFormInputs = () => {
  if (isEmptyField(destination) || isEmptyField(city) || isEmptyField(date)) {
    return (generateBtn.disabled = true);
  }
  return (generateBtn.disabled = false);
};

/**
 * Adds initial state to button and attaches event listeners to fields
 */
export function generateButtonHandler() {
  generateBtn.disabled = true;
  destination.addEventListener("input", validateFormInputs);
  city.addEventListener("input", validateFormInputs);
  date.addEventListener("input", validateFormInputs);
  date.addEventListener("input", calcCountdown);
}
