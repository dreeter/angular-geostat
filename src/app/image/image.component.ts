import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent implements OnInit {
  @Input() imageSrc: string;
  @Input() imageAlt: string;
  @Input() imageSize: any;

  constructor() {
    this.imageSrc = '';
    this.imageAlt = '';
  }

  ngOnInit(): void {}
}
