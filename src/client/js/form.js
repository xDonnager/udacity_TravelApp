import { isEmptyField } from "./validators";
import * as HtmlElements from "./constants";
import { createNewTrip } from "./api";

const { generateBtn, destination, city, date } = HtmlElements;

const calcCountdown = () => {
  const now = new Date().getTime();
  const toDate = new Date(date.value).getTime();
  const diff = toDate - now;
  const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById("daysLeft").innerHTML = daysLeft;
  return daysLeft;
};

/**
 * On submit calculates trip data
 * @param {*} e
 */

export async function generateButtonOnSubmitHandler(e) {
  e.preventDefault();
  //fillProgressBar(25)
  console.log(city.value, destination.value, date.value);
  const tripInputValues = {
    city: city.value.trim(),
    country: destination.value.trim(),
    startDate: new Date(date.value),
    countdownTime: calcCountdown(),
  };
  try {
    const newTripCreated = await createNewTrip(tripInputValues);
    console.log(newTripCreated);
    //fillProgressBar(25)
    //resetInputs();
  } catch (e) {}
}

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
