const express = require('express');
const cors = require('cors');
require('isomorphic-fetch');

// Setup empty JS object to act as endpoint for all routes
const projectData = {};
const port = 3000;

//setup express
const app = express();

//parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json())
// parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({extended: true}))
//cors
app.use(cors());
//public dir
app.use(express.static('public'));

app.get('/data', (req, res) => {
    res.send(projectData);
})

app.post('/add', (req, res) => {
    const {temperature, date, userResponse} = req.body;
    projectData = {
        temperature: temperature,
        date: date,
        userResponse: userResponse
    }

})


app.listen(port, (req, res) => {
    console.log('App running at port: ', port)
})