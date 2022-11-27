import { removeTrip } from "./api";
import { renderSavedTripsList } from "./form";
import {
  progressBar,
  city,
  destination,
  date,
  tripsList,
  daysLeft,
} from "./constants";

export function resetInputs() {
  city.value = "";
  destination.value = "";
  date.value = "";
  daysLeft.innerText = "...";
}

export function fillProgressBar(percent) {
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

export function resetProgressBar() {
  progressBar.style.width = "0%";
  progressBar.innerHTML = "";
}

export function handleError(error) {
  const fragment = document.createDocumentFragment();
  const divError = document.createElement("div");

  divError.innerHTML =
    "Opps, a wire has been damaged, try refreshing the page!";
  divError.classList.add("error");
  fragment.appendChild(divError);

  document.querySelector(".progress__bar").appendChild(fragment);
}

export function renderSliderImage() {
  const media = [
    "https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704_960_720.jpg",
    "https://cdn.pixabay.com/photo/2013/02/21/19/06/drink-84533_960_720.jpg",
    "https://cdn.pixabay.com/photo/2014/08/15/11/29/beach-418742_960_720.jpg",
    "https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_960_720.jpg",
  ];

  const img = document.createElement("img");
  img.src = media[Math.floor(Math.random() * media.length)];
  img.alt = "slider";
  document.querySelector("#slider .image").appendChild(img);
}

export function resetTrips() {
  while (tripsList.childNodes.length > 0) {
    tripsList.removeChild(tripsList.childNodes[0]);
  }
}

export function createCardTrips(trips) {
  const fragment = document.createDocumentFragment();
  for (const trip of trips) {
    const {
      id,
      imageUrl,
      flag,
      officialName,
      country,
      city,
      startDate,
      countdownTime,
    } = trip;
    const { predicted, temp, clouds, precip, snow, windSpd } = trip.weather;
    let predictedWeather;
    predicted
      ? (predictedWeather = `The weather predicted for the start date will be:`)
      : (predictedWeather = `Based on historic data, the weather usually is: `);
    const card = document.createElement("div");
    card.classList.add("card");
    card.id = id;
    card.innerHTML = `
    <div class="image">
      <img src=${imageUrl} alt=${city}>
    </div>
    <div class="info">
      <div class="tripData"> 
        <div class="head">
          <img src=${flag} alt=${country}_flag>
          <h3><b>${officialName}</b></h3>
        </div>
        <hr>
        <p>Destination <b>${city}, ${country}.</b></p>
        <p>Planned for <b>${
          startDate.split("T")[0]
        }</b>, leaving in <b>${countdownTime}</b> days.</p>
        <p>${predictedWeather}</p>
        <ul>
          <li>🌡️Average temperature: ${temp}ºC</li>
          <li>☁️Average cloud coverage: ${clouds}%</li>
          <li>🌬️Average wind speed: ${windSpd}m/s</li>
          <li>☔Accumulated precipitation: ${precip}mm</li>
          <li>❄️Accumulated snowfall: ${snow}mm</li>
        </ul>
        <div class="holder"> 
          <button class="remove" type="submit">Remove Trip</button>
        </div>
      </div>
    </div>
`;

    fragment.appendChild(card);
  }
  tripsList.appendChild(fragment);
  const removeButtons = document.querySelectorAll(".remove");
  removeButtons.forEach((element) => {
    element.addEventListener("click", deleteTrip);
  });
}

async function deleteTrip(e) {
  const clickedBtn = e.target;
  const clickedCardId = clickedBtn.closest(".card").id;
  try {
    await removeTrip(clickedCardId);
    await renderSavedTripsList();
  } catch (e) {
    console.log(e);
  }
}
