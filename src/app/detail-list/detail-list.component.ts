import { Component, OnInit, Input } from '@angular/core';
import { DetailItem } from 'src/shared/detail-item.model';

@Component({
  selector: 'app-detail-list',
  templateUrl: './detail-list.component.html',
  styleUrls: ['./detail-list.component.css'],
})
export class DetailListComponent implements OnInit {
  @Input() detailItems: DetailItem[] = [];

  constructor() {}

  ngOnInit(): void {}
}
