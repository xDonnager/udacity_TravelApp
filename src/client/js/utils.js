/* --- Aux functions for input validation --- */
import { date } from "./constants";

export const isEmptyField = (element) => {
  if (!element.value || element.value.trim().length === 0) {
    return true;
  }
  return false;
};

export const calcCountdown = () => {
  const now = new Date().getTime();
  const toDate = new Date(date.value).getTime();
  const diff = toDate - now;
  // console.log(diff);
  const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
  // console.log(daysLeft);
  document.getElementById("daysLeft").innerHTML = daysLeft;
  return daysLeft;
};
