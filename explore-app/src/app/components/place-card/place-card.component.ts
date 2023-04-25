import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Place } from "src/app/shared/models/place";
import { UserPreferences, UserPreferencesService } from "src/app/shared/services/user-preferences.service";

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.scss']
})
export class PlaceCard implements OnInit {
  @Input() place: Place;
  @Output() hover: EventEmitter<boolean> = new EventEmitter<boolean>();

  photos: string[];
  title: string;
  preferences: UserPreferences;

  get isHighlighted() {
    return this.preferences.isPlaceSelected(this.place.id);
  }

  get isVisited() {
    return this.preferences.isPlaceVisited(this.place.id);
  }

  distance: number;

  constructor(private preferencesService: UserPreferencesService) {

  }

  ngOnInit(): void {
    this.photos = this.place.sights.map(s => s.image).filter(image => image);
    this.title = this.place.name;
    this.preferences = this.preferencesService.currentPreferences;
    this.distance = this.calculateDistance(this.place);
  }

  openPlaceUrl() {
    window.open(this.place.url, "_blank");
  }

  notInteresting() {
    this.preferencesService.setAsNonInteresting(this.place.id);
  }

  removeFromNotInteresting() {
    this.preferencesService.removeAsNonInteresting(this.place.id);
  }

  toVisit() {
    this.preferencesService.setToVisit(this.place.id);
  }

  removeToVisit() {
    this.preferencesService.removeToVisit(this.place.id);
  }

  visited() {
    // We send signal that place will be left, because after marking it as visited it will appear on different view
    this.leavePlace();
    this.preferencesService.setAsVisited(this.place.id).subscribe({
      error: error => {
        this.enterPlace();
      }
    });
  }

  removeVisited() {
    this.preferencesService.removeAsVisited(this.place.id);
  }

  enterPlace() {
    this.hover.emit(true);
  }

  leavePlace() {
    this.hover.emit(false);
  }

  calculateDistance(place: Place) {
    if (!place.coords) {
      return -1;
    }
    const [lat1, long1] = this.preferences.location;
    const [lat2, long2] = place.coords;
    return this.haversineDistance(lat1, long1, +lat2, +long2);
  }

  private degreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  private haversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const earthRadiusKm = 6371; // Earth's mean radius in km

    // Convert latitudes and longitudes from degrees to radians
    const lat1Rad = this.degreesToRadians(lat1);
    const lon1Rad = this.degreesToRadians(lon1);
    const lat2Rad = this.degreesToRadians(lat2);
    const lon2Rad = this.degreesToRadians(lon2);

    // Calculate differences in latitude and longitude
    const deltaLat = lat2Rad - lat1Rad;
    const deltaLon = lon2Rad - lon1Rad;

    // Apply haversine formula
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculate the distance
    const distance = earthRadiusKm * c;
    return distance;
  }
}