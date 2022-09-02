//packages and modules
const express = require('express');
const path = require('path');
const cors = require('cors');
// require('isomorphic-fetch');

// Setup empty JS object to act as endpoint for all routes
const projectData = {};

console.log(__dirname);
//setup express
const app = express();
const port = 3000;

//parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json())
// parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({extended: true}))
//cors
app.use(cors());
//public dir
app.use(express.static('public'));

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


app.listen(port, () => {
    console.log('App running at port: ', port)
})