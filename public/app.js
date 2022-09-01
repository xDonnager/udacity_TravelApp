// OpenWeatherMap current weather endpoint and credentials
const curWeatherBaseurl = 'https://api.openweathermap.org/data/2.5/weather';
const apikey = 'b0ee36e0047885d7c6521223abcf5abe';

/// Geocoding for lat&lon given zipcode
//https://openweathermap.org/api/geocoding-api#direct_zip
const geocodingUrl = 'http://api.openweathermap.org/geo/1.0/zip';
const countryCode = 'ES';

// Server endpoints
const serverAddEndpoint = 'http://localhost:3000/add';
const serverGetEndpoint = 'http://localhost:3000/data';


//target UI elements
const zipcode = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const generate = document.getElementById('generate');
const progressBar = document.querySelector('.fill__bar');
const recentEntry = {
    date: document.getElementById('date'),
    temp: document.getElementById('temp'),
    content: document.getElementById('content'),
}


/* --- Aux functions for input validation --- */

const isEmptyField = (elementValue) => {
    if ( !elementValue || elementValue.trim().length === 0 ) {
        return true;
    }
    return false;
}

function validZipcode() {
    const userZipInput = zipcode.value.trim();
    const spainZipRegex = /\b(0[1-9]|5[0-2]|[0-4][0-9])[0-9]{3}\b/;
    const validSpainZip = spainZipRegex.test(userZipInput);

    if ( isEmptyField(userZipInput) || !validSpainZip ) {
        return false;
    }
    return true;

}

function validFeelings() {
    const userFeelingsInput = feelings.value;

    if(isEmptyField(userFeelingsInput)) {
        return false;
    }
    return true;
}

/* ---  END Aux functions for input validation --- */

/* ---  Aux functions for UI --- */
function addAlertInvalidField(element) {
    if (element.id === 'zip') {
        const zipHint = document.querySelector('.zip__hint');
        zipHint.style.display = 'block'
    }
    element.classList.add('field__error')
}

function removeAlertInvalidField(element) {
    if (element.id === 'zip') {
        const zipHint = document.querySelector('.zip__hint');
        zipHint.style.display = 'none'
    }
    element.classList.remove('field__error');
}

function checkEnableButton() {
    if ( validFeelings() && validZipcode() ){
        generate.removeAttribute('disabled');
        return;
    }
    generate.setAttribute('disabled', '');
}

function resetInputs() {
    feelings.value = '';
    removeAlertInvalidField(feelings);

    zipcode.value = '';
    removeAlertInvalidField(zipcode);
    
    checkEnableButton();
}

function fillProgressBar(percent){
    let initialPercent;
    if (progressBar.style.width === "") {
        initialPercent = 0;
    } else {
        initialPercent = parseInt(progressBar.style.width.replace('%',''), 10)
    }
    for( let i = 0; i <= percent; i++) {
        console.log('i',i)
        progressBar.style.width = initialPercent + i + '%';
        if( i === 100){
            return;
        }
    }
}

/* ---  END Aux functions for UI --- */


/* --- Main functions --- */
// gets info from api and posts to server
async function createNewEntry(){
    try {
        const userZipInput = zipcode.value.trim();
        const userFeelingsInput = feelings.value;
        console.log(zipcode.value);
        console.log(feelings.value);
    
        // get latitude and longitude
        const geocodingResponse = await getLatitudLongitude(userZipInput, geocodingUrl, apikey);
        console.log(geocodingResponse);
        const {lat, lon} = geocodingResponse;
    
        // get weaether for current latitude and longitude
        const weatherResposne = await getWeatherForCurrentLocation(lat, lon, curWeatherBaseurl, apikey);
        console.log(weatherResposne);
        const {temp} = weatherResposne.main;
    
        // construct data object
        const entryData = {
            temperature: temp,
            date: new Date().toLocaleString(),
            userResponse: userFeelingsInput,
        }
        console.log(entryData);

        //add entry
        const added = await addNewEntry(serverAddEndpoint, entryData);
        console.log('added', added)


    } catch (error) {
        console.log('Error!:', error)
    }
    
}

async function addNewEntry(url, data) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    try {
        console.log('res',res);
        // const {ok} = res;
        return res;
    } catch (error) {
        console.log('error',error);
        //TODO handle error
    }
}

async function getEntryData(url) {
    const res = await fetch(url);

    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log('error',error);
        //TODO handle error        
    }
}

async function createRecentEntry(entryData) {
    const {temperature, date, userResponse} = entryData;
    const {date: entryDate, temp, content} = recentEntry;

    entryDate.innerHTML = `<span><b>Entry date:</b> ${date}</span>`;
    temp.innerHTML = `<span><b>Temperature(ºC):</b> ${temperature}</span>`;
    content.innerHTML = `<span><b>Feelings:</b> ${userResponse}</span>`;

}

async function getLatitudLongitude(zipValue, url, key) {
    const endpoint = `${url}?zip=${zipValue},${countryCode}&appid=${key}`
    const res = await fetch(endpoint);

    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log('error', error);
        //TODO handle error
    }
}

async function getWeatherForCurrentLocation (lat, lon, url, key) {
    const endpoint = `${url}?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
    const res = await fetch(endpoint);

    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log('error', error);
        //TODO handle error
    }
}
/* --- END Main functions --- */


/* --- EVENT LISTENERS --- */

function addEventListeners(){
    zipcode.addEventListener('input', () => {
        const validatedZipcode = validZipcode();

        if(validatedZipcode) {
            removeAlertInvalidField(zipcode);
            checkEnableButton();
            return;
        };

        addAlertInvalidField(zipcode);
    });

    feelings.addEventListener('input', () => {
        const validatedFeelings = validFeelings();

        if(validatedFeelings) {
            removeAlertInvalidField(feelings);
            checkEnableButton();
            return;
        }

        addAlertInvalidField(feelings);
    })

    generate.addEventListener('click', async () => {
        //add processing element
        fillProgressBar(25);
        await createNewEntry().then(
            fillProgressBar(25)
        );
        //clear inputs
        resetInputs();
        fillProgressBar(25);
        //get entry
        const oldEntryData = await getEntryData(serverGetEndpoint);
        console.log('oldEntry', oldEntryData);
        //update ui
        const cratedRecentEntry = await createRecentEntry(oldEntryData);
    });
}

document.addEventListener('DOMContentLoaded', addEventListeners());

/* --- END EVENT LISTENERS --- */
