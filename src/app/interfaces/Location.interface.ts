import { Coordinate } from './Coordinate.interface';

export interface Location {
  cityState: string;
  city: string;
  state: string;
  country: string;
  coord: Coordinate;
}
