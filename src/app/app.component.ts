import { Component } from '@angular/core';
import { DetailCard } from 'src/shared/detail-card.model';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //an array which holds arrays of cards
  cardLists: DetailCard[][];

  constructor(private searchService: SearchService) {
    this.cardLists = [];

    this.searchService.weatherSearch.subscribe((cardList: DetailCard[]) => {
      this.cardLists[0] = cardList;
    });

    this.searchService.geologySearch.subscribe((cardList: DetailCard[]) => {
      this.cardLists[1] = cardList;
    });
  }
}
