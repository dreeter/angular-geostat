import * as express from 'express';
import * as https from 'https';
import { IncomingMessage } from 'http';

const app = express();

const port = '4201';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');

  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    console.log(`${req.ip} ${req.method} ${req.url}`);
    next();
  }
});

//retrieves a response parsed to JSON
function getAPIInfo(url: string) {
  return new Promise((resolve, reject) => {
    https.get(url, (response: IncomingMessage) => {
      if (response.statusCode !== 200) {
        reject('Invalid Response Code: ' + response.statusCode + 'from ' + url);
      }

      let responseData: any = '';

      response.on('data', (data: any) => {
        responseData += data;
      });

      response.on('end', () => {
        resolve(JSON.parse(responseData));
      });
    });
  });
}

app.get('/weather', async (_req, _res) => {
  //Endpoint for weather information at a city and state

  const city: string = String(_req.query.city);
  const state: string = String(_req.query.state);

  console.log('Making API Call:', city, state);

  const apiKey: string = 'API-KEY-GOES-HERE';
  const weatherURL: string =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    city +
    ',' +
    state +
    '&appid=' +
    apiKey +
    '&units=imperial';

  const weatherInfo: any = (await getAPIInfo(weatherURL)) as any;

  console.dir(weatherInfo);

  _res.send(JSON.stringify(weatherInfo));
});

app.get('/geology', async (_req, _res) => {
  //Endpoint for geologic unit information at a given latitude and longitude

  const latitude: string = String(_req.query.latitude);
  const longitude: string = String(_req.query.longitude);

  const geoURL: string =
    'https://macrostrat.org/api/geologic_units/map?lat=' +
    latitude +
    '&lng=' +
    longitude +
    '&scale=medium';
  const geoInfo: any = (await getAPIInfo(geoURL)) as any;

  _res.send(JSON.stringify(geoInfo));
});

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
