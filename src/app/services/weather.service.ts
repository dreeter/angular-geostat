import { Injectable } from '@angular/core';
import { DetailCard } from 'src/shared/detail-card.model';
import { DetailItem } from 'src/shared/detail-item.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor() {}

  async searchWeather(city: string, state: string) {
    const url =
      'http://localhost:4201/weather?' +
      new URLSearchParams({
        city: city,
        state: state,
      });

    const response = await fetch(url);

    console.log(response);

    const userWeatherInfo: any = await response.json();

    return this.formatWeatherInfo(userWeatherInfo);
  }

  formatWeatherInfo(data: any) {
    const detailCards: DetailCard[] = [];

    const timeZoneCard = new DetailCard(
      'Time-Zone',
      [
        new DetailItem('Region', data.name + ', ' + data.sys.country),
        new DetailItem('Latitude', data.coord.lat),
        new DetailItem('Longitude', data.coord.lon),
        new DetailItem('Sunrise', data.sys.sunrise),
        new DetailItem('Sunset', data.sys.sunset),
      ],
      '../assets/images/location.png',
      { 'width.px': 50, 'height.px': 50 }
    );

    const weatherCard = new DetailCard(
      'Weather',
      [
        new DetailItem('Description', data.weather[0].description),
        new DetailItem('Temperature', data.main.temp),
        new DetailItem('Temp-Minimum', data.main.temp_min),
        new DetailItem('Temp-Maximum', data.main.temp_max),
        new DetailItem('Humidity', data.main.humidity),
      ],
      'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png',
      { 'width.px': 70, 'height.px': 70 }
    );

    const atmosphereCard = new DetailCard(
      'Atmosphere',
      [
        new DetailItem('Wind Speed', data.wind.speed),
        new DetailItem('Wind Direction', data.wind.deg),
        new DetailItem('Pressure', data.main.pressure),
        new DetailItem('Visibility', data.visibility),
        new DetailItem('Cloudiness', data.clouds.all),
      ],
      '../assets/images/barometer.png',
      { 'width.px': 50, 'height.px': 50 }
    );

    detailCards.push(timeZoneCard, weatherCard, atmosphereCard);

    return detailCards;
  }
}
