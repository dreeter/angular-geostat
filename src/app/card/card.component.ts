import { Component, OnInit, Input } from '@angular/core';
import { DetailCard } from 'src/shared/detail-card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() card: DetailCard;
  @Input() parentLength: number = 0;

  constructor() {
    this.card = {} as DetailCard;
  }

  ngOnInit(): void {}
}
