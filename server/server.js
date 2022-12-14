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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var https = require("https");
var fs = require("fs");
var app = express();
var port = '4201';
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    }
    else {
        console.log("".concat(req.ip, " ").concat(req.method, " ").concat(req.url));
        next();
    }
});
//retrieves a response parsed to JSON
function getAPIInfo(url) {
    return new Promise(function (resolve, reject) {
        https.get(url, function (response) {
            if (response.statusCode !== 200) {
                reject('Invalid Response Code: ' + response.statusCode + 'from ' + url);
            }
            var responseData = '';
            response.on('data', function (data) {
                responseData += data;
            });
            response.on('end', function () {
                resolve(JSON.parse(responseData));
            });
        });
    });
}
app.get('/locations', function (_req, _res) { return __awaiter(void 0, void 0, void 0, function () {
    var locations;
    return __generator(this, function (_a) {
        locations = fs.readFileSync(__dirname + '/city-list.json');
        locations = JSON.parse(locations);
        // const response = {
        //   locations: locations,
        // };
        _res.send(JSON.stringify(locations));
        return [2 /*return*/];
    });
}); });
app.get('/weather', function (_req, _res) { return __awaiter(void 0, void 0, void 0, function () {
    var city, state, apiKey, weatherURL, weatherInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                city = String(_req.query.city);
                state = String(_req.query.state);
                apiKey = 'APIKEYHERE';
                weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=' +
                    city +
                    ',US-' +
                    state +
                    '&appid=' +
                    apiKey +
                    '&units=imperial';
                return [4 /*yield*/, getAPIInfo(weatherURL)];
            case 1:
                weatherInfo = (_a.sent());
                console.dir(weatherInfo);
                _res.send(JSON.stringify(weatherInfo));
                return [2 /*return*/];
        }
    });
}); });
app.get('/forecast', function (_req, _res) { return __awaiter(void 0, void 0, void 0, function () {
    var city, state, apiKey, weatherURL, weatherInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                city = String(_req.query.city);
                state = String(_req.query.state);
                apiKey = 'APIKEYHERE';
                weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' +
                    city +
                    ',US-' +
                    state +
                    '&appid=' +
                    apiKey +
                    '&units=imperial';
                return [4 /*yield*/, getAPIInfo(weatherURL)];
            case 1:
                weatherInfo = (_a.sent());
                console.dir(weatherInfo);
                _res.send(JSON.stringify(weatherInfo));
                return [2 /*return*/];
        }
    });
}); });
app.get('/geology', function (_req, _res) { return __awaiter(void 0, void 0, void 0, function () {
    var latitude, longitude, geoURL, geoInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                latitude = String(_req.query.latitude);
                longitude = String(_req.query.longitude);
                geoURL = 'https://macrostrat.org/api/geologic_units/map?lat=' +
                    latitude +
                    '&lng=' +
                    longitude +
                    '&scale=medium';
                return [4 /*yield*/, getAPIInfo(geoURL)];
            case 1:
                geoInfo = (_a.sent());
                _res.send(JSON.stringify(geoInfo));
                return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
