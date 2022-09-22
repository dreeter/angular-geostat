import { Component, OnInit, Input, Host, HostBinding } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent implements OnInit {
  @Input() imageSrc: string;
  @Input() imageAlt: string;
  @Input() imageWidth: number;
  @Input() imageHeight: number;

  constructor() {
    this.imageSrc = '';
    this.imageAlt = '';
    this.imageHeight = 25;
    this.imageWidth = 25;
  }

  ngOnInit(): void {}
}
