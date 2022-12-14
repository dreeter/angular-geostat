import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  brandImageSrc: string = '../../assets/images/planet.png';
  brandImageAlt: string = 'planet-icon';

  constructor() {}

  ngOnInit(): void {}
}
