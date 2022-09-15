import { DetailItem } from './detail-item.model';

export class DetailCard {
  //   detailItems: DetailItem[];
  //   title: string;
  //   imagePath: string;

  constructor(
    public title: string,
    public detailItems: DetailItem[],
    public imagePath: string,
    public imageSize: any
  ) {
    // this.detailItems = detailItems;
    // this.title = 'Weather';
    // this.imagePath = '../assets/images/planet.png';
  }
}
