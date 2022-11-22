//packages and modules
const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const cors = require("cors");
const fetch = require("node-fetch");

const { getCountryData } = require("./api/countries");
const { getCoordinates } = require("./api/geonames");
const { getProjectedWeather } = require("./api/weatherbit");
const { getImage } = require("./api/pixabay");
const { createNewTrip } = require("./controllers/createNewTrip");

// ****** Variables/ Middlewares ******
// Setup empty JS object to act as endpoint for all routes
const { SERVER_PORT } = process.env || 5000;
console.log(__dirname);
//setup express
const app = express();
app.use(express.static("dist"));
app.use(cors());
//parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());
// parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({ extended: true }));

app.get("/health-check", (req, res) => {
  res.json({ status: "OK" });
});

//serve webapplication frontend
app.get("/", (req, res) => {
  console.log(req);
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//read entries
// app.get("/data", (req, res) => {
//   res.send(projectData);
// });

//Add new entry
// app.post("/add", (req, res) => {
//   const { temperature, date, userResponse } = req.body;
//   projectData.temperature = temperature;
//   projectData.date = date;
//   projectData.userResponse = userResponse;
//   res.end();
//   console.log("updated" + " " + JSON.stringify(projectData));
// });

app.post("/createNewTrip", async (req, res) => {
  console.log(req.body);
  try {
    await createNewTrip(req.body);

    res.status(200).json({ created: "OK" });
  } catch (e) {
    console.log(e);
    return res.status(404).json({ created: "NOK" });
    //res.status(0).json({ error: { ...e } });
  }
});

app.listen(SERVER_PORT, () => {
  console.log("App running at port: ", SERVER_PORT);
});
