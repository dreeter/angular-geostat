import { Injectable } from '@angular/core';
import { DetailCard } from 'src/shared/detail-card.model';
import { DetailItem } from 'src/shared/detail-item.model';
import { Location } from '../interfaces/Location.interface';

@Injectable({
  providedIn: 'root',
})
export class GeologyService {
  constructor() {}

  async requestGeologyInfo(location: Location): Promise<DetailCard[]> {
    const url =
      'http://localhost:4201/geology?' +
      new URLSearchParams({
        latitude: String(location.coord.lat),
        longitude: String(location.coord.lon),
      });

    const response = await fetch(url);

    const geologyInfo: Promise<any> = await response.json();

    return this.formatGeologyInfo(geologyInfo);
  }

  formatGeologyInfo(geologyInfo: any) {
    const detailCards: DetailCard[] = [];

    const geologyCard = new DetailCard(
      'Geology',
      [
        new DetailItem('Unit Name', geologyInfo.success.data[0].name),
        new DetailItem('Lithology', geologyInfo.success.data[0].lith),
        new DetailItem('Top-Age', geologyInfo.success.data[0].t_int_age),
        new DetailItem('Bottom-Age', geologyInfo.success.data[0].b_int_age),
        new DetailItem('Description', geologyInfo.success.data[0].descrip),
      ],
      '../assets/images/rock.png',
      70,
      70
    );

    detailCards.push(geologyCard);

    return detailCards;
  }
}
