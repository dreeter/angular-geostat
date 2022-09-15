import { Injectable } from '@angular/core';
import { DetailCard } from 'src/shared/detail-card.model';
import { DetailItem } from 'src/shared/detail-item.model';

@Injectable({
  providedIn: 'root',
})
export class GeologyService {
  constructor() {}

  async searchGeology(latitude: string, longitude: string) {
    const url =
      'http://localhost:4201/geology?' +
      new URLSearchParams({
        latitude: latitude,
        longitude: longitude,
      });

    const response = await fetch(url);

    const userGeologyInfo = await response.json();

    return this.formatGeologyInfo(userGeologyInfo);
  }

  formatGeologyInfo(data: any) {
    const detailCards: DetailCard[] = [];

    const geologyCard = new DetailCard(
      'Geology',
      [
        new DetailItem('Unit Name', data.success.data[0].name),
        new DetailItem('Lithology', data.success.data[0].lith),
        new DetailItem('Top-Age', data.success.data[0].t_int_age),
        new DetailItem('Bottom-Age', data.success.data[0].b_int_age),
        new DetailItem('Description', data.success.data[0].descrip),
      ],
      '../assets/images/rock.png',
      { 'width.px': 70, 'height.px': 70 }
    );

    detailCards.push(geologyCard);

    return detailCards;
  }
}
