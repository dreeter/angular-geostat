import { Component, Input, OnInit } from '@angular/core';
import { DetailItem } from 'src/shared/detail-item.model';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.css'],
})
export class DetailItemComponent implements OnInit {
  @Input() item: DetailItem = {} as DetailItem;

  constructor() {}

  ngOnInit(): void {}
}
