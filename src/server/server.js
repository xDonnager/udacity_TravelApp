//packages and modules
const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const cors = require('cors');

// ****** Variables/ Middlewares ******
// Setup empty JS object to act as endpoint for all routes
const projectData = {};
const { PORT } = process.env || 5000;
console.log(__dirname);
//setup express
const app = express();
app.use(express.static("dist"));
app.use(cors());
//parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json())
// parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({extended: true}))

//serve webapplication frontend
app.get('/', (req, res) => {
    console.log(req);
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

//read entries
app.get('/data', (req, res) => {
    res.send(projectData);
})

//Add new entry
app.post('/add', (req, res) => {
    const {temperature, date, userResponse} = req.body;
    projectData.temperature = temperature;
    projectData.date = date;
    projectData.userResponse = userResponse;
    res.end();
    console.log('updated' + ' ' +JSON.stringify(projectData));
})


app.listen(PORT, () => {
    console.log('App running at port: ', port)
})