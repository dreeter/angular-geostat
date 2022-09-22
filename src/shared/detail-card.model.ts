import { DetailItem } from './detail-item.model';

export class DetailCard {
  constructor(
    public title: string,
    public detailItems: DetailItem[],
    public imagePath: string,
    public imageWidth: number,
    public imageHeight: number
  ) {}
}
