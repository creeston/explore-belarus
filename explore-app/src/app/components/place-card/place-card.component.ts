import { Component, Input, OnInit } from "@angular/core";
import { Place } from "src/app/shared/models/place";

@Component({
    selector: 'app-place-card',
    templateUrl: './place-card.component.html',
    styleUrls: ['./place-card.component.scss']
})
export class PlaceCard implements OnInit {
    @Input() place: Place;

    photos: string[];
    title: string;


    ngOnInit(): void {
        this.photos = this.place.sights.map(s => s.image).filter(image => image);
        this.title = this.place.name;
    }


    currentImageIndex = 0;

  get currentImage() {
    return this.photos[this.currentImageIndex];
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.photos.length;
  }

  previousImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.photos.length) %  this.photos.length;
  }
}