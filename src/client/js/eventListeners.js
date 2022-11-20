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
      .then((result) => {
        fillProgressBar(25);
        return createRecentEntry(result);
      })
      .then(() => {
        fillProgressBar(25);
        setTimeout(resetProgressBar, 3000);
      })
      .catch((error) => console.log(error));
  });
}

export {addEventListeners}
/* --- END EVENT LISTENERS --- */
