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


/* --- Aux functions for validation --- */
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
    element.classList.remove('field__error')
}

const isEmptyField = (elementValue) => {
    if ( !elementValue || elementValue.trim().length === 0 ) {
        console.log('novalue');
        return true;
    }
    return false;
}

function validZipcode() {
    const userZipInput = zipcode.value;
    const spainZipRegex = /\b(0[1-9]|5[0-2]|[0-4][0-9])[0-9]{3}\b/;
    const validSpainZip = spainZipRegex.test(userZipInput);
    console.log('userZipInput', userZipInput)

    if ( isEmptyField(userZipInput) || !validSpainZip ) {
        addAlertInvalidField(zipcode);
        return false;
    }
    return validSpainZip;

}

function validFeelings() {
    const userFeelingsInput = feelings.value;

    if(isEmptyField(userFeelingsInput)) {
        addAlertInvalidField(feelings);
        return false;
    }
    return true;
}
/* ---  END Aux functions for validation --- */


/* --- Main functions --- */
async function createNewEntry(){
    try {
        const userZipInput = zipcode.value;
        const userFeelingsInput = feelings.value
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
            date: new Date().toString(),
            userResponse: userFeelingsInput,
        }
        console.log(entryData);

        //add entry
        const added = await addNewEntry(serverAddEndpoint, entryData);
        console.log('added', added)
        //get entry
        const oldEntryData = await getEntryData(serverGetEndpoint);
        console.log('oldEntry', oldEntryData);
        //update ui
        const cratedRecentEntry = await createRecentEntry(oldEntryData);

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
    //todo
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



/* --- EVENT LISTENERS --- */

function addEventListeners(){
    zipcode.addEventListener('input', () => {
        const validatedZipcode = validZipcode();

        if(validatedZipcode) {
            removeAlertInvalidField(zipcode);
        };

        console.log('inside event listener zipcode:', validatedZipcode);
    });

    feelings.addEventListener('input', () => {
        const validatedFeelings = validFeelings();

        if(validatedFeelings) {
            removeAlertInvalidField(feelings);
        }

        console.log('inside event listener feelings:', validatedFeelings);

    })

    generate.addEventListener('click', createNewEntry);
}

document.addEventListener('DOMContentLoaded', addEventListeners());




