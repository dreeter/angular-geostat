import { Component, OnInit } from '@angular/core';
import { DetailCard } from 'src/shared/detail-card.model';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-geology-info',
  templateUrl: './geology-info.component.html',
  styleUrls: ['./geology-info.component.css'],
})
export class GeologyInfoComponent implements OnInit {
  cardList: DetailCard[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.geologySearch.subscribe((cardList: DetailCard[]) => {
      this.cardList = cardList;
    });
  }
}
