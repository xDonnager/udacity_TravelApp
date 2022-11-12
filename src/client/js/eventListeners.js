/* --- EVENT LISTENERS --- */

function addEventListeners() {
  Client.zipcode.addEventListener("input", () => {
    const validatedZipcode = Client.validZipcode();

    if (validatedZipcode) {
      Client.removeAlertInvalidField(Client.zipcode);
      Client.checkEnableButton();
      return;
    }

    Client.addAlertInvalidField(Client.zipcode);
  });

  Client.feelings.addEventListener("input", () => {
    const validatedFeelings = Client.validFeelings();

    if (validatedFeelings) {
      Client.removeAlertInvalidField(Client.feelings);
      Client.checkEnableButton();
      return;
    }

    Client.addAlertInvalidField(Client.feelings);
  });

  Client.generate.addEventListener("click", () => {
    //add progress bar
    Client.fillProgressBar(25);

    //create entry in backend
    Client.createNewEntry()
      .then(() => {
        Client.fillProgressBar(25);
        //clear inputs
        Client.resetInputs();
        return getEntryData(serverGetEndpoint);
      })
      .then((result) => {
        Client.fillProgressBar(25);
        return Client.createRecentEntry(result);
      })
      .then(() => {
        Client.fillProgressBar(25);
        setTimeout(resetProgressBar, 3000);
      })
      .catch((error) => console.log(error));
  });
}

export {addEventListeners}
/* --- END EVENT LISTENERS --- */
