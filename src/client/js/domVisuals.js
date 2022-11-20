/* ---  Aux functions for UI --- */
export function addAlertInvalidField(element) {
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
    initialPercent = parseInt(
      progressBar.style.width.replace("%", ""),
      10
    );
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

export function handleError(error) {
  const fragment = document.createDocumentFragment();
  const divError = document.createElement("div");

  divError.innerHTML =
    "Opps, a wire has been damaged, try refreshing the page!";
  divError.classList.add("error");
  fragment.appendChild(divError);

  document.querySelector(".progress__bar").appendChild(fragment);
}
/* ---  END Aux functions for UI --- */
