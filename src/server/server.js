//packages and modules
const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const cors = require("cors");

const { createNewTrip } = require("./controllers/createNewTrip");

// ****** Variables/ Middlewares ******
// Setup empty JS object to act as endpoint for all routes
const { SERVER_PORT } = process.env || 5000;
const tripsRepository = [];

//setup express
const app = express();
app.use(express.static("dist"));
app.use(cors());
//parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());
// parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({ extended: true }));

app.get("/health-check", async (req, res) => {
  res.status(200).json({ status: "alive" });
});

//serve webapplication frontend
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/savedTrips", async (req, res) => {
  res.status(200).send(tripsRepository);
});

app.post("/createNewTrip", async (req, res) => {
  try {
    const newTrip = await createNewTrip(req.body);
    tripsRepository.push(newTrip);

    res.status(200).json({ created: "yes" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
});

app.post("/deleteTrip", async (req, res) => {
  const tripToDelete = req.body.id.toString();
  const positionFound = tripsRepository.findIndex(
    (trip) => trip.id === tripToDelete
  );
  if (positionFound !== -1) {
    tripsRepository.splice(positionFound, positionFound + 1);
  }
  res.status(200).json({ removed: "yes" });
});

app.listen(SERVER_PORT, () => {
  console.log("App running at port: ", SERVER_PORT);
});
