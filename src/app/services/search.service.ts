import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { DetailCard } from 'src/shared/detail-card.model';
import { GeologyService } from './geology.service';
import { WeatherService } from './weather.service';
import { Location } from '../interfaces/Location.interface';
import { NavigationEnd, Router } from '@angular/router';

enum SearchMode {
  WeatherCurrent,
  Geology,
  WeatherForecast,
}

@Injectable({
  providedIn: 'root',
})
export class SearchService implements OnInit {
  @Output() weatherSearch: EventEmitter<DetailCard[]> = new EventEmitter();
  @Output() geologySearch: EventEmitter<DetailCard[]> = new EventEmitter();
  @Output() forecastSearch: EventEmitter<any> = new EventEmitter();

  private currentLocation: Location | undefined = undefined;
  private searchMode: SearchMode = SearchMode.WeatherCurrent;

  constructor(
    private weatherService: WeatherService,
    private geologyService: GeologyService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/location')
          this.searchMode = SearchMode.WeatherCurrent;
        if (event.url === '/geology') this.searchMode = SearchMode.Geology;
        if (event.url === '/forecast')
          this.searchMode = SearchMode.WeatherForecast;

        if (this.currentLocation) {
          this.search(this.currentLocation);
        }
      }
    });
  }

  ngOnInit() {}

  async search(location: Location): Promise<void> {
    this.setCurrentLocation(location);

    if (this.currentLocation) {
      switch (this.searchMode) {
        case SearchMode.WeatherCurrent:
          const weatherCards: DetailCard[] =
            await this.weatherService.requestWeatherInfo(this.currentLocation);
          this.weatherSearch.emit(weatherCards);
          return;
        case SearchMode.Geology:
          const geologyCards: DetailCard[] =
            await this.geologyService.requestGeologyInfo(this.currentLocation);
          this.geologySearch.emit(geologyCards);
          return;
        case SearchMode.WeatherForecast:
          const forecastData: any =
            await this.weatherService.requestForecastInfo(this.currentLocation);
          this.forecastSearch.emit(forecastData);
      }
    }
  }

  setCurrentLocation(location: Location): void {
    if (location) this.currentLocation = location;
  }
}
