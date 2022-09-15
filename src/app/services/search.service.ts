import { EventEmitter, Injectable, Output } from '@angular/core';
import { DetailCard } from 'src/shared/detail-card.model';
import { GeologyService } from './geology.service';
import { WeatherService } from './weather.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchParameter: string;

  @Output() weatherSearch: EventEmitter<DetailCard[]> = new EventEmitter();
  @Output() geologySearch: EventEmitter<DetailCard[]> = new EventEmitter();

  constructor(
    private weatherService: WeatherService,
    private geologyService: GeologyService
  ) {
    this.searchParameter = '';
  }

  async search(value: string) {
    console.log(value);
    const location = value.split(',');
    const city = location[0];
    const state = location[1];

    console.log(city, state);

    const weatherInfo: DetailCard[] = await this.weatherService.searchWeather(
      city,
      state
    );

    this.weatherSearch.emit(weatherInfo);

    const geologyInfo: DetailCard[] = await this.geologyService.searchGeology(
      '25.7743',
      '-80.1937'
    );

    this.geologySearch.emit(geologyInfo);
  }

  //search service can have it's search parameters set by the search component
  //service will use the WeatherService (fetches weather data)
  //service will use the GeologyService (fetches geologic data)

  //service will emit events when new data has been fetched - app component or card-list will subscribe to these
  //events and update their data
}
