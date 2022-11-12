/* --- Aux functions for input validation --- */

const isEmptyField = (elementValue) => {
  if (!elementValue || elementValue.trim().length === 0) {
    return true;
  }
  return false;
};

function validZipcode() {
  const userZipInput = Client.zipcode.value.trim();
  const spainZipRegex = /\b(0[1-9]|5[0-2]|[0-4][0-9])[0-9]{3}\b/;
  const validSpainZip = spainZipRegex.test(userZipInput);

  if (isEmptyField(userZipInput) || !validSpainZip) {
    return false;
  }
  return true;
}

function validFeelings() {
  const userFeelingsInput = Client.feelings.value;

  if (isEmptyField(userFeelingsInput)) {
    return false;
  }
  return true;
}

export { validZipcode, validFeelings };

/* ---  END Aux functions for input validation --- */