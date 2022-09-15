import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;

  constructor(
    private searchService: SearchService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      location: [
        '',
        Validators.compose([Validators.required, this.validateLocation]),
      ],
    });
  }

  ngOnInit(): void {}

  onSubmit(search: string) {
    console.log('The search button was clicked with:', search);
    this.searchService.search(search);
  }

  validateLocation(control: FormControl): { [s: string]: boolean } {
    //TODO: check if the location entered has any results in the list of valid locations

    return { invalidLocation: false };
  }
}
