const express=require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
app.use(bodyParser.json());
var path = require('path');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'Folder'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express); // Idk, Stackoverflow asked to do this

let apiKey = ''; //Your API key goes here

app.get('/', (req,res) => {
    res.render('main');
}); 

app.post('/bycity', async (req,res,next) => {
    console.log('a');
    let city = req.body.city;
    let weather = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + req.body.city + '&appid=' + apiKey);
    let data = await weather.json();
    console.log(data);
    res.render('main', {data: data});
});

app.listen(3000,() => {
    console.log("Listening to port 3000");
});