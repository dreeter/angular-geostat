import { Component, OnInit } from '@angular/core';
import { DetailCard } from 'src/shared/detail-card.model';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css'],
})
export class WeatherInfoComponent implements OnInit {
  cardList: DetailCard[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.weatherSearch.subscribe((cardList: DetailCard[]) => {
      this.cardList = cardList;
    });
  }
}
