import { Component, Input, OnInit } from '@angular/core';
import { DetailCard } from 'src/shared/detail-card.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent implements OnInit {
  @Input() cardList: DetailCard[] = [];

  constructor() {}

  ngOnInit(): void {}
}
