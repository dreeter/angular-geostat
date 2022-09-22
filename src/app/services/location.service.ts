import { Injectable } from '@angular/core';
import { Location } from '../interfaces/Location.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  searchableLocations: Location[] = [];

  constructor() {
    this.initSearchableLocations();
  }

  async initSearchableLocations() {
    const response = await fetch('http://localhost:4201/locations');

    this.searchableLocations = await response.json();
  }

  locationSearchable(query: string): boolean {
    let validLocation: boolean = false;

    if (this.getLocation(query)) validLocation = true;

    return validLocation;
  }

  getLocation(query: string): Location | undefined {
    let location: Location | undefined = undefined;

    const locationMatches = this.searchableLocationMatches(query);

    if (!locationMatches.length) return location;

    if (locationMatches.length === 1) {
      location = locationMatches[0];
    } else {
      location = locationMatches.find((location) => {
        return location.cityState.toLowerCase() === query.toLowerCase();
      });
    }

    return location;
  }

  searchableLocationMatches(query: string): Location[] {
    const regex = new RegExp(query.split('').join('\\s*'), 'i');

    return this.searchableLocations.filter((location) => {
      return location.cityState.match(regex);
    });
  }
}
