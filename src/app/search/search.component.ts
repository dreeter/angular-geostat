import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationService } from '../services/location.service';
import { SearchService } from '../services/search.service';
import { Location } from '../interfaces/Location.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  searchButtonDisabled: boolean = true;
  searchMatches: Location[] = [];
  invalidSearch: boolean = false;
  currentLocation: Location | undefined = undefined;

  constructor(
    private searchService: SearchService,
    private formBuilder: FormBuilder,
    private locationService: LocationService
  ) {
    this.searchForm = this.formBuilder.group({
      location: [''],
    });
  }

  ngOnInit(): void {
    this.searchForm.controls['location'].valueChanges.subscribe(
      (query: string) => {
        if (this.locationService.locationSearchable(query)) {
          this.searchButtonDisabled = false;
        } else {
          this.searchButtonDisabled = true;
        }
      }
    );

    this.searchForm.controls['location'].valueChanges.subscribe(
      (query: string) => {
        if (query.length > 1) {
          this.searchMatches = this.locationService
            .searchableLocationMatches(query)
            .slice(0, 4);
          if (this.searchMatches.length === 0) {
            this.invalidSearch = true;
          } else {
            this.invalidSearch = false;
          }
        } else {
          this.searchMatches = [];
        }
      }
    );
  }

  onSubmit(query: string): void {
    const searchLocation: Location | undefined =
      this.locationService.getLocation(query);

    if (!searchLocation) {
      this.invalidSearch = false;
    } else {
      this.searchService.search(searchLocation);
      this.currentLocation = searchLocation;
    }

    this.searchForm.controls['location'].setValue('');
  }
}
