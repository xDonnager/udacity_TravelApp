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
  if (Client.validFeelings() && Client.validZipcode()) {
    Client.generate.removeAttribute("disabled");
    return;
  }
  Client.generate.setAttribute("disabled", "");
}

function resetInputs() {
  Client.feelings.value = "";
  Client.removeAlertInvalidField(feelings);

  Client.zipcode.value = "";
  Client. removeAlertInvalidField(zipcode);

  Client.checkEnableButton();
}

function fillProgressBar(percent) {
  let initialPercent;
  if (Client.progressBar.style.width === "") {
    initialPercent = 0;
  } else {
    initialPercent = parseInt(
      Client.progressBar.style.width.replace("%", ""),
      10
    );
  }

  for (let i = 0; i <= percent; i++) {
    let currentPercent = initialPercent + i + "%";
    Client.progressBar.style.width = currentPercent;
    Client.progressBar.innerHTML = currentPercent;
  }
}

function resetProgressBar() {
  Client.progressBar.style.width = "0%";
  Client.progressBar.innerHTML = "";
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
export {
  addAlertInvalidField,
  removeAlertInvalidField,
  checkEnableButton,
  resetInputs,
  fillProgressBar,
  resetProgressBar,
  handleError,
};
