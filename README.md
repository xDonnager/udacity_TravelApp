<!-- Add banner here -->

# Travel App Project

This is the last project for the Udacity frontend web development nanodegree.
It is a web app that comunicates with a nodejs backend server (uses express).
The backend has these main endpoints:
1 - GET /health-check
2 - GET / (UI entrypoint)
3 - GET /savedTrips
4 - POST /createNewTrip
5 - POST /deleteTrip

The Single Page Application is a travel app planifier, it has a main form where you can enter the country and city destination as well as a start date for the trip.
There is an integration with restcountries API in order to gather the coordinates and other destination data. Then the information is used to gather data from weatherbit in order to get a forecast (if the trip is within the next 16 days) or to gather an aproximation of how the weather would be.
Finally a card is rendered on the UI and there is another integration with pixabay API in order to render images.
The user can delete the trips using built-in remove buttons in the trip cards.

# Table of contents

- [Project Title](#travel-app-project)
- [Table of contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)

# Installation

[(Back to top)](#table-of-contents)

`cd` into your new folder and run:

- `npm install`
  in order to install all the required dependencies and packages.

# Usage

[(Back to top)](#table-of-contents)

A valid apikey for Geonames API must be provided in order to use this application.
Create a copy of the .env.example file and rename it to .env. Update the variable `GEONAMES_USERNAME` with your apikey

_Geonames API_: You can find the API [here](http://www.geonames.org/).

A valid apikey for WeatherBit API must be provided in order to use this application.
Create a copy of the .env.example file and rename it to .env. Update the variable `WEATHERBIT_APIKEY` with your apikey

_WeatherBit API_: You can find the API [here](https://www.weatherbit.io/api).

A valid apikey for Pixabay API must be provided in order to use this application.
Create a copy of the .env.example file and rename it to .env. Update the variable `PIXABAY_APIKEY` with your apikey

Pixabay API\_: You can find the API [here](https://pixabay.com/api/docs/).

## Development mode

Run UI in http://localhost:8081/

- `npm run dev`

Run the Express server on port 5000

- `npm start`

## Production mode

Generate a `dist` folder for prod

- `npm run build`

Run the Express server on port 5000

- `npm start`
