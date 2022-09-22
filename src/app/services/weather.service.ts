import { Injectable } from '@angular/core';
import * as echarts from 'echarts/types/dist/echarts.d';
import { DetailCard } from 'src/shared/detail-card.model';
import { DetailItem } from 'src/shared/detail-item.model';
import { Location } from '../interfaces/Location.interface';
import { ChartData } from '../interfaces/ForecastData.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor() {}

  async requestWeatherInfo(location: Location): Promise<DetailCard[]> {
    const url =
      'http://localhost:4201/weather?' +
      new URLSearchParams({
        city: location.city,
        state: location.state,
      });

    const response = await fetch(url);

    const weatherInfo: Promise<any> = await response.json();

    return this.formatWeatherInfo(weatherInfo);
  }

  async requestForecastInfo(location: Location): Promise<ChartData[]> {
    const url =
      'http://localhost:4201/forecast?' +
      new URLSearchParams({
        city: location.city,
        state: location.state,
      });

    const response = await fetch(url);

    const forecastInfo: any = await response.json();

    return forecastInfo;
  }

  formatWeatherInfo(data: any): DetailCard[] {
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
      50,
      50
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
      70,
      70
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
      50,
      50
    );

    detailCards.push(timeZoneCard, weatherCard, atmosphereCard);

    return detailCards;
  }
}
