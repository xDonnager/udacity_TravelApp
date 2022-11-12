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

export {zipcode, feelings, generate, progressBar, recentEntry }