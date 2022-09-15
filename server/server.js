"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const https = require("https");
const app = express();
const port = '4201';
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    }
    else {
        console.log(`${req.ip} ${req.method} ${req.url}`);
        next();
    }
});
//retrieves a response parsed to JSON
function getAPIInfo(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject('Invalid Response Code: ' + response.statusCode + 'from ' + url);
            }
            let responseData = '';
            response.on('data', (data) => {
                responseData += data;
            });
            response.on('end', () => {
                resolve(JSON.parse(responseData));
            });
        });
    });
}
app.get('/weather', (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    //Endpoint for weather information at a city and state
    const city = String(_req.query.city);
    const state = String(_req.query.state);
    console.log('Making API Call:', city, state);
    const apiKey = 'c0b5e29a902014b259dad2f832ededd7';
    const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        ',' +
        state +
        '&appid=' +
        apiKey +
        '&units=imperial';
    const weatherInfo = (yield getAPIInfo(weatherURL));
    console.dir(weatherInfo);
    _res.send(JSON.stringify(weatherInfo));
}));
app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
// app.get('/weather', (req, res) => {
//   const response = {
//     name: 'Derek',
//   };
//   res.send(JSON.stringify(response));
//   console.log('get request to root route');
// });
